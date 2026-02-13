-- Profiles table + RLS + role sync.
-- Run this in the Supabase SQL editor after role-triggers.sql.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null check (role in ('patient', 'clinician', 'admin')),
  first_name text,
  last_name text,
  phone text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_role_idx on public.profiles(role);

alter table public.profiles enable row level security;

create policy "profiles_select_own"
on public.profiles for select
using (auth.uid() = id);

create policy "profiles_update_own"
on public.profiles for update
using (auth.uid() = id);

create policy "profiles_insert_own"
on public.profiles for insert
with check (auth.uid() = id);

-- Keep updated_at fresh
create or replace function public.set_profiles_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_profiles_updated_at on public.profiles;

create trigger trg_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_profiles_updated_at();

-- Sync profile on user creation.
create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, email, role, phone)
  values (
    new.id,
    new.email,
    coalesce(new.raw_app_meta_data->>'role', 'patient'),
    new.phone
  )
  on conflict (id) do update
  set email = excluded.email,
      role = excluded.role,
      phone = excluded.phone;

  return new;
end;
$$;

drop trigger if exists trg_handle_new_user_profile on auth.users;

create trigger trg_handle_new_user_profile
after insert on auth.users
for each row
execute function public.handle_new_user_profile();

-- Sync profile when user role changes (admin updates app_metadata.role).
create or replace function public.sync_profile_on_role_change()
returns trigger
language plpgsql
security definer
as $$
begin
  if coalesce(new.raw_app_meta_data->>'role', '') <> coalesce(old.raw_app_meta_data->>'role', '') then
    update public.profiles
    set role = coalesce(new.raw_app_meta_data->>'role', 'patient'),
        updated_at = now()
    where id = new.id;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_sync_profile_on_role_change on auth.users;

create trigger trg_sync_profile_on_role_change
after update on auth.users
for each row
execute function public.sync_profile_on_role_change();

-- -- Audit log for role changes.
-- create table if not exists public.role_change_audit (
--   id uuid primary key default gen_random_uuid(),
--   changed_at timestamptz not null default now(),
--   admin_id uuid not null references auth.users(id) on delete restrict,
--   target_user_id uuid not null references auth.users(id) on delete cascade,
--   old_role text,
--   new_role text not null check (new_role in ('patient', 'clinician', 'admin')),
--   reason text
-- );

-- create index if not exists role_change_audit_target_idx on public.role_change_audit(target_user_id);
-- create index if not exists role_change_audit_admin_idx on public.role_change_audit(admin_id);

-- alter table public.role_change_audit enable row level security;

-- create policy "role_change_audit_admin_read"
-- on public.role_change_audit for select
-- using (auth.uid() = admin_id);

-- -- Admin-only RPC to set user role and record audit log.
-- create or replace function public.admin_set_user_role(
--   target_user_id uuid,
--   new_role text,
--   reason text default null
-- )
-- returns void
-- language plpgsql
-- security definer
-- as $$
-- declare
--   current_role text;
--   actor_role text;
-- begin
--   actor_role := (
--     select raw_app_meta_data->>'role'
--     from auth.users
--     where id = auth.uid()
--   );

--   if actor_role <> 'admin' then
--     raise exception 'Only admins can change roles';
--   end if;

--   select raw_app_meta_data->>'role'
--   into current_role
--   from auth.users
--   where id = target_user_id;

--   update auth.users
--   set raw_app_meta_data = jsonb_set(
--     coalesce(raw_app_meta_data, '{}'::jsonb),
--     '{role}',
--     to_jsonb(new_role),
--     true
--   )
--   where id = target_user_id;

--   insert into public.role_change_audit (
--     admin_id,
--     target_user_id,
--     old_role,
--     new_role,
--     reason
--   )
--   values (
--     auth.uid(),
--     target_user_id,
--     current_role,
--     new_role,
--     reason
--   );
-- end;
-- $$;

-- revoke all on function public.admin_set_user_role(uuid, text, text) from public;
-- grant execute on function public.admin_set_user_role(uuid, text, text) to authenticated;

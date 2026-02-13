-- Enforce role assignment server-side for new users.
-- Run this in the Supabase SQL editor.

create or replace function public.assign_role_from_metadata()
returns trigger
language plpgsql
security definer
as $$
begin
  -- Prefer explicit role in user metadata (client-set).
  if new.raw_user_meta_data ? 'role' then
    new.raw_app_meta_data = jsonb_set(
      coalesce(new.raw_app_meta_data, '{}'::jsonb),
      '{role}',
      to_jsonb(new.raw_user_meta_data->>'role'),
      true
    );
  end if;

  -- Fallback to "patient" if nothing is set.
  if not (new.raw_app_meta_data ? 'role') then
    new.raw_app_meta_data = jsonb_set(
      coalesce(new.raw_app_meta_data, '{}'::jsonb),
      '{role}',
      to_jsonb('patient'),
      true
    );
  end if;

  return new;
end;
$$;

drop trigger if exists trg_assign_role_from_metadata on auth.users;

create trigger trg_assign_role_from_metadata
before insert on auth.users
for each row
execute function public.assign_role_from_metadata();

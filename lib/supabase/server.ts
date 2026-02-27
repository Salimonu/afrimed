import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name) {
        return cookieStore.get(name)?.value;
      },
      set(name, value, options) {
        cookieStore.set({ name, value, ...options });
      },
      remove(name, options) {
        cookieStore.set({ name, value: "", ...options, maxAge: 0 });
      },
    },
  });
}

export async function createServerComponentClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    cookies: {
      get(name) {
        return cookieStore.get(name)?.value;
      },
      set() {
        // Server Components cannot modify cookies.
      },
      remove() {
        // Server Components cannot modify cookies.
      },
    },
  });
}

// for clinical schema
export async function createServerComponentClientClinical() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    db:{schema: 'clinical'},
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    cookies: {
      get(name) {
        return cookieStore.get(name)?.value;
      },
      set() {
        // Server Components cannot modify cookies.
      },
      remove() {
        // Server Components cannot modify cookies.
      },
    },
  });
}

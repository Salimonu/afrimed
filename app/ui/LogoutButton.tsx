"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/auth";
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="rounded-full border border-slate-300 px-4 py-2 text-slate-700 transition hover:border-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isLoading ? "Signing out..." : "Log out"}
    </button>
  );
}

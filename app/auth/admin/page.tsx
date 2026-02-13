"use client";

import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Mode = "sign-in" | "sign-up";

export default function AdminAuth() {
  const supabase = useMemo(() => createClient(), []);
  const [mode, setMode] = useState<Mode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  async function redirectByRole() {
    const { data } = await supabase.auth.getUser();
    const role =
      (data.user?.app_metadata?.role as string | undefined) ??
      (data.user?.user_metadata?.role as string | undefined);

    if (role === "patient") {
      window.location.href = "/patient";
      return;
    }

    if (role === "clinician") {
      window.location.href = "/clinician";
      return;
    }

    window.location.href = "/admin";
  }

  async function handleSubmit() {
    setStatus("loading");
    setMessage(null);

    const action =
      mode === "sign-in"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({
            email,
            password,
            options: { data: { role: "admin" } },
          });

    const { data, error } = await action;

    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    if (mode === "sign-up") {
      await supabase.auth.updateUser({ data: { role: "admin" } });
      if (!data.session) {
        setToast(
          "Check your email to confirm your account before signing in."
        );
        setStatus("idle");
        return;
      }
    }

    await redirectByRole();
  }

  return (
    <div className="page-surface min-h-screen text-slate-900">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 pb-16 pt-12 sm:px-10">
        <header className="glass-panel rounded-3xl p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Admin access
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">
            Hospital command login
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Restricted to authorized hospital administrators.
          </p>
        </header>

        <section className="glass-panel rounded-3xl p-8">
          <div className="flex gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            {(["sign-in", "sign-up"] as const).map((item) => (
              <button
                key={item}
                onClick={() => setMode(item)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition ${
                  mode === item
                    ? "bg-slate-900 text-white"
                    : "border border-slate-200 bg-white/80 text-slate-600 hover:border-slate-900"
                }`}
              >
                {item === "sign-in" ? "Sign in" : "Request access"}
              </button>
            ))}
          </div>

          <label className="mt-6 block text-xs uppercase tracking-[0.3em] text-slate-500">
            Email
          </label>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="admin@hospital.com"
            className="mt-3 w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
          />

          <label className="mt-6 block text-xs uppercase tracking-[0.3em] text-slate-500">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            className="mt-3 w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
          />

          <button
            onClick={handleSubmit}
            disabled={!email || !password || status === "loading"}
            className="mt-6 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {status === "loading"
              ? "Processing..."
              : mode === "sign-in"
              ? "Sign in"
              : "Request access"}
          </button>

          {message && (
            <p className="mt-4 text-sm text-slate-600">{message}</p>
          )}
        </section>
        {toast && (
          <div className="fixed bottom-6 right-6 rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 text-xs font-semibold text-slate-700 shadow-lg">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}

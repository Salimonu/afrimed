"use client";

import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Status = "idle" | "sending" | "sent" | "verifying" | "verified" | "error";

export default function PatientAuth() {
  const supabase = useMemo(() => createClient(), []);
  const [identifier, setIdentifier] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  const isEmail = identifier.includes("@");
  const isPhone = identifier.length > 6 && !isEmail;

  async function handleSend() {
    setStatus("sending");
    setMessage(null);

    const { error } = await supabase.auth.signInWithOtp(
      isEmail
        ? { email: identifier, options: { emailRedirectTo: "/auth/callback" } }
        : { phone: identifier }
    );

    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    setStatus("sent");
    setMessage(
      isEmail
        ? "Check your email for the sign-in link."
        : "OTP sent via SMS. Enter the code to continue."
    );
  }

  async function handleVerify() {
    if (!isPhone) return;
    setStatus("verifying");
    setMessage(null);

    const { error } = await supabase.auth.verifyOtp({
      phone: identifier,
      token: code,
      type: "sms",
    });

    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    setStatus("verified");
    setMessage("Verified. Redirecting to your patient dashboard.");
    window.location.href = "/patient";
  }

  return (
    <div className="page-surface min-h-screen text-slate-900">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 pb-16 pt-12 sm:px-10">
        <header className="glass-panel rounded-3xl p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Patient access
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">
            Sign in with OTP
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Use your email for a magic link or your phone for an SMS code.
          </p>
        </header>

        <section className="glass-panel rounded-3xl p-8">
          <label className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Email or phone
          </label>
          <input
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            placeholder="email@example.com or +234..."
            className="mt-3 w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
          />

          <button
            onClick={handleSend}
            disabled={!identifier || status === "sending"}
            className="mt-5 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {status === "sending" ? "Sending..." : "Send OTP / Link"}
          </button>

          {isPhone && status !== "idle" && (
            <div className="mt-6">
              <label className="text-xs uppercase tracking-[0.3em] text-slate-500">
                Enter SMS code
              </label>
              <input
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="123456"
                className="mt-3 w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
              />
              <button
                onClick={handleVerify}
                disabled={!code || status === "verifying"}
                className="mt-4 w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-900 disabled:cursor-not-allowed"
              >
                {status === "verifying" ? "Verifying..." : "Verify code"}
              </button>
            </div>
          )}

          {message && (
            <p className="mt-4 text-sm text-slate-600">{message}</p>
          )}
        </section>
      </div>
    </div>
  );
}

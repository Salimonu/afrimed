"use client";

import { useMemo } from "react";

const roles = [
  {
    key: "patient",
    title: "Patient access",
    description: "Login with email or phone OTP.",
    href: "/auth/patient",
  },
  {
    key: "clinician",
    title: "Clinician access",
    description: "Login with email and password.",
    href: "/auth/clinician",
  },
  {
    key: "admin",
    title: "Hospital admin",
    description: "Secure email and password access.",
    href: "/auth/admin",
  },
];

export default function AuthLanding() {
  const today = useMemo(() => new Date(), []);

  return (
    <div className="page-surface min-h-screen text-slate-900">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 pb-16 pt-12 sm:px-10">
        <header className="glass-panel rounded-3xl p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Afrimed access
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">
            Choose your portal
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Secure sign-in for patients, clinicians, and hospital administrators.
          </p>
          <p className="mt-6 text-xs text-slate-500">
            {today.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {roles.map((role) => (
            <a
              key={role.key}
              href={role.href}
              className="glass-panel rounded-3xl p-6 transition hover:-translate-y-1 hover:border-slate-300"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                {role.key}
              </p>
              <h2 className="mt-3 text-xl font-semibold text-slate-900">
                {role.title}
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                {role.description}
              </p>
              <div className="mt-6 inline-flex rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white">
                Continue
              </div>
            </a>
          ))}
        </section>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";

type PatientErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function PatientError({ error, reset }: PatientErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const rawMessage = `${error?.message ?? ""} ${error?.digest ?? ""}`.toLowerCase();
  const isNetworkIssue =
    rawMessage.includes("failed to fetch") ||
    rawMessage.includes("fetch failed") ||
    rawMessage.includes("network") ||
    rawMessage.includes("timeout") ||
    rawMessage.includes("und_err_connect_timeout");

  return (
    <section className="glass-panel rounded-3xl p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Something went wrong</p>
      <h2 className="mt-2 text-xl font-semibold text-slate-900">
        {isNetworkIssue ? "Connection issue detected" : "Unable to load this page"}
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        {isNetworkIssue
          ? "Your internet connection appears unstable. Please check your network and try again."
          : "An unexpected error occurred. Please try again."}
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-2xl bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Retry
        </button>
        <a
          href="/patient"
          className="rounded-2xl border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-900"
        >
          Reload page
        </a>
      </div>
    </section>
  );
}

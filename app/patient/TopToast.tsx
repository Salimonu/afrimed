"use client";

import { useEffect, useState } from "react";

type TopToastProps = {
  message: string;
  type: "success" | "error";
  durationMs?: number;
};

export default function TopToast({
  message,
  type,
  durationMs = 4500,
}: TopToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const timeout = window.setTimeout(() => setVisible(false), durationMs);
    return () => window.clearTimeout(timeout);
  }, [message, durationMs]);

  if (!visible || !message) return null;

  const toneClass =
    type === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : "border-rose-200 bg-rose-50 text-rose-700";

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-100 flex justify-center px-6">
      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-auto w-full max-w-2xl rounded-2xl border px-8 py-10 text-xl shadow-lg ${toneClass}`}
      >
        {message}
      </div>
    </div>
  );
}

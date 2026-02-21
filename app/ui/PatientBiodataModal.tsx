"use client";

import { useState } from "react";
import PatientBiodataForm from "../patient/PatientBiodataForm";

export default function PatientBiodataModal() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-gradient-to-r from-white to-slate-50 px-4 py-3">
        <p className="text-sm text-slate-600">
          Review your details and keep your records complete.
        </p>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          {open ? "Close biodata form" : "Update biodata"}
        </button>
      </div>

      {open && (
        <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-2 shadow-sm">
          <PatientBiodataForm />
        </div>
      )}
    </div>
  );
}

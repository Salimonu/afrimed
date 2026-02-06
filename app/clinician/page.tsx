import AppShell from "../ui/AppShell";

export default function ClinicianDashboard() {
  return (
    <AppShell
      role="clinician"
      title="Dr. Adebayo’s virtual clinic"
      subtitle="Manage your queue, consult rooms, and EMR-lite notes in one place."
    >
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel rounded-3xl p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  Live queue
                </p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">
                  6 patients waiting
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Average wait time 11 minutes
                </p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700">
                On schedule
              </span>
            </div>
            <div className="mt-6 grid gap-4">
              {[
                ["Amal Adebayo", "Follow-up • BP review", "Next"],
                ["Sade Ojo", "New consult • Chest pain", "Waiting"],
                ["Musa Bello", "Lab results • Diabetes", "Waiting"],
              ].map((item) => (
                <div
                  key={item[0]}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {item[0]}
                    </p>
                    <p className="text-xs text-slate-600">{item[1]}</p>
                  </div>
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                    {item[2]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Today’s schedule
            </p>
            <div className="mt-4 grid gap-3">
              {[
                ["09:30 AM", "Video consult", "Cardiology"],
                ["11:00 AM", "In-person follow-up", "Ward B"],
                ["02:00 PM", "Virtual triage", "General"],
              ].map((item) => (
                <div
                  key={item[0]}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
                >
                  <p className="text-sm font-semibold text-slate-900">
                    {item[0]} • {item[1]}
                  </p>
                  <p className="text-xs text-slate-600">{item[2]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      <section className="grid gap-6 lg:grid-cols-3">
          <div className="glass-panel rounded-3xl p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              EMR-lite notes
            </p>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <div className="flex items-center justify-between">
                <span>Drafts</span>
                <span className="font-semibold text-slate-900">5</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Pending signatures</span>
                <span className="font-semibold text-slate-900">2</span>
              </div>
              <button className="mt-2 w-full rounded-2xl bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800">
                Review drafts
              </button>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Chat & follow-ups
            </p>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              {[
                ["New message", "Nurse Tola • Care escalation"],
                ["Follow-up", "Amal Adebayo • Medication check"],
                ["Care plan", "Sade Ojo • Lab request"],
              ].map((item) => (
                <div
                  key={item[0]}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
                >
                  <p className="text-sm font-semibold text-slate-900">
                    {item[0]}
                  </p>
                  <p className="text-xs text-slate-600">{item[1]}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Prescriptions
            </p>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <div className="flex items-center justify-between">
                <span>Pending approvals</span>
                <span className="font-semibold text-slate-900">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Submitted today</span>
                <span className="font-semibold text-slate-900">7</span>
              </div>
              <button className="mt-2 w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-2 text-slate-700 transition hover:border-slate-900">
                Review requests
              </button>
            </div>
          </div>
        </section>

      <section className="glass-panel rounded-3xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Shift overview
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">
              Coverage and handoff summary
            </h2>
          </div>
          <button className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:border-slate-900">
            Send handoff note
          </button>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Ward A", "2 clinicians online"],
            ["Ward B", "3 clinicians online"],
            ["Emergency", "On-call coverage active"],
          ].map((item) => (
            <div
              key={item[0]}
              className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3"
            >
              <p className="text-sm font-semibold text-slate-900">
                {item[0]}
              </p>
              <p className="text-xs text-slate-600">{item[1]}</p>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

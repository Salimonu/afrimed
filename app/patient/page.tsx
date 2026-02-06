import AppShell from "../ui/AppShell";

export default function PatientDashboard() {
  return (
    <AppShell
      role="patient"
      title="Welcome back, Chioma."
      subtitle="Your next visit is confirmed and your care team is ready."
    >
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-panel rounded-3xl p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  Upcoming appointment
                </p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">
                  Video consult with Dr. Abiola
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Friday • 09:30 AM • Cardiology follow-up
                </p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700">
                Confirmed
              </span>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                ["Queue position", "#03"],
                ["Estimated wait", "8 mins"],
                ["Payment status", "Paid"],
              ].map((item) => (
                <div
                  key={item[0]}
                  className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700"
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                    {item[0]}
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {item[1]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Care inbox
            </p>
            <div className="mt-4 grid gap-3">
              {[
                ["Lab results ready", "Review your cholesterol panel"],
                ["Nurse follow-up", "How is your medication routine?"],
                ["Care plan update", "New diet guidance available"],
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
        </section>

      <section className="grid gap-6 lg:grid-cols-3">
          <div className="glass-panel rounded-3xl p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Health summary
            </p>
            <div className="mt-4 grid gap-3 text-sm text-slate-700">
              <div className="flex items-center justify-between">
                <span>Blood pressure</span>
                <span className="font-semibold text-slate-900">118/74</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Medications</span>
                <span className="font-semibold text-slate-900">3 active</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Allergies</span>
                <span className="font-semibold text-slate-900">None</span>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Payments
            </p>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <div className="flex items-center justify-between">
                <span>Last invoice</span>
                <span className="font-semibold text-slate-900">₦12,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Next visit</span>
                <span className="font-semibold text-emerald-600">Paid</span>
              </div>
              <button className="mt-2 w-full rounded-2xl bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800">
                View billing history
              </button>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Quick actions
            </p>
            <div className="mt-4 grid gap-3 text-sm">
              {[
                "Request prescription refill",
                "Message care team",
                "Share records with specialist",
              ].map((item) => (
                <button
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-2 text-left text-slate-700 transition hover:border-slate-900"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </section>

      <section className="glass-panel rounded-3xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Care team
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">
              Your clinicians across every visit
            </h2>
          </div>
          <button className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:border-slate-900">
            Manage access
          </button>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Dr. Abiola", "Cardiology"],
            ["Nurse Tola", "Care coordination"],
            ["Dr. Mensah", "Internal medicine"],
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

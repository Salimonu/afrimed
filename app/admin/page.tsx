import AppShell from "../ui/AppShell";

export default function AdminDashboard() {
  return (
    <AppShell
      role="admin"
      title="Afrimed operations command center"
      subtitle="Monitor services, staffing, and revenue across all care lines."
    >
      <section className="grid gap-6 lg:grid-cols-3">
          {[
            ["Virtual visits", "328 this week", "+18%"],
            ["Payments collected", "₦12.4M", "+11%"],
            ["Average wait time", "9 mins", "-2 mins"],
          ].map((item) => (
            <div key={item[0]} className="glass-panel rounded-3xl p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                {item[0]}
              </p>
              <p className="mt-3 text-2xl font-semibold text-slate-900">
                {item[1]}
              </p>
              <p className="mt-2 text-sm text-emerald-600">{item[2]}</p>
            </div>
          ))}
        </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="glass-panel rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  Department coverage
                </p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">
                  Staffing and queue health
                </h2>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700">
                Stable
              </span>
            </div>
            <div className="mt-6 grid gap-4">
              {[
                ["Cardiology", "4 clinicians online", "Queue 12 mins"],
                ["Pediatrics", "3 clinicians online", "Queue 9 mins"],
                ["General medicine", "6 clinicians online", "Queue 7 mins"],
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
              Access & compliance
            </p>
            <div className="mt-4 grid gap-3">
              {[
                ["Role-based access", "228 active users"],
                ["Audit logs", "14 alerts this week"],
                ["Consent management", "97% signed"],
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
              Service lines
            </p>
            <div className="mt-4 grid gap-3 text-sm text-slate-700">
              {[
                ["Tele-cardiology", "118 visits"],
                ["Tele-dermatology", "74 visits"],
                ["Tele-mental health", "92 visits"],
              ].map((item) => (
                <div
                  key={item[0]}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/80 px-4 py-3"
                >
                  <span>{item[0]}</span>
                  <span className="font-semibold text-slate-900">
                    {item[1]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Finance queue
            </p>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <div className="flex items-center justify-between">
                <span>Invoices pending</span>
                <span className="font-semibold text-slate-900">21</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Reconciliation</span>
                <span className="font-semibold text-slate-900">87%</span>
              </div>
              <button className="mt-2 w-full rounded-2xl bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800">
                Open billing console
              </button>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              System health
            </p>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <div className="flex items-center justify-between">
                <span>Uptime</span>
                <span className="font-semibold text-slate-900">99.98%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Active video rooms</span>
                <span className="font-semibold text-slate-900">38</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Data sync latency</span>
                <span className="font-semibold text-emerald-600">Low</span>
              </div>
            </div>
          </div>
        </section>

      <section className="glass-panel rounded-3xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Role management
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">
              Control access for clinicians, staff, and vendors
            </h2>
          </div>
          <button className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:border-slate-900">
            Invite user
          </button>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Clinical admin", "12 users", "Full access"],
            ["Nursing lead", "24 users", "Care operations"],
            ["Finance", "8 users", "Billing access"],
          ].map((item) => (
            <div
              key={item[0]}
              className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3"
            >
              <p className="text-sm font-semibold text-slate-900">
                {item[0]}
              </p>
              <p className="text-xs text-slate-600">
                {item[1]} • {item[2]}
              </p>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

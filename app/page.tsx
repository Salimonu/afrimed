export default function Home() {
  return (
    <div className="page-surface min-h-screen text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 pb-24 pt-10 sm:px-10">
        <nav className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold uppercase tracking-[0.3em] text-white">
              Af
            </div>
            <div>
              <p className="text-xl font-semibold">Afrimed</p>
              <p className="text-sm text-slate-600">
                Telemedicine for hospital networks
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm font-medium">
            <button className="rounded-full border border-slate-300 px-4 py-2 text-slate-700 transition hover:border-slate-900">
              Request demo
            </button>
            <a
              className="rounded-full bg-slate-900 px-5 py-2 text-white transition hover:bg-slate-800"
              href="/clinician"
            >
              Launch platform
            </a>
          </div>
        </nav>

        <section className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-8">
            <p className="fade-up inline-flex w-fit items-center gap-3 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-700 shadow-sm">
              Built for clinics and hospitals
            </p>
            <div className="space-y-5">
              <h1
                className="fade-up text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl"
                style={{ animationDelay: "120ms" }}
              >
                Unified telemedicine for patients, clinicians, and hospital
                admins.
              </h1>
              <p
                className="fade-up text-lg leading-8 text-slate-600"
                style={{ animationDelay: "200ms" }}
              >
                Afrimed connects video visits, secure chat, scheduling,
                payments, and EMR-lite records into one workflow. Built for web,
                PWA, and native mobile so every team member stays aligned in
                real time.
              </p>
            </div>
            <div
              className="fade-up flex flex-wrap gap-4 text-sm font-semibold"
              style={{ animationDelay: "280ms" }}
            >
              <a
                className="rounded-full bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-800"
                href="/admin"
              >
                Build the MVP
              </a>
              <a
                className="rounded-full border border-slate-300 px-6 py-3 text-slate-700 transition hover:border-slate-900"
                href="/patient"
              >
                View modules
              </a>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="fade-up" style={{ animationDelay: "340ms" }}>
                <p className="text-2xl font-semibold text-slate-900">24/7</p>
                <p className="text-sm text-slate-600">
                  Always-on virtual care
                </p>
              </div>
              <div className="fade-up" style={{ animationDelay: "420ms" }}>
                <p className="text-2xl font-semibold text-slate-900">3x</p>
                <p className="text-sm text-slate-600">Faster visit intake</p>
              </div>
              <div className="fade-up" style={{ animationDelay: "500ms" }}>
                <p className="text-2xl font-semibold text-slate-900">99.9%</p>
                <p className="text-sm text-slate-600">Secure access uptime</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-10 top-8 h-36 w-36 rounded-full bg-cyan-300/40 blur-3xl" />
            <div className="absolute bottom-4 right-0 h-40 w-40 rounded-full bg-amber-200/50 blur-3xl" />
            <div className="glass-panel relative space-y-6 rounded-3xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    Live consult
                  </p>
                  <p className="text-lg font-semibold text-slate-900">
                    Cardiologist room 2
                  </p>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Online
                </span>
              </div>
              <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Patient</span>
                  <span className="font-semibold text-slate-900">
                    Amal Adebayo
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Queue position</span>
                  <span className="font-semibold text-slate-900">#02</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Visit type</span>
                  <span className="font-semibold text-slate-900">Follow-up</span>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-900 px-4 py-3 text-white">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/70">
                    Next action
                  </p>
                  <p className="text-sm font-semibold">Start call</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                    Secure note
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    EMR-lite entry
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                <span>Bandwidth optimized</span>
                <span className="font-semibold text-slate-900">Adaptive HD</span>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Patient access",
              body: "Book visits, join video calls, receive care plans, and pay from any device.",
            },
            {
              title: "Clinician control",
              body: "Manage queues, chart securely, and shift between virtual and in-person care.",
            },
            {
              title: "Hospital oversight",
              body: "Centralize staff schedules, service lines, and operational analytics.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="glass-panel fade-up rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {card.body}
              </p>
            </div>
          ))}
        </section>

        <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Core workflow
            </p>
            <h2 className="text-3xl font-semibold text-slate-900">
              From appointment to follow-up in one flow.
            </h2>
            <p className="text-base leading-7 text-slate-600">
              Every visit is mapped to a secure timeline with intake, triage,
              visit notes, prescriptions, and billing. Patients and clinicians
              stay in sync without switching tools.
            </p>
          </div>
          <div className="grid gap-5">
            {[
              {
                title: "Smart scheduling",
                body: "Auto-assign based on specialty, availability, and queue priority.",
              },
              {
                title: "Virtual visit room",
                body: "Video calls, vitals capture, and in-visit chat in one screen.",
              },
              {
                title: "EMR-lite handoff",
                body: "Instant notes, prescriptions, and follow-up tasks shared securely.",
              },
            ].map((step, index) => (
              <div
                key={step.title}
                className="glass-panel rounded-2xl p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-white">
                    0{index + 1}
                  </span>
                  <h3 className="text-base font-semibold text-slate-900">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Modules for v1
            </p>
            <h2 className="text-3xl font-semibold text-slate-900">
              Everything your hospital needs to go live quickly.
            </h2>
            <div className="grid gap-4">
              {[
                "Video calls with low-bandwidth optimization",
                "Secure clinician-patient chat with file sharing",
                "Appointment scheduling, triage, and queue management",
                "EMR-lite: history, visit notes, prescriptions, follow-ups",
                "Payments, invoices, and visit bundles",
                "Hospital admin dashboard and role management",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-700"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-100 text-cyan-700">
                    ✓
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="glass-panel float-slow rounded-3xl p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                Admin command center
              </p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">
                Hospital operations overview
              </h3>
              <div className="mt-6 grid gap-4">
                {[
                  ["Clinician coverage", "92% staffed today"],
                  ["Queue wait time", "12 mins avg"],
                  ["Payments collected", "₦4.2M this week"],
                ].map((row) => (
                  <div
                    key={row[0]}
                    className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm text-slate-700"
                  >
                    <span>{row[0]}</span>
                    <span className="font-semibold text-slate-900">
                      {row[1]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-panel rounded-3xl p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                Security & access
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  "Role-based access control",
                  "Audit trails for every action",
                  "Encrypted storage & transfer",
                  "Consent-based record sharing",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="glass-panel rounded-3xl p-10">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                Built for every screen
              </p>
              <h2 className="text-3xl font-semibold text-slate-900">
                Web, PWA, and native mobile experiences in sync.
              </h2>
              <p className="text-base leading-7 text-slate-600">
                A single design system powers browser, installable PWA, and
                React Native builds. Clinicians can shift between stations while
                patients get a fast, reliable mobile experience.
              </p>
            </div>
            <div className="grid gap-3">
              {[
                "Offline-friendly PWA for patient follow-ups",
                "Native mobile for in-clinic rounds and on-call",
                "Unified notifications across devices",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Launch plan
            </p>
            <h2 className="text-3xl font-semibold text-slate-900">
              Ready to design the MVP with your team.
            </h2>
            <p className="text-base leading-7 text-slate-600">
              We can map user roles, confirm workflows, and start building the
              web foundation while preparing the mobile builds.
            </p>
          </div>
          <div className="grid gap-4">
            {[
              "Discovery workshop with hospital leadership",
              "UX flows for patient, clinician, and admin roles",
              "MVP build with staged rollout and analytics",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700"
              >
                <span>{item}</span>
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Week {item.startsWith("Discovery") ? "1" : item.startsWith("UX") ? "2" : "3-6"}
                </span>
              </div>
            ))}
          </div>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500">
          <p>© 2026 Afrimed. Secure telemedicine for modern hospitals.</p>
          <div className="flex items-center gap-4">
            <span>Security</span>
            <span>Support</span>
            <span>Contact</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

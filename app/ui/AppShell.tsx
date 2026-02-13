import LogoutButton from "./LogoutButton";

type AppShellProps = {
  role: "patient" | "clinician" | "admin";
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

const roleLabels: Record<AppShellProps["role"], string> = {
  patient: "Patient portal",
  clinician: "Clinician workspace",
  admin: "Hospital admin",
};

const navByRole: Record<AppShellProps["role"], { label: string; href: string }[]> =
  {
    patient: [
      { label: "Dashboard", href: "/patient" },
      { label: "Appointments", href: "/patient" },
      { label: "Messages", href: "/patient" },
      { label: "Payments", href: "/patient" },
      { label: "Records", href: "/patient" },
    ],
    clinician: [
      { label: "Queue", href: "/clinician" },
      { label: "Schedule", href: "/clinician" },
      { label: "EMR-lite", href: "/clinician" },
      { label: "Messages", href: "/clinician" },
      { label: "Analytics", href: "/clinician" },
    ],
    admin: [
      { label: "Overview", href: "/admin" },
      { label: "Departments", href: "/admin" },
      { label: "Staffing", href: "/admin" },
      { label: "Billing", href: "/admin" },
      { label: "Access", href: "/admin" },
    ],
  };

export default function AppShell({
  role,
  title,
  subtitle,
  children,
}: AppShellProps) {
  return (
    <div className="page-surface min-h-screen text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl gap-6 px-6 pb-16 pt-10 sm:px-10">
        <aside className="hidden w-64 flex-col gap-8 lg:flex">
          <div className="glass-panel rounded-3xl p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                Af
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Afrimed</p>
                <p className="text-xs text-slate-500">{roleLabels[role]}</p>
              </div>
            </div>
          </div>
          <div className="glass-panel rounded-3xl p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Navigation
            </p>
            <nav className="mt-4 grid gap-2 text-sm">
              {navByRole[role].map((item, index) => (
                <a
                  key={item.label}
                  className={`rounded-2xl px-4 py-2 transition ${
                    index === 0
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:bg-white/70"
                  }`}
                  href={item.href}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="glass-panel rounded-3xl p-5 text-sm text-slate-600">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Role switcher
            </p>
            <div className="mt-4 grid gap-2">
              {(["patient", "clinician", "admin"] as const).map((item) => (
                <a
                  key={item}
                  className={`rounded-2xl px-4 py-2 text-sm transition ${
                    item === role
                      ? "bg-slate-900 text-white"
                      : "border border-slate-200 bg-white/80 text-slate-700 hover:border-slate-900"
                  }`}
                  href={`/${item}`}
                >
                  {roleLabels[item]}
                </a>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex-1 space-y-8">
          <header className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                {roleLabels[role]}
              </p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">
                {title}
              </h1>
              <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm font-semibold">
              <button className="rounded-full border border-slate-300 px-4 py-2 text-slate-700 transition hover:border-slate-900">
                Support
              </button>
              <button className="rounded-full bg-slate-900 px-5 py-2 text-white transition hover:bg-slate-800">
                Start session
              </button>
              <LogoutButton />
            </div>
          </header>

          {children}
        </main>
      </div>
    </div>
  );
}

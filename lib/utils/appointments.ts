export function getSingleRelation<T>(value: T | T[] | null): T | null {
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
}

export function formatAppointmentDate(value: string | null): string {
  if (!value) return "Date not set";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatAppointmentTime(value: string | null): string {
  if (!value) return "Time not set";
  const date = new Date(`1970-01-01T${value}`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function formatAppointmentType(value: string | null): string {
  if (!value) return "General";
  const normalized = value.trim().toLowerCase();
  const labels: Record<string, string> = {
    physical: "Physical",
    video: "Video",
    chat: "Chat",
  };
  return labels[normalized] ?? value;
}

export function getStatusBadgeClass(status: string | null): string {
  const normalized = status?.toLowerCase() ?? "";
  if (normalized === "confirmed") return "bg-emerald-500/10 text-emerald-700";
  if (normalized === "pending") return "bg-amber-500/10 text-amber-700";
  if (normalized === "cancelled") return "bg-rose-500/10 text-rose-700";
  return "bg-slate-500/10 text-slate-700";
}

export function formatDateTime(value: string | null): string {
  if (!value) return "Date not set";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}
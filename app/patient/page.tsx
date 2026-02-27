export const dynamic = "force-dynamic";

import AppShell from "../ui/AppShell";
import PatientBiodataModal from "../ui/PatientBiodataModal";
import TopToast from "./TopToast";
import { PatientDashboardProps, AppointmentWithRelations, ConsultationWithRelations } from "../../types/clinical";
import { createServerComponentClientClinical } from "@/lib/supabase/server";
import { getPatientDashboardData } from "@/lib/services/patient.service";
import { getAppointmentsConsultationsData } from "@/lib/services/patient.service";
import { getClinicianData } from "@/lib/services/patient.service";
import UpcomingAppointments from "./components/UpcomingAppointments";
import PrescriptionsList from "./components/PrescriptionsList";
import BookAppointmentForm from "./components/BookAppointmentForm";


export default async function PatientDashboard({
  searchParams,
}: PatientDashboardProps) {
  const supabase = await createServerComponentClientClinical();
  const { data: userData } = await supabase.auth.getUser();
  
  const userId = userData.user?.id;

  const query = searchParams ? await searchParams : undefined;
  const appointmentToast = query?.booking === "success"
    ? { type: "success" as const, message: "Appointment request submitted successfully." }
    : query?.error
      ? { type: "error" as const, message: query.error.replace(/\+/g, " ") }
      : null;

  let firstName = "Patient";
  let patientId: string | null = null;
  
  if (userId) {
    const patientData = await getPatientDashboardData(userId);
    if (patientData?.first_name) firstName = patientData.first_name;
    if (patientData?.id) patientId = String(patientData.id);
  }

  let upcomingAppointments: AppointmentWithRelations[] = [];
  let consultations: ConsultationWithRelations[] = [];

  if (patientId) {
    const {appointmentsResult, consultationsResult} = await getAppointmentsConsultationsData(patientId);
    upcomingAppointments = appointmentsResult.data ?? [];
    consultations = consultationsResult.data ?? [];
  }

  const clinicianData =await getClinicianData();
  const clinicians = (clinicianData ?? [])
    .filter((row) => row.is_available !== false)
    .map((row) => {
      if (!row.id) return null;

      const displayName = [row.first_name, row.last_name]
        .filter(
          (part): part is string =>
            typeof part === "string" && part.trim().length > 0
        )
        .join(" ")
        .trim();

      const fallbackName = `Clinician ${row.id}`;

      const specialty =
        typeof row.specialization === "string"
          ? row.specialization.trim()
          : "";

      const hospitalName =
        row.hospitals && typeof row.hospitals.name === "string"
          ? row.hospitals.name
          : "Unknown Hospital";

      return {
        id: String(row.id),
        label: `${displayName || fallbackName}${
          specialty ? ` - ${specialty}` : ""
        } (${hospitalName})`,
      };
    })
    .filter((row): row is { id: string; label: string } => Boolean(row));

  return (
    <AppShell
      role="patient"
      title={`Welcome back, ${firstName}.`}
      subtitle="Your next visit is confirmed and your care team is ready."
    >
      {appointmentToast && (
        <TopToast type={appointmentToast.type} message={appointmentToast.message} />
      )}
      <section className="glass-panel rounded-3xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Biodata reminder
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">
              Keep your biodata current for faster care.
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Update your personal details to help your care team serve you better.
            </p>
          </div>
        </div>
        <PatientBiodataModal />
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <UpcomingAppointments upcomingAppointments={upcomingAppointments}/>
        <BookAppointmentForm clinicians={clinicians}/>
        <PrescriptionsList consultations={consultations}/>
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

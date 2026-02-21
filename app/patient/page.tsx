import AppShell from "../ui/AppShell";
import PatientBiodataModal from "../ui/PatientBiodataModal";
import BookAppointmentSubmitButton from "./BookAppointmentSubmitButton";
import { createServerComponentClientClinical } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

type PatientDashboardProps = {
  searchParams?: Promise<{
    booking?: "success";
    error?: string;
  }>;
};

type ClinicianWithHospital = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  specialization: string | null;
  is_available: boolean | null;
  hospitals: {
    id: string;
    name: string;
  } | null;
};

async function bookAppointment(formData: FormData) {
  "use server";

  try {
    const supabase = await createServerComponentClientClinical();
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;

    if (!userId) {
      redirect("/patient?error=Please+sign+in+to+book+an+appointment.");
    }

    const appointmentDate = String(formData.get("appointment_date") ?? "").trim();
    const appointmentTime = String(formData.get("appointment_time") ?? "").trim();
    const appointmentType = String(formData.get("appointment_type") ?? "").trim();
    const clinicianId = String(formData.get("clinician_id") ?? "").trim();

    if (!appointmentDate || !appointmentTime || !appointmentType || !clinicianId) {
      redirect("/patient?error=Clinician,+type,+date,+and+time+are+required.");
    }

    if (!["physical", "chat", "video"].includes(appointmentType)) {
      redirect("/patient?error=Invalid+appointment+type.");
    }

    const { data: patientData, error: patientError } = await supabase
      .schema("clinical")
      .from("patients")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle();

    if (patientError) {
      redirect(`/patient?error=${encodeURIComponent(patientError.message)}`);
    }

    const patientId = patientData?.id;
    if (!patientId) {
      redirect("/patient?error=Complete+your+biodata+before+booking+an+appointment.");
    }

    const { data: clinicianData, error: clinicianError } = await supabase
      .schema("clinical")
      .from("clinicians")
      .select("id, hospital_id")
      .eq("id", clinicianId)
      .maybeSingle();

    if (clinicianError) {
      redirect(`/patient?error=${encodeURIComponent(clinicianError.message)}`);
    }

    const hospitalId = clinicianData?.hospital_id;
    if (!hospitalId) {
      redirect("/patient?error=Selected+clinician+is+not+assigned+to+a+hospital.");
    }

    const { error } = await supabase.schema("clinical").from("appointments").insert([
      {
        patient_id: patientId,
        clinician_id: clinicianId,
        hospital_id: hospitalId,
        appointment_type: appointmentType,
        appointment_date: appointmentDate,
        appointment_time: appointmentTime,
        status: "pending",
      },
    ]);

    if (error) {
      redirect(`/patient?error=${encodeURIComponent(error.message)}`);
    }
  } catch (error) {
    const err = error as { message?: string; digest?: string; code?: string; cause?: { code?: string; message?: string } };
    const message = typeof err?.message === "string" ? err.message : "";
    const causeMessage = typeof err?.cause?.message === "string" ? err.cause.message : "";
    const digest = typeof err?.digest === "string" ? err.digest : "";
    const code = typeof err?.code === "string" ? err.code : "";
    const causeCode = typeof err?.cause?.code === "string" ? err.cause.code : "";
    const isRedirectError = digest.startsWith("NEXT_REDIRECT") || message.includes("NEXT_REDIRECT");

    if (isRedirectError) {
      throw error;
    }

    const isConnectionIssue =
      /fetch failed|failed to fetch|network|timed out|timeout|econn|enotfound|econnreset|socket/i.test(message) ||
      /fetch failed|failed to fetch|network|timed out|timeout|econn|enotfound|econnreset|socket/i.test(causeMessage) ||
      /UND_ERR_CONNECT_TIMEOUT|ETIMEDOUT|ECONNRESET|ENOTFOUND/i.test(code) ||
      /UND_ERR_CONNECT_TIMEOUT|ETIMEDOUT|ECONNRESET|ENOTFOUND/i.test(causeCode);

    const friendlyMessage = isConnectionIssue
      ? "Unable to reach the server due to poor internet connection. Please try again."
      : "Unable to book appointment at the moment. Please try again.";

    redirect(`/patient?error=${encodeURIComponent(friendlyMessage)}`);
  }

  redirect("/patient?booking=success");
}


export default async function PatientDashboard({
  searchParams,
}: PatientDashboardProps) {
  const supabase = await createServerComponentClientClinical();
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  const query = searchParams ? await searchParams : undefined;

  let firstName = "Patient";
  if (userId) {
    // Fetch patient from clinical schema
    const { data: patientData, error: patientError } = await supabase
      .from("patients") // specify schema.table here
      .select("first_name")
      .eq("user_id", userId)
      .maybeSingle();

    if (patientError) console.log("Supabase Error:", patientError);
    if (patientData?.first_name) firstName = patientData.first_name;
  }
 
    const { data: clinicianData } = await supabase
  .schema("clinical")
  .from("clinicians")
  .select(`
    id,
    first_name,
    last_name,
    specialization,
    is_available,
    hospitals (
      id,
      name
    )
  `)
  .returns<ClinicianWithHospital[]>();

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

    // 🔹 Get hospital name
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
              Book new appointment
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">
              Request a new visit
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Choose your preferred date and time, then submit your request.
            </p>
            <form action={bookAppointment} className="mt-5 grid gap-4">
              <label className="text-sm text-slate-700">
                Available clinician
                <select
                  name="clinician_id"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-900"
                  defaultValue=""
                  required={clinicians.length > 0}
                  disabled={clinicians.length === 0}
                >
                  <option value="">
                    {clinicians.length > 0
                      ? "Select a clinician"
                      : "No clinicians available right now"}
                  </option>
                  {clinicians.map((clinician) => (
                    <option key={clinician.id} value={clinician.id}>
                      {clinician.label}
                       
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm text-slate-700">
                Appointment type
                <select
                  name="appointment_type"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-900"
                  defaultValue="video"
                  required
                >
                  <option value="physical">Physical</option>
                  <option value="chat">Chat</option>
                  <option value="video">Video</option>
                </select>
              </label>
              <label className="text-sm text-slate-700">
                Preferred date
                <input
                  type="date"
                  name="appointment_date"
                  min={new Date().toISOString().slice(0, 10)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-900"
                  required
                />
              </label>
              <label className="text-sm text-slate-700">
                Preferred time
                <input
                  type="time"
                  name="appointment_time"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-900"
                  required
                />
              </label>
              <div className="text-sm">
                {query?.booking === "success" && (
                  <p className="text-emerald-700">
                    Appointment request submitted successfully.
                  </p>
                )}
                {query?.error && <p className="text-rose-600">{query.error}</p>}
              </div>
              <BookAppointmentSubmitButton />
            </form>
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

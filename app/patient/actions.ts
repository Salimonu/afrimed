"use server";

import { createServerComponentClientClinical } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


export async function bookAppointment(formData: FormData) {
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
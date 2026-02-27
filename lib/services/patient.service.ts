import { createServerComponentClientClinical } from "@/lib/supabase/server";
import { AppointmentWithRelations, ConsultationWithRelations, ClinicianWithHospital } from "@/types/clinical";

export async function getPatientDashboardData(userId: string) {    
    const supabase = await createServerComponentClientClinical();

    const { data: patientData, error: patientError } = await supabase
    .schema("clinical")
    .from("patients")
    .select("id, first_name")
    .eq("user_id", userId)
    .maybeSingle();

    //TO-DO : Add Error boundary.
    if (patientError) console.log("Supabase Error:", patientError);

    return patientData;   
}

const today = new Date().toISOString().slice(0, 10);
  

export async function getAppointmentsConsultationsData(patientId: string) {
    const supabase = await createServerComponentClientClinical();
    
{
    const [appointmentsResult, consultationsResult] = await Promise.all([
          supabase
            .schema("clinical")
            .from("appointments")
            .select(
              `
                id,
                appointment_type,
                appointment_date,
                appointment_time,
                status,
                clinicians (
                  first_name,
                  last_name
                ),
                hospitals (
                  name
                )
              `
            )
            .eq("patient_id", patientId)
            .gte("appointment_date", today)
            .order("appointment_date", { ascending: true })
            .order("appointment_time", { ascending: true })
            .returns<AppointmentWithRelations[]>(),
          supabase
            .schema("clinical")
            .from("consultations")
            .select(
              `
                id,
                prescription,
                started_at,
                ended_at,
                created_at,
                appointments!inner (
                  clinicians (
                    first_name,
                    last_name
                  )
                )
              `
            )
            .eq("appointments.patient_id", patientId)
            .order("created_at", { ascending: false })
            .returns<ConsultationWithRelations[]>(),
        ]);
    
        if (appointmentsResult.error) {
          console.log("Supabase Appointments Error:", appointmentsResult.error);
        } 
        
    
        if (consultationsResult.error) {
          console.log("Supabase Consultations Error:", consultationsResult.error);
        } 
        

        return {appointmentsResult, consultationsResult}
    }
}

export async function getClinicianData() {
    const supabase = await createServerComponentClientClinical();

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

    return clinicianData;
}

export type PatientDashboardProps = {
  searchParams?: Promise<{
    booking?: "success";
    error?: string;
  }>;
};

export type ClinicianWithHospital = {
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

export type AppointmentWithRelations = {
  id: string;
  appointment_type: string | null;
  appointment_date: string | null;
  appointment_time: string | null;
  status: string | null;
  clinicians:
    | {
        first_name: string | null;
        last_name: string | null;
      }
    | Array<{
        first_name: string | null;
        last_name: string | null;
      }>
    | null;
  hospitals:
    | {
        name: string | null;
      }
    | Array<{
        name: string | null;
      }>
    | null;
};

export type ConsultationWithRelations = {
  id: string;
  prescription: string | null;
  started_at: string | null;
  ended_at: string | null;
  created_at: string | null;
  appointments:
    | {
        clinicians:
          | {
              first_name: string | null;
              last_name: string | null;
            }
          | Array<{
              first_name: string | null;
              last_name: string | null;
            }>
          | null;
      }
    | Array<{
        clinicians:
          | {
              first_name: string | null;
              last_name: string | null;
            }
          | Array<{
              first_name: string | null;
              last_name: string | null;
            }>
          | null;
      }>
    | null;
};
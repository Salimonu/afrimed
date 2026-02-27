import { AppointmentWithRelations } from "@/types/clinical";
import { getSingleRelation, getStatusBadgeClass } from "@/lib/utils/appointments";
import { formatAppointmentDate, formatAppointmentTime, formatAppointmentType } from "@/lib/utils/appointments";

type Props = {
    upcomingAppointments: AppointmentWithRelations[]
}


export default function UpcomingAppointments ({upcomingAppointments}: Props) {
    
    return (
    
        <div className="glass-panel rounded-3xl p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                Upcoming appointments
              </p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">
                Your scheduled visits
              </h2>
              
            </div>
          </div>
          <div className="mt-6 grid gap-3">
            {upcomingAppointments.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-600">
                No upcoming appointments yet.
              </div>
            ) : (
              upcomingAppointments.map((appointment) => {
                const clinician = getSingleRelation(appointment.clinicians);
                const hospital = getSingleRelation(appointment.hospitals);

                const clinicianName = [clinician?.first_name, clinician?.last_name]
                  .filter(
                    (part): part is string =>
                      typeof part === "string" && part.trim().length > 0
                  )
                  .join(" ")
                  .trim();

                return (
                  <div
                    key={appointment.id}
                    className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {formatAppointmentType(appointment.appointment_type)} with{" "}
                          {clinicianName || "Assigned clinician"}
                        </p>
                        <p className="mt-1 text-xs text-slate-600">
                          {formatAppointmentDate(appointment.appointment_date)} |{" "}
                          {formatAppointmentTime(appointment.appointment_time)}
                          {hospital?.name ? ` | ${hospital.name}` : ""}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(
                          appointment.status
                        )}`}
                      >
                        {appointment.status ?? "unknown"}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>)
}
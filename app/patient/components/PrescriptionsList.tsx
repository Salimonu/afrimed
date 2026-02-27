import { ConsultationWithRelations } from "@/types/clinical";
import { formatDateTime, getSingleRelation } from "@/lib/utils/appointments";

type Props = {
    consultations: ConsultationWithRelations[]
}


export default function PrescriptionsList ({consultations}: Props) {
    
    return (<div className="glass-panel rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Prescriptions
          </p>
          <div className="mt-4 grid gap-3">
            {consultations.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-600">
                No prescriptions available yet.
              </div>
            ) : (
              consultations.map((consultation) => {
                const appointment = getSingleRelation(consultation.appointments);
                const clinician = getSingleRelation(appointment?.clinicians ?? null);
                const clinicianName = [clinician?.first_name, clinician?.last_name]
                  .filter(
                    (part): part is string =>
                      typeof part === "string" && part.trim().length > 0
                  )
                  .join(" ")
                  .trim();

                const startedAt = formatDateTime(consultation.started_at);
                const endedAt = consultation.ended_at
                  ? formatDateTime(consultation.ended_at)
                  : null;

                return (
                  <div
                    key={consultation.id}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
                  >
                    <p className="text-sm font-semibold text-slate-900">
                      {clinicianName || "Assigned clinician"}
                    </p>
                    <p className="mt-1 text-xs text-slate-600">
                      {endedAt ? `${startedAt} - ${endedAt}` : startedAt}
                    </p>
                    <p className="mt-2 text-sm text-slate-700">
                      {consultation.prescription?.trim() || "No prescription provided."}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>)
}
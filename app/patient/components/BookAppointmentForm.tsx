import { bookAppointment } from "../actions";
import BookAppointmentSubmitButton from "../BookAppointmentSubmitButton";


type Props = {
    clinicians: {
    id: string;
    label: string;
    }[]
}
export default function BookAppointmentForm ({clinicians}: Props) {
    
    return (<div className="glass-panel rounded-3xl p-6">
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
            <BookAppointmentSubmitButton />
          </form>
        </div>)
}
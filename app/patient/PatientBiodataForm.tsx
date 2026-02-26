"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import TopToast from "./TopToast";

type FormState = {
  first_name: string;
  surname: string;
  home_address: string;
  office_address: string;
  date_of_birth: string;
  gender: string;
  phone: string;
  marital_status: string;
  next_of_kin_name: string;
  next_of_kin_address: string;
  local_govt_of_abode: string;
  state_of_abode: string;
  place_of_origin: string;
  local_govt_of_origin: string;
  state_of_origin: string;
  religion: string;
  ethnicity: string;
  nationality: string;
  occupation: string;
};

const initialState: FormState = {
  first_name: "",
  surname: "",
  home_address: "",
  office_address: "",
  date_of_birth: "",
  gender: "",
  phone: "",
  marital_status: "",
  next_of_kin_name: "",
  next_of_kin_address: "",
  local_govt_of_abode: "",
  state_of_abode: "",
  place_of_origin: "",
  local_govt_of_origin: "",
  state_of_origin: "",
  religion: "",
  ethnicity: "",
  nationality: "",
  occupation: "",
};

export default function PatientBiodataForm() {
  const supabase = useMemo(() => createClient(), []);
  const [formData, setFormData] = useState<FormState>(initialState);
  const [existingUserId, setExistingUserId] = useState<string | null>(null);
  const [authUserId, setAuthUserId] = useState<string | null>(null);
  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message?: string;
  }>({ type: "idle" });
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadExisting = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id ?? null;

      if (!userId) {
        return;
      }
      setAuthUserId(userId);

      const { data, error } = await supabase
        .schema("clinical")
        .from("patients")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (!isMounted) {
        return;
      }

      if (error || !data) {
        setFormData((prev) => ({ ...prev }));
        return;
      }

      setExistingUserId(data.user_id ?? userId);
      setFormData({
        first_name: data.first_name ?? "",
        surname: data.surname ?? "",
        home_address: data.home_address ?? "",
        office_address: data.office_address ?? "",
        date_of_birth: data.date_of_birth ?? "",
        gender: data.gender ?? "",
        phone: data.phone ?? "",
        marital_status: data.marital_status ?? "",
        next_of_kin_name: data.next_of_kin_name ?? "",
        next_of_kin_address: data.next_of_kin_address ?? "",
        local_govt_of_abode: data.local_govt_of_abode ?? "",
        state_of_abode: data.state_of_abode ?? "",
        place_of_origin: data.place_of_origin ?? "",
        local_govt_of_origin: data.local_govt_of_origin ?? "",
        state_of_origin: data.state_of_origin ?? "",
        religion: data.religion ?? "",
        ethnicity: data.ethnicity ?? "",
        nationality: data.nationality ?? "",
        occupation: data.occupation ?? "",
      });
    };

    void loadExisting();

    return () => {
      isMounted = false;
    };
  }, [supabase]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({ type: "loading" });
    setToast(null);
    const registrationDate = new Date();

    const payload = {
      first_name: formData.first_name.trim(),
      surname: formData.surname.trim(),
      date_of_birth: formData.date_of_birth || null,
      gender: formData.gender || null,
      phone: formData.phone.trim(),
      home_address: formData.home_address.trim(),
      office_address: formData.office_address.trim(),
      marital_status: formData.marital_status || null,
      next_of_kin_name: formData.next_of_kin_name.trim(),
      next_of_kin_address: formData.next_of_kin_address.trim(),
      local_govt_of_abode: formData.local_govt_of_abode.trim(),
      state_of_abode: formData.state_of_abode.trim(),
      place_of_origin: formData.place_of_origin.trim(),
      local_govt_of_origin: formData.local_govt_of_origin.trim(),
      state_of_origin: formData.state_of_origin.trim(),
      religion: formData.religion.trim(),
      ethnicity: formData.ethnicity.trim(),
      nationality: formData.nationality.trim(),
      occupation: formData.occupation.trim(),
      date_of_registration: registrationDate.toISOString().slice(0, 10),
    };

    if (!authUserId) {
      const message = "Missing user session. Please sign in again.";
      setStatus({ type: "error", message });
      setToast({ type: "error", message });
      return;
    }

    const query = supabase.schema("clinical").from("patients");
    const { error } = existingUserId
      ? await query.update(payload).eq("user_id", existingUserId)
      : await query.insert([{ ...payload, user_id: authUserId }]);

    if (error) {
      const message = "Unable to submit biodata. Please check all the fiels and try again";
      setStatus({ type: "error", message });
      setToast({ type: "error", message });
      return;
    }

    const successMessage = "Biodata saved successfully.";
    setStatus({ type: "success", message: successMessage });
    setToast({ type: "success", message: successMessage });
    setExistingUserId(authUserId);
  };

  return (
    <>
      
      <section id="biodata-form" className="glass-panel rounded-3xl p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Biodata update
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">
            Keep your personal details up to date
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Please review and submit your information for accurate care records.
          </p>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700">
          Required
        </span>
      </div>

      <form className="mt-6 grid gap-5" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm text-slate-700">
            Surname
            <input
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-900"
              required
            />
          </label>
          <label className="text-sm text-slate-700">
            Firstname
            <input
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-900"
              required
            />
          </label>
          <label className="text-sm text-slate-700">
            Home Address
            <input
              name="home_address"
              value={formData.home_address}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-900"
              required
            />
          </label>
          <label className="text-sm text-slate-700">
            Office Address
            <input
              name="office_address"
              value={formData.office_address}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-900"
            />
          </label>
          <label className="text-sm text-slate-700">
            Date of Birth
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-900"
              required
            />
          </label>
          <label className="text-sm text-slate-700">
            Gender
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-900"
              required
            >
              <option value="">Select</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label className="text-sm text-slate-700">
            Phone
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-900"
              required
            />
          </label>
          <label className="text-sm text-slate-700">
            Marital Status
            <select
              name="marital_status"
              value={formData.marital_status}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-900"
              required
            >
              <option value="">Select</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </label>
          <label className="text-sm text-slate-700">
            Name of Next of Kin
            <input
              name="next_of_kin_name"
              value={formData.next_of_kin_name}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-900"
              required
            />
          </label>
          <label className="text-sm text-slate-700">
            Address of Next of Kin
            <input
              name="next_of_kin_address"
              value={formData.next_of_kin_address}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-900"
              required
            />
          </label>
          <label className="text-sm text-slate-700">
            Local Govt of Abode
            <input
              name="local_govt_of_abode"
              value={formData.local_govt_of_abode}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-900"
              required
            />
          </label>
          <label className="text-sm text-slate-700">
            State of Abode
            <input
              name="state_of_abode"
              value={formData.state_of_abode}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-900"
              required
            />
          </label>
          <label className="text-sm text-slate-700">
            Place of Origin
            <input
              name="place_of_origin"
              value={formData.place_of_origin}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-900"
              required
            />
          </label>
          <label className="text-sm text-slate-700">
            L.G. of Origin
            <input
              name="local_govt_of_origin"
              value={formData.local_govt_of_origin}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-900"
              required
            />
          </label>
          <label className="text-sm text-slate-700">
            State of Origin
            <input
              name="state_of_origin"
              value={formData.state_of_origin}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-900"
              required
            />
          </label>
          <label className="text-sm text-slate-700">
            Religion
            <input
              name="religion"
              value={formData.religion}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-900"
            />
          </label>
          <label className="text-sm text-slate-700">
            Ethnicity
            <input
              name="ethnicity"
              value={formData.ethnicity}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-900"
            />
          </label>
          <label className="text-sm text-slate-700">
            Nationality
            <input
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-900"
            />
          </label>
          <label className="text-sm text-slate-700">
            Occupation
            <input
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-900"
            />
          </label>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm text-slate-600">
            {status.type === "loading" && "Submitting biodata..."}
            <span className="text-xl text-green-600">{status.type === "success" && "Biodata saved successfully."}</span>
          </div>
          
          <button
            type="submit"
            disabled={status.type === "loading"}
            className="rounded-2xl bg-slate-900 px-6 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            Save biodata
          </button>
        </div>
      </form>
      </section>
    </>
  );
}

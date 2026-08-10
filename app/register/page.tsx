"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

type FormState = {
  fullName: string;
  dateOfBirth: string;
  age: string;
  gender: string;
  preferredPosition: string;
  address: string;
  city: string;
  state: string;
  phoneNumber: string;
  email: string;
  schoolName: string;
  gradeClass: string;
  gpaPercentage: string;
  awardsHonors: string;
  previousFootballExperience: string;
  medicalConditionsOrAllergies: string;
  currentMedications: string;
  hearAbout: string;
  whyJoinAcademy: string;
  declarationDate: string;
  parentDate: string;
  certifyTrueAndAccurate: boolean;
  parentConsent: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialFormState: FormState = {
  fullName: "",
  dateOfBirth: "",
  age: "",
  gender: "",
  preferredPosition: "",
  address: "",
  city: "",
  state: "",
  phoneNumber: "",
  email: "",
  schoolName: "",
  gradeClass: "",
  gpaPercentage: "",
  awardsHonors: "",
  previousFootballExperience: "",
  medicalConditionsOrAllergies: "",
  currentMedications: "",
  hearAbout: "",
  whyJoinAcademy: "",
  declarationDate: "",
  parentDate: "",
  certifyTrueAndAccurate: false,
  parentConsent: false,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

function isValidDate(value: string) {
  if (!datePattern.test(value)) {
    return false;
  }

  const parsed = new Date(value);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("dazzleRegistrationDraft");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as FormState;
        setFormData((previous) => ({ ...previous, ...parsed }));
      } catch {
        // Ignore invalid saved data.
      }
    }
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((previous) => {
      const nextState = { ...previous, [name]: value };
      localStorage.setItem("dazzleRegistrationDraft", JSON.stringify(nextState));
      return nextState;
    });
    setErrors((previous) => ({ ...previous, [name]: undefined }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFormData((previous) => {
      const nextState = { ...previous, [name]: checked };
      localStorage.setItem("dazzleRegistrationDraft", JSON.stringify(nextState));
      return nextState;
    });
    setErrors((previous) => ({ ...previous, [name]: undefined }));
  };

  const validate = () => {
    const nextErrors: FormErrors = {};

    const requiredFields: Array<keyof FormState> = [
      "fullName",
      "dateOfBirth",
      "age",
      "gender",
      "preferredPosition",
      "address",
      "city",
      "state",
      "phoneNumber",
      "email",
      "declarationDate",
      "parentDate",
    ];

    requiredFields.forEach((field) => {
      const value = formData[field];
      if (typeof value === "string") {
        if (!value.trim()) {
          nextErrors[field] = "This field is required.";
        }
      } else if (!value) {
        nextErrors[field] = "This field is required.";
      }
    });

    if (!formData.certifyTrueAndAccurate) {
      nextErrors.certifyTrueAndAccurate = "Please confirm this declaration.";
    }

    if (!formData.parentConsent) {
      nextErrors.parentConsent = "Please confirm this parent/guardian consent.";
    }

    if (formData.email.trim() && !emailPattern.test(formData.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (formData.phoneNumber.trim() && !phonePattern.test(formData.phoneNumber.trim())) {
      nextErrors.phoneNumber = "Please enter a valid phone number.";
    }

    if (formData.dateOfBirth.trim() && !isValidDate(formData.dateOfBirth.trim())) {
      nextErrors.dateOfBirth = "Please use the YYYY-MM-DD format.";
    }

    if (formData.declarationDate.trim() && !isValidDate(formData.declarationDate.trim())) {
      nextErrors.declarationDate = "Please use the YYYY-MM-DD format.";
    }

    if (formData.parentDate.trim() && !isValidDate(formData.parentDate.trim())) {
      nextErrors.parentDate = "Please use the YYYY-MM-DD format.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasAttemptedSubmit(true);
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    localStorage.setItem("dazzleRegistrationDraft", JSON.stringify(formData));
    router.push("/review");
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 text-slate-800">
      <main className="mx-auto flex max-w-4xl flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
        <header className="mb-8 flex flex-col items-center gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            <div className="relative h-24 w-24 overflow-hidden rounded-full border border-slate-200 bg-slate-50 sm:h-28 sm:w-28 md:h-32 md:w-32">
              <Image
                src="/dazzlebody.jpeg"
                alt="Dazzle Football Academy logo"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-slate-900">
                Dazzle Football Academy
              </h1>
              <p className="text-lg font-semibold text-slate-600">
                Player Biodata Form
              </p>
            </div>
          </div>
        </header>

        <form className="space-y-8" noValidate onSubmit={handleSubmit}>
          {hasAttemptedSubmit && Object.keys(errors).length > 0 ? (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              Please correct the highlighted fields before submitting.
            </div>
          ) : null}

          <section>
            <h2 className="mb-4 text-xl font-semibold text-slate-900">
              Personal Information
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm font-medium">
                Full Name
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2"
                />
                {errors.fullName ? <span className="text-xs text-red-600">{errors.fullName}</span> : null}
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium">
                Date of Birth (YYYY-MM-DD)
                <input
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  placeholder="YYYY-MM-DD"
                  className="rounded-lg border border-slate-300 px-3 py-2"
                />
                {errors.dateOfBirth ? <span className="text-xs text-red-600">{errors.dateOfBirth}</span> : null}
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium">
                Age
                <input
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2"
                />
                {errors.age ? <span className="text-xs text-red-600">{errors.age}</span> : null}
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium">
                Gender
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.gender ? <span className="text-xs text-red-600">{errors.gender}</span> : null}
              </label>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-slate-900">
              Contact Information
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm font-medium md:col-span-2">
                Address
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2"
                />
                {errors.address ? <span className="text-xs text-red-600">{errors.address}</span> : null}
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium">
                City
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2"
                />
                {errors.city ? <span className="text-xs text-red-600">{errors.city}</span> : null}
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium">
                State
                <input
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2"
                />
                {errors.state ? <span className="text-xs text-red-600">{errors.state}</span> : null}
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium">
                Phone Number
                <input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2"
                />
                {errors.phoneNumber ? <span className="text-xs text-red-600">{errors.phoneNumber}</span> : null}
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium">
                Email
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2"
                />
                {errors.email ? <span className="text-xs text-red-600">{errors.email}</span> : null}
              </label>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-slate-900">
              Academic Information
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm font-medium">
                School Name
                <input
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium">
                Grade/Class
                <input
                  name="gradeClass"
                  value={formData.gradeClass}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium">
                GPA/Percentage (if applicable, type NULL if not applicable)
                <input
                  name="gpaPercentage"
                  value={formData.gpaPercentage}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium">
                Awards/Honors (if any, type NULL if none)
                <input
                  name="awardsHonors"
                  value={formData.awardsHonors}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2"
                />
              </label>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-slate-900">
              Football Background
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm font-medium md:col-span-2">
                Previous Football Experience (type NULL if none)
                <textarea
                  name="previousFootballExperience"
                  value={formData.previousFootballExperience}
                  onChange={handleChange}
                  className="min-h-24 rounded-lg border border-slate-300 px-3 py-2"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium md:col-span-2">
                Preferred Playing Position
                <select
                  name="preferredPosition"
                  value={formData.preferredPosition}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2"
                >
                  <option value="">Select preferred position</option>
                  <option value="Goalkeeper">Goalkeeper</option>
                  <option value="Centre Back">Centre Back</option>
                  <option value="Left Back">Left Back</option>
                  <option value="Right Back">Right Back</option>
                  <option value="Defensive Midfielder">Defensive Midfielder</option>
                  <option value="Central Midfielder">Central Midfielder</option>
                  <option value="Attacking Midfielder">Attacking Midfielder</option>
                  <option value="Left Winger">Left Winger</option>
                  <option value="Right Winger">Right Winger</option>
                  <option value="Striker">Striker</option>
                </select>
                {errors.preferredPosition ? <span className="text-xs text-red-600">{errors.preferredPosition}</span> : null}
              </label>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-slate-900">
              Medical Information
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm font-medium md:col-span-2">
                Any Medical Conditions or Allergies (type NULL if none)
                <input
                  name="medicalConditionsOrAllergies"
                  value={formData.medicalConditionsOrAllergies}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium md:col-span-2">
                Current Medications (type NULL if none)
                <input
                  name="currentMedications"
                  value={formData.currentMedications}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2"
                />
              </label>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-slate-900">
              Additional Information
            </h2>
            <div className="grid gap-4">
              <label className="flex flex-col gap-1 text-sm font-medium">
                How did you hear about Dazzle Football Academy?
                <input
                  name="hearAbout"
                  value={formData.hearAbout}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium">
                Why do you want to join our academy?
                <textarea
                  name="whyJoinAcademy"
                  value={formData.whyJoinAcademy}
                  onChange={handleChange}
                  className="min-h-24 rounded-lg border border-slate-300 px-3 py-2"
                />
              </label>
            </div>
          </section>

          <section className="rounded-xl bg-slate-50 p-4">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">
              Declaration
            </h2>
            <p className="mb-4 text-sm text-slate-600">
              Kindly confirmation that the information provided above is true and accurate to the best of your knowledge.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex items-start gap-2 rounded-lg border border-slate-200 bg-white p-3 text-sm font-medium md:col-span-2">
                <input
                  type="checkbox"
                  name="certifyTrueAndAccurate"
                  checked={formData.certifyTrueAndAccurate}
                  onChange={handleCheckboxChange}
                  className="mt-1 h-4 w-4 rounded border-slate-300"
                />
                <span>I certify that the information provided is true and accurate.</span>
                {errors.certifyTrueAndAccurate ? <span className="text-xs text-red-600">{errors.certifyTrueAndAccurate}</span> : null}
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium">
                Date (YYYY-MM-DD)
                <input
                  name="declarationDate"
                  value={formData.declarationDate}
                  onChange={handleChange}
                  placeholder="YYYY-MM-DD"
                  className="rounded-lg border border-slate-300 px-3 py-2"
                />
                {errors.declarationDate ? <span className="text-xs text-red-600">{errors.declarationDate}</span> : null}
              </label>
              <label className="flex items-start gap-2 rounded-lg border border-slate-200 bg-white p-3 text-sm font-medium md:col-span-2">
                <input
                  type="checkbox"
                  name="parentConsent"
                  checked={formData.parentConsent}
                  onChange={handleCheckboxChange}
                  className="mt-1 h-4 w-4 rounded border-slate-300"
                />
                <span>I confirm I am the player’s parent/guardian and consent to this registration.</span>
                {errors.parentConsent ? <span className="text-xs text-red-600">{errors.parentConsent}</span> : null}
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium">
                Date (YYYY-MM-DD)
                <input
                  name="parentDate"
                  value={formData.parentDate}
                  onChange={handleChange}
                  placeholder="YYYY-MM-DD"
                  className="rounded-lg border border-slate-300 px-3 py-2"
                />
                {errors.parentDate ? <span className="text-xs text-red-600">{errors.parentDate}</span> : null}
              </label>
            </div>
          </section>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              ← Back to Homepage
            </a>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Preparing review..." : "Submit / Review"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import type { FormEvent } from "react";

type FormState = {
  fullName: string;
  dateOfBirth: string;
  age: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  phoneNumber: string;
  email: string;
  signature: string;
  declarationDate: string;
  parentSignature: string;
  parentDate: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialFormState: FormState = {
  fullName: "",
  dateOfBirth: "",
  age: "",
  gender: "",
  address: "",
  city: "",
  state: "",
  phoneNumber: "",
  email: "",
  signature: "",
  declarationDate: "",
  parentSignature: "",
  parentDate: "",
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
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
  };

  const validate = () => {
    const nextErrors: FormErrors = {};

    const requiredFields: Array<keyof FormState> = [
      "fullName",
      "dateOfBirth",
      "age",
      "gender",
      "address",
      "city",
      "state",
      "phoneNumber",
      "email",
      "signature",
      "declarationDate",
      "parentSignature",
      "parentDate",
    ];

    requiredFields.forEach((field) => {
      const value = formData[field].trim();
      if (!value) {
        nextErrors[field] = "This field is required.";
      }
    });

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
    setSubmissionMessage("");

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Submission failed.");
      }

      setSubmitted(true);
      setSubmissionMessage(result.message || "Form submitted successfully!");
      setFormData(initialFormState);
    } catch (error) {
      setSubmitted(false);
      setSubmissionMessage(
        error instanceof Error ? error.message : "Unable to submit the form.",
      );
    } finally {
      setIsSubmitting(false);
    }
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

          {submitted ? (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
              {submissionMessage || "Your form was submitted successfully."}
            </div>
          ) : null}

          {submissionMessage && !submitted ? (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {submissionMessage}
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
                <input
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2"
                />
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
                <input className="rounded-lg border border-slate-300 px-3 py-2" />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium">
                Grade/Class
                <input className="rounded-lg border border-slate-300 px-3 py-2" />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium">
                GPA/Percentage (if applicable, type NULL if not applicable)
                <input className="rounded-lg border border-slate-300 px-3 py-2" />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium">
                Awards/Honors (if any, type NULL if none)
                <input className="rounded-lg border border-slate-300 px-3 py-2" />
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
                <textarea className="min-h-24 rounded-lg border border-slate-300 px-3 py-2" />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium md:col-span-2">
                Preferred Playing Position(s)
                <input className="rounded-lg border border-slate-300 px-3 py-2" />
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
                <input className="rounded-lg border border-slate-300 px-3 py-2" />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium md:col-span-2">
                Current Medications (type NULL if none)
                <input className="rounded-lg border border-slate-300 px-3 py-2" />
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
                <input className="rounded-lg border border-slate-300 px-3 py-2" />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium">
                Why do you want to join our academy?
                <textarea className="min-h-24 rounded-lg border border-slate-300 px-3 py-2" />
              </label>
            </div>
          </section>

          <section className="rounded-xl bg-slate-50 p-4">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">
              Declaration
            </h2>
            <p className="mb-4 text-sm text-slate-600">
              I hereby certify that the information provided above is true and accurate to the best of my knowledge.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm font-medium">
                Signature (type Fullname as signature)
                <input
                  name="signature"
                  value={formData.signature}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2"
                />
                {errors.signature ? <span className="text-xs text-red-600">{errors.signature}</span> : null}
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
              <label className="flex flex-col gap-1 text-sm font-medium">
                Parent/Guardian Signature (type Fullname as signature)
                <input
                  name="parentSignature"
                  value={formData.parentSignature}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2"
                />
                {errors.parentSignature ? <span className="text-xs text-red-600">{errors.parentSignature}</span> : null}
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
              {isSubmitting ? "Submitting..." : "Submit Form"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

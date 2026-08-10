"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

type ReviewState = {
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

const emptyState: ReviewState = {
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

export default function ReviewPage() {
  const router = useRouter();
  const [data, setData] = useState<ReviewState>(emptyState);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("dazzleRegistrationDraft");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as ReviewState;
        setData(parsed);
      } catch {
        setData(emptyState);
      }
    }
  }, []);

  const handleEdit = () => {
    router.push("/register");
  };

  const handleContinue = async () => {
    setErrorMessage("");

    const saved = localStorage.getItem("dazzleRegistrationDraft");
    if (!saved) {
      setErrorMessage(
        "Your registration details could not be found. Please return to the registration form and try again.",
      );
      return;
    }

    let parsed: ReviewState;
    try {
      parsed = JSON.parse(saved) as ReviewState;
    } catch (error) {
      console.error("Failed to parse registration draft:", error);
      setErrorMessage(
        "Your registration details could not be found. Please return to the registration form and try again.",
      );
      return;
    }

    setIsSaving(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log("SUPABASE SESSION:", session);

      const insertPayload = {
        fullName: data.fullName,
        dateOfBirth: data.dateOfBirth,
        age: data.age,
        gender: data.gender,
        preferredPosition: data.preferredPosition,
        address: data.address,
        city: data.city,
        state: data.state,
        phoneNumber: data.phoneNumber,
        email: data.email,
        schoolName: data.schoolName,
        gradeClass: data.gradeClass,
        gpaPercentage: data.gpaPercentage,
        awardsHonors: data.awardsHonors,
        previousFootballExperience: data.previousFootballExperience,
        medicalConditionsOrAllergies: data.medicalConditionsOrAllergies,
        currentMedications: data.currentMedications,
        hearAbout: data.hearAbout,
        whyJoinAcademy: data.whyJoinAcademy,
        declarationDate: data.declarationDate,
        parentDate: data.parentDate,
        certifyTrueAndAccurate: data.certifyTrueAndAccurate,
        parentConsent: data.parentConsent,
        paymentStatus: "pending",
      };

      console.log(
        "REGISTRATION DATA BEING INSERTED:",
        JSON.stringify(insertPayload, null, 2),
      );

      const { data: insertedRegistration, error } = await supabase
        .from("registrations")
        .insert(insertPayload)
        .select()
        .single();

      if (error) {
        console.error("FULL SUPABASE ERROR:", JSON.stringify(error, null, 2));
        console.error("ERROR MESSAGE:", error?.message);
        console.error("ERROR DETAILS:", error?.details);
        console.error("ERROR HINT:", error?.hint);
        console.error("ERROR CODE:", error?.code);
        console.error("ERROR TYPE:", typeof error);
        setErrorMessage(
          "We couldn't save your registration. Please check your connection and try again.",
        );
        return;
      }

      router.push("/payment");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 text-slate-800">
      <main className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-10">
        <header className="mb-8 rounded-3xl border border-slate-200 bg-slate-950/5 p-6 text-slate-900">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-700">
            Dazzle Football Academy
          </p>
          <h1 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
            Review Your Registration
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Please confirm your information before continuing to payment. You can edit any section and keep your details saved.
          </p>
        </header>

        <div className="space-y-8">
          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Personal Information</h2>
              <span className="text-sm text-slate-600">Review carefully</span>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                ["Full Name", data.fullName],
                ["Date of Birth", data.dateOfBirth],
                ["Age", data.age],
                ["Gender", data.gender],
              ].map(([label, value]) => (
                <div key={label} className="rounded-3xl bg-white p-4 shadow-sm shadow-slate-200/70">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">{value || "Not provided"}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Contact Information</h2>
              <span className="text-sm text-slate-600">Stay reachable</span>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                ["Address", data.address],
                ["City", data.city],
                ["State", data.state],
                ["Phone Number", data.phoneNumber],
                ["Email", data.email],
              ].map(([label, value]) => (
                <div key={label} className="rounded-3xl bg-white p-4 shadow-sm shadow-slate-200/70">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">{value || "Not provided"}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Academic Information</h2>
              <span className="text-sm text-slate-600">Your academic record</span>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                ["School Name", data.schoolName],
                ["Grade/Class", data.gradeClass],
                ["GPA/Percentage", data.gpaPercentage],
                ["Awards/Honors", data.awardsHonors],
              ].map(([label, value]) => (
                <div key={label} className="rounded-3xl bg-white p-4 shadow-sm shadow-slate-200/70">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">{value || "Not provided"}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Football Background</h2>
              <span className="text-sm text-slate-600">Performance history</span>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-4 shadow-sm shadow-slate-200/70 sm:col-span-2">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Previous Football Experience</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{data.previousFootballExperience || "Not provided"}</p>
              </div>
              <div className="rounded-3xl bg-white p-4 shadow-sm shadow-slate-200/70">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Preferred Playing Position</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{data.preferredPosition || "Not provided"}</p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Medical Information</h2>
              <span className="text-sm text-slate-600">Health and safety</span>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                ["Medical Conditions or Allergies", data.medicalConditionsOrAllergies],
                ["Current Medications", data.currentMedications],
              ].map(([label, value]) => (
                <div key={label} className="rounded-3xl bg-white p-4 shadow-sm shadow-slate-200/70">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">{value || "Not provided"}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Additional Information</h2>
              <span className="text-sm text-slate-600">About your interest</span>
            </div>
            <div className="mt-5 grid gap-4">
              <div className="rounded-3xl bg-white p-4 shadow-sm shadow-slate-200/70">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">How did you hear about Dazzle Football Academy?</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{data.hearAbout || "Not provided"}</p>
              </div>
              <div className="rounded-3xl bg-white p-4 shadow-sm shadow-slate-200/70">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Why do you want to join our academy?</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{data.whyJoinAcademy || "Not provided"}</p>
              </div>
            </div>
          </section>

          {errorMessage ? (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {errorMessage}
            </div>
          ) : null}
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handleEdit}
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              ← Edit Details
            </button>
            <button
              type="button"
              onClick={handleContinue}
              disabled={isSaving}
              className="inline-flex items-center justify-center rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSaving ? "Saving registration..." : "Continue to Payment"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

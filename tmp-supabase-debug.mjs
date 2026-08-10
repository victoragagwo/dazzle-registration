import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";
const envText = readFileSync(".env", "utf8");
const env = envText.split(/\r?\n/).reduce((acc, line) => {
  const [k, ...vals] = line.split("=");
  if (!k) return acc;
  acc[k.trim()] = vals.join("=").trim();
  return acc;
}, {});
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
const sessionResult = await supabase.auth.getSession();
console.log("SESSION RESULT", JSON.stringify(sessionResult, null, 2));
const payload = {
  fullName: "Test User Debug",
  dateOfBirth: "2000-01-01",
  age: "24",
  gender: "Other",
  preferredPosition: "Midfielder",
  address: "123 Test St",
  city: "Testville",
  state: "TS",
  phoneNumber: "+1234567890",
  email: "test-debug@example.com",
  schoolName: "Test School",
  gradeClass: "12",
  gpaPercentage: "4.0",
  awardsHonors: "Test Award",
  previousFootballExperience: "None",
  medicalConditionsOrAllergies: "None",
  currentMedications: "None",
  hearAbout: "Friend",
  whyJoinAcademy: "To learn",
  paymentStatus: "pending",
};
console.log("PAYLOAD", JSON.stringify(payload, null, 2));
const result = await supabase.from("registrations").insert(payload).select().single();
console.log("RESULT", JSON.stringify(result, null, 2));

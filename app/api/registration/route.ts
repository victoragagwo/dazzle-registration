import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    if (!payload || typeof payload !== "object") {
      return NextResponse.json(
        { success: false, message: "No form data was provided." },
        { status: 400 },
      );
    }

    const requiredFields = [
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
      "certifyTrueAndAccurate",
      "parentConsent",
    ] as const;

    const missingFields = requiredFields.filter((field) => {
      const value = payload[field];

      if (typeof value === "boolean") {
        return !value;
      }

      return typeof value !== "string" || !value.trim();
    });

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields before submitting.",
          missingFields,
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Registration form received successfully.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        success: false,
        message: "Unable to process the registration form.",
        error: message,
      },
      { status: 500 },
    );
  }
}

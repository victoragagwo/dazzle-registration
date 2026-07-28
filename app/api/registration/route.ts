import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    if (!payload || typeof payload !== "object") {
      return NextResponse.json(
        { success: false, message: "No form data was provided." },
        { status: 400 },
      );
    }

    const registration = await prisma.registration.create({
      data: {
        fullName: String(payload.fullName ?? ""),
        dateOfBirth: String(payload.dateOfBirth ?? ""),
        age: String(payload.age ?? ""),
        gender: String(payload.gender ?? ""),
        address: String(payload.address ?? ""),
        city: String(payload.city ?? ""),
        state: String(payload.state ?? ""),
        phoneNumber: String(payload.phoneNumber ?? ""),
        email: String(payload.email ?? ""),
        signature: String(payload.signature ?? ""),
        declarationDate: String(payload.declarationDate ?? ""),
        parentSignature: String(payload.parentSignature ?? ""),
        parentDate: String(payload.parentDate ?? ""),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Registration form received successfully.",
      data: registration,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const statusCode = message.includes("Can't reach database server") || message.includes("ENOTFOUND") || message.includes("ECONNREFUSED")
      ? 503
      : 500;

    return NextResponse.json(
      {
        success: false,
        message: "Unable to process the registration form.",
        error: message,
      },
      { status: statusCode },
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { contactSubmissions } from "@/db/schema";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { success: false, message: "All fields are required" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, message: "Invalid email address" },
                { status: 400 }
            );
        }

        // Get IP address
        const forwardedFor = request.headers.get("x-forwarded-for");
        const ipAddress = forwardedFor
            ? forwardedFor.split(",")[0].trim()
            : request.headers.get("x-real-ip") || null;

        // Insert into database
        await db.insert(contactSubmissions).values({
            name,
            email,
            subject,
            message,
            ipAddress,
        });

        return NextResponse.json(
            { success: true, message: "Message sent successfully!" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Contact form submission error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to send message. Please try again." },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json(
        { message: "Contact API is working. Use POST to submit a message." },
        { status: 200 }
    );
}

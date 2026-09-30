import { NextRequest, NextResponse } from "next/server";
import { recordContact, db } from "@/app/lib/db";
import { getClientIp } from "@/app/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    // Rate limiting: max 5 contact submissions per 10 minutes per IP
    const tenMinsAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const recentSubmissions = db
      .prepare(
        "SELECT COUNT(*) as count FROM contacts WHERE ip = ? AND created_at > ?"
      )
      .get(ip, tenMinsAgo) as { count: number };

    if (recentSubmissions && recentSubmissions.count >= 5) {
      return NextResponse.json(
        { error: "Too many messages sent. Please wait a few minutes before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, subject, message, visitor_id, locale } = body;

    // Validate fields
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (
      !email ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }
    if (!subject || typeof subject !== "string" || subject.trim().length === 0) {
      return NextResponse.json({ error: "Subject is required." }, { status: 400 });
    }
    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { error: "Message must be at least 5 characters long." },
        { status: 400 }
      );
    }

    const userAgent = req.headers.get("user-agent") || undefined;

    const contactId = recordContact({
      visitor_id: typeof visitor_id === "string" ? visitor_id : undefined,
      name: name.trim().slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 120),
      subject: subject.trim().slice(0, 200),
      message: message.trim().slice(0, 4000),
      ip,
      locale: typeof locale === "string" ? locale.slice(0, 10) : "en",
      user_agent: userAgent?.slice(0, 500),
    });

    return NextResponse.json(
      { success: true, id: contactId, message: "Thank you! Your message has been received." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import {
  getClientIp,
  verifyAdminPassword,
  createSessionToken,
  SESSION_COOKIE_NAME,
} from "@/app/lib/auth";
import { checkBruteForceLockout, recordAuthAttempt } from "@/app/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    // 1. Check if this IP is currently locked out
    const lockout = checkBruteForceLockout(ip);
    if (lockout.locked) {
      const minutes = Math.ceil(lockout.remainingSeconds / 60);
      return NextResponse.json(
        {
          error: `Too many failed attempts. You are temporarily locked out. Please try again in ${minutes} minute${minutes > 1 ? "s" : ""}.`,
          locked: true,
          remainingSeconds: lockout.remainingSeconds,
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Password is required." },
        { status: 400 }
      );
    }

    // 2. Verify password
    const isValid = verifyAdminPassword(password);

    if (!isValid) {
      // Record failed attempt
      recordAuthAttempt(ip, false);
      const updatedLockout = checkBruteForceLockout(ip);

      if (updatedLockout.locked) {
        const minutes = Math.ceil(updatedLockout.remainingSeconds / 60);
        return NextResponse.json(
          {
            error: `Maximum 3 failed attempts reached! You are now locked out for ${minutes} minutes.`,
            locked: true,
            remainingSeconds: updatedLockout.remainingSeconds,
          },
          { status: 429 }
        );
      }

      const attemptsRemaining = Math.max(0, 3 - updatedLockout.failedCount);
      return NextResponse.json(
        {
          error: `Invalid password. ${attemptsRemaining} attempt${attemptsRemaining === 1 ? "" : "s"} remaining before 15-minute lockout.`,
          attemptsRemaining,
        },
        { status: 401 }
      );
    }

    // 3. Password is valid: Record successful login
    recordAuthAttempt(ip, true);

    const token = createSessionToken();
    const response = NextResponse.json({
      success: true,
      redirect: "/admin/dashboard",
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Authentication system error." },
      { status: 500 }
    );
  }
}

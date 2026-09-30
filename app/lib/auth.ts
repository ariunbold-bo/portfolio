import crypto from "node:crypto";
import { cookies } from "next/headers.js";
import type { NextRequest } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const SECRET_KEY = process.env.ADMIN_SECRET_KEY || "portfolio-admin-super-secret-key-salt";
export const SESSION_COOKIE_NAME = "admin_session";

/**
 * Extracts real client IP address from various standard proxy / CDN headers.
 */
export function getClientIp(req: Request | NextRequest): string {
  const headers = req.headers;
  
  // Cloudflare
  const cfIp = headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  // Standard forwarded for
  const xForwardedFor = headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const parts = xForwardedFor.split(",");
    if (parts.length > 0 && parts[0].trim()) {
      return parts[0].trim();
    }
  }

  // Real IP
  const xRealIp = headers.get("x-real-ip");
  if (xRealIp) return xRealIp.trim();

  // Vercel / other CDNs
  const trueClientIp = headers.get("true-client-ip");
  if (trueClientIp) return trueClientIp.trim();

  return "127.0.0.1";
}

/**
 * Extracts Geo information from proxy / CDN headers if available.
 */
export function getGeoFromHeaders(req: Request | NextRequest): { country?: string; city?: string } {
  const headers = req.headers;
  const country =
    headers.get("cf-ipcountry") ||
    headers.get("x-vercel-ip-country") ||
    headers.get("x-country-code") ||
    undefined;

  const city =
    headers.get("cf-ipcity") ||
    headers.get("x-vercel-ip-city") ||
    undefined;

  return { country, city };
}

/**
 * Creates a signed HMAC session token.
 */
export function createSessionToken(): string {
  const timestamp = Date.now();
  const payload = `admin:${timestamp}`;
  const hmac = crypto.createHmac("sha256", SECRET_KEY).update(payload).digest("hex");
  return `${payload}:${hmac}`;
}

/**
 * Verifies a signed HMAC session token.
 * Valid for 7 days.
 */
export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;

  const parts = token.split(":");
  if (parts.length !== 3) return false;

  const [role, timestampStr, hmac] = parts;
  if (role !== "admin") return false;

  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  // Max age: 7 days
  const maxAgeMs = 7 * 24 * 60 * 60 * 1000;
  if (Date.now() - timestamp > maxAgeMs) {
    return false;
  }

  const payload = `${role}:${timestampStr}`;
  const expectedHmac = crypto.createHmac("sha256", SECRET_KEY).update(payload).digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(hmac, "hex"),
      Buffer.from(expectedHmac, "hex")
    );
  } catch {
    return false;
  }
}

/**
 * Checks if current server request has valid admin authentication.
 */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return verifySessionToken(sessionToken);
}

/**
 * Verifies password against configured ADMIN_PASSWORD.
 */
export function verifyAdminPassword(provided: string): boolean {
  if (!provided) return false;
  try {
    return crypto.timingSafeEqual(
      Buffer.from(provided),
      Buffer.from(ADMIN_PASSWORD)
    );
  } catch {
    return false;
  }
}

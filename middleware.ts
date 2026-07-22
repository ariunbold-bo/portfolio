import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

let locales = ["en", "mn"];
let defaultLocale = "en";

// Simple Accept-Language parser
function getPreferredLocale(request: NextRequest) {
  const acceptLang = request.headers.get("accept-language");
  if (acceptLang) {
    if (acceptLang.includes("mn")) {
      return "mn";
    }
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  if (pathnameHasLocale) return;

  // Avoid processing static files or images
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return;
  }

  // Handle subdomain for mn.ariunbold.dev
  const host = request.headers.get("host") || "";
  let locale = getPreferredLocale(request);
  
  if (host === "mn.ariunbold.dev") {
    locale = "mn";
  }

  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};

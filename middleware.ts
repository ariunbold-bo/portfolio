import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

let locales = ["en", "mn"];
let defaultLocale = "en";

function getPreferredLocale(request: NextRequest) {
  // 1. Check if user explicitly set a language preference
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Fallback to browser language commented for a quite a long time due to incomplete translation
  const acceptLang = request.headers.get("accept-language");
  if (acceptLang) {
    // Basic check for Mongolian in the accept-language header
    if (acceptLang.toLowerCase().includes("mn")) {
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

  const locale = getPreferredLocale(request);
  
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};

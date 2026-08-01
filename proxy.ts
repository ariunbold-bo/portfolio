import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE, isLocale } from "./app/lib/locales";

function getPreferredLocale(request: NextRequest) {
  // 1. Check if user explicitly set a language preference
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && isLocale(cookieLocale)) {
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
  return DEFAULT_LOCALE;
}

/**
 * Forwards the resolved locale as a request header so the root layout
 * (`app/layout.tsx`) can set an accurate `<html lang>` without needing
 * `[lang]` route params — it's the one true root layout, so it also renders
 * for requests that never resolve into a `[lang]` route (e.g. a bare 404).
 */
function withLocaleHeader(request: NextRequest, locale: string) {
  const headers = new Headers(request.headers);
  headers.set("x-locale", locale);
  return NextResponse.next({ request: { headers } });
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if there is any supported locale in the pathname
  const matchedLocale = LOCALES.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (matchedLocale) return withLocaleHeader(request, matchedLocale);

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

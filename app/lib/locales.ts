/**
 * Single source of truth for supported locales. Previously this array was
 * redeclared independently in `proxy.ts`, `lib/seo.ts`, and `sitemap.ts` —
 * consolidated here so adding/removing a locale only requires one edit.
 */
export const LOCALES = ["en", "mn"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Narrows an arbitrary route param into a supported `Locale`, falling back to the default. */
export function resolveLocale(value: string): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

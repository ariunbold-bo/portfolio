import { LOCALES, DEFAULT_LOCALE, type Locale } from "./locales";

const OG_LOCALES: Record<Locale, string> = {
  en: "en_US",
  mn: "mn_MN",
};

/**
 * Builds a self-referencing canonical URL plus hreflang alternates for a
 * given route so every locale variant points at itself instead of always
 * canonicalizing to the English version.
 *
 * @param site   Absolute site origin, e.g. "https://ariunbold.dev"
 * @param lang   Current locale segment, e.g. "en" | "mn"
 * @param path   Route path *without* the locale segment, e.g. "" or "/about"
 */
export function buildAlternates(site: string, lang: string, path = "") {
  const languages = Object.fromEntries(
    LOCALES.map((locale) => [locale, `${site}/${locale}${path}`]),
  );

  return {
    canonical: `${site}/${lang}${path}`,
    languages: {
      ...languages,
      "x-default": `${site}/${DEFAULT_LOCALE}${path}`,
    },
  };
}

export function ogLocale(lang: string): string {
  return OG_LOCALES[lang as Locale] ?? OG_LOCALES[DEFAULT_LOCALE];
}

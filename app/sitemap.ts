import en from "@/app/lib/dictionaries/en";
const { identity, hardware } = en;
import type { MetadataRoute } from "next";
import { LOCALES } from "@/app/lib/locales";

function entry(
  path: string,
  priority: number,
  freq: "monthly" | "yearly" = "monthly",
): MetadataRoute.Sitemap[number] {
  const languages = Object.fromEntries(
    LOCALES.map((locale) => [locale, `${identity.site}/${locale}${path}`]),
  ) as Record<string, string>;

  return {
    url: `${identity.site}/${LOCALES[0]}${path}`,
    lastModified: new Date(),
    changeFrequency: freq,
    priority,
    alternates: { languages },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    entry("", 1),
    entry("/about", 0.9),
    entry("/projects", 0.8),
    entry("/contact", 0.7),
    ...hardware.map((h) => entry(`/work/${h.slug}`, 0.8)),
  ];
}

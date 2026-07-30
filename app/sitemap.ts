import en from "@/app/lib/dictionaries/en";
const { identity, hardware } = en;
import type { MetadataRoute } from "next";

function entry(
  url: string,
  priority: number,
  freq: "monthly" | "yearly" = "monthly",
) {
  return { url, lastModified: new Date(), changeFrequency: freq, priority };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    entry(identity.site, 1),
    entry(`${identity.site}/en/about`, 0.9),
    entry(`${identity.site}/en/projects`, 0.8),
    entry(`${identity.site}/en/contact`, 0.7),
    ...hardware.map((h) => entry(`${identity.site}/work/${h.slug}`, 0.8)),
  ];
}

import { identity, hardware } from "@/app/lib/content";
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
    ...hardware.map((h) => entry(`${identity.site}/work/${h.slug}`, 0.8)),
  ];
}

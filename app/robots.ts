import type { MetadataRoute } from "next";
import en from "@/app/lib/dictionaries/en";
const { identity } = en;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [],
    },
    sitemap: `${identity.site}/sitemap.xml`,
  };
}

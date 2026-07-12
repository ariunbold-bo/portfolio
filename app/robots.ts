import type { MetadataRoute } from "next";
import { identity } from "@/app/lib/content";

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

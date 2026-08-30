import type { Metadata } from "next";
import Script from "next/script";
import en from "@/app/lib/dictionaries/en";
import { buildAlternates, ogLocale } from "@/app/lib/seo";
import SmoothScroll from "../components/smooth-scroll-provider";
import { SiteBackground } from "../components/site-background";
import { NavRail } from "../components/nav-rail";
import { ScrollProgress } from "../components/scroll-progress";

const { identity, knowsAbout, contact } = en;

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await props.params;

  return {
    title: {
      default: `${identity.name} — ${identity.seoTitle}`,
      template: `%s · ${identity.name}`,
    },
    description: identity.tagline,
    keywords: [
      "Ariunbold Bold",
      "software developer Mongolia",
      "ariuka",
      "hardware developer",
      "systems developer",
      "React",
      "Next.js",
      "C++",
      "ESP32",
      "full-stack developer",
    ],
    authors: [{ name: identity.name, url: identity.site }],
    creator: identity.name,
    alternates: buildAlternates(identity.site, lang),
    openGraph: {
      type: "website",
      url: `${identity.site}/${lang}`,
      title: `${identity.name} — ${identity.seoTitle}`,
      description: identity.tagline,
      siteName: identity.siteName,
      locale: ogLocale(lang),
      images: [
        {
          url: `${identity.site}/hero.webp`,
          width: 1200,
          height: 630,
          alt: `${identity.name} — ${identity.seoTitle}`,
        },
      ],
    },
    robots: { index: true, follow: true },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${identity.site}/#website`,
      url: identity.site,
      name: identity.siteName,
      description: identity.tagline,
      publisher: { "@id": `${identity.site}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${identity.site}/#person`,
      name: identity.name,
      url: identity.site,
      jobTitle: identity.seoTitle,
      description: identity.tagline,
      address: { "@type": "PostalAddress", addressCountry: identity.location },
      knowsAbout: [...knowsAbout],
      sameAs: contact.filter((c) => c.external).map((c) => c.href),
    },
  ],
};

export default async function LangLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { children } = props;

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/*
        SiteBackground, NavRail, ScrollProgress live HERE in the layout —
        outside the Template wrapper — so position:fixed is never broken
        by the page-transition transform animation in template.tsx.
      */}
      <SiteBackground />
      <ScrollProgress />
      <NavRail dict={en} />

      <SmoothScroll>{children}</SmoothScroll>
    </>
  );
}

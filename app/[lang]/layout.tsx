import type { Metadata } from "next";
import Script from "next/script";
import { Poppins } from "next/font/google";
import "../globals.css";
import en from "@/app/lib/dictionaries/en";
const { identity, knowsAbout, contact } = en;

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(identity.site),
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
  alternates: { canonical: identity.site },
  openGraph: {
    type: "website",
    url: identity.site,
    title: `${identity.name} — ${identity.seoTitle}`,
    description: identity.tagline,
    siteName: identity.siteName,
    locale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${identity.name} — ${identity.seoTitle}`,
    description: identity.tagline,
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

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
      image: `${identity.site}/og-image.png`,
      jobTitle: identity.seoTitle,
      description: identity.tagline,
      address: { "@type": "PostalAddress", addressCountry: identity.location },
      knowsAbout: [...knowsAbout],
      sameAs: contact.filter((c) => c.external).map((c) => c.href),
    },
  ],
};

// Flash-free theme init — runs during HTML parse, before first paint.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(!t){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { children } = props;
  const params = await props.params;
  return (
    <html
      lang={params.lang || "en"}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${poppins.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <Script id="theme-script" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full">
        {/* <Script
          id="json-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        /> */}
        {children}
      </body>
    </html>
  );
}

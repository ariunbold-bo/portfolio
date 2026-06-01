import { Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import MouseFollower from "../components/MouseFollower";

const poppins = Poppins({
  variable: "--font-Poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://ariunbold.dev";

export const metadata = {
  // ── Core Meta ──────────────────────────────────────────────
  metadataBase: new URL(SITE_URL),
  title: "Ariunbold Bold — Software & Hardware Developer Portfolio",

  description:
    "Ariunbold Bold's developer portfolio showcasing full-stack web applications built with React and Next.js, hardware projects including ESP32 microcontroller integrations and custom device mods, and creative engineering work spanning software and electronics.",
  keywords: [
    "Ariunbold Bold",
    "developer portfolio",
    "full-stack developer",
    "React developer",
    "Next.js portfolio",
    "hardware engineer",
    "ESP32 projects",
    "software developer Mongolia",
    "web developer",
    "creative engineering",
    "Bold Ariunbold",
    "ariunbold.dev",
    "Bold Ariunbold Portfolio",
    "Ariunbold Bold Portfolio",
  ],
  authors: [{ name: "Ariunbold Bold", url: SITE_URL }],
  creator: "Ariunbold Bold",
  publisher: "Ariunbold Bold",

  // ── Canonical & Alternates (fixes "Duplicate without user-selected canonical") ──
  alternates: {
    canonical: "https://ariunbold.dev",
  },

  // ── Robots (ensures proper indexing) ──────────────────────
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // ── Open Graph ─────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Ariunbold Bold Portfolio",
    title: "Ariunbold Bold — Software & Hardware Developer Portfolio",
    description:
      "Ariunbold Bold's developer portfolio showcasing full-stack web applications built with React and Next.js, hardware projects including ESP32 microcontroller integrations and custom device mods, and creative engineering work spanning software and electronics.",
    images: [
      {
        url: "/profile.webp",
        width: 530,
        height: 690,
        alt: "Ariunbold Bold — Software & Hardware Developer",
        type: "image/webp",
      },
    ],
  },

  // ── Twitter Card ───────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Ariunbold Bold — Software & Hardware Developer Portfolio",
    description:
      "Ariunbold Bold's developer portfolio showcasing full-stack web applications built with React and Next.js, hardware projects including ESP32 microcontroller integrations and custom device mods, and creative engineering work spanning software and electronics.",
    images: ["/profile.webp"],
  },

  // ── Additional ─────────────────────────────────────────────
  category: "technology",
  classification: "Portfolio",
};

// ── JSON-LD Structured Data ──────────────────────────────────
// Fixes "Video isn't on a watch page" by declaring VideoObject schema
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Ariunbold Bold Portfolio",
      description:
        "Ariunbold Bold's developer portfolio showcasing full-stack web applications, hardware projects, and creative engineering work.",
      publisher: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en-US",
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Ariunbold Bold",
      url: SITE_URL,
      image: {
        "@type": "ImageObject",
        url: `${SITE_URL}/profile.webp`,
        width: 530,
        height: 690,
      },
      jobTitle: "Software & Hardware Developer",
      sameAs: [
        "https://github.com/ariunbold-bo",
        "https://www.linkedin.com/in/ariunbold-bold-60058b30a/",
        "https://www.instagram.com/ariuka_69/",
        "https://www.facebook.com/profile.php?id=61553207489957",
      ],
      knowsAbout: [
        "React",
        "Next.js",
        "C++",
        "ESP32",
        "Hardware Engineering",
        "Full-Stack Development",
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "Ariunbold Bold — Software & Hardware Developer Portfolio",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#person` },
      description:
        "Ariunbold Bold's developer portfolio showcasing full-stack web applications, hardware projects, and creative engineering work.",
      inLanguage: "en-US",
    },
    {
      "@type": "VideoObject",
      name: "ESP32 Microcontroller OLED GIF Demo",
      description:
        "Demonstration of binary-encoded GIF playback on a 128x64 OLED display powered by an ESP32 microcontroller, programmed in C++ using the U8g2 library.",
      thumbnailUrl: `${SITE_URL}/esp32-poster.webp`,
      contentUrl: `${SITE_URL}/esp32-demo.mp4`,
      uploadDate: "2025-01-01T00:00:00+00:00",
      embedUrl: SITE_URL,
      inLanguage: "en-US",
    },
    {
      "@type": "VideoObject",
      name: "Samsung S21 Custom Power Mod Demo",
      description:
        "Demonstration of a custom 10000mAh external battery and fan control module engineered for a Samsung S21, featuring Power Save and Performance modes.",
      thumbnailUrl: `${SITE_URL}/mobile-poster.webp`,
      contentUrl: `${SITE_URL}/mobile-compressed.mp4`,
      uploadDate: "2025-01-01T00:00:00+00:00",
      embedUrl: SITE_URL,
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href="https://ariunbold.dev/" />
      </head>
      <body className={`${poppins.variable} antialiased`}>
        <MouseFollower />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

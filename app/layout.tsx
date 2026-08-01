import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import en from "@/app/lib/dictionaries/en";

const { identity } = en;

// Only weights actually used across shared/global UI are preloaded here.
// Route-specific weights (e.g. the 800 weight used only on work detail
// pages) are loaded separately so they aren't preloaded on every route.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Base/fallback metadata — used as-is by routes that render outside the
// `[lang]` segment (e.g. a truly unmatched URL hitting the root not-found
// page). Every real page under `[lang]` overrides this with locale-aware
// metadata via `[lang]/layout.tsx`'s `generateMetadata`.
export const metadata: Metadata = {
  metadataBase: new URL(identity.site),
  title: {
    default: `${identity.name} — ${identity.seoTitle}`,
    template: `%s · ${identity.name}`,
  },
  description: identity.tagline,
};

// Matches mobile browser chrome (address bar, task switcher) to the
// site's actual background for each color scheme.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0a09" },
  ],
};

// Flash-free theme init — runs during HTML parse, before first paint.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(!t){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Set by proxy.ts middleware from the resolved URL locale segment, so the
  // <html lang> attribute stays accurate without needing `[lang]` route
  // params here (this is the one true root layout — it also renders for
  // requests that never resolve to a `[lang]` route, like a bare 404).
  const headersList = await headers();
  const lang = headersList.get("x-locale") || "en";

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${poppins.variable} h-full antialiased ${poppins.className}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full overflow-x-hidden">{children}</body>
    </html>
  );
}

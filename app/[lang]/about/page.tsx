import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/app/lib/dictionaries";
import { About } from "@/app/components/sections/about";
import en from "@/app/lib/dictionaries/en";

const { identity } = en;

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Learn about Ariunbold Bold — a self-taught systems developer from Mongolia building full-stack web apps, hardware mods, and everything in between.",
  alternates: { canonical: `${identity.site}/en/about` },
  openGraph: {
    type: "website",
    url: `${identity.site}/en/about`,
    title: `About Me · ${identity.name}`,
    description:
      "Learn about Ariunbold Bold — a self-taught systems developer from Mongolia building full-stack web apps, hardware mods, and everything in between.",
    siteName: identity.siteName,
    locale: "en_US",
  },
};

export default async function AboutPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const { lang } = params;
  const dict = await getDictionary(lang as "en");

  return (
    <main className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col px-4 pt-10 pb-28 sm:px-6 sm:pt-12 md:px-12 md:pt-24 lg:pl-32 lg:pr-12">
      <div className="mb-8 md:mb-12">
        <Link
          href={`/${lang}`}
          className="group inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink transition-colors mb-4 md:mb-6"
        >
          <span className="transition-transform group-hover:-translate-x-1">
            &larr;
          </span>{" "}
          {dict.ui.backToHome}
        </Link>
      </div>
      <About dict={dict} />
    </main>
  );
}

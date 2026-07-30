import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/app/lib/dictionaries";
import { Hardware } from "@/app/components/sections/hardware";
import { Projects } from "@/app/components/sections/projects";
import en from "@/app/lib/dictionaries/en";

const { identity } = en;

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore the projects built by Ariunbold Bold — ranging from full-stack applications to hardware and real-time collaborative tools.",
  alternates: { canonical: `${identity.site}/en/projects` },
  openGraph: {
    type: "website",
    url: `${identity.site}/en/projects`,
    title: `Projects · ${identity.name}`,
    description:
      "Explore the projects built by Ariunbold Bold — ranging from full-stack applications to hardware and real-time collaborative tools.",
    siteName: identity.siteName,
    locale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Projects · ${identity.name}`,
    description:
      "Explore the projects built by Ariunbold Bold — ranging from full-stack applications to hardware and real-time collaborative tools.",
    images: ["/og-image.png"],
  },
};

export default async function ProjectsPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang;
  const dict = await getDictionary(lang as "en");

  return (
    <main className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col px-4 pt-10 pb-28 sm:px-6 sm:pt-12 md:px-12 md:pt-24 lg:pl-32 lg:pr-12">
      <div className="mb-8 md:mb-12">
        <Link href={`/${lang}`} className="group inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink transition-colors mb-4 md:mb-6">
          <span className="transition-transform group-hover:-translate-x-1">&larr;</span> {dict.ui.backToHome}
        </Link>
      </div>
      <div className="flex w-full flex-col space-y-28 sm:space-y-36 md:space-y-56">
        <Hardware dict={dict} />
        <Projects dict={dict} />
      </div>
    </main>
  );
}

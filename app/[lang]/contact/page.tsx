import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/app/lib/dictionaries";
import { Contact } from "@/app/components/sections/contact";
import en from "@/app/lib/dictionaries/en";

const { identity } = en;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ariunbold Bold — open to software projects, hardware collaborations, and new opportunities.",
  alternates: { canonical: `${identity.site}/en/contact` },
  openGraph: {
    type: "website",
    url: `${identity.site}/en/contact`,
    title: `Contact · ${identity.name}`,
    description:
      "Get in touch with Ariunbold Bold — open to software projects, hardware collaborations, and new opportunities.",
    siteName: identity.siteName,
    locale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact · ${identity.name}`,
    description:
      "Get in touch with Ariunbold Bold — open to software projects, hardware collaborations, and new opportunities.",
    images: ["/og-image.png"],
  },
};

export default async function ContactPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang;
  const dict = await getDictionary(params.lang as "en");

  return (
    <main className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col px-4 pt-10 pb-28 sm:px-6 sm:pt-12 md:px-12 md:pt-24 lg:pl-32 lg:pr-12">
      <div className="mb-8 md:mb-12">
        <Link href={`/${lang}`} className="group inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink transition-colors mb-4 md:mb-6">
          <span className="transition-transform group-hover:-translate-x-1">&larr;</span> {dict.ui.backToHome}
        </Link>
      </div>
      <Contact dict={dict} />
    </main>
  );
}

import type { Metadata } from "next";
import { getDictionary } from "@/app/lib/dictionaries";
import { resolveLocale } from "@/app/lib/locales";
import { Contact } from "@/app/components/sections/contact";
import { PageShell } from "@/app/components/page-shell";
import en from "@/app/lib/dictionaries/en";
import { buildAlternates, ogLocale } from "@/app/lib/seo";

const { identity } = en;

const description =
  "Get in touch with Ariunbold Bold — open to software projects, hardware collaborations, and new opportunities.";

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await props.params;

  return {
    title: "Contact",
    description,
    alternates: buildAlternates(identity.site, lang, "/contact"),
    openGraph: {
      type: "website",
      url: `${identity.site}/${lang}/contact`,
      title: `Contact · ${identity.name}`,
      description,
      siteName: identity.siteName,
      locale: ogLocale(lang),
      images: [
        {
          url: `${identity.site}/hero.JPG`,
          width: 1200,
          height: 630,
          alt: `Contact ${identity.name} — Software & Hardware Developer`,
        },
      ],
    },
    robots: { index: true, follow: true },
  };
}

export default async function ContactPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await props.params;
  const dict = await getDictionary(resolveLocale(lang));

  return (
    <PageShell lang={lang} backLabel={dict.ui.backToHome}>
      <Contact dict={dict} />
    </PageShell>
  );
}

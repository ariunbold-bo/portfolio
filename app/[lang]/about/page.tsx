import type { Metadata } from "next";
import { getDictionary } from "@/app/lib/dictionaries";
import { resolveLocale } from "@/app/lib/locales";
import { About } from "@/app/components/sections/about";
import { PageShell } from "@/app/components/page-shell";
import en from "@/app/lib/dictionaries/en";
import { buildAlternates, ogLocale } from "@/app/lib/seo";

const { identity } = en;

const description =
  "Learn about Ariunbold Bold — a self-taught systems developer from Mongolia building full-stack web apps, hardware mods, and everything in between.";

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await props.params;

  return {
    title: "About Me",
    description,
    alternates: buildAlternates(identity.site, lang, "/about"),
    openGraph: {
      type: "website",
      url: `${identity.site}/${lang}/about`,
      title: `About Me · ${identity.name}`,
      description,
      siteName: identity.siteName,
      locale: ogLocale(lang),
      images: [
        {
          url: `${identity.site}/hero.webp`,
          width: 1200,
          height: 630,
          alt: `${identity.name} — Software & Hardware Developer from Mongolia`,
        },
      ],
    },
    robots: { index: true, follow: true },
  };
}

export default async function AboutPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await props.params;
  const dict = await getDictionary(resolveLocale(lang));

  return (
    <PageShell lang={lang} backLabel={dict.ui.backToHome}>
      <About dict={dict} />
    </PageShell>
  );
}

import type { Metadata } from "next";
import { getDictionary } from "@/app/lib/dictionaries";
import { resolveLocale } from "@/app/lib/locales";
import { Hardware } from "@/app/components/sections/hardware";
import { Projects } from "@/app/components/sections/projects";
import { PageShell } from "@/app/components/page-shell";
import en from "@/app/lib/dictionaries/en";
import { buildAlternates, ogLocale } from "@/app/lib/seo";

const { identity } = en;

const description =
  "Explore the projects built by Ariunbold Bold — ranging from full-stack applications to hardware and real-time collaborative tools.";

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await props.params;

  return {
    title: "Projects",
    description,
    alternates: buildAlternates(identity.site, lang, "/projects"),
    openGraph: {
      type: "website",
      url: `${identity.site}/${lang}/projects`,
      title: `Projects · ${identity.name}`,
      description,
      siteName: identity.siteName,
      locale: ogLocale(lang),
      images: [
        {
          url: `${identity.site}/hero.JPG`,
          width: 1200,
          height: 630,
          alt: `Projects by ${identity.name} — Software & Hardware`,
        },
      ],
    },
    robots: { index: true, follow: true },
  };
}

export default async function ProjectsPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await props.params;
  const dict = await getDictionary(resolveLocale(lang));

  return (
    <PageShell lang={lang} backLabel={dict.ui.backToHome}>
      <div className="flex w-full flex-col space-y-28 sm:space-y-36 md:space-y-56">
        <Hardware dict={dict} lang={lang} />
        <Projects dict={dict} />
      </div>
    </PageShell>
  );
}

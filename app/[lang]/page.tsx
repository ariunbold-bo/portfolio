import Link from "next/link";
import { getDictionary } from "../lib/dictionaries";
import { Hero } from "../components/sections/hero";
import { Stack } from "../components/sections/stack";
import { Journey } from "../components/sections/journey";
import { Hardware } from "../components/sections/hardware";
import { Projects } from "../components/sections/projects";

export default async function LandingZone(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const dict = await getDictionary(params.lang as "en");
  const lang = params.lang;

  return (
    <main className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col px-4 pt-10 pb-28 sm:px-6 sm:pt-12 md:px-12 md:pt-24 lg:pl-32 lg:pr-12">
      <div className="flex w-full flex-col space-y-28 sm:space-y-36 md:space-y-56">
        <Hero dict={dict} lang={lang} />
        <Stack dict={dict} />
        <Journey dict={dict} />

        {/* Footer CTA */}
        <div className="pb-8 border-t border-[var(--border)] pt-16 flex flex-col items-center gap-6 text-center">
          <p className="text-sm text-muted max-w-sm leading-relaxed">
            {dict.ui.wantToKnowMore}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href={`/${lang}/about`} className="btn btn-ghost">
              {dict.ui.aboutLabel} &rarr;
            </Link>
            <Link href={`/${lang}/contact`} className="btn btn-download">
              {dict.ui.contactLabel} &rarr;
            </Link>
          </div>
          <p className="text-xs text-muted opacity-60 mt-4">
            {dict.ui.footer.replace("{year}", new Date().getFullYear().toString())}
          </p>
        </div>
      </div>
    </main>
  );
}

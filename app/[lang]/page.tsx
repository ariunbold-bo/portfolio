import Link from "next/link";
import { getDictionary } from "../lib/dictionaries";
import { resolveLocale } from "../lib/locales";
import { Hero } from "../components/sections/hero";
import { Hardware } from "../components/sections/hardware";
import { Projects } from "../components/sections/projects";
import { Journey } from "../components/sections/journey";
import { About } from "../components/sections/about";

export default async function LandingZone(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang;
  const dict = await getDictionary(resolveLocale(lang));
  // easter egg for programers
  console.log(`%c${dict.ui.easterEgg}`, "font-weight: bold; color: #c4a575;");
  return (
    <main className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col px-4 pt-10 pb-28 sm:px-6 sm:pt-12 md:px-12 md:pt-24 lg:pl-32 lg:pr-12">
      <div className="flex w-full flex-col space-y-28 sm:space-y-36 md:space-y-56">
        <Hero dict={dict} lang={lang} />
        <About dict={dict} />
        <Projects dict={dict} />
        <Hardware dict={dict} lang={lang} />
        {/* due to being useless ill be moving it to idk doodle? im gonna import it somewhere*/}
        {/* <Synth /> */}
        <Journey dict={dict} lang={lang} />

        {/* Footer CTA */}
        <footer className="pb-8 border-t border-[var(--border)] pt-16 flex flex-col items-center gap-6 text-center">
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
          <p className="text-xs text-muted mt-4">
            {dict.ui.footer.replace(
              "{year}",
              new Date().getFullYear().toString(),
            )}
          </p>
        </footer>
      </div>
    </main>
  );
}

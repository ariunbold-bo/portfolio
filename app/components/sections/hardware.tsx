import Image from "next/image";
import Link from "next/link";
import { Dictionary } from "@/app/lib/types";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { Icon } from "../icons";

/**
 * Hardware projects as alternating "object + spec sheet" rows. Each project
 * leads with its poster/visual so the physical work reads as tangible, with
 * the kicker, summary, and a compact spec grid on the opposing side.
 */
export function Hardware({ dict, lang }: { dict: Dictionary; lang: string }) {
  return (
    <section id="hardware" className="scroll-mt-32">
      <Reveal variant="up">
        <SectionHeading
          as="h1"
          label={dict.ui.hardwareLabel}
          title={dict.ui.hardwareTitle}
          description={dict.ui.hardwareDesc}
        />
      </Reveal>

      <div className="mt-10 space-y-16 sm:mt-12 sm:space-y-20 lg:mt-16 lg:space-y-28">
        {dict.hardware.map((hw, i) => {
          const poster = hw.media?.[0]?.poster;
          const reversed = i % 2 === 1;

          return (
            <Reveal key={hw.slug} variant="up">
              <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                {/* Visual */}
                <div
                  className={`relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface-solid)] shadow-[var(--shadow)] ${
                    reversed ? "lg:order-2" : ""
                  }`}
                >
                  {poster ? (
                    <Image
                      src={poster}
                      alt={hw.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center text-[var(--accent)]">
                      <Icon name={hw.icon} className="h-16 w-16 opacity-40" />
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
                    {hw.kicker}
                  </span>
                </div>

                {/* Info */}
                <div className={reversed ? "lg:order-1" : ""}>
                  <span className="text-xs font-bold uppercase tracking-widest text-accent">
                    {hw.kicker}
                  </span>
                  <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink-strong sm:text-4xl">
                    {hw.name}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                    {hw.summary}
                  </p>

                  <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] sm:mt-8">
                    {hw.specs.map((spec) => (
                      <div key={spec.label} className="bg-[var(--surface)] p-4">
                        <dt className="text-[0.65rem] font-semibold uppercase tracking-widest text-accent">
                          {spec.label}
                        </dt>
                        <dd className="mt-1 text-sm font-medium text-ink-strong">
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <Link
                    href={`/${lang}/work/${hw.slug}`}
                    className="btn btn-primary hover-lift mt-8 inline-flex"
                  >
                    {dict.ui.more}
                    <Icon name="arrowRight" className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

import Link from "next/link";
import { hardware } from "@/app/lib/content";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { GlassCard } from "../glass-card";
import { Icon } from "../icons";

export function Hardware() {
  return (
    <section id="hardware" className="scroll-mt-32">
      <Reveal variant="up">
        <SectionHeading
          label="Hardware"
          title="Where software meets physical logic."
          description="A selection of my physical engineering projects, including microcontrollers and hardware modification."
        />
      </Reveal>

      <div className="mt-10 grid gap-8 sm:mt-12 sm:gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-12">
        {hardware.map((hw, i) => (
          <Reveal key={hw.slug} variant="up" delay={i * 200}>
            <GlassCard className="flex h-full flex-col overflow-hidden glow-hover hover-lift">
              <div className="p-6 sm:p-8 lg:p-10 flex-grow">
                <div className="mb-4 flex items-center justify-between sm:mb-6">
                  <span className="text-xs font-bold tracking-widest text-accent uppercase">
                    {hw.kicker}
                  </span>
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-[var(--surface-solid)] text-ink">
                    <Icon name={hw.icon} className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="mb-3 text-2xl font-bold text-ink-strong sm:text-3xl">
                  {hw.name}
                </h3>
                <p className="mb-6 text-base leading-relaxed text-muted sm:text-lg">
                  {hw.summary}
                </p>
                {/* <div className="space-y-6">
                  {hw.sections.map((section) => (
                    <div key={section.title}>
                      <h4 className="mb-2 font-semibold text-ink">
                        {section.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-muted">{section.body}</p>
                    </div>
                  ))}
                </div> */}
                <div className="relative bottom-0">
                  <Link
                    href={`/work/${hw.slug}`}
                    className="btn btn-primary hover-lift"
                  >
                    More...
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-px border-t border-[var(--border)] bg-[var(--border)] sm:grid-cols-4">
                {hw.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="bg-[var(--surface)] p-4 text-center"
                  >
                    <span className="block text-[0.65rem] font-semibold uppercase tracking-widest text-accent">
                      {spec.label}
                    </span>
                    <span className="mt-1 block text-sm font-medium text-ink-strong">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

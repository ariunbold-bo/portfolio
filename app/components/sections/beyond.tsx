import { Dictionary } from '@/app/lib/types';
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { GlassCard } from "../glass-card";
import { Icon } from "../icons";

export function Beyond({ dict }: { dict: Dictionary }) {
  return (
    <section id="beyond" className="scroll-mt-32">
      <Reveal variant="up">
        <SectionHeading
          label="Beyond Code"
          title="Disciplines & Growth"
          description="How I sharpen my logic and physical discipline outside of engineering."
        />
      </Reveal>

      <div className="mt-10 grid gap-10 sm:mt-12 sm:gap-12 lg:mt-16 lg:grid-cols-2 lg:gap-12">
        {/* Disciplines */}
        <div className="space-y-4 sm:space-y-6">
          <Reveal variant="up" delay={100}>
            <h2 className="mb-4 text-xl font-semibold text-ink-strong sm:mb-6 sm:text-2xl">
              Personal Disciplines
            </h2>
          </Reveal>
          {dict.disciplines.map((item, i) => (
            <Reveal key={item.title} variant="up" delay={(i + 1) * 100}>
              <GlassCard className="flex items-start gap-3 p-5 sm:gap-4 sm:p-6 lg:p-8 glow-hover hover-lift">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--surface-solid)] text-ink sm:h-12 sm:w-12">
                  <Icon name={item.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <h4 className="text-base font-semibold text-ink-strong sm:text-lg">
                      {item.title}
                    </h4>
                    <span className="shrink-0 text-[0.6rem] font-semibold uppercase tracking-widest text-accent sm:text-xs">
                      {item.meta}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-muted sm:text-sm">
                    {item.body}
                  </p>
                  {item.youtubeId && (
                    <div className="mt-4 overflow-hidden rounded-xl bg-[var(--surface-solid)] relative aspect-video w-full">
                      <iframe
                        src={`https://www.youtube.com/embed/${item.youtubeId}?si=FjStXGCP8C6gnIzN&rel=0`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full border-0"
                      />
                    </div>
                  )}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        {/* Growth Targets */}
        <div className="space-y-4 sm:space-y-6">
          <Reveal variant="up" delay={100}>
            <h2 className="mb-4 text-xl font-semibold text-ink-strong sm:mb-6 sm:text-2xl">
              Current Growth Targets
            </h2>
          </Reveal>
          <div className="grid gap-3 sm:gap-4">
            {dict.growth.map((item, i) => (
              <Reveal key={item.no} variant="up" delay={(i + 1) * 100}>
                <div className="group flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-4 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface)] sm:gap-4 sm:p-5">
                  <span className="text-xs font-bold tracking-widest text-accent mt-0.5 sm:mt-1">
                    {item.no}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h4 className="mb-1 text-sm font-semibold text-ink flex items-center gap-2 sm:text-base flex-wrap">
                      {item.title}
                      {item.wip && (
                        <span className="chip px-1.5 py-0.5 text-[0.6rem]">
                          WIP
                        </span>
                      )}
                    </h4>
                    <p className="text-xs leading-relaxed text-muted sm:text-sm">
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

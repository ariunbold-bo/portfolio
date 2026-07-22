import { Dictionary } from '@/app/lib/types';
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { GlassCard } from "../glass-card";
import { TimelineLine } from "../timeline-line";

export function Journey({ dict }: { dict: Dictionary }) {
  return (
    <section id="journey" className="scroll-mt-32">
      <Reveal variant="up">
        <SectionHeading label="Journey" title="My path in technology." />
      </Reveal>

      <div className="relative mt-12 sm:mt-16 md:mt-24">
        <TimelineLine />

        <div className="space-y-8 sm:space-y-10 md:space-y-24">
          {dict.timeline.map((entry, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={entry.when}
                className="relative flex flex-col md:flex-row md:items-center md:justify-between group"
              >
                {/* Desktop: The empty space on the opposite side to balance the layout */}
                <div
                  className={`hidden md:block md:w-[45%] ${isLeft ? "order-2" : "order-1"}`}
                />

                {/* The Dot on the timeline */}
                <div className="absolute left-6 md:left-1/2 flex h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-[var(--bg)] bg-[var(--surface-solid)] shadow-[var(--shadow)] z-10 transition-colors duration-500 group-hover:border-[rgba(var(--accent-rgb),0.3)]">
                  <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[var(--muted)] transition-all duration-300 group-hover:scale-150 group-hover:bg-accent group-hover:shadow-[0_0_10px_rgba(var(--accent-rgb),0.8)]" />
                </div>

                {/* The Card */}
                <div
                  className={`ml-14 w-[calc(100%-3.75rem)] sm:ml-16 sm:w-[calc(100%-4.25rem)] md:ml-0 md:w-[45%] ${isLeft ? "order-1" : "order-2"}`}
                >
                  <Reveal variant="up" delay={100} className="w-full">
                    <GlassCard className="p-5 sm:p-6 md:p-8 glow-hover hover-lift relative">
                      <span className="mb-2 block text-xs font-bold tracking-widest text-accent uppercase">
                        {entry.when}
                      </span>
                      <h3 className="mb-2 text-base font-semibold text-ink-strong sm:text-lg md:text-xl">
                        {entry.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-muted sm:text-sm">
                        {entry.body}
                      </p>
                    </GlassCard>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

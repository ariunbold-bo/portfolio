import { stack } from "@/app/lib/content";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { GlassCard } from "../glass-card";
import { Icon } from "../icons";

export function Stack() {
  return (
    <section id="stack" className="scroll-mt-32">
      <Reveal variant="up">
        <SectionHeading label="The Stack" title="Engineering capabilities." />
      </Reveal>

      <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:mt-16 lg:grid-cols-3">
        {stack.map((item, i) => (
          <Reveal key={item.no} variant="up" delay={i * 100}>
            <GlassCard className="flex h-full flex-col p-8 glow-hover hover-lift">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-xs font-bold tracking-widest text-accent">
                  {item.no}
                </span>
                <div className="grid h-12 w-12 place-items-center rounded-full bg-[var(--surface-solid)] text-ink">
                  <Icon name={item.icon} className="h-6 w-6" />
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-ink-strong">
                {item.title}
              </h3>
              <p className="mb-6 text-sm font-medium text-accent">{item.tag}</p>
              <p className="mt-auto text-muted">{item.body}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

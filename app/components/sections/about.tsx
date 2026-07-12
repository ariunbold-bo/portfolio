import { identity, knowsAbout } from "@/app/lib/content";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { GlassCard } from "../glass-card";

export function About() {
  return (
    <section id="about" className="scroll-mt-32">
      <Reveal variant="up">
        <SectionHeading
          label="About Me"
          title="Bridging software and hardware."
        />
      </Reveal>

      <div className="mt-10 grid gap-6 sm:mt-12 sm:gap-8 lg:mt-16 lg:grid-cols-[1fr_400px]">
        <Reveal variant="left" delay={100}>
          <GlassCard className="flex h-full flex-col justify-center p-6 glow-hover sm:p-8 lg:p-10">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-xl font-bold text-on-accent shadow-lg shadow-[rgba(var(--accent-rgb),0.3)] sm:h-16 sm:w-16 sm:text-2xl">
              {identity.initials}
            </div>
            <h2 className="mb-3 text-xl font-semibold text-ink-strong sm:text-2xl">
              {identity.role}
            </h2>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              {identity.tagline}
            </p>
          </GlassCard>
        </Reveal>

        <Reveal variant="right" delay={200}>
          <GlassCard className="flex h-full flex-col p-6 bg-[var(--surface-2)] glow-hover sm:p-8 lg:p-10">
            <h2 className="mb-4 text-xs font-bold tracking-widest text-accent uppercase sm:mb-6">
              Core Technologies
            </h2>
            <div className="flex flex-wrap gap-2">
              {knowsAbout.map((tech) => (
                <span key={tech} className="chip text-xs sm:text-sm">
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-6 sm:pt-10">
              <div className="mb-4 h-px w-full bg-[var(--border-strong)] sm:mb-6" />
              <p className="text-xs italic leading-relaxed text-muted sm:text-sm">
                &ldquo;Actively moving lower level, into memory, toolchains, and
                the metal underneath the frameworks.&rdquo;
              </p>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}

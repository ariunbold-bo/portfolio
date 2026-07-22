import { Dictionary } from '@/app/lib/types';
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { GlassCard } from "../glass-card";

export function Projects({ dict }: { dict: Dictionary }) {
  return (
    <section id="projects" className="scroll-mt-32">
      <Reveal variant="up">
        <SectionHeading
          label="Software Projects"
          title="Selected web applications."
        />
      </Reveal>

      <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:mt-16 lg:grid-cols-3">
        {dict.projects.map((proj, i) => (
          <Reveal key={proj.name} variant="up" delay={(i % 3) * 100}>
            <GlassCard className="flex h-full flex-col p-8 glow-hover hover-lift">
              <h3 className="mb-3 text-xl font-semibold text-ink-strong">
                {proj.name}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-muted flex-grow">
                {proj.blurb}
              </p>
              <div className="mb-6 flex flex-wrap gap-2">
                {proj.tags.map((tag) => (
                  <span key={tag} className="chip text-[0.7rem] px-2 py-1">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 border-t border-[var(--border)] pt-4">
                <a
                  href={proj.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-sm font-semibold text-accent"
                >
                  Live Site
                </a>
                <a
                  href={proj.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-sm font-semibold text-accent"
                >
                  Source
                </a>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

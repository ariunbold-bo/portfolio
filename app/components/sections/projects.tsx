import { Dictionary } from "@/app/lib/types";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { Icon } from "../icons";

/**
 * Software projects as an editorial "index" — each row is a numbered entry
 * with the name, a one-line description, tags, and the two canonical links.
 * Bigger typography and a left accent bar on hover read more like a personal
 * changelog than a grid of identical cards.
 */
export function Projects({ dict }: { dict: Dictionary }) {
  return (
    <section id="projects" className="scroll-mt-32">
      <Reveal variant="up">
        <SectionHeading
          label={dict.ui.softwareLabel}
          title={dict.ui.softwareTitle}
        />
      </Reveal>

      <div className="mt-10 sm:mt-12 lg:mt-16">
        {dict.projects.map((proj, i) => (
          <Reveal key={proj.name} variant="up" delay={i * 100}>
            <article className="group relative flex flex-col gap-4 border-t border-[var(--border)] py-8 sm:flex-row sm:items-start sm:gap-8 sm:py-10">
              {/* hover accent bar */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-[var(--accent)] transition-transform duration-500 group-hover:scale-y-100"
              />

              <span className="shrink-0 font-mono text-xs text-[var(--accent)]/80 tabular-nums sm:pt-1.5 sm:text-sm">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0 flex-1">
                <h3 className="text-2xl font-bold tracking-tight text-[var(--ink-strong)] transition-colors duration-300 group-hover:text-[var(--accent)] sm:text-3xl">
                  {proj.name}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                  {proj.blurb}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {proj.tags.map((tag) => (
                    <span key={tag} className="chip text-[0.7rem] px-2.5 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-5 sm:flex-col sm:items-end sm:gap-3 sm:pt-1">
                <a
                  href={proj.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-link inline-flex items-center gap-1.5"
                >
                  {dict.ui.liveSite}
                  <Icon
                    name="arrowUpRight"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
                <a
                  href={proj.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-link inline-flex items-center gap-1.5"
                >
                  {dict.ui.source}
                  <Icon
                    name="arrowUpRight"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

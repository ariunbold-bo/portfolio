import { Dictionary } from "@/app/lib/types";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { ProjectCard } from "../project-card";

export function Projects({ dict }: { dict: Dictionary }) {
  return (
    <section id="projects" className="scroll-mt-32">
      <Reveal variant="up">
        <SectionHeading
          label={dict.ui.softwareLabel}
          title={dict.ui.softwareTitle}
        />
      </Reveal>

      <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:mt-16 lg:grid-cols-3">
        {dict.projects.map((proj, i) => (
          <Reveal key={proj.name} variant="up" delay={(i % 3) * 100}>
            <ProjectCard
              proj={proj}
              liveSiteLabel={dict.ui.liveSite}
              sourceLabel={dict.ui.source}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
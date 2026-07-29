import { Dictionary } from '@/app/lib/types';
import { Reveal } from "../reveal";
import { Typewriter } from "../typewriter";

export function Hero({ dict }: { dict: Dictionary }) {
  const dob = new Date(dict.identity.dob);
  const now = new Date();
  const age = now.getFullYear() - dob.getFullYear() -
    (now < new Date(now.getFullYear(), dob.getMonth(), dob.getDate()) ? 1 : 0);

  return (
    <section
      id="home"
      className="relative flex min-h-[90vh] flex-col justify-center items-center text-center"
    >
      <Reveal variant="fade" delay={100} className="flex flex-col items-center">
        <div className="mb-6 flex items-center gap-3 flex-wrap justify-center">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)]/80" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-[var(--accent)]" />
          </span>
          <span className="chip text-[0.65rem] tracking-wider uppercase font-semibold">
            {dict.ui.openForOpp}
          </span>
          <span className="btn btn-pill text-[0.65rem]">
            {age} y/o
          </span>
        </div>
        <h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-tight text-[var(--ink-strong)] sm:text-5xl md:text-[5.5rem] md:leading-[1.1] drop-shadow-sm max-w-4xl mx-auto">
          {dict.identity.name}
          <br />
          <span className="text-[var(--accent)]">{dict.identity.role}</span>
        </h1>
      </Reveal>
      
      <Reveal variant="up" delay={300} className="mt-8 max-w-2xl mx-auto">
        <p className="text-lg leading-relaxed text-[var(--ink)] sm:text-xl md:text-2xl min-h-[3.5rem] drop-shadow-sm">
          <Typewriter />
        </p>
      </Reveal>
      
      <Reveal variant="up" delay={500} className="mt-12 flex flex-wrap justify-center gap-4">
        <a href="#projects" className="btn btn-primary hover-lift">
          {dict.ui.viewProjects}
        </a>
        <a href="#contact" className="btn btn-ghost hover-lift">
          {dict.ui.contactMe}
        </a>
      </Reveal>
    </section>
  );
}

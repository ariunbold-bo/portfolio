import { Dictionary } from '@/app/lib/types';
import { Reveal } from "../reveal";
import { Typewriter } from "../typewriter";

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="home"
      className="relative flex min-h-[90vh] flex-col justify-center"
    >
      <Reveal variant="fade" delay={100}>
        <div className="mb-6 flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/80" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
          </span>
          <span className="chip text-[0.65rem] tracking-wider">
            Open for opportunities
          </span>
        </div>
        <h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-tight text-ink-strong sm:text-5xl md:text-[5.5rem] md:leading-[1.1]">
          {dict.identity.name}
          <br />
          <span className="gradient-text">{dict.identity.role}</span>
        </h1>
      </Reveal>
      <Reveal variant="up" delay={300} className="mt-8 max-w-2xl">
        <p className="text-lg leading-relaxed text-muted sm:text-xl md:text-2xl min-h-[3.5rem]">
          <Typewriter />
        </p>
      </Reveal>
      <Reveal variant="up" delay={500} className="mt-12 flex flex-wrap gap-4">
        <a href="#projects" className="btn btn-primary hover-lift">
          View Projects
        </a>
        <a href="#contact" className="btn btn-ghost hover-lift">
          Contact Me
        </a>
      </Reveal>

      {/* Decorative floating elements */}
      <div className="pointer-events-none absolute right-10 top-20 -z-10 animate-float opacity-50 hidden md:block">
        <div className="h-40 w-40 rounded-full bg-[var(--accent)] blur-3xl mix-blend-multiply opacity-20" />
      </div>
      <div
        className="pointer-events-none absolute right-1/4 bottom-1/4 -z-10 animate-float-slow opacity-50 hidden md:block"
        style={{ animationDelay: "2s" }}
      >
        <div className="h-32 w-32 rounded-full bg-[var(--blush)] blur-3xl mix-blend-multiply opacity-30" />
      </div>
    </section>
  );
}

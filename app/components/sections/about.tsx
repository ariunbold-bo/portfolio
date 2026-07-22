import Image from "next/image";
import { Dictionary } from '@/app/lib/types';
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { GlassCard } from "../glass-card";

export function About({ dict }: { dict: Dictionary }) {
  return (
    <section id="about" className="scroll-mt-32">
      <Reveal variant="up">
        <SectionHeading
          label="About Me"
          title="Bridging software and hardware."
        />
      </Reveal>

      <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_400px]">
        <Reveal variant="left" delay={100}>
          <GlassCard className="flex h-full flex-col justify-center p-8 glow-hover sm:p-10">
            {/* <div className="mb-8 grid h-24 w-24 place-items-center rounded-[2rem] bg-accent/20 text-4xl font-bold text-accent sm:h-32 sm:w-32 sm:text-5xl shadow-[0_0_40px_rgba(var(--accent-rgb),0.3)] relative overflow-hidden">
              <Image 
                src="/profile.png" 
                alt="Ariunbold Bold" 
                fill 
                className="object-cover"
                sizes="(max-width: 640px) 96px, 128px"
              />
            </div> */}
            <h2 className="mb-3 text-xl font-semibold text-ink-strong sm:text-2xl">
              {dict.identity.role}
            </h2>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              {dict.identity.tagline}
            </p>
          </GlassCard>
        </Reveal>

        <Reveal variant="right" delay={200}>
          <GlassCard className="flex h-full flex-col p-6 bg-[var(--surface-2)] glow-hover sm:p-8 lg:p-10">
            <h2 className="mb-4 text-xs font-bold tracking-widest text-accent uppercase sm:mb-6">
              Core Technologies
            </h2>
            <div className="flex flex-wrap gap-2">
              {dict.knowsAbout.map((tech) => (
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

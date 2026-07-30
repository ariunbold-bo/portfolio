import Link from "next/link";
import { Dictionary } from '@/app/lib/types';
import { Reveal } from "../reveal";
import { Typewriter } from "../typewriter";
import Image from "next/image";

export function Hero({ dict, lang = "en" }: { dict: Dictionary; lang?: string }) {
  const dob = new Date(dict.identity.dob);
  const now = new Date();
  const age = now.getFullYear() - dob.getFullYear() -
    (now < new Date(now.getFullYear(), dob.getMonth(), dob.getDate()) ? 1 : 0);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-center pb-20"
    >
      {/* ── Background: large ghosted index numeral ── */}
      <div
        aria-hidden
        className="pointer-events-none select-none absolute right-0 top-1/2 -translate-y-1/2 font-bold leading-none tracking-tighter text-[30vw] text-[var(--accent)] opacity-[0.03] z-0"
      >
        AB
      </div>

      {/* ── Ambient glow blobs ── */}
      <div className="absolute top-[10%] right-[8%] w-[380px] h-[380px] blob bg-[var(--accent)]/12 -z-10" />
      <div className="absolute bottom-[8%] left-[-4%] w-[280px] h-[280px] blob bg-[var(--accent-2)]/8 -z-10" style={{ animationDelay: '-7s', animationDuration: '28s' }} />

      {/* ── Top decorative rule ── */}
      <div className="absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent opacity-50" />

      {/* ── Section label ── */}
      <Reveal variant="fade" delay={0}>
        <div className="flex items-center gap-3 mb-10 md:mb-14">
          <span className="h-px w-8 bg-[var(--accent)] opacity-70" />
          <span className="text-[0.65rem] font-semibold tracking-[0.22em] uppercase text-[var(--accent)] opacity-80">
            Portfolio — {new Date().getFullYear()}
          </span>
        </div>
      </Reveal>

      {/* ── Main grid ── */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-8 lg:gap-12">

        {/* LEFT: Content */}
        <div className="flex flex-col min-w-0">

          {/* Status badge */}
          <Reveal variant="fade" delay={80}>
            <div className="inline-flex items-center gap-2.5 mb-8 self-start">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[0.7rem] font-medium tracking-wider uppercase text-[var(--muted)]">
                {dict.ui.openForOpp}
              </span>
              <span className="mx-1 h-3 w-px bg-[var(--border-strong)]" />
           
          {/* no need for seconth time */}
        
              {/* <span className="text-[0.7rem] font-medium text-[var(--muted)]">
                {age} y/o
              </span> */}
            </div>
          </Reveal>

          {/* Name — large editorial */}
          <Reveal variant="fade" delay={150}>
            <h1 className="font-bold tracking-tight leading-[1.05] mb-2 text-[var(--ink-strong)]">
              <span className="block text-[clamp(2.4rem,5vw,4.5rem)]">
                {dict.identity.name.split(' ')[0]}
              </span>
              <span className="block text-[clamp(2.4rem,5vw,4.5rem)]">
                {dict.identity.name.split(' ').slice(1).join(' ')}
              </span>
            </h1>
          </Reveal>

          {/* Role line */}
          <Reveal variant="up" delay={250}>
            <div className="flex items-center gap-4 mb-8 mt-4">
              <div className="h-px w-10 bg-[var(--accent)] opacity-60" />
              <p
                className="text-sm font-semibold tracking-[0.14em] uppercase"
                style={{
                  background: 'linear-gradient(90deg, var(--accent) 0%, var(--accent-2) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {dict.identity.role}
              </p>
            </div>
          </Reveal>

          {/* Typewriter */}
          <Reveal variant="up" delay={350} className="mb-10 min-h-[3rem]">
            <p className="text-base leading-relaxed text-[var(--ink)] max-w-md">
              <Typewriter />
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal variant="up" delay={480} className="flex flex-wrap items-center gap-4 sm:gap-6 mt-8">
            <div className="flex items-center gap-4">
              <Link
                href={`/${lang}/projects`}
                className="btn btn-primary hover-lift glow-hover px-7 py-3.5 text-sm"
              >
                {dict.ui.viewProjects}
              </Link>
              <Link
                href={`/${lang}/contact`}
                className="btn btn-ghost hover-lift px-7 py-3.5 text-sm"
              >
                {dict.ui.contactMe}
              </Link>
            </div>
          </Reveal>

          {/* Stats */}
          <Reveal variant="up" delay={620}>
            <div className="mt-12 pt-8 border-t border-[var(--border)] grid grid-cols-3 gap-6 max-w-sm">
              {[
                { value: age.toString(), label: dict.ui.yearsOld },
                { value: '4+', label: dict.ui.yearsCoding },
                { value: '50+', label: dict.ui.projectsBuilt },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span
                    className="text-2xl font-bold tracking-tight"
                    style={{
                      background: 'linear-gradient(135deg, var(--ink-strong) 30%, var(--accent) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-[0.68rem] font-medium uppercase tracking-wider text-[var(--muted)]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* RIGHT: Image */}
        <Reveal
          variant="fade"
          delay={300}
          className="flex justify-center items-center self-center order-first md:order-last"
        >
          {/* Outer wrapper: padding gives room for floating badges without clipping. No overflow-hidden here. */}
          <div className="relative pt-6 pb-8 px-6" style={{ width: 'min(100%, 360px)' }}>
            {/* Glow behind card */}
            <div className="absolute inset-4 rounded-[3rem] bg-gradient-to-br from-[var(--accent)]/35 to-[var(--accent-2)]/15 blur-[3rem] opacity-60 group-hover:opacity-90 transition-opacity duration-1000 -z-10" />

            {/* Glass card — hover lifts and tilts */}
            <div className="group relative w-full aspect-[4/5] bg-[var(--surface)]/50 backdrop-blur-xl rounded-[2rem] border border-[var(--border-strong)] p-2.5 shadow-2xl transition-all duration-700 hover:-translate-y-3 hover:rotate-1 hover:shadow-[0_40px_80px_-20px_rgba(var(--accent-rgb),0.3)]">

              {/* Corner accent marks */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[var(--accent)] rounded-tl opacity-60" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[var(--accent)] rounded-tr opacity-60" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[var(--accent)] rounded-bl opacity-60" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[var(--accent)] rounded-br opacity-60" />

              {/* Image wrapper — this is the ONLY overflow-hidden */}
              <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
                {/* Subtle gradient on top of photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10 pointer-events-none" />
                <Image
                  src="/hero.JPG"
                  alt={dict.identity.name}
                  width={600}
                  height={750}
                  className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
                  priority
                />
              </div>
            </div>

            {/* Floating location badge — sits below the card, outside glass frame */}
            <div className="absolute bottom-0 left-2 flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-solid)]/90 backdrop-blur-sm px-3.5 py-2 shadow-lg">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent)] shrink-0">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span className="text-[0.68rem] font-medium text-[var(--ink)]">{dict.identity.location}</span>
            </div>

            {/* Floating role badge — sits above the card, outside glass frame */}
            <div className="absolute top-0 right-2 flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-solid)]/90 backdrop-blur-sm px-3.5 py-2 shadow-lg">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse shrink-0" />
              <span className="text-[0.68rem] font-medium text-[var(--accent)]">
                {dict.identity.role.split(' ')[0]}
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ── Bottom decorative rule ── */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent opacity-40" />
    </section>
  );
}
// oh god that took a while tbh
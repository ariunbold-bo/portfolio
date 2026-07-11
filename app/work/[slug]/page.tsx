import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { hardware, type HardwareProject } from "@/app/lib/content";
import { SiteBackground } from "@/app/components/site-background";
import { ScrollProgress } from "@/app/components/scroll-progress";
import { NavRail } from "@/app/components/nav-rail";
import { Reveal } from "@/app/components/reveal";
import { Icon } from "@/app/components/icons";

interface Props {
  params: Promise<{ slug: string }>;
}

function findProject(slug: string): HardwareProject | undefined {
  return hardware.find((h) => h.slug === slug);
}

function findAdjacent(slug: string): {
  prev: HardwareProject | null;
  next: HardwareProject | null;
} {
  const idx = hardware.findIndex((h) => h.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? hardware[idx - 1] : null,
    next: idx < hardware.length - 1 ? hardware[idx + 1] : null,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const proj = findProject(slug);
  if (!proj) return { title: "Not Found" };
  return {
    title: `${proj.name} — Hardware Project`,
    description: proj.summary,
    openGraph: {
      title: proj.name,
      description: proj.summary,
      images: proj.heroMedia.poster ?? proj.heroMedia.src,
    },
  };
}

/** Circuit‑dot pattern for decorative backgrounds */
function CircuitDots({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      aria-hidden="true"
    >
      {/* horizontal lines */}
      <line x1="0" y1="40" x2="200" y2="40" />
      <line x1="0" y1="100" x2="200" y2="100" />
      <line x1="0" y1="160" x2="200" y2="160" />
      {/* vertical lines */}
      <line x1="40" y1="0" x2="40" y2="200" />
      <line x1="100" y1="0" x2="100" y2="200" />
      <line x1="160" y1="0" x2="160" y2="200" />
      {/* dots */}
      <circle cx="40" cy="40" r="2" fill="currentColor" stroke="none" />
      <circle cx="100" cy="40" r="2" fill="currentColor" stroke="none" />
      <circle cx="160" cy="40" r="2" fill="currentColor" stroke="none" />
      <circle cx="40" cy="100" r="2" fill="currentColor" stroke="none" />
      <circle cx="100" cy="100" r="2" fill="currentColor" stroke="none" />
      <circle cx="160" cy="100" r="2" fill="currentColor" stroke="none" />
      <circle cx="40" cy="160" r="2" fill="currentColor" stroke="none" />
      <circle cx="100" cy="160" r="2" fill="currentColor" stroke="none" />
      <circle cx="160" cy="160" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const proj = findProject(slug);
  if (!proj) notFound();

  const { prev, next } = findAdjacent(slug);

  return (
    <>
      <SiteBackground />
      <ScrollProgress />
      <NavRail />

      <main className="relative z-10 mx-auto max-w-5xl px-4 pt-6 pb-28 sm:px-6 sm:pt-8 md:px-12 md:pt-12 lg:pl-32 lg:pr-12">
        {/* ── Back link ── */}
        <Reveal variant="fade" delay={0}>
          <Link
            href="/#hardware"
            className="group mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted transition-colors hover:text-accent sm:mb-8"
          >
            <Icon name="arrowLeft" className="h-3.5 w-3.5" />
            <span className="link-underline">All Projects</span>
          </Link>
        </Reveal>

        {/* ── HERO ── */}
        <div className="mb-14 grid gap-8 sm:mb-18 lg:grid-cols-[1fr_1.2fr] lg:gap-12 lg:items-center">
          <Reveal variant="fade" delay={100}>
            <div>
              <span className="section-label">{proj.kicker}</span>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink-strong sm:text-5xl md:text-6xl lg:text-7xl lg:leading-[1.05]">
                {proj.name}
              </h1>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
                {proj.summary}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {proj.specs.map((spec) => (
                  <span key={spec.label} className="chip">
                    <span className="font-semibold text-accent">
                      {spec.label}:
                    </span>{" "}
                    {spec.value}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal
            variant="up"
            delay={150}
            className="order-first lg:order-last"
          >
            <div className="overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-2)] shadow-[var(--shadow)]">
              {/* window bar */}
              <div className="flex items-center gap-1.5 border-b border-[var(--border)] px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
                <span className="ml-2 text-[0.55rem] font-mono font-semibold tracking-wider text-muted">
                  {proj.slug === "esp32" ? "preview.mp4" : "render.png"}
                </span>
              </div>
              {proj.heroMedia.type === "video" ? (
                <video
                  src={proj.heroMedia.src}
                  poster={proj.heroMedia.poster}
                  controls
                  playsInline
                  className="w-full aspect-[4/3] object-cover"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={proj.heroMedia.src}
                    alt={proj.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              )}
            </div>
          </Reveal>
        </div>

        {/* ── HIGHLIGHTS ── */}
        {proj.highlights.length > 0 && (
          <Reveal variant="up" delay={200}>
            <div className="mb-14 grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] sm:mb-18 sm:grid-cols-3">
              {proj.highlights.map((h, i) => (
                <div
                  key={i}
                  className="relative bg-[var(--surface)] p-5 sm:p-6"
                >
                  <span className="absolute top-3 right-3 text-[0.55rem] font-mono font-bold text-accent/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <CircuitDots className="absolute bottom-3 right-3 h-14 w-14 text-[var(--border)]" />
                  <p className="relative max-w-[75%] text-sm leading-relaxed text-ink sm:text-base">
                    {h}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {/* ── SECTIONS ── */}
        <div className="space-y-16 sm:space-y-20 lg:space-y-24">
          {proj.sections.map((section, i) => {
            const ch = String(i + 1).padStart(2, "0");

            /* Split body into paragraphs for readability */
            const paragraphs = section.body.split(/(?<=\.)\s+/).filter(Boolean);

            if (i === 0) {
              /* Section 1: Split layout */
              return (
                <Reveal key={section.title} variant="up" delay={80}>
                  <span className="section-label">Section {ch}</span>
                  <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_2fr] lg:items-start">
                    <h2 className="text-2xl font-bold text-ink-strong sm:text-3xl lg:sticky lg:top-24 lg:text-4xl">
                      {section.title}
                    </h2>
                    <div className="glass card glow-hover rounded-2xl p-6 sm:p-8 lg:p-10">
                      {paragraphs.map((p, pi) => (
                        <p
                          key={pi}
                          className="text-sm leading-relaxed text-muted sm:text-base sm:leading-relaxed [&:not(:last-child)]:mb-4"
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            }

            if (i === proj.sections.length - 1) {
              /* Last section: Terminal block */
              return (
                <Reveal key={section.title} variant="up" delay={80}>
                  <span className="section-label">Section {ch}</span>
                  <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-solid)] shadow-[var(--shadow)]">
                    <div className="flex items-center gap-1.5 border-b border-[var(--border)] bg-[var(--surface-2)] px-5 py-2.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
                      <span className="ml-2 text-xs font-medium text-muted">
                        {section.title}
                      </span>
                    </div>
                    <div className="px-5 py-6 font-mono text-sm leading-relaxed sm:px-6 sm:py-8 lg:px-8 lg:py-10">
                      {paragraphs.map((p, pi) => (
                        <p
                          key={pi}
                          className="[&:not(:last-child)]:mb-4 before:mr-2 before:text-muted/40 before:content-['$']"
                        >
                          {p}
                        </p>
                      ))}
                      <span className="mt-4 block h-4 w-2 animate-pulse rounded-sm bg-accent/60" />
                    </div>
                  </div>
                </Reveal>
              );
            }

            /* Middle sections: Accent bar on left */
            return (
              <Reveal key={section.title} variant="up" delay={80}>
                <div className="relative pl-8 sm:pl-10">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full bg-gradient-to-b from-accent via-accent-2 to-transparent" />
                  <span className="mb-1 block text-xs font-bold tracking-wider text-accent/60">
                    Section {ch}
                  </span>
                  <h2 className="mb-4 text-2xl font-bold text-ink-strong sm:text-3xl lg:text-4xl">
                    {section.title}
                  </h2>
                  {paragraphs.map((p, pi) => (
                    <p
                      key={pi}
                      className="text-sm leading-relaxed text-muted sm:text-base sm:leading-relaxed [&:not(:last-child)]:mb-4"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* ── DATASHEET ── */}
        <Reveal variant="up" delay={120}>
          <div className="relative mt-14 overflow-hidden rounded-2xl border-2 border-[var(--border-strong)] bg-[var(--surface-2)] sm:mt-18 lg:mt-22">
            <CircuitDots className="pointer-events-none absolute top-0 right-0 h-28 w-28 text-[var(--border-strong)] opacity-30" />
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="mb-6 flex items-center gap-3">
                <div className="grid h-8 w-8 place-items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-accent">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="16" rx="2.5" />
                    <path d="m7 9 3 3-3 3M13 15h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-accent">
                    Datasheet
                  </h3>
                  <p className="text-[0.65rem] text-muted">
                    Project specifications
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                {proj.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-center transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow)] sm:p-5"
                  >
                    <span className="block text-[0.55rem] font-bold uppercase tracking-[0.15em] text-accent sm:text-xs">
                      {spec.label}
                    </span>
                    <span className="mt-2 block text-base font-black text-ink-strong sm:text-xl">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── PREV / NEXT ── */}
        <nav
          aria-label="Adjacent projects"
          className="mt-14 flex items-stretch gap-4 sm:mt-18 lg:mt-22"
        >
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="group flex flex-1 flex-col items-start gap-1 rounded-2xl border border-[var(--border-strong)] p-5 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow)] active:translate-y-0 sm:p-6"
            >
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-accent">
                <Icon name="arrowLeft" className="h-3 w-3" />
                Prev
              </span>
              <span className="text-base font-bold text-ink-strong sm:text-lg">
                {prev.name}
              </span>
              <span className="text-xs text-muted">{prev.kicker}</span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className="group flex flex-1 flex-col items-end gap-1 rounded-2xl border border-[var(--border-strong)] p-5 text-right transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow)] active:translate-y-0 sm:p-6"
            >
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-accent">
                Next
                <Icon name="arrowRight" className="h-3 w-3" />
              </span>
              <span className="text-base font-bold text-ink-strong sm:text-lg">
                {next.name}
              </span>
              <span className="text-xs text-muted">{next.kicker}</span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </nav>
      </main>
    </>
  );
}

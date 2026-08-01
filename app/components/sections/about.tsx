"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Dictionary, GalleryItem } from "@/app/lib/types";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { GlassCard } from "../glass-card";
import { Icon } from "../icons";
import { LightboxModal } from "../lightbox";

export function About({ dict }: { dict: Dictionary }) {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveItem(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="about" className="scroll-mt-32">
      <Reveal variant="up">
        <SectionHeading as="h1" label={dict.ui.aboutLabel} title={dict.ui.aboutTitle} />
      </Reveal>

      {/* — Bio + Tech Stack — */}
      <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_400px]">
        <Reveal variant="left" delay={100}>
          <GlassCard className="flex h-full flex-col justify-center p-8 glow-hover sm:p-10">
            <h2 className="mb-3 text-xl font-semibold text-ink-strong sm:text-2xl">
              {dict.identity.role}
            </h2>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              {dict.identity.tagline}
            </p>
          </GlassCard>
        </Reveal>

        <Reveal variant="right" delay={200}>
          <GlassCard className="flex h-full flex-col p-6 bg-surface-2 glow-hover sm:p-8 lg:p-10">
            <h2 className="mb-4 text-xs font-bold tracking-widest text-accent uppercase sm:mb-6">
              {dict.ui.coreTechnologies}
            </h2>
            <div className="flex flex-wrap gap-2">
              {dict.knowsAbout.map((tech) => (
                <span key={tech} className="chip text-xs sm:text-sm">
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-auto pt-6 sm:pt-10">
              <div className="mb-4 h-px w-full bg-line-strong sm:mb-6" />
              <p className="text-xs italic leading-relaxed text-muted sm:text-sm">
                &ldquo;{dict.ui.activelyMoving}&rdquo;
              </p>
            </div>
          </GlassCard>
        </Reveal>
      </div>

      {/* — Disciplines & Growth — */}
      <div className="mt-24 grid gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-12">
        {/* Disciplines */}
        <div className="space-y-4 sm:space-y-6">
          <Reveal variant="up" delay={100}>
            <h2 className="mb-4 text-xl font-semibold text-ink-strong sm:mb-6 sm:text-2xl">
              {dict.ui.personalDisciplines}
            </h2>
          </Reveal>
          {dict.disciplines.map((item, i) => (
            <Reveal key={item.title} variant="up" delay={(i + 1) * 100}>
              <GlassCard className="flex items-start gap-3 p-5 sm:gap-4 sm:p-6 lg:p-8 glow-hover hover-lift">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--surface-solid)] text-ink sm:h-12 sm:w-12">
                  <Icon name={item.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <h3 className="text-base font-semibold text-ink-strong sm:text-lg">
                      {item.title}
                    </h3>
                    <span className="shrink-0 text-[0.6rem] font-semibold uppercase tracking-widest text-accent sm:text-xs">
                      {item.meta}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-muted sm:text-sm">
                    {item.body}
                  </p>
                  {/* {item.youtubeId && (
                    <div className="mt-4 overflow-hidden rounded-xl bg-[var(--surface-solid)] relative aspect-video w-full">
                      <iframe
                        src={`https://www.youtube.com/embed/${item.youtubeId}?rel=0`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full border-0"
                      />
                    </div>
                  )} */}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        {/* Growth Targets */}
        <div className="space-y-4 sm:space-y-6">
          <Reveal variant="up" delay={100}>
            <h2 className="mb-4 text-xl font-semibold text-ink-strong sm:mb-6 sm:text-2xl">
              {dict.ui.growthTargets}
            </h2>
          </Reveal>
          <div className="grid gap-3 sm:gap-4">
            {dict.growth.map((item, i) => (
              <Reveal key={item.no} variant="up" delay={(i + 1) * 100}>
                <div className="group flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-4 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface)] sm:gap-4 sm:p-5">
                  <span className="text-xs font-bold tracking-widest text-accent mt-0.5 sm:mt-1">
                    {item.no}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1 text-sm font-semibold text-ink flex items-center gap-2 sm:text-base flex-wrap">
                      {item.title}
                      {item.wip && (
                        <span className="chip px-1.5 py-0.5 text-[0.6rem]">
                          {dict.ui.wip}
                        </span>
                      )}
                    </h3>
                    <p className="text-xs leading-relaxed text-muted sm:text-sm">
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* — Gallery (Beyond the Screen) — */}
      <div className="mt-24 columns-1 gap-6 sm:columns-2 lg:columns-3">
        {dict.gallery.map((item, i) => (
          <Reveal key={item.src} variant="up" delay={i * 80}>
            <GlassCard
              className="mb-6 overflow-hidden group relative cursor-pointer border border-[rgba(var(--accent-rgb),0.25)] shadow-[0_0_30px_rgba(var(--accent-rgb),0.2)]"
              onClick={() => setActiveItem(item)}
            >
              <div
                className={`relative w-full ${item.aspectRatio} bg-[var(--surface-solid)]`}
              >
                {item.type === "video" ? (
                  <>
                    <video
                      src={`${item.src}#t=0.1`}
                      muted
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="rounded-full bg-black/30 p-3 text-white backdrop-blur-sm shadow-xl transition-all group-hover:bg-black/50 group-hover:scale-110 ring-1 ring-white/20">
                        <Icon
                          name="play"
                          className="h-6 w-6 translate-x-0.5"
                          fill="currentColor"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10 dark:group-hover:bg-white/5 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-black/50 p-3 text-white backdrop-blur-md shadow-xl scale-95 group-hover:scale-100">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>

      {/* Lightbox modal */}
      <LightboxModal
        activeItem={activeItem}
        onClose={() => setActiveItem(null)}
        dict={dict}
      />
    </section>
  );
}

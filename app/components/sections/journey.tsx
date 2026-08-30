"use client";

import { useState } from "react";
import Link from "next/link";
import { Dictionary } from "@/app/lib/types";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { GlassCard } from "../glass-card";
import { TimelineLine } from "../timeline-line";
import Image from "next/image";
import { LightboxModal } from "../lightbox";

export function Journey({ dict, lang }: { dict: Dictionary; lang: string }) {
  const [toggledItems, setToggledItems] = useState<Record<number, boolean>>({});
  const [activeLightboxItem, setActiveLightboxItem] = useState<{
    type: "image" | "video";
    src: string;
    alt?: string;
  } | null>(null);

  return (
    <section id="journey" className="scroll-mt-32">
      <Reveal variant="up">
        <SectionHeading
          label={dict.ui.journeyLabel}
          title={dict.ui.journeyTitle}
        />
      </Reveal>

      <div className="relative mt-12 sm:mt-16 md:mt-24">
        <TimelineLine />

        <div className="space-y-8 sm:space-y-10 md:space-y-24">
          {dict.timeline.map((entry, index) => {
            const isLeft = index % 2 === 0;
            const toggled = toggledItems[index];
            const isMobileOpen = toggled === true;
            const isDesktopOpen = toggled !== false;

            const handleClick = () => {
              const isDesktop = window.innerWidth >= 768;
              const currentlyOpen = isDesktop ? toggled !== false : toggled === true;
              setToggledItems(prev => ({
                ...prev,
                [index]: !currentlyOpen
              }));
            };

            return (
              <div
                key={entry.when}
                className="relative flex flex-col md:flex-row md:items-center md:justify-between group"
              >
                {/* Desktop: The empty space on the opposite side to balance the layout */}
                <div
                  className={`hidden md:block md:w-[45%] ${isLeft ? "order-2" : "order-1"}`}
                />

                {/* The Dot on the timeline */}
                <div
                  className={`absolute left-6 md:left-1/2 flex h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 -translate-x-1/2 items-center justify-center rounded-full border-[3px] bg-[var(--surface-solid)] shadow-[var(--shadow)] z-10 transition-colors duration-500 ${
                    isMobileOpen
                      ? "border-[rgba(var(--accent-rgb),0.5)]"
                      : "border-[var(--bg)] group-hover:border-[rgba(var(--accent-rgb),0.3)]"
                  } ${
                    isDesktopOpen
                      ? "md:border-[rgba(var(--accent-rgb),0.5)]"
                      : "md:border-[var(--bg)] md:group-hover:border-[rgba(var(--accent-rgb),0.3)]"
                  }`}
                >
                  <div
                    className={`h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full transition-all duration-300 ${
                      isMobileOpen
                        ? "scale-150 bg-accent shadow-[0_0_10px_rgba(var(--accent-rgb),0.8)]"
                        : "bg-[var(--muted)] group-hover:scale-150 group-hover:bg-accent group-hover:shadow-[0_0_10px_rgba(var(--accent-rgb),0.8)]"
                    } ${
                      isDesktopOpen
                        ? "md:scale-150 md:bg-accent md:shadow-[0_0_10px_rgba(var(--accent-rgb),0.8)]"
                        : "md:scale-100 md:bg-[var(--muted)] md:shadow-none md:group-hover:scale-150 md:group-hover:bg-accent md:group-hover:shadow-[0_0_10px_rgba(var(--accent-rgb),0.8)]"
                    }`}
                  />
                </div>

                {/* The Card */}
                <div
                  className={`ml-14 w-[calc(100%-3.75rem)] sm:ml-16 sm:w-[calc(100%-4.25rem)] md:ml-0 md:w-[45%] ${isLeft ? "order-1" : "order-2"}`}
                >
                  <Reveal variant="up" delay={100} className="w-full">
                    <GlassCard
                      className={`p-5 sm:p-6 md:p-8 glow-hover hover-lift relative cursor-pointer select-none ${
                        isMobileOpen
                          ? "shadow-[0_0_24px_rgba(var(--accent-rgb),0.18)]"
                          : ""
                      } ${
                        isDesktopOpen
                          ? "md:shadow-[0_0_24px_rgba(var(--accent-rgb),0.18)]"
                          : "md:shadow-none"
                      }`}
                      onClick={handleClick}
                    >
                      {/* Header row */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <span className="mb-2 block text-xs font-bold tracking-widest text-accent uppercase">
                            {entry.when}
                          </span>
                          <h3 className="text-base font-semibold text-ink-strong sm:text-lg md:text-xl leading-snug">
                            {entry.title}
                          </h3>
                        </div>

                        {/* Chevron + hint */}
                        <div className="shrink-0 flex flex-col items-center gap-1 pt-0.5">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`h-4 w-4 transition-transform duration-300 ${
                              isMobileOpen ? "rotate-180 text-accent" : "text-muted"
                            } ${
                              isDesktopOpen
                                ? "md:rotate-180 md:text-accent"
                                : "md:rotate-0 md:text-muted"
                            }`}
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                          <span className={`text-[0.55rem] font-semibold uppercase tracking-widest text-muted whitespace-nowrap ${
                            isMobileOpen ? "hidden" : "hidden sm:block"
                          } ${
                            isDesktopOpen ? "md:hidden" : "md:block"
                          }`}>
                            tap
                          </span>
                        </div>
                      </div>

                      {/* Collapsible body */}
                      <div
                        className={`journey-body mt-3 ${isMobileOpen ? "open" : ""} ${isDesktopOpen ? "md-open" : "md-closed"}`}
                      >
                        <div className="journey-body-inner">
                          <p className="text-xs leading-relaxed text-muted sm:text-sm pt-1 border-t border-[var(--border)] mt-1">
                            {entry.body}
                          </p>
                          {/* Media rendering (Image or Video) */}
                          {/* i will be writing a migration to lightbox modal */}
                          {entry.image && (
                            <div className="mt-4 relative w-full overflow-hidden rounded-lg shadow-md" style={{ aspectRatio: entry.image.aspectRatio }}>
                              {entry.image.type === "video" ? (
                                <div 
                                  className="absolute inset-0 w-full h-full cursor-pointer group"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveLightboxItem({
                                      type: "video",
                                      src: entry.image!.src,
                                    });
                                  }}
                                >
                                  <video
                                    src={`${entry.image.src}#t=0.001`}
                                    loop
                                    muted
                                    playsInline
                                    preload="metadata"
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-opacity">
                                    <div className="bg-black/50 rounded-full p-3 backdrop-blur-sm group-hover:scale-110 transition-transform">
                                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <Image
                                  src={entry.image.src}
                                  alt={entry.image.alt}
                                  fill
                                  className="object-cover cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveLightboxItem({
                                      type: "image",
                                      src: entry.image!.src,
                                      alt: entry.image!.alt,
                                    });
                                  }}
                                />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </GlassCard>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-14 flex flex-col items-center gap-4 text-center">
        <p className="text-xs text-muted sm:text-sm md:hidden">
          {dict.ui.clickToReveal}
        </p>
        <Link
          href={`/${lang}/about`}
          className="btn btn-primary hover-lift glow-hover px-6 py-3 text-sm mt-2 shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)]"
        >
          {dict.ui.readFullStory}{" "}
          <span aria-hidden="true" className="ml-1 font-bold">
            &rarr;
          </span>
        </Link>
      </div>

      <LightboxModal
        activeItem={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
        dict={dict}
      />
    </section>
  );
}

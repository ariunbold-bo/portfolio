"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Dictionary } from "@/app/lib/types";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { GlassCard } from "../glass-card";
import { TimelineLine } from "../timeline-line";

export function Journey({ dict }: { dict: Dictionary }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const pathname = usePathname();
  const lang = pathname.split("/")[1] || "en";

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
            const isOpen = openIndex === index;

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
                  className={`absolute left-6 md:left-1/2 flex h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-[var(--bg)] bg-[var(--surface-solid)] shadow-[var(--shadow)] z-10 transition-colors duration-500 ${
                    isOpen
                      ? "border-[rgba(var(--accent-rgb),0.5)]"
                      : "group-hover:border-[rgba(var(--accent-rgb),0.3)]"
                  }`}
                >
                  <div
                    className={`h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full transition-all duration-300 ${
                      isOpen
                        ? "scale-150 bg-accent shadow-[0_0_10px_rgba(var(--accent-rgb),0.8)]"
                        : "bg-[var(--muted)] group-hover:scale-150 group-hover:bg-accent group-hover:shadow-[0_0_10px_rgba(var(--accent-rgb),0.8)]"
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
                        isOpen
                          ? "shadow-[0_0_24px_rgba(var(--accent-rgb),0.18)]"
                          : ""
                      }`}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
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
                            className={`h-4 w-4 text-muted transition-transform duration-300 ${
                              isOpen ? "rotate-180 text-accent" : ""
                            }`}
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                          {!isOpen && (
                            <span className="hidden sm:block text-[0.55rem] font-semibold uppercase tracking-widest text-muted/60 whitespace-nowrap">
                              tap
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Collapsible body */}
                      <div
                        className={`journey-body mt-3 ${isOpen ? "open" : ""}`}
                      >
                        <div className="journey-body-inner">
                          <p className="text-xs leading-relaxed text-muted sm:text-sm pt-1 border-t border-[var(--border)] mt-1">
                            {entry.body}
                          </p>
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
        <p className="text-xs text-muted sm:text-sm opacity-60">
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
    </section>
  );
}

"use client";

import React, { useEffect, useRef } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";

// ── Static icons (not translated) ────────────────────────────────
const TIMELINE_ICONS = [
  <svg key="0" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
  <svg key="1" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  <svg key="2" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>,
  <svg key="3" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>,
  <svg key="4" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>,
];

export function Timeline() {
  const { lang } = useLang();
  const t = translations[lang].timeline;

  const lineRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const nodeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0", "scale-100");
            entry.target.classList.remove("opacity-0", "translate-y-12", "scale-95");
            const dot = entry.target.querySelector(".timeline-dot");
            dot?.classList.add("bg-[var(--primary-accent-color)]", "shadow-[0_0_15px_var(--primary-accent-color)]");
            dot?.classList.remove("bg-[var(--glass-border)]");
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -100px 0px" }
    );

    document.querySelectorAll(".timeline-node").forEach((n) => nodeObserver.observe(n));

    const handleScroll = () => {
      if (!containerRef.current || !lineRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pct = Math.max(0, Math.min(100, ((window.innerHeight / 2 - rect.top) / rect.height) * 100));
      lineRef.current.style.height = `${pct}%`;
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => { nodeObserver.disconnect(); window.removeEventListener("scroll", handleScroll); };
  }, []);

  return (
    <div id="timeline" className="relative py-24 w-full flex flex-col items-center overflow-hidden z-10">
      <div className="flex items-center gap-4 mb-8 sm:mb-16">
        <div className="h-1 w-12 bg-gradient-to-r from-[#8B2C40] to-[#72363E] rounded-full flex-shrink-0" />
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center text-gradient">{t.sectionTitle}</h2>
        <div className="h-1 w-12 bg-gradient-to-l from-[#8B2C40] to-[#72363E] rounded-full flex-shrink-0" />
      </div>

      <div ref={containerRef} className="relative w-full max-w-5xl mx-auto px-4 sm:px-8">
        {/* Dim background line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[var(--glass-border)] -translate-x-1/2 rounded-full" />
        {/* Active fill line */}
        <div ref={lineRef} className="absolute left-8 md:left-1/2 top-0 w-px bg-[var(--primary-accent-color)] shadow-[0_0_15px_var(--primary-accent-color)] -translate-x-1/2 rounded-full transition-all duration-100 ease-out z-0" style={{ height: "0%" }} />

        <div className="flex flex-col gap-12 w-full">
          {t.items.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={index} className={`timeline-node relative flex flex-col md:flex-row items-start md:items-center w-full transition-all duration-700 ease-out opacity-0 translate-y-12 scale-95 ${isEven ? "md:flex-row-reverse" : ""}`}>
                {/* Dot */}
                <div className="absolute left-8 md:left-1/2 top-0 md:top-1/2 w-4 h-4 rounded-full border-4 border-[var(--primary-bg-color)] bg-[var(--glass-border)] -translate-x-1/2 md:-translate-y-1/2 z-10 timeline-dot transition-all duration-700 delay-300" />

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2" />

                {/* Card */}
                <div className={`w-full pl-20 pr-4 md:px-12 md:w-1/2 flex ${isEven ? "md:justify-start" : "md:justify-end"}`}>
                  <div className="glass-card p-4 sm:p-6 md:p-8 rounded-2xl w-full hover:bg-[var(--bg-glass-hover)] transition-colors duration-300 group border border-[var(--glass-border)] hover:border-[var(--primary-accent-color)]/50 relative overflow-hidden">
                    <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--primary-accent-color)] to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-700 blur-2xl rounded-3xl" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-[var(--bg-glass)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--primary-accent-color)] group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          {TIMELINE_ICONS[index]}
                        </div>
                        <span className="text-[var(--primary-accent-color)] font-mono font-bold tracking-widest text-sm bg-[var(--primary-accent-color)]/10 px-3 py-1 rounded-full border border-[var(--primary-accent-color)]/20">
                          {item.year}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--text-heading)] mb-2 group-hover:text-[var(--primary-accent-color)] transition-colors">{item.title}</h3>
                      <p className="text-[var(--text-body)] text-sm md:text-base leading-relaxed select-text">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

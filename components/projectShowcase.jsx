"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";

// Static project metadata (links / images don't need translation)
const PROJECT_META = [
  { id: 1, thumbnail: "/canu.webp",    link: "https://canu.vercel.app",                  git: "https://github.com/ariunbold-bo/canu.git" },
  { id: 2, thumbnail: "/psp.webp",     link: "https://psp-ten-zeta.vercel.app/",          git: "https://github.com/ariunbold-bo/psp.git" },
  { id: 3, thumbnail: "/mogio.webp",   link: "https://mogio.vercel.app",                  git: "https://github.com/ariunbold-bo/moi_mogio.git" },
  { id: 4, thumbnail: "/snow.webp",    link: "https://magalang-snowflakes.vercel.app",     git: "https://github.com/ariunbold-bo/magalang-snowflakes.git" },
  { id: 5, thumbnail: "/magalang.webp",link: "https://magalang.vercel.app",                git: "https://github.com/ariunbold-bo/magalang.git" },
  { id: 6, thumbnail: "/guess.webp",   link: "https://guessthenumber-amber.vercel.app",    git: "https://github.com/ariunbold-bo/guess-the-number.git" },
];

// GitHub icon (static SVG)
const GithubIcon = () => (
  <svg height={20} width={20} fill="currentColor" className="text-[var(--text-heading)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" aria-hidden="true">
    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z" />
  </svg>
);

export function ProjectShowcase() {
  const { lang } = useLang();
  const t = translations[lang].projects;

  const containerRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);

  // Merge translated text with static meta
  const projects = PROJECT_META.map((meta, i) => ({ ...meta, ...t.items[i] }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("animate-fadeInScale", e.isIntersecting)),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    const cards = containerRef.current?.querySelectorAll(".project-card-observable");
    cards?.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  // Dismiss active card on outside touch
  useEffect(() => {
    const dismiss = () => setActiveCard(null);
    document.addEventListener("touchstart", dismiss, { passive: true });
    return () => document.removeEventListener("touchstart", dismiss);
  }, []);

  const handleTouch = (e, project) => {
    e.stopPropagation();
    if (activeCard === project.id) {
      window.open(project.link, "_blank");
      setActiveCard(null);
    } else {
      setActiveCard(project.id);
    }
  };

  const handleKeyDown = (e, project) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (activeCard === project.id) { window.open(project.link, "_blank"); setActiveCard(null); }
      else setActiveCard(project.id);
    }
    if (e.key === "Escape") setActiveCard(null);
  };

  return (
    <div id="page3" ref={containerRef} className="page3 w-full flex flex-col gap-12 p-4 md:p-8 justify-center items-center relative">
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-center mb-4 sm:mb-8 text-gradient">{t.sectionTitle}</h2>

      <div className="flex flex-wrap gap-8 justify-center max-w-7xl">
        {projects.map((project) => {
          const isActive = activeCard === project.id;
          return (
            <article
              key={project.id}
              role="button"
              tabIndex={0}
              aria-label={`${project.name} — ${project.description}. ${isActive ? t.pressToOpen : t.pressToPreview}`}
              onTouchStart={(e) => handleTouch(e, project)}
              onKeyDown={(e) => handleKeyDown(e, project)}
              onClick={() => { if (window.matchMedia("(hover: hover)").matches) window.open(project.link, "_blank"); }}
              className="project-card-observable opacity-0 group relative w-[350px] h-[280px] glass-card rounded-2xl overflow-hidden cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-accent-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--primary-bg-color)] transition-shadow"
            >
              {/* Default face */}
              <div className={`absolute inset-0 p-6 flex flex-col justify-center items-center text-center transition-all duration-500 select-text ${isActive ? "opacity-0 pointer-events-none" : "group-hover:opacity-0"}`}>
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-heading)] mb-3 transition-transform group-hover:translate-y-[-10px]">{project.name}</h3>
                <p className="text-sm text-[var(--text-body)] leading-relaxed">{project.description}</p>
                <div className="mt-4 text-[var(--primary-accent-color)] text-sm font-semibold">
                  <span className="sm:inline hidden">{t.hoverHint}</span>
                  <span className="sm:hidden inline">{t.tapHint}</span>
                </div>
              </div>

              {/* Preview overlay */}
              <div
                className={`absolute inset-0 bg-black/80 flex flex-col justify-center items-center gap-6 backdrop-blur-sm p-6 transition-all duration-500 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                aria-hidden={!isActive}
              >
                <div className="relative w-full h-32 rounded-lg overflow-hidden shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                  <Image src={project.thumbnail} alt={`${project.name} screenshot`} fill sizes="350px" quality={50} loading="lazy" className="object-cover" />
                </div>
                <div className="flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
                  <a
                    href={project.link} target="_blank" rel="noopener noreferrer"
                    aria-label={`${t.visitSite} — ${project.name}`}
                    onClick={(e) => e.stopPropagation()}
                    className="px-4 py-2 bg-[var(--primary-accent-color)] text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {t.visitSite}
                  </a>
                  {project.git && (
                    <a
                      href={project.git} target="_blank" rel="noopener noreferrer"
                      aria-label={`${t.viewSource} — ${project.name}`}
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 border border-[var(--glass-border)] rounded-lg hover:bg-[var(--bg-glass-hover)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-accent-color)]"
                    >
                      <GithubIcon />
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

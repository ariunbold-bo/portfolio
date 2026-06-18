"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";

export function Intro() {
  const { lang } = useLang();
  const t = translations[lang].intro;

  const containerRef = useRef(null);
  const introductionRef = useRef(null);
  const introImageRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const introduction = introductionRef.current;
    const introImage = introImageRef.current;
    let containerHeight = container.offsetHeight || 500;

    const handleResize = () => { containerHeight = container.offsetHeight || 500; };

    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const progress = Math.min(1, window.scrollY / (containerHeight * 0.6));
        const translateX = 70 * progress;
        const opacity = Math.max(0, 1 - progress);
        introduction.style.opacity = opacity;
        introduction.style.transform = `translate3d(${-translateX}%, 0, 0)`;
        introImage.style.transform = `translate3d(${translateX}%, 0, 0)`;
        introImage.style.opacity = opacity;
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <header
      id="page1"
      ref={containerRef}
      className="introPage min-h-[92dvh] z-5 w-full overflow-hidden relative px-0 pt-20 lg:pt-0"
    >
      {/* Background blobs */}
      <div className="absolute top-20 left-20 w-72 h-72 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, var(--gradient-blob-1) 0%, transparent 70%)" }}
      />
      <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, var(--gradient-blob-2) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between w-full px-4 lg:px-12 gap-6 lg:gap-12 z-5">
        <div
          ref={introductionRef}
          className="flex flex-col gap-3 lg:gap-6 max-w-2xl lg:items-start items-center text-center lg:text-left"
          style={{ willChange: "transform, opacity" }}
        >
          <div>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-2 lg:mb-4 leading-tight">
              {t.greeting}<br />
              <span className="text-gradient-accent">{t.name}</span>
            </h1>
            <p className="text-sm sm:text-xl text-[var(--primary-text)] opacity-80">{t.subtitle}</p>
          </div>

          <div className="flex gap-3 lg:gap-4 mt-2 lg:mt-4">
            <button
              onClick={() => window.scroll({ left: 0, top: document.body.scrollHeight, behavior: "auto" })}
              className="defaultButton btn-primary"
            >
              {t.cta.contact}
            </button>
            <button
              onClick={() => window.scroll({ left: 0, top: window.innerHeight * 3, behavior: "smooth" })}
              className="defaultButton btn-outline"
            >
              {t.cta.about}
            </button>
          </div>
        </div>

        <div
          ref={introImageRef}
          className="relative w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] lg:w-[500px] lg:h-[500px] animate-float"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#8B2C40] to-[#72363E] rounded-full blur-2xl opacity-20" />
          <Image
            height={690} width={530}
            alt={t.imgAlt}
            priority fetchPriority="high" quality={60}
            src="/profile.webp"
            className="!object-cover rounded-3xl shadow-2xl border border-[var(--glass-border)] relative scale-110 z-1 w-full h-full"
          />
        </div>
      </div>
    </header>
  );
}

"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { useLang } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";

export function CreativeEngineering() {
  const { lang } = useLang();
  const t = translations[lang].hardware;

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const modalVideoRef = useRef(null);

  const videoClasses =
    "cursor-pointer transform transition-all duration-300 ease-in-out " +
    "hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(139,44,64,0.3)] rounded-xl overflow-hidden border border-[var(--glass-border)]";

  const openModal = (src) => { setSelectedVideo(src); setTimeout(() => setIsOpen(true), 10); };
  const closeModal = () => { setIsOpen(false); setTimeout(() => setSelectedVideo(null), 300); };

  const VideoCard = ({ href, videoSrc, poster, ariaLabel, unavailableText, title, bullets }) => (
    <Link href={href} className="w-full xl:w-1/2 flex flex-col sm:flex-row gap-6 p-6 rounded-2xl glass-card hover:bg-[var(--bg-glass-hover)] transition-all duration-300 group cursor-pointer hover:scale-[1.02]">
      <div className="flex-shrink-0 mx-auto sm:mx-0 w-[246px]">
        <div className="aspect-[9/16] w-full overflow-hidden rounded-xl border border-[var(--glass-border)]">
          <video
            width="246" height="414"
            loop muted playsInline preload="none"
            poster={poster}
            aria-label={ariaLabel}
            className={videoClasses}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); openModal(videoSrc); }}
            onMouseOver={(e) => e.target.play().catch(() => {})}
            onMouseOut={(e) => e.target.pause()}
          >
            <source src={videoSrc} type="video/mp4" />
            <track kind="captions" label="English" srcLang="en" default />
            <div className="w-full h-full flex items-center justify-center bg-[var(--bg-glass)] text-[var(--text-muted)] text-xs text-center p-4">
              {unavailableText}
            </div>
          </video>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-5">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-[var(--primary-accent-color)]">{title}</h2>
        <ul className="space-y-3 text-sm sm:text-base text-[var(--text-body)]">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-[var(--primary-accent-color)]">•</span>
              {b}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center text-[var(--primary-accent-color)] font-medium text-sm group-hover:translate-x-2 transition-transform duration-300">
          {t.viewDetails} <span className="ml-2">→</span>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="flex select-text flex-col lg:flex-row p-4 sm:p-8 md:p-12 lg:p-20 min-h-screen w-full gap-8 lg:gap-16 justify-center items-center relative">
      {/* Modal */}
      {selectedVideo && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${isOpen ? "opacity-100 pointer-events-auto bg-black/80" : "opacity-0 pointer-events-none"}`}
          onClick={closeModal}
        >
          <div
            className="relative p-4 w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 max-w-4xl max-h-full bg-transparent transform transition-transform duration-300 ease-out"
            style={{ transform: isOpen ? "scale(1)" : "scale(0.75)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              className="w-full max-h-[80dvh] object-contain rounded-2xl shadow-2xl border border-[var(--glass-border)]"
              controls loop ref={modalVideoRef} autoPlay muted={false} playsInline
            >
              <source src={selectedVideo} type="video/mp4" />
              <track kind="captions" label="English" srcLang="en" default />
            </video>
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-[var(--text-muted)] text-4xl font-light hover:text-[var(--primary-accent-color)] transition-colors p-2 cursor-pointer z-50"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="w-full max-w-7xl flex flex-col gap-12">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-center text-gradient">{t.sectionTitle}</h1>
        <div className="w-full flex flex-col xl:flex-row gap-8 lg:gap-12">
          <VideoCard
            href="/esp32"
            videoSrc="/esp32-demo.mp4"
            poster="/esp32-poster.webp"
            ariaLabel={t.esp32.videoAlt}
            unavailableText={t.esp32.videoUnavailable}
            title={t.esp32.title}
            bullets={t.esp32.bullets}
          />
          <VideoCard
            href="/s21-mod"
            videoSrc="/mobile-compressed.mp4"
            poster="/mobile-poster.webp"
            ariaLabel={t.cryocell.videoAlt}
            unavailableText={t.cryocell.videoUnavailable}
            title={t.cryocell.title}
            bullets={t.cryocell.bullets}
          />
        </div>
      </div>
    </div>
  );
}

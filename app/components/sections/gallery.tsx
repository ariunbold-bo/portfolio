"use client";

import { useState, useEffect } from "react";
import { Dictionary } from '@/app/lib/types';
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import Image from "next/image";
import { GlassCard } from "../glass-card";
import { Icon } from "../icons";

type GalleryItem = {
  src: string;
  type: "video" | "image";
  alt: string;
  aspectRatio: string;
};

export function Gallery({ dict }: { dict: Dictionary }) {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveItem(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (activeItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeItem]);

  return (
    <section id="gallery" className="scroll-mt-32">
      <Reveal variant="up">
        <SectionHeading
          label="Life & Hobbies"
          title="Beyond the screen."
          description="A glimpse into what keeps me inspired when I step away from the keyboard."
        />
      </Reveal>

      <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3">
        {dict.gallery.map((item, i) => (
          <Reveal key={item.src} variant="up" delay={i * 100}>
            <GlassCard 
              className="mb-6 overflow-hidden group relative cursor-pointer border border-[var(--border)] hover:border-[var(--border-strong)] transition-all hover:scale-[1.02]"
              onClick={() => setActiveItem(item as GalleryItem)}
            >
              <div className={`relative w-full ${item.aspectRatio} bg-[var(--surface-solid)]`}>
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                  />
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
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </span>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>

      {/* Modal / Lightbox */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md transition-opacity"
          onClick={() => setActiveItem(null)}
        >
          <div 
            className="relative flex flex-col items-center animate-pop w-full max-w-[95vw] sm:max-w-4xl"
          >
            <button
              onClick={() => setActiveItem(null)}
              className="absolute -top-14 right-0 flex items-center gap-2 text-white/70 hover:text-white p-2 transition-colors z-10 bg-black/50 hover:bg-black/80 rounded-full sm:bg-transparent sm:hover:bg-transparent sm:rounded-none"
              aria-label="Close modal"
            >
              <span className="hidden sm:inline text-sm tracking-widest uppercase font-semibold">Close</span>
              <Icon name="x" className="h-6 w-6 sm:h-5 sm:w-5" />
            </button>
            {activeItem.type === "video" ? (
              <video
                src={activeItem.src}
                className="w-full h-auto max-h-[85vh] rounded-xl object-contain shadow-2xl ring-1 ring-white/10"
                autoPlay
                controls
                playsInline
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <img
                src={activeItem.src}
                alt={activeItem.alt}
                className="w-full h-auto max-h-[85vh] rounded-xl object-contain shadow-2xl ring-1 ring-white/10"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}

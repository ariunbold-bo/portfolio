"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "./icons";
import { useLenis } from "./smooth-scroll-provider";

interface LightboxModalProps {
  activeItem: {
    type: "image" | "video";
    src: string;
    alt?: string;
  } | null;
  onClose: () => void;
  dict: {
    ui: {
      close: string;
    };
  };
}

export function LightboxModal({
  activeItem,
  onClose,
  dict,
}: LightboxModalProps) {
  const [mounted, setMounted] = useState(false);
  const lenis = useLenis();

  // Prevent SSR/hydration errors in Next.js since document.body doesn't exist on the server
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock the background from scrolling while the modal is open. Lenis takes
  // over scroll handling entirely, so toggling `overflow` on html/body alone
  // isn't enough — it also needs to be stopped explicitly, or it'll keep
  // animating the page underneath the fullscreen overlay.
  useEffect(() => {
    if (!activeItem) return;

    const { documentElement, body } = document;
    const previousHtmlOverflow = documentElement.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    documentElement.style.overflow = "hidden";
    body.style.overflow = "hidden";
    lenis?.stop();

    return () => {
      documentElement.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      lenis?.start();
    };
  }, [activeItem, lenis]);

  if (!mounted || !activeItem) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center overscroll-contain bg-black/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div className="relative flex flex-col items-center animate-pop w-full max-w-[95vw] sm:max-w-4xl">
        <button
          onClick={onClose}
          className="absolute -top-14 right-0 flex items-center gap-2 text-white/70 hover:text-white p-2 transition-colors z-10 bg-black/50 hover:bg-black/80 rounded-full sm:bg-transparent sm:hover:bg-transparent sm:rounded-none"
          aria-label="Close modal"
        >
          <span className="hidden sm:inline text-sm tracking-widest uppercase font-semibold">
            {dict.ui.close}
          </span>
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
            muted
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
    </div>,
    document.body,
  );
}

"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Variant = "up" | "fade" | "scale" | "left" | "right" | "blur";

type Handler = {
  once: boolean;
  apply: (isVisible: boolean) => void;
};

// One shared IntersectionObserver for every Reveal instance instead of one
// observer per element. On pages with many Reveals (the home/journey sections
// have dozens) this removes a large pile of observers from hydration and keeps
// scroll handling on a single main-thread callback.
let sharedObserver: IntersectionObserver | null = null;
const observed = new Map<Element, Handler>();

function getSharedObserver(): IntersectionObserver | null {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return null;
  }
  if (sharedObserver) return sharedObserver;

  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const handler = observed.get(entry.target);
        if (!handler) continue;
        handler.apply(entry.isIntersecting);
        if (handler.once && entry.isIntersecting) {
          observed.delete(entry.target);
          sharedObserver?.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );

  return sharedObserver;
}

export function Reveal({
  children,
  variant = "up",
  delay = 0,
  once = false,
  className,
}: {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  once?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = getSharedObserver();
    if (!io) {
      el.classList.add("is-visible");
      return;
    }

    const handler: Handler = {
      once,
      apply: (isVisible) => {
        el.classList.toggle("is-visible", isVisible);
      },
    };

    observed.set(el, handler);
    io.observe(el);

    return () => {
      observed.delete(el);
      io.unobserve(el);
    };
  }, [once]);

  return (
    <div
      ref={ref}
      data-reveal={variant === "up" ? "" : variant}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      className={className}
    >
      {children}
    </div>
  );
}

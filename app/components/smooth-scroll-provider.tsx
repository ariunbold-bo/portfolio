"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type Lenis from "lenis";

const LenisContext = createContext<Lenis | null>(null);

/** Access the shared Lenis instance, e.g. to `.stop()`/`.start()` it around a modal. */
export function useLenis() {
  return useContext(LenisContext);
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Smooth scrolling only makes sense with a precise pointer (mouse/trackpad).
    // On touch devices native momentum scrolling already feels right and Lenis'
    // rAF loop (autoRaf) is pure main-thread overhead. Dynamic-importing it here
    // also keeps Lenis out of the initial bundle entirely on mobile.
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    let instance: Lenis | null = null;
    let handleClick: ((e: MouseEvent) => void) | null = null;
    let disposed = false;

    import("lenis").then(({ default: LenisCtor }) => {
      if (disposed) return;
      instance = new LenisCtor({
        lerp: 0.12,
        syncTouch: false,
        autoRaf: true, // Lenis manages its own rAF — avoids the double-raf jank
      });
      setLenis(instance);

      // Intercept anchor clicks so they use Lenis scrollTo (faster, consistent)
      handleClick = (e: MouseEvent) => {
        const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>(
          'a[href^="#"]',
        );
        if (!anchor) return;
        const id = anchor.getAttribute("href")!.slice(1);
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        instance!.scrollTo(target, { duration: 0.55, offset: -48 });
      };
      document.addEventListener("click", handleClick);
    });

    return () => {
      disposed = true;
      if (handleClick) document.removeEventListener("click", handleClick);
      instance?.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}

"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.12,
      syncTouch: false,
      autoRaf: true, // Lenis manages its own rAF — avoids the double-raf jank
    });

    // Sync scroll position into GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Tighter animation sync — no lag smoothing
    gsap.ticker.lagSmoothing(0);

    // Intercept anchor clicks so they use Lenis scrollTo (faster, consistent)
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href")!.slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { duration: 0.55, offset: -48 });
    };
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}


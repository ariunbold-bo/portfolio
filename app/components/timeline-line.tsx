"use client";

import { useEffect, useRef } from "react";

export function TimelineLine() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!ref.current) return;
        const parent = ref.current.parentElement;
        if (!parent) return;

        const rect = parent.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Start filling when the top of the timeline is 50% down the screen
        const start = rect.top - viewportHeight / 2;

        let progress = 0;
        if (start < 0) {
          // Progress is based on how far we've scrolled past that 50% mark
          // relative to the total height of the timeline container
          progress = Math.min(1, Math.abs(start) / rect.height);
        }

        ref.current.style.setProperty("--timeline-progress", String(progress));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="absolute left-6 sm:left-7 md:left-1/2 top-9 bottom-0 w-[2px] -ml-[1px] bg-[var(--border-strong)] z-0 rounded-full overflow-hidden md:top-0">
      <div
        ref={ref}
        className="w-full bg-accent origin-top transition-transform duration-150 ease-out"
        style={{
          height: "100%",
          transform: "scaleY(var(--timeline-progress, 0))",
        }}
      />
    </div>
  );
}

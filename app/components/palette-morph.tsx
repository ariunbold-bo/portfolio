"use client";

import { useEffect, useRef } from "react";

export type PaletteZone = "sky" | "forest" | "ember" | "teal";

/**
 * SINGLETON palette manager — only one section can be "active" at a time.
 *
 * The core bug with multiple independent IntersectionObservers is that when
 * two sections are simultaneously ≥15% visible (very common while scrolling),
 * both fire and thrash each other. This module keeps a priority map of which
 * sections are intersecting and picks the MOST intersecting one to win.
 *
 * All PaletteMorph instances register themselves here instead of each running
 * their own observer.
 */
const registry = new Map<
  string, // section id
  { palette: PaletteZone; ratio: number; order: number }
>();

let applyTimer: ReturnType<typeof setTimeout> | null = null;

function applyBestPalette() {
  if (applyTimer) clearTimeout(applyTimer);
  applyTimer = setTimeout(() => {
    const root = document.documentElement;

    // Find the section with the highest intersection ratio currently visible
    let best: { palette: PaletteZone; ratio: number; order: number } | null = null;
    for (const entry of registry.values()) {
      if (entry.ratio <= 0) continue;
      if (
        !best ||
        entry.ratio > best.ratio ||
        (entry.ratio === best.ratio && entry.order < best.order)
      ) {
        best = entry;
      }
    }

    // Clear all palette attributes
    root.removeAttribute("data-sky");
    root.removeAttribute("data-palette");

    if (best) {
      if (best.palette === "sky") {
        root.setAttribute("data-sky", "true");
      } else {
        root.setAttribute("data-palette", best.palette);
      }
    }
  }, 50);
}

let orderCounter = 0;

export function PaletteMorph({
  palette,
  children,
  className,
}: {
  palette: PaletteZone;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const idRef = useRef(`pm-${orderCounter++}`);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const id = idRef.current;
    const order = orderCounter;

    registry.set(id, { palette, ratio: 0, order });

    if (!("IntersectionObserver" in window)) {
      registry.set(id, { palette, ratio: 1, order });
      applyBestPalette();
      return () => {
        registry.delete(id);
        applyBestPalette();
      };
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          registry.set(id, {
            palette,
            ratio: entry.intersectionRatio,
            order,
          });
          applyBestPalette();
        }
      },
      // Use multiple thresholds for fine-grained ratio tracking
      {
        threshold: [0, 0.05, 0.1, 0.15, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      },
    );

    io.observe(el);

    return () => {
      io.disconnect();
      registry.delete(id);
      applyBestPalette();
    };
  }, [palette]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

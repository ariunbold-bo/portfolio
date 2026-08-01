"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { DEFAULT_LOCALE, type Locale, isLocale } from "./locales";

/** Derives the current locale segment from the URL pathname, e.g. `/mn/about` -> `"mn"`. */
export function useLocale(): Locale {
  const pathname = usePathname();
  const segment = pathname.split("/")[1];
  return segment && isLocale(segment) ? segment : DEFAULT_LOCALE;
}

/**
 * Runs `callback` once on mount and again on every scroll/resize, throttled
 * to at most once per animation frame. The listeners are attached exactly
 * once regardless of how often `callback`'s identity changes (it's always
 * read fresh via a ref), so callers don't need to memoize it.
 */
export function useRafOnScroll(callback: () => void) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => callbackRef.current());
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
}

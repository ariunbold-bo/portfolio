"use client";

import { useEffect, useRef, useState } from "react";
import { nav } from "@/app/lib/content";
import { Icon } from "./icons";
import { ThemeToggle } from "./theme-toggle";

const MAX_VISIBLE = 5;

export function NavRail() {
  const [active, setActive] = useState<string>("home");
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  // Close more menu on outside click
  useEffect(() => {
    if (!moreOpen) return;
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [moreOpen]);

  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const visible = nav.slice(0, MAX_VISIBLE);
  const overflow = nav.slice(MAX_VISIBLE);

  return (
    <>
      {/* Desktop vertical rail */}
      <nav
        aria-label="Section navigation"
        className="glass overflow-x-hidden animate-rise fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-1 rounded-full p-2 lg:flex"
      >
        {nav.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-label={item.label}
              aria-current={isActive ? "true" : undefined}
              className={`group relative grid h-11 w-11 place-items-center rounded-full transition-all duration-[400ms] ${
                isActive
                  ? "bg-accent text-on-accent shadow-[0_10px_24px_-10px_rgba(var(--accent-rgb),0.8)]"
                  : "text-muted hover:text-ink hover:bg-surface"
              }`}
            >
              <Icon name={item.icon} className="h-[1.15rem] w-[1.15rem]" />
              <span className="glass-2 pointer-events-none absolute left-[130%] whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium text-ink opacity-0 -translate-x-1 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                {item.label}
              </span>
            </a>
          );
        })}
        <span className="my-1 h-px w-6 bg-[var(--border-strong)]" />
        <ThemeToggle />
      </nav>

      {/* Mobile bottom bar */}
      <nav
        aria-label="Section navigation"
        className="glass fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center gap-0 rounded-none border-t border-[var(--border)] bg-[var(--surface)] px-2 py-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:bottom-3 sm:left-1/2 sm:right-auto sm:w-auto sm:-translate-x-1/2 sm:rounded-full sm:border sm:bg-transparent lg:hidden"
      >
        {visible.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-label={item.label}
              aria-current={isActive ? "true" : undefined}
              className={`grid h-12 w-12 shrink-0 place-items-center rounded-full transition-all duration-300 active:scale-90 touch-manipulation ${
                isActive
                  ? "bg-accent text-on-accent shadow-[0_6px_16px_-6px_rgba(var(--accent-rgb),0.6)]"
                  : "text-muted hover:text-ink hover:bg-surface-2"
              }`}
            >
              <Icon name={item.icon} className="h-[1.2rem] w-[1.2rem]" />
            </a>
          );
        })}

        {overflow.length > 0 && (
          <div ref={moreRef} className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((o) => !o)}
              aria-label="More sections"
              className={`grid h-12 w-12 shrink-0 place-items-center rounded-full transition-all duration-300 active:scale-90 touch-manipulation ${
                moreOpen
                  ? "bg-accent text-on-accent"
                  : "text-muted hover:text-ink hover:bg-surface-2"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-[1.2rem] w-[1.2rem]"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
              >
                <circle cx="12" cy="5" r="1.2" />
                <circle cx="12" cy="12" r="1.2" />
                <circle cx="12" cy="19" r="1.2" />
              </svg>
            </button>

            {moreOpen && (
              <div className="glass absolute bottom-[calc(100%+8px)] right-0 z-50 flex flex-col gap-1 rounded-2xl border border-[var(--border-strong)] p-2 shadow-[var(--shadow)] sm:right-auto sm:left-1/2 sm:-translate-x-1/2">
                {overflow.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      aria-label={item.label}
                      onClick={() => setMoreOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-accent text-on-accent"
                          : "text-muted hover:text-ink hover:bg-surface"
                      }`}
                    >
                      <Icon
                        name={item.icon}
                        className="h-[1.1rem] w-[1.1rem]"
                      />
                      {item.label}
                    </a>
                  );
                })}
                <span className="mx-2 my-1 h-px bg-[var(--border)]" />
                <div className="flex items-center justify-between px-3 py-1.5">
                  <span className="text-xs font-medium text-muted">Theme</span>
                  <ThemeToggle className="h-9 w-9" />
                </div>
              </div>
            )}
          </div>
        )}

        {overflow.length === 0 && (
          <>
            <span className="mx-1 h-6 w-px shrink-0 bg-[var(--border-strong)]" />
            <ThemeToggle className="h-12 w-12 shrink-0" />
          </>
        )}
      </nav>
    </>
  );
}

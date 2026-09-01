"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Dictionary } from "@/app/lib/types";
import { useLocale } from "@/app/lib/hooks";
import { Icon, type IconName } from "./icons";
import { ThemeToggle } from "./theme-toggle";

const MAX_VISIBLE = 5;

/** IDs that have their own dedicated page rather than being in-page anchors. */
const PAGE_IDS = new Set(["contact"]);

function navHref(id: string, lang: string, pathname: string) {
  if (id === "contact") return `/${lang}/${id}`;

  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;

  // home, hardware, projects, journey
  if (isHome) {
    return `#${id}`;
  } else {
    return `/${lang}/#${id}`;
  }
}

// Module-level component — avoids remounting on every NavRail render
function NavItem({
  id,
  label,
  icon,
  href,
  isActive,
  isPageLink,
  className,
  showLabel,
  onClick,
}: {
  id: string;
  label: string;
  icon: IconName;
  href: string;
  isActive: boolean;
  isPageLink: boolean;
  className: string;
  showLabel?: boolean;
  onClick?: () => void;
}) {
  const tooltip = !showLabel && (
    <span className="glass-2 pointer-events-none absolute left-[130%] whitespace-nowrap rounded-[28px] px-3 py-1 text-xs font-medium text-ink opacity-0 -translate-x-1 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
      {label}
    </span>
  );
  const content = (
    <>
      <Icon
        name={icon}
        className={
          showLabel ? "h-[1.1rem] w-[1.1rem]" : "h-[1.15rem] w-[1.15rem]"
        }
      />
      {showLabel && label}
      {tooltip}
    </>
  );

  const shared = {
    "aria-label": label,
    "aria-current": isActive ? ("true" as const) : undefined,
    onClick,
    className,
  };

  const isInternalHash = href.startsWith("#");
  return isPageLink || !isInternalHash ? (
    <Link href={href} {...shared}>
      {content}
    </Link>
  ) : (
    <a href={href} {...shared}>
      {content}
    </a>
  );
}

// ─── LangToggle ───────────────────────────────────────────────────────────────

function LangToggle({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const lang = useLocale();
  const nextLang = lang === "en" ? "mn" : "en";

  // Replace the first occurrence of the current lang in the path
  const newPath = pathname.replace(`/${lang}`, `/${nextLang}`);

  const switchLang = () => {
    document.cookie = `NEXT_LOCALE=${nextLang}; path=/; max-age=31536000`;
    window.location.href = newPath;
  };

  return (
    <button
      type="button"
      onClick={switchLang}
      className={`icon-btn hover:cursor-pointer relative h-11 w-11 overflow-hidden grid place-items-center rounded-[28px] transition-all duration-300 ${className}`}
      aria-label="Toggle language"
    >
      <Icon name="languages" className="h-[1.15rem] w-[1.15rem]" />
    </button>
  );
}

// ─── NavRail ──────────────────────────────────────────────────────────────────

export function NavRail({ dict }: { dict: Dictionary }) {
  const pathname = usePathname();
  const lang = useLocale();

  // Filter out standalone pages and hardware from the nav rail (only keep home, stack, journey)
  const navItems = dict.nav.filter((item) => !PAGE_IDS.has(item.id));

  // Detect active item: for page-level routes derive from pathname,
  // for anchor sections use IntersectionObserver.
  const getPageActive = () => {
    // if (pathname.endsWith("/about")) return "about";
    if (pathname.endsWith("/contact")) return "contact";
    return null;
  };

  const [active, setActive] = useState<string>(getPageActive() ?? "home");
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  // Sync active when route changes (Next.js Link navigation)
  useEffect(() => {
    const page = getPageActive();
    if (page) setActive(page);
    else if (pathname === `/${lang}` || pathname === `/${lang}/`)
      setActive("home");
  }, [pathname, lang]);

  // Close overflow menu on outside click
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

  // IntersectionObserver — runs on home page and projects page to track sections
  useEffect(() => {
    // if (getPageActive()) return; // skip on /about, /contact

    const els = navItems
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname, navItems]);

  const visible = navItems.slice(0, MAX_VISIBLE);
  const overflow = navItems.slice(MAX_VISIBLE);

  const desktopItemCls = (isActive: boolean) =>
    `group relative grid h-11 w-11 place-items-center rounded-[28px] transition-all duration-[400ms] ${
      isActive
        ? "bg-accent text-on-accent shadow-[0_10px_24px_-10px_rgba(var(--accent-rgb),0.8)]"
        : "text-muted hover:text-ink hover:bg-surface"
    }`;

  const mobileItemCls = (isActive: boolean) =>
    `grid h-12 w-12 shrink-0 place-items-center rounded-[28px] transition-all duration-300 active:scale-90 touch-manipulation ${
      isActive
        ? "bg-accent text-on-accent shadow-[0_6px_16px_-6px_rgba(var(--accent-rgb),0.6)]"
        : "text-muted hover:text-ink hover:bg-surface-2"
    }`;

  return (
    <>
      {/* ── Desktop vertical rail ── */}
      <nav
        aria-label="Section navigation"
        className="glass overflow-x-hidden fixed left-6 top-1/2 z-9999 hidden -translate-y-1/2 flex-col items-center gap-1 rounded-[28px] p-2 lg:flex"
      >
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            {...item}
            href={navHref(item.id, lang, pathname)}
            isActive={active === item.id}
            isPageLink={PAGE_IDS.has(item.id) || item.id === "home"}
            className={desktopItemCls(active === item.id)}
          />
        ))}
        <span className="my-1 h-px w-6 bg-[var(--border-strong)]" />
        <LangToggle className="h-10 w-10 shrink-0" />
        <ThemeToggle />
      </nav>

      {/* ── Mobile floating pill ── */}
      <nav
        aria-label="Section navigation"
        className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-[9999] flex items-center justify-center gap-0 rounded-[28px] border border-[var(--border)] bg-[var(--surface-solid)]/85 px-2 py-1.5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.35)] backdrop-blur-2xl lg:hidden"
      >
        {visible.map((item) => (
          <NavItem
            key={item.id}
            {...item}
            href={navHref(item.id, lang, pathname)}
            isActive={active === item.id}
            isPageLink={PAGE_IDS.has(item.id) || item.id === "home"}
            className={mobileItemCls(active === item.id)}
          />
        ))}

        {overflow.length > 0 && (
          <div ref={moreRef} className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((o) => !o)}
              aria-label="More sections"
              className={`grid h-12 w-12 shrink-0 place-items-center rounded-[28px] transition-all duration-300 active:scale-90 touch-manipulation ${
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
              <div className="absolute bottom-[calc(100%+8px)] right-0 z-50 flex flex-col gap-1 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-solid)]/90 p-2 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:right-auto sm:left-1/2 sm:-translate-x-1/2">
                {overflow.map((item) => (
                  <NavItem
                    key={item.id}
                    {...item}
                    href={navHref(item.id, lang, pathname)}
                    isActive={active === item.id}
                    isPageLink={PAGE_IDS.has(item.id) || item.id === "home"}
                    showLabel
                    onClick={() => setMoreOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                      active === item.id
                        ? "bg-accent text-on-accent"
                        : "text-muted hover:text-ink hover:bg-surface"
                    }`}
                  />
                ))}
                <span className="mx-2 my-1 h-px bg-[var(--border)]" />
                <div className="flex items-center justify-between px-3 py-1.5">
                  <span className="text-xs font-medium text-muted">
                    {dict.ui.language}
                  </span>
                  <LangToggle className="h-9 w-9" />
                </div>
                <div className="flex items-center justify-between px-3 py-1.5">
                  <span className="text-xs font-medium text-muted">
                    {dict.ui.theme}
                  </span>
                  <ThemeToggle className="h-9 w-9" />
                </div>
              </div>
            )}
          </div>
        )}

        {overflow.length === 0 && (
          <>
            <span className="mx-1 h-6 w-px shrink-0 bg-[var(--border-strong)]" />
            <LangToggle className="h-11 w-11 shrink-0" />
            <ThemeToggle className="h-12 w-12 shrink-0" />
          </>
        )}
      </nav>
    </>
  );
}

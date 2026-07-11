"use client";

import { useCallback, useSyncExternalStore } from "react";
import { Icon } from "./icons";

type Theme = "light" | "dark";

function getSnapshot(): Theme {
  const t = document.documentElement.getAttribute("data-theme");
  return t === "dark" || t === "light" ? t : "light";
}

function subscribe(cb: () => void) {
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === "attributes" && m.attributeName === "data-theme") {
        cb();
      }
    }
  });
  observer.observe(document.documentElement, { attributes: true });

  // Also listen for OS theme changes when no stored override exists.
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const mediaHandler = () => {
    if (!localStorage.getItem("theme")) {
      document.documentElement.setAttribute(
        "data-theme",
        media.matches ? "dark" : "light",
      );
      // MutationObserver already called cb()
    }
  };
  media.addEventListener("change", mediaHandler);

  return () => {
    observer.disconnect();
    media.removeEventListener("change", mediaHandler);
  };
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => "light");

  const toggle = useCallback(() => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }, [theme]);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={`icon-btn hover:cursor-pointer relative h-11 w-11 overflow-hidden ${className}`}
    >
      <span
        className="absolute transition-all duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]"
        style={{
          opacity: theme === "dark" ? 0 : 1,
          transform:
            theme === "dark"
              ? "rotate(-90deg) scale(0.4)"
              : "rotate(0deg) scale(1)",
        }}
      >
        <Icon name="moon" className="h-5 w-5" />
      </span>
      <span
        className="absolute transition-all duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]"
        style={{
          opacity: theme === "dark" ? 1 : 0,
          transform:
            theme === "dark"
              ? "rotate(0deg) scale(1)"
              : "rotate(90deg) scale(0.4)",
        }}
      >
        <Icon name="sun" className="h-5 w-5" />
      </span>
    </button>
  );
}

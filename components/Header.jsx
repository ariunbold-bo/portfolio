"use client";

import { useEffect, useState, useRef } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";

// ── Language Switcher Dropdown ────────────────────────────────────
function LangDropdown() {
  const { lang, switchLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const t = translations[lang].header.lang;
  const labels = { en: t.en, mn: t.mn };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={t.label}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[var(--glass-border)] bg-[var(--bg-glass)] text-[var(--text-body)] hover:border-[var(--primary-accent-color)] hover:text-[var(--primary-accent-color)] transition-all duration-200 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-accent-color)]"
      >
        <span className="hidden sm:inline">{labels[lang]}</span>
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      <div
        role="listbox"
        aria-label={t.label}
        className={`absolute right-0 mt-2 w-36 rounded-xl border border-[var(--glass-border)] bg-[var(--primary-bg-color)] shadow-xl overflow-hidden transition-all duration-200 origin-top z-50
          ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        {["en", "mn"].map((code) => (
          <button
            key={code}
            role="option"
            aria-selected={lang === code}
            onClick={() => { switchLang(code); setOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-150
              ${lang === code
                ? "bg-[var(--bg-glass-hover)] text-[var(--primary-accent-color)] font-semibold"
                : "text-[var(--text-body)] hover:bg-[var(--bg-glass)] hover:text-[var(--text-heading)]"
              }`}
          >
            <span>{labels[code]}</span>
            {lang === code && (
              <svg className="ml-auto w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Header ────────────────────────────────────────────────────────
export function Header() {
  const { lang } = useLang();
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);
  const t = translations[lang].header;

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  const navLinks = [
    { href: "/#page2",    label: t.nav.about },
    { href: "/#timeline", label: t.nav.journey,  className: "hidden sm:inline" },
    { href: "/#page3",    label: t.nav.projects },
    { href: "/#page4",    label: t.nav.contact },
  ];

  return (
    <div className="header bg-[var(--primary-bg-color)] top-0 h-[50px] sm:h-[60px] z-10 transition-colors duration-500">
      <div className="headerContent flex flex-row gap-[6px] sm:gap-[10px] items-center h-full px-3 sm:px-6">
        {/* Brand */}
        <div className="w-[50%]">
          <h1 className="text-[15px] sm:text-[20px] font-bold text-[var(--primary-text)]">
            <a href="/" className="hover:cursor-pointer hover:text-[var(--primary-accent-color)] transition-colors">
              {t.brand}
            </a>
          </h1>
        </div>

        {/* Right side */}
        <div className="w-[50%] text-[var(--primary-text)] justify-end flex items-center gap-[10px] sm:gap-[20px] flex-row text-xs sm:text-sm md:text-base">
          {navLinks.map(({ href, label, className = "" }) => (
            <a
              key={href}
              href={href}
              className={`hover:cursor-pointer hover:text-[var(--primary-accent-color)] transition-colors relative group ${className}`}
            >
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--primary-accent-color)] transition-all group-hover:w-full" />
            </a>
          ))}

          {/* Language Switcher */}
          <LangDropdown />

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={theme === "dark" ? t.theme.toLight : t.theme.toDark}
              title={theme === "dark" ? t.theme.toLight : t.theme.toDark}
            >
              <svg className="icon-moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
              <svg className="icon-sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
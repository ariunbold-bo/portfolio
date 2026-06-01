"use client";

import { useEffect, useState } from "react";

export function Header() {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

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

  return (
    <div className="header bg-[var(--primary-bg-color)] top-0 h-[60px] z-10 transition-colors duration-500">
      <div className="headerContent flex flex-row gap-[10px] items-center h-full px-6">
        <div className="w-[50%]">
          <h1 className="text-[20px] font-bold text-[var(--primary-text)]">
            <a href="/" className="hover:cursor-pointer hover:text-[var(--primary-accent-color)] transition-colors">
              Portfolio
            </a>
          </h1>
        </div>

        <div className="w-[50%] text-[var(--primary-text)] justify-end flex items-center gap-[30px] max-sm:gap-[15px] flex-row text-sm md:text-base">
          <a href="/#page2" className="hover:cursor-pointer hover:text-[var(--primary-accent-color)] transition-colors relative group">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--primary-accent-color)] transition-all group-hover:w-full"></span>
          </a>
          <a href="/#timeline" className="hover:cursor-pointer hover:text-[var(--primary-accent-color)] transition-colors relative group hidden sm:inline">
            Journey
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--primary-accent-color)] transition-all group-hover:w-full"></span>
          </a>
          <a href="/#page3" className="hover:cursor-pointer hover:text-[var(--primary-accent-color)] transition-colors relative group">
            Projects
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--primary-accent-color)] transition-all group-hover:w-full"></span>
          </a>
          <a href="/#page4" className="hover:cursor-pointer hover:text-[var(--primary-accent-color)] transition-colors relative group">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--primary-accent-color)] transition-all group-hover:w-full"></span>
          </a>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {/* Moon Icon (shown in dark mode) */}
              <svg
                className="icon-moon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
              {/* Sun Icon (shown in light mode) */}
              <svg
                className="icon-sun"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
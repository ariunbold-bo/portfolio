"use client";

import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  // Persist selection across page refreshes
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "mn") setLang(saved);
  }, []);

  const switchLang = (next) => {
    setLang(next);
    localStorage.setItem("lang", next);
  };

  return (
    <LanguageContext.Provider value={{ lang, switchLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

/** Convenience hook — throws if used outside <LanguageProvider> */
export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}

"use client";

import { usePathname, useRouter } from "next/navigation";
import { Dictionary } from "@/app/lib/types";

export function LangToggle({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const lang = pathname.startsWith('/mn') ? 'mn' : 'en';

  const toggle = () => {
    const newLang = lang === 'en' ? 'mn' : 'en';
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
    router.push(newPath || `/${newLang}`);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle language"
      title="Translate"
      className={`grid h-11 w-11 place-items-center rounded-full text-muted transition-all duration-300 hover:bg-surface hover:text-ink active:scale-90 touch-manipulation ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-[1.15rem] w-[1.15rem]"
      >
        <path d="M5 8l6 6" />
        <path d="M4 14l6-6 2-3" />
        <path d="M2 5h12" />
        <path d="M7 2h1" />
        <path d="M22 22l-5-10-5 10" />
        <path d="M14 18h6" />
      </svg>
      {/* We can show a small badge for the current language if needed, but the SVG speaks for itself */}
    </button>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Shared wrapper for the standalone `/about`, `/contact`, and `/projects`
 * pages — same max-width container and "back to home" link on all three,
 * previously duplicated identically in each page file.
 */
export function PageShell({
  lang,
  backLabel,
  children,
}: {
  lang: string;
  backLabel: string;
  children: ReactNode;
}) {
  return (
    <main className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col px-4 pt-10 pb-28 sm:px-6 sm:pt-12 md:px-12 md:pt-24 lg:pl-32 lg:pr-12">
      <div className="mb-8 md:mb-12">
        <Link
          href={`/${lang}`}
          className="group inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink transition-colors mb-4 md:mb-6"
        >
          <span className="transition-transform group-hover:-translate-x-1">
            &larr;
          </span>{" "}
          {backLabel}
        </Link>
      </div>
      {children}
    </main>
  );
}

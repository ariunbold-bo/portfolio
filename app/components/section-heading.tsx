import type { ReactNode } from "react";

export function SectionHeading({
  label,
  title,
  description,
  className = "",
  as = "h2",
}: {
  label: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  /**
   * Standalone pages (about/contact/projects) render as the page's only
   * `<h1>`; sections nested within a page that already has its own `<h1>`
   * (e.g. the homepage's Hero) should keep the default `<h2>`.
   */
  as?: "h1" | "h2";
}) {
  const Heading = as;

  return (
    <div className={`max-w-2xl ${className}`}>
      <span className="section-label">{label}</span>
      <Heading className="mt-4 text-2xl font-semibold tracking-tight text-ink-strong sm:mt-5 sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.05]">
        {title}
      </Heading>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

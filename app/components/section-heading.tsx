import type { ReactNode } from "react";

export function SectionHeading({
  label,
  title,
  description,
  className = "",
}: {
  label: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <span className="section-label">{label}</span>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink-strong sm:mt-5 sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.05]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

"use client";

const noise =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export function SiteBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Primary ambient blob — floats with aurora keyframes */}
      <div
        className="blob -top-24 -left-16 h-[520px] w-[520px] sm:h-[680px] sm:w-[680px] opacity-[0.16] dark:opacity-[0.22]"
        style={{
          background: "radial-gradient(circle, var(--accent) 0%, transparent 68%)",
        }}
      />

      {/* Secondary ambient blob — opposite side */}
      <div
        className="blob top-1/3 -right-24 h-[460px] w-[460px] sm:h-[620px] sm:w-[620px] opacity-[0.12] dark:opacity-[0.18]"
        style={{
          background: "radial-gradient(circle, var(--accent-2) 0%, transparent 68%)",
          animationDuration: "28s",
          animationDirection: "reverse",
        }}
      />

      {/* Lower subtle warm glow */}
      <div
        className="blob -bottom-20 left-1/3 h-[420px] w-[420px] sm:h-[580px] sm:w-[580px] opacity-[0.10] dark:opacity-[0.15]"
        style={{
          background: "radial-gradient(circle, var(--accent) 0%, transparent 68%)",
          animationDuration: "24s",
        }}
      />

      {/* Fine texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: `url("${noise}")`, backgroundSize: "140px" }}
      />
    </div>
  );
}

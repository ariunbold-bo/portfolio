const noise =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export function SiteBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="grid-bg absolute inset-0 opacity-60" />

      <div
        className="blob"
        style={{
          width: "46rem",
          height: "46rem",
          top: "-14rem",
          left: "-12rem",
          background:
            "radial-gradient(circle at 50% 50%, rgba(125,87,79,0.30), transparent 70%)",
        }}
      />
      <div
        className="blob"
        style={{
          width: "42rem",
          height: "42rem",
          bottom: "-16rem",
          right: "-12rem",
          background:
            "radial-gradient(circle at 50% 50%, rgba(249,223,228,0.55), transparent 70%)",
          animationDelay: "-7s",
        }}
      />
      <div
        className="blob"
        style={{
          width: "34rem",
          height: "34rem",
          top: "38%",
          left: "42%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(154,106,95,0.22), transparent 72%)",
          animationDelay: "-13s",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{ backgroundImage: `url("${noise}")`, backgroundSize: "140px" }}
      />
    </div>
  );
}

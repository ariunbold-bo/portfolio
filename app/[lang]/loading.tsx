export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading page"
      className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col px-4 pt-10 pb-28 sm:px-6 sm:pt-12 md:px-12 md:pt-24 lg:pl-32 lg:pr-12"
    >
      {/* back-link placeholder */}
      <div className="skeleton mb-8 h-4 w-32 md:mb-12" />

      {/* section label + heading placeholder */}
      <div className="skeleton mb-4 h-4 w-24 rounded-full" />
      <div className="skeleton h-10 w-3/4 max-w-md sm:h-12 md:h-14" />
      <div className="mt-5 space-y-2.5">
        <div className="skeleton h-4 w-full max-w-xl" />
        <div className="skeleton h-4 w-5/6 max-w-lg" />
      </div>

      {/* card grid placeholder */}
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8"
          >
            <div className="skeleton h-10 w-10 rounded-full" />
            <div className="skeleton mt-6 h-5 w-2/3" />
            <div className="mt-4 space-y-2.5">
              <div className="skeleton h-3.5 w-full" />
              <div className="skeleton h-3.5 w-full" />
              <div className="skeleton h-3.5 w-4/5" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

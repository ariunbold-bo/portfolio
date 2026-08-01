import Link from "next/link";
import type { Metadata } from "next";
import { SiteBackground } from "./components/site-background";
import { Icon } from "./components/icons";

export const metadata: Metadata = { title: "404 — Not Found" };

export default function NotFound() {
  return (
    <>
      <SiteBackground />
      <main className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
        {/* Ghost numeral, echoes the Hero's giant background glyph */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-[1] -translate-x-1/2 -translate-y-1/2 select-none text-[42vw] font-bold leading-none tracking-tighter text-[var(--accent)] opacity-[0.05] sm:text-[30vw]"
        >
          404
        </div>

        <span className="section-label mb-5">
          <Icon name="terminal" className="h-3.5 w-3.5" />
          Error 404
        </span>

        <h1 className="text-4xl font-bold tracking-tight text-ink-strong sm:text-6xl md:text-7xl">
          Signal lost
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg">
          This page doesn&rsquo;t exist — or it wandered off like an
          ungrounded GPIO pin.
        </p>

        {/* Mock terminal card, matching the window-bar treatment used on work pages */}
        <div className="mt-10 w-full max-w-md overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-2)] text-left shadow-[var(--shadow)]">
          <div className="flex items-center gap-1.5 border-b border-[var(--border)] px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
            <span className="ml-2 text-[0.55rem] font-mono font-semibold tracking-wider text-muted">
              status.log
            </span>
          </div>
          <div className="space-y-1.5 p-4 font-mono text-xs leading-relaxed sm:text-sm">
            <p className="text-muted">
              <span className="text-accent">$</span> curl -I this-route
            </p>
            <p className="text-ink">HTTP/1.1 404 Not Found</p>
            <p className="text-muted">x-reason: route not found on server</p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn btn-primary hover-lift glow-hover">
            <Icon name="home" className="h-4 w-4" />
            Back to Home
          </Link>
          <Link href="/projects" className="btn btn-ghost hover-lift">
            View Projects
          </Link>
        </div>
      </main>
    </>
  );
}

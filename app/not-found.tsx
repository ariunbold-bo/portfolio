import Link from "next/link";
import type { Metadata } from "next";
import { SiteBackground } from "./components/site-background";

export const metadata: Metadata = { title: "404 — Not Found" };

export default function NotFound() {
  return (
    <>
      <SiteBackground />
      <main className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 text-center">
        <span className="section-label mb-4">404</span>
        <h1 className="text-5xl font-bold tracking-tight text-ink-strong sm:text-7xl md:text-8xl">
          Lost?
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg">
          This page does not exist — or maybe it wandered off like an ungrounded
          GPIO pin.
        </p>
        <Link href="/" className="btn btn-primary hover-lift mt-8">
          Back to Home
        </Link>
      </main>
    </>
  );
}

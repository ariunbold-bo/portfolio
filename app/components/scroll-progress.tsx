"use client";

import { useRef } from "react";
import { useRafOnScroll } from "@/app/lib/hooks";

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useRafOnScroll(() => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const progress = max > 0 ? doc.scrollTop / max : 0;
    ref.current?.style.setProperty("--scroll", String(progress));
  });

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-[3px] bg-transparent">
      <div
        ref={ref}
        className="scroll-progress h-full w-full"
        style={{
          background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
        }}
      />
    </div>
  );
}

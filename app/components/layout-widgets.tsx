"use client";

import dynamic from "next/dynamic";
import { Dictionary } from "@/app/lib/types";

// NavRail and ScrollProgress are decorative and hydrating them upfront blocks
// the hero's first paint. This client wrapper lets us code-split them with
// `ssr: false` (which isn't allowed directly in a Server Component), so their
// JS loads after hydration instead of delaying LCP / inflating TBT.
const NavRail = dynamic(
  () => import("./nav-rail").then((m) => ({ default: m.NavRail })),
  { ssr: false },
);

const ScrollProgress = dynamic(
  () => import("./scroll-progress").then((m) => ({ default: m.ScrollProgress })),
  { ssr: false },
);

export function LayoutWidgets({ dict }: { dict: Dictionary }) {
  return (
    <>
      <ScrollProgress />
      <NavRail dict={dict} />
    </>
  );
}

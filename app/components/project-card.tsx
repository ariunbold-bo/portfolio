"use client";

import { useCallback, useRef, useState } from "react";
import type { SoftwareProject } from "@/app/lib/types";
import { Icon } from "./icons";
import { ProjectVisualHook } from "./project-visual-hooks";

/* Noise SVG as a background-image — same as in the visual hooks file   *
 * so the browser can cache the decoded data URL between renders.        */
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`;

interface Props {
  proj: SoftwareProject;
  liveSiteLabel: string;
  sourceLabel: string;
}

export function ProjectCard({ proj, liveSiteLabel, sourceLabel }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: -999, y: -999 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    },
    []
  );

  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    setPos({ x: -999, y: -999 });
  }, []);

  return (
    <div
      ref={cardRef}
      className={`project-card glass card flex h-full flex-col p-8 hover-lift${hovered ? " is-hovered" : ""}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      /* Spotlight position fed as CSS custom props */
      style={
        {
          "--mouse-x": `${pos.x}px`,
          "--mouse-y": `${pos.y}px`,
        } as React.CSSProperties
      }
    >
      {/* ── Grain noise overlay (no glassmorphism) ──────────────── */}
      <span
        aria-hidden="true"
        className="noise-grain pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          backgroundImage: NOISE_SVG,
          backgroundRepeat: "repeat",
          backgroundSize: "180px",
          opacity: 0.038,
          mixBlendMode: "overlay",
          zIndex: 0,
        }}
      />

      {/* All card content sits above the grain layer */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Project-specific visual hook */}
        {proj.visualHook && <ProjectVisualHook hook={proj.visualHook} />}

        <h3 className="mb-3 text-xl font-semibold text-ink-strong">
          {proj.name}
        </h3>

        <p className="mb-6 flex-grow text-sm leading-relaxed text-muted">
          {proj.blurb}
        </p>

        {/* Action buttons */}
        <div className="mt-auto grid grid-cols-2 gap-2.5">
          {/* Live Site — accent filled */}
          <a
            href={proj.live}
            target="_blank"
            rel="noopener noreferrer"
            className="proj-btn proj-btn-primary group"
          >
            <Icon name="external" className="h-3.5 w-3.5 shrink-0" />
            <span>{liveSiteLabel}</span>
          </a>

          {/* Source — ghost */}
          <a
            href={proj.source}
            target="_blank"
            rel="noopener noreferrer"
            className="proj-btn proj-btn-ghost group"
          >
            <Icon name="github" className="h-3.5 w-3.5 shrink-0" />
            <span>{sourceLabel}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

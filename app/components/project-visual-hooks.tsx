"use client";

import { useEffect, useRef, useState } from "react";
import type { VisualHook } from "@/app/lib/types";

/* ── Shared noise SVG (inline, no network request) ──────────────────── */
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`;

/* ================================================================== *
 * 1. CANVAS SCRIBBLE — Canu (Realtime Canvas)                        *
 * Two auto-cursors orbit the canvas leaving coloured ghost trails,   *
 * communicating "live multi-user drawing" before any text is read.   *
 * ================================================================== */
function CanvasScribble() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* Respect reduced-motion preference */
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    /* Initial dark canvas fill — warm dark espresso */
    ctx.fillStyle = "#140f0c";
    ctx.fillRect(0, 0, W, H);

    if (reducedMotion) return;

    /* Two cursor states on separate Lissajous-ish paths */
    type Cursor = {
      angle: number;
      speed: number;
      rx: number;
      ry: number;
      cx: number;
      cy: number;
      color: string;
      prevX: number;
      prevY: number;
    };

    const cursors: Cursor[] = [
      {
        angle: 0,
        speed: 0.013,
        rx: W * 0.27,
        ry: H * 0.27,
        cx: W * 0.44,
        cy: H * 0.50,
        color: "#5ba4d6",
        prevX: 0,
        prevY: 0,
      },
      {
        angle: Math.PI,
        speed: 0.019,
        rx: W * 0.21,
        ry: H * 0.21,
        cx: W * 0.56,
        cy: H * 0.50,
        color: "#d4a373",
        prevX: 0,
        prevY: 0,
      },
    ];

    /* Seed prev positions so first frame has no long jump */
    cursors.forEach((c) => {
      c.prevX = c.cx + Math.cos(c.angle) * c.rx;
      c.prevY = c.cy + Math.sin(c.angle) * c.ry;
    });

    let rafId: number;

    function draw() {
      /* Fade old strokes — slower fade = longer ghost trail */
      ctx!.fillStyle = "rgba(20, 15, 12, 0.055)";
      ctx!.fillRect(0, 0, W, H);

      cursors.forEach((c) => {
        const x = c.cx + Math.cos(c.angle) * c.rx;
        const y = c.cy + Math.sin(c.angle) * c.ry;

        /* Stroke segment */
        ctx!.beginPath();
        ctx!.moveTo(c.prevX, c.prevY);
        ctx!.lineTo(x, y);
        ctx!.strokeStyle = c.color;
        ctx!.lineWidth = 2;
        ctx!.lineCap = "round";
        ctx!.globalAlpha = 0.82;
        ctx!.stroke();

        /* Cursor dot */
        ctx!.beginPath();
        ctx!.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx!.fillStyle = c.color;
        ctx!.globalAlpha = 1;
        ctx!.fill();

        c.prevX = x;
        c.prevY = y;
        c.angle += c.speed;
      });

      rafId = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="relative mb-5 overflow-hidden rounded-2xl" style={{ height: 100 }}>
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Noise grain overlay */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          backgroundImage: NOISE_SVG,
          backgroundRepeat: "repeat",
          backgroundSize: "160px",
          opacity: 0.055,
          mixBlendMode: "overlay",
        }}
      />

      {/* "2 online" badge — top-right */}
      <div
        className="absolute top-2 right-2 flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[0.6rem]"
        style={{ background: "rgba(20, 15, 12, 0.7)", color: "var(--accent)" }}
      >
        <span
          className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"
          style={{ animation: "pulse-ring 2s ease-out infinite" }}
        />
        2 online
      </div>

      {/* Cursor legend — bottom-left */}
      <div className="absolute bottom-2 left-2 flex gap-2.5">
        <span
          className="flex items-center gap-1 font-mono text-[0.55rem]"
          style={{ color: "#5ba4d6" }}
        >
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: "#5ba4d6" }}
          />
          you
        </span>
        <span
          className="flex items-center gap-1 font-mono text-[0.55rem]"
          style={{ color: "var(--accent)" }}
        >
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--accent)" }}
          />
          ariq
        </span>
      </div>
    </div>
  );
}

/* ================================================================== *
 * 2. TERMINAL HEADER — Photo Sharing Platform                        *
 * Fake terminal bar with cycling encrypted-status text. The card-    *
 * level CSS glitch fires on .project-card:hover .terminal-header.   *
 * ================================================================== */
const STATUSES = ["ENCRYPTED", "AUDITED", "SECURE", "MONITORED"] as const;

function TerminalHeader() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIdx((i) => (i + 1) % STATUSES.length),
      2800
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="terminal-header mb-5 overflow-hidden rounded-xl">
      {/* Window chrome bar */}
      <div className="flex items-center gap-2 px-3 py-2.5"
           style={{ background: "rgba(20, 15, 12, 0.9)", borderBottom: "1px solid rgba(var(--accent-rgb), 0.14)" }}>
        {/* Traffic-light dots */}
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#febc2e" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28c840" }} />
        {/* Path */}
        <span
          className="ml-2 font-mono text-[0.58rem] opacity-75"
          style={{ color: "var(--accent)" }}
        >
          ~/psp
        </span>
      </div>

      {/* Terminal body */}
      <div
        className="relative px-3 py-2.5 font-mono text-[0.65rem] leading-relaxed"
        style={{ background: "rgba(14, 10, 8, 0.85)", color: "var(--ink)" }}
      >
        {/* CRT scanline sweep */}
        <span className="crt-scan pointer-events-none absolute inset-0" aria-hidden="true" />

        <span style={{ color: "#28c840" }}>$</span>{" "}
        <span style={{ color: "var(--accent)" }}>status</span>
        <br />
        <span style={{ color: "var(--muted)" }}>{"[STATUS: "}</span>
        <span
          key={idx}
          className="terminal-status"
          style={{ color: "var(--accent-2)" }}
        >
          {STATUSES[idx]}
        </span>
        <span style={{ color: "var(--muted)" }}>{" //"}
        </span>
        <span className="caret" />
      </div>
    </div>
  );
}

/* ================================================================== *
 * 3. CARD FLIP — Magalang (Memory Game)                              *
 * A single playing card sits face-down with a "hover" hint. When     *
 * the parent .project-card is hovered the card flips via CSS alone.  *
 * ================================================================== */
function CardFlip() {
  return (
    <div className="mb-5 flex justify-center" style={{ perspective: "700px" }}>
      <div className="card-flip-root">
        <div className="card-flip-inner">
          {/* ── Back face (initially visible) ── */}
          <div className="card-face card-face-back">
            {/* Pattern of question marks */}
            <div className="card-pattern" aria-hidden="true">
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} className="card-pattern-cell">?</span>
              ))}
            </div>
            {/* Hover hint */}
            <div className="card-hover-hint">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 5v14M5 12l7 7 7-7"/>
              </svg>
              hover
            </div>
          </div>

          {/* ── Front face (revealed on flip) ── */}
          <div className="card-face card-face-front">
            <span className="card-symbol" aria-label="star">★</span>
            <div className="card-match-badge">match!</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== *
 * Public switcher — consumed by ProjectCard                          *
 * ================================================================== */
export function ProjectVisualHook({ hook }: { hook: VisualHook }) {
  switch (hook.kind) {
    case "canvas-scribble":
      return <CanvasScribble />;
    case "terminal-header":
      return <TerminalHeader />;
    case "card-flip":
      return <CardFlip />;
  }
}

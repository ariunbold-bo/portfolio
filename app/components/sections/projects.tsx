"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Dictionary } from "@/app/lib/types";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { PaletteMorph } from "../palette-morph";

/**
 * Software projects redesigned as a "reading desk" — desktop shows books
 * lying flat and scattered across a desk (covers facing up, various angles,
 * with decorative pens). Mobile shows the classic vertical bookshelf with
 * spines. Clicking/tapping a book reveals project details in a popup.
 *
 * The detail popup is rendered into document.body via a React portal so it
 * fully escapes stacking-context clipping from Reveal/transform wrappers.
 */

const BOOK_COLORS = [
  { spine: "#2d6a9f", cover: "#1e4d75", text: "#e8f4fd", accent: "#7ec8e3" },
  { spine: "#7a3b1e", cover: "#5c2c15", text: "#fdf0e8", accent: "#e8a87c" },
  { spine: "#1e6b4a", cover: "#145436", text: "#e8f7f0", accent: "#7dcba8" },
  { spine: "#6b1e5a", cover: "#52164a", text: "#fde8f9", accent: "#d47cc8" },
  { spine: "#5a4a1e", cover: "#42361a", text: "#fdf5e8", accent: "#c8a87d" },
  { spine: "#1e3e6b", cover: "#152d50", text: "#e8f0fd", accent: "#7ca0d4" },
  { spine: "#6b4a1e", cover: "#4d3518", text: "#fdf2e8", accent: "#c89a7c" },
  { spine: "#1e5a52", cover: "#14423c", text: "#e8f7f5", accent: "#7cc8be" },
];

const DESK_ANGLES = [-4, 3, -2, 5, -3, 2, -5, 4];
const DESK_Y_OFFSET = [2, -4, 6, -2, 4, -6, 1, -3];

// ── Portal popup rendered into document.body ────────────────────────────────
function BookPopup({
  proj,
  color,
  anchorRect,
  onClose,
}: {
  proj: Dictionary["projects"][number];
  color: (typeof BOOK_COLORS)[number];
  anchorRect: DOMRect;
  onClose: () => void;
}) {
  const popupWidth = 268;
  const popupHeight = 240; // approximate
  const gap = 14;

  // Position popup above the book; shift left/right to stay in viewport
  let left = anchorRect.left + anchorRect.width / 2 - popupWidth / 2;
  const top = anchorRect.top - popupHeight - gap + window.scrollY;

  // Clamp to viewport edges with padding
  const padding = 12;
  left = Math.max(padding, Math.min(left, window.innerWidth - popupWidth - padding));

  // Arrow horizontal offset relative to popup
  const arrowLeft = anchorRect.left + anchorRect.width / 2 - left;

  return createPortal(
    <>
      {/* Invisible backdrop to close popup on outside click */}
      <div
        style={{ position: "fixed", inset: 0, zIndex: 9998 }}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-label={proj.name}
        style={{
          position: "absolute",
          top: `${top}px`,
          left: `${left}px`,
          width: `${popupWidth}px`,
          zIndex: 9999,
          backgroundColor: color.cover,
          border: `1px solid ${color.accent}44`,
          borderBottom: `3px solid ${color.accent}88`,
          borderRadius: "14px",
          padding: "1.1rem 1.2rem 1rem",
          boxShadow: `0 28px 56px -14px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)`,
          animation: "book-popup-in 0.28s cubic-bezier(0.22, 1, 0.36, 1) both",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Arrow pointing down toward the book */}
        <div
          style={{
            position: "absolute",
            bottom: "-7px",
            left: `${Math.max(16, Math.min(arrowLeft, popupWidth - 16))}px`,
            transform: "translateX(-50%) rotate(45deg)",
            width: "13px",
            height: "13px",
            backgroundColor: color.cover,
            borderRight: `1px solid ${color.accent}44`,
            borderBottom: `3px solid ${color.accent}88`,
            zIndex: -1,
          }}
        />

        <h3
          style={{
            color: color.text,
            fontSize: "1rem",
            fontWeight: 700,
            marginBottom: "0.35rem",
            letterSpacing: "-0.02em",
          }}
        >
          {proj.name}
        </h3>
        <p
          style={{
            color: color.text,
            fontSize: "0.78rem",
            lineHeight: 1.65,
            marginBottom: "0.8rem",
            opacity: 0.82,
          }}
        >
          {proj.blurb}
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.3rem",
            marginBottom: "0.9rem",
          }}
        >
          {proj.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "0.58rem",
                fontWeight: 600,
                padding: "0.2rem 0.55rem",
                borderRadius: "99px",
                border: `1px solid ${color.accent}55`,
                color: color.accent,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <a
            href={proj.live}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: color.accent,
              textDecoration: "none",
              padding: "0.35rem 0.75rem",
              border: `1px solid ${color.accent}66`,
              borderRadius: "8px",
              flex: 1,
              textAlign: "center",
              transition: "background 0.18s ease",
            }}
          >
            Live ↗
          </a>
          <a
            href={proj.source}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: color.text,
              opacity: 0.65,
              textDecoration: "none",
              padding: "0.35rem 0.75rem",
              border: `1px solid ${color.text}33`,
              borderRadius: "8px",
              flex: 1,
              textAlign: "center",
            }}
          >
            Source
          </a>
        </div>
      </div>
    </>,
    document.body,
  );
}

// ── Flat desk book ───────────────────────────────────────────────────────────
function DeskBook({
  proj,
  color,
  index,
  isOpen,
  onToggle,
}: {
  proj: Dictionary["projects"][number];
  color: (typeof BOOK_COLORS)[number];
  index: number;
  isOpen: boolean;
  onToggle: (rect: DOMRect) => void;
}) {
  const angle = DESK_ANGLES[index % DESK_ANGLES.length];
  const yOffset = DESK_Y_OFFSET[index % DESK_Y_OFFSET.length];
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <div
      style={{
        position: "relative",
        flexShrink: 0,
        zIndex: isOpen ? 30 : index + 1,
      }}
    >
      <button
        ref={btnRef}
        onClick={(e) => {
          e.stopPropagation();
          const rect = btnRef.current?.getBoundingClientRect();
          if (rect) onToggle(rect);
        }}
        aria-expanded={isOpen}
        aria-label={proj.name}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          display: "block",
          transform: isOpen
            ? "rotate(0deg) translateY(-18px) scale(1.05)"
            : `rotate(${angle}deg) translateY(${yOffset}px)`,
          transition: "transform 0.42s cubic-bezier(0.22, 0.61, 0.36, 1)",
          transformOrigin: "center bottom",
        }}
      >
        {/* Book cover */}
        <div
          style={{
            width: "140px",
            height: "190px",
            backgroundColor: color.cover,
            borderRadius: "3px 10px 10px 3px",
            position: "relative",
            boxShadow: isOpen
              ? `0 22px 52px -10px ${color.spine}88, 0 4px 16px rgba(0,0,0,0.4)`
              : `0 6px 18px rgba(0,0,0,0.35), 3px 3px 8px rgba(0,0,0,0.25)`,
            overflow: "hidden",
            transition: "box-shadow 0.42s ease",
          }}
        >
          {/* Spine strip */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "14px",
              backgroundImage: `linear-gradient(to right, ${color.spine}, ${color.cover})`,
            }}
          />
          {/* Cover texture */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(135deg, ${color.accent}18 0%, transparent 50%, rgba(0,0,0,0.2) 100%)`,
            }}
          />
          {/* Top rule */}
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "22px",
              right: "12px",
              height: "1px",
              background: `${color.accent}55`,
            }}
          />
          {/* Title + tag */}
          <div
            style={{
              position: "absolute",
              top: "30px",
              left: "20px",
              right: "12px",
              bottom: "50px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: color.text,
                fontSize: "0.88rem",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              {proj.name}
            </span>
            <span
              style={{
                color: color.accent,
                fontSize: "0.55rem",
                fontWeight: 600,
                marginTop: "0.5rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              {proj.tags[0]}
            </span>
          </div>
          {/* Bottom rule */}
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "22px",
              right: "12px",
              height: "1px",
              background: `${color.accent}44`,
            }}
          />
          {/* Book number */}
          <span
            style={{
              position: "absolute",
              bottom: "8px",
              right: "10px",
              color: color.accent,
              fontSize: "0.6rem",
              fontWeight: 700,
              opacity: 0.7,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          {/* Page edge */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "2px",
              bottom: "2px",
              width: "4px",
              background:
                "repeating-linear-gradient(to bottom, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 3px)",
            }}
          />
        </div>
      </button>
    </div>
  );
}

// ── Vertical bookshelf spine (mobile only) ───────────────────────────────────
function BookSpine({
  proj,
  color,
  index,
  isOpen,
  onToggle,
}: {
  proj: Dictionary["projects"][number];
  color: (typeof BOOK_COLORS)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex flex-col items-center" style={{ flex: "0 0 auto" }}>
      <button
        onClick={(e) => { e.stopPropagation(); onToggle(); }}
        aria-expanded={isOpen}
        aria-label={proj.name}
        style={{
          backgroundColor: color.spine,
          width: isOpen ? "3.2rem" : "2.8rem",
          height: "11rem",
          borderRadius: "4px 4px 2px 2px",
          position: "relative",
          transition: "all 0.35s cubic-bezier(0.22, 0.61, 0.36, 1)",
          transform: isOpen ? "translateY(-10px)" : "translateY(0)",
          boxShadow: isOpen
            ? `0 18px 40px -8px ${color.spine}66, inset 3px 0 6px rgba(255,255,255,0.08)`
            : "2px 4px 12px rgba(0,0,0,0.3), inset 2px 0 4px rgba(255,255,255,0.06)",
          cursor: "pointer",
          border: "none",
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem 0.5rem",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: "absolute",
            left: "3px",
            top: "8px",
            bottom: "8px",
            width: "1.5px",
            background: "rgba(255,255,255,0.18)",
            borderRadius: "99px",
          }}
        />
        <span
          style={{
            color: color.text,
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            lineHeight: 1.2,
            maxHeight: "8rem",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {proj.name}
        </span>
        <span
          style={{
            position: "absolute",
            bottom: "8px",
            color: color.accent,
            fontSize: "0.55rem",
            fontWeight: 700,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </button>

      {/* Shadow under spine */}
      <div
        style={{
          width: isOpen ? "3.2rem" : "2.8rem",
          height: "4px",
          background: `linear-gradient(to bottom, ${color.spine}55, transparent)`,
          transition: "width 0.35s cubic-bezier(0.22, 0.61, 0.36, 1)",
        }}
      />

      {/* Detail panel — expands below spine on mobile */}
      <div
        style={{
          maxHeight: isOpen ? "360px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.42s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 0.3s ease",
          opacity: isOpen ? 1 : 0,
          width: "min(260px, 82vw)",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          style={{
            backgroundColor: color.cover,
            border: `1px solid ${color.accent}44`,
            borderTop: `2px solid ${color.accent}88`,
            borderRadius: "0 0 12px 12px",
            padding: "1rem",
            color: color.text,
          }}
        >
          <p
            style={{ fontSize: "0.8rem", lineHeight: 1.6, marginBottom: "0.75rem", opacity: 0.85 }}
          >
            {proj.blurb}
          </p>
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginBottom: "0.75rem" }}
          >
            {proj.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  padding: "0.2rem 0.5rem",
                  borderRadius: "99px",
                  border: `1px solid ${color.accent}55`,
                  color: color.accent,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <a
              href={proj.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                color: color.accent,
                textDecoration: "none",
                padding: "0.3rem 0.6rem",
                border: `1px solid ${color.accent}55`,
                borderRadius: "6px",
              }}
            >
              Live ↗
            </a>
            <a
              href={proj.source}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                color: color.text,
                opacity: 0.7,
                textDecoration: "none",
                padding: "0.3rem 0.6rem",
                border: `1px solid ${color.text}33`,
                borderRadius: "6px",
              }}
            >
              Source
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pen({ style }: { style: React.CSSProperties }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: "6px",
        height: "140px",
        borderRadius: "3px 3px 1px 1px",
        ...style,
      }}
    />
  );
}

// ── Main Projects component ───────────────────────────────────────────────────
export function Projects({ dict }: { dict: Dictionary }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleToggle = useCallback((i: number, rect: DOMRect) => {
    if (openIndex === i) {
      setOpenIndex(null);
      setAnchorRect(null);
    } else {
      setOpenIndex(i);
      setAnchorRect(rect);
    }
  }, [openIndex]);

  const closePopup = useCallback(() => {
    setOpenIndex(null);
    setAnchorRect(null);
  }, []);

  return (
    <PaletteMorph palette="sky">
      <section id="projects" className="scroll-mt-32">
        <Reveal variant="up">
          <SectionHeading
            label={dict.ui.softwareLabel}
            title={dict.ui.softwareTitle}
          />
        </Reveal>

        {/* Popup portal — rendered outside any stacking context */}
        {mounted && openIndex !== null && anchorRect && (
          <BookPopup
            proj={dict.projects[openIndex]}
            color={BOOK_COLORS[openIndex % BOOK_COLORS.length]}
            anchorRect={anchorRect}
            onClose={closePopup}
          />
        )}

        {/* ── DESKTOP: flat books on a desk ──────────────────────────────── */}
        <Reveal variant="up" delay={100} className="mt-12 hidden md:block">
          <div style={{ position: "relative", padding: "2rem 0 0" }}>
            {/* Desk surface */}
            <div
              style={{
                position: "relative",
                background: "linear-gradient(180deg, var(--surface-solid) 0%, var(--surface-2) 100%)",
                borderRadius: "20px",
                border: "1px solid var(--border)",
                padding: "3rem 2.5rem 2rem",
                boxShadow: "0 4px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.06)",
                overflow: "visible",
              }}
            >
              {/* Wood-grain texture */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "20px",
                  backgroundImage:
                    "repeating-linear-gradient(92deg, transparent 0px, transparent 40px, rgba(var(--accent-rgb), 0.012) 40px, rgba(var(--accent-rgb), 0.012) 41px)",
                  pointerEvents: "none",
                }}
              />

              {/* Decorative pens */}
              <Pen style={{ top: "1.5rem", right: "3rem", background: "linear-gradient(to bottom, #e74c3c, #c0392b)", transform: "rotate(-25deg)", opacity: 0.75 }} />
              <Pen style={{ top: "0.8rem", right: "3.6rem", background: "linear-gradient(to bottom, #2c3e50, #1a252f)", transform: "rotate(-18deg)", opacity: 0.6, height: "120px" }} />
              <Pen style={{ top: "2.2rem", right: "2.4rem", background: "linear-gradient(to bottom, #f39c12, #d68910)", transform: "rotate(-30deg)", opacity: 0.7, width: "5px", height: "110px" }} />

              {/* Books on desk */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1.5rem 2rem",
                  alignItems: "flex-end",
                  position: "relative",
                  zIndex: 1,
                  paddingBottom: "0.5rem",
                }}
                onClick={closePopup}
              >
                {dict.projects.map((proj, i) => (
                  <DeskBook
                    key={proj.name}
                    proj={proj}
                    color={BOOK_COLORS[i % BOOK_COLORS.length]}
                    index={i}
                    isOpen={openIndex === i}
                    onToggle={(rect) => handleToggle(i, rect)}
                  />
                ))}
              </div>

              {/* Desk bottom edge */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "8px",
                  borderRadius: "0 0 20px 20px",
                  background: "linear-gradient(to bottom, rgba(0,0,0,0.12), rgba(0,0,0,0.22))",
                }}
              />
            </div>

            <p
              style={{
                fontSize: "0.68rem",
                color: "var(--muted)",
                textAlign: "center",
                marginTop: "1rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                opacity: 0.6,
              }}
            >
              Click a book to read
            </p>
          </div>
        </Reveal>

        {/* ── MOBILE: vertical bookshelf ──────────────────────────────────── */}
        <Reveal variant="up" delay={100} className="mt-10 md:hidden">
          <div style={{ position: "relative" }}>
            <div
              className="hide-scrollbar"
              style={{
                display: "flex",
                gap: "0.5rem",
                overflowX: "auto",
                paddingBottom: "0.5rem",
                paddingTop: "0.5rem",
                alignItems: "flex-end",
                WebkitOverflowScrolling: "touch",
              }}
              onClick={closePopup}
            >
              {dict.projects.map((proj, i) => (
                <BookSpine
                  key={proj.name}
                  proj={proj}
                  color={BOOK_COLORS[i % BOOK_COLORS.length]}
                  index={i}
                  isOpen={openIndex === i}
                  onToggle={() => {
                    if (openIndex === i) { setOpenIndex(null); } else { setOpenIndex(i); }
                  }}
                />
              ))}
            </div>

            {/* Shelf plank */}
            <div
              style={{
                height: "10px",
                borderRadius: "0 0 6px 6px",
                background: "linear-gradient(to bottom, var(--surface-solid), var(--surface-2))",
                border: "1px solid var(--border)",
                borderTop: "2px solid var(--border-strong)",
                boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
              }}
            />

            <p
              style={{
                fontSize: "0.65rem",
                color: "var(--muted)",
                textAlign: "center",
                marginTop: "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                opacity: 0.6,
              }}
            >
              Scroll & tap a book
            </p>
          </div>
        </Reveal>
      </section>
    </PaletteMorph>
  );
}

"use client";
import { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

/**
 * Wrapper that hides MouseFollower on /canu (drawing board) routes
 * where it interferes with the canvas cursor.
 */
export function PortfolioMouseFollower() {
  const pathname = usePathname();
  if (pathname?.startsWith("/canu")) return null;
  return <MouseFollower />;
}


export default function MouseFollower() {
  const followerRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  const updatePosition = useCallback(() => {
    if (followerRef.current) {
      const { x, y } = positionRef.current;
      followerRef.current.style.transform = `translate3d(${x - 200}px, ${y - 200}px, 0)`;
    }
    rafRef.current = null;
  }, []);

  useEffect(() => {
    const onMouseMove = (e) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updatePosition);
      }
    };

    const onMouseOver = (e) => {
      if (!followerRef.current) return;
      const isInteractive =
        e.target.tagName === "BUTTON" ||
        e.target.tagName === "A" ||
        e.target.closest("button") ||
        e.target.closest("a");
      followerRef.current.style.scale = isInteractive ? "1.2" : "1";
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updatePosition]);

  return (
    <div
      ref={followerRef}
      className="fixed pointer-events-none z-0 hidden md:block mix-blend-screen"
      style={{ willChange: "transform", top: 0, left: 0 }}
    >
      <div className="w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(139,44,64,0.15)_0%,transparent_70%)] blur-3xl"></div>
    </div>
  );
}

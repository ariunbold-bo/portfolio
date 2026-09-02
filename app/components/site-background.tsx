"use client";

import { useEffect, useState } from "react";

function Blob({ color, delay }: { color: string; delay: number }) {
  const [style, setStyle] = useState<React.CSSProperties>({
    opacity: 0,
  });

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    const getRandomState = () => {
      const isMobile = window.innerWidth < 768;
      
      const minWidth = isMobile ? 100 : 250;
      const maxWidth = isMobile ? 250 : 500;
      const minHeight = isMobile ? 100 : 250;
      const maxHeight = isMobile ? 250 : 500;
      
      const width = Math.random() * (maxWidth - minWidth) + minWidth;
      const height = Math.random() * (maxHeight - minHeight) + minHeight;
      
      const maxX = window.innerWidth;
      const maxY = window.innerHeight;

      const x = (Math.random() * maxX) - (width / 2);
      const y = (Math.random() * maxY) - (height / 2);
      
      const br = `${Math.random() * 30 + 35}% ${Math.random() * 30 + 35}% ${Math.random() * 30 + 35}% ${Math.random() * 30 + 35}%`;

      return { x, y, width, height, br };
    };

    // Set initial position instantly without transition
    const initial = getRandomState();
    setStyle({
      transform: `translate(${initial.x}px, ${initial.y}px)`,
      width: `${initial.width}px`,
      height: `${initial.height}px`,
      borderRadius: initial.br,
      opacity: 0,
      transition: "none",
    });

    const update = () => {
      const next = getRandomState();
      setStyle({
        transform: `translate(${next.x}px, ${next.y}px)`,
        width: `${next.width}px`,
        height: `${next.height}px`,
        borderRadius: next.br,
        opacity: 1,
        transition: "transform 25s ease-in-out, width 25s ease-in-out, height 25s ease-in-out, border-radius 25s ease-in-out, opacity 3s ease-in-out",
      });
    };

    timeout = setTimeout(() => {
      update();
      interval = setInterval(update, 25000);
    }, delay + 50);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [delay]);

  return (
    <div
      className={`absolute left-0 top-0 blur-[80px] -z-10 ${color}`}
      style={style}
    />
  );
}

const noise =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export function SiteBackground() {
  const [mounted, setMounted] = useState(false);
  
  // hydration supress

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {mounted && (
        <>
          <Blob color="bg-[var(--accent)]/15" delay={0} />
          <Blob color="bg-[var(--accent-2)]/10" delay={200} />
        </>
      )}

      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{ backgroundImage: `url("${noise}")`, backgroundSize: "140px" }}
      />
    </div>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";

export function FadeIn({ children, delay = 0, direction = "up" }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const directionClasses = {
    up: "translate-y-12",
    down: "-translate-y-12",
    left: "translate-x-12",
    right: "-translate-x-12",
    none: "",
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0 translate-x-0"
          : `opacity-0 ${directionClasses[direction]}`
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function ESP32Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const bgRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || !titleRef.current || !bgRef.current) return;
      const scrollY = window.scrollY;

      bgRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;

      const opacity = Math.max(0, 1 - scrollY / 400);
      const scale = Math.max(0.8, 1 - scrollY / 1000);
      titleRef.current.style.opacity = opacity;
      titleRef.current.style.transform = `scale(${scale}) translateY(${scrollY * 0.2}px)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden z-10 pt-20"
    >
      <div ref={bgRef} className="absolute inset-0 z-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--primary-bg-color)]/80 to-[var(--primary-bg-color)]"></div>
      </div>

      <div
        ref={titleRef}
        className={`z-10 flex flex-col items-center text-center px-6 transition-all duration-[1200ms] ease-out ${
          mounted
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-95"
        }`}
      >
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-[var(--glass-border)] bg-[var(--bg-glass)] backdrop-blur-md text-xs sm:text-sm font-medium tracking-wider text-[var(--text-body)]">
          EMBEDDED SYSTEMS
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight">
          ESP32{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-accent-color)] to-[#8B2C40]">
            OLED DISPLAY
          </span>
        </h1>
        <p className="text-base sm:text-xl md:text-2xl text-[var(--text-muted)] max-w-2xl font-light">
          Binary-encoded GIF playback on a 128x64 OLED. Pushing
          microcontroller limits with creative firmware.
        </p>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <div className="w-[30px] h-[50px] rounded-full border-2 border-[var(--text-heading)]/30 flex justify-center p-2">
          <div className="w-1 h-3 bg-[var(--text-heading)]/50 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}

export function S21Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const bgRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || !titleRef.current || !bgRef.current) return;
      const scrollY = window.scrollY;

      bgRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;

      const opacity = Math.max(0, 1 - scrollY / 600);
      const scale = Math.max(0.8, 1 - scrollY / 1000);
      titleRef.current.style.opacity = opacity;
      titleRef.current.style.transform = `scale(${scale}) translateY(${scrollY * 0.2}px)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden z-10 pt-20"
    >
      <div ref={bgRef} className="absolute inset-0 z-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--primary-bg-color)]/80 to-[var(--primary-bg-color)]"></div>
      </div>

      <div
        ref={titleRef}
        className={`z-10 flex flex-col items-center text-center px-6 transition-all duration-1000 ease-out ${
          mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
        }`}
      >
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-[var(--glass-border)] bg-[var(--bg-glass)] backdrop-blur-md text-xs sm:text-sm font-medium tracking-wider text-[var(--text-body)]">
          HARDWARE ENGINEERING
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight text-[var(--text-heading)]">
          PROJECT{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d6d] to-[#8B2C40]">
            CRYOCELL
          </span>
        </h1>
        <p className="text-base sm:text-xl md:text-2xl text-[var(--text-muted)] max-w-2xl font-light">
          Active cooling meets unlimited power. Re-engineering the smartphone thermal and power delivery systems to bypass hardware limitations for sustained peak performance.
        </p>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <div className="w-[30px] h-[50px] rounded-full border-2 border-[var(--glass-border)] flex justify-center p-2">
          <div className="w-1 h-3 bg-[var(--primary-accent-color)] rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}

// AboutMe.jsx
"use client";
import { useEffect, useRef } from "react";

const technicalStack = [
  {
    title: "Full-Stack Architecture (Next.js & React)",
    description: "Advanced experience with App Router, SSR, and building high-performance web applications.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--primary-accent-color)] mt-0.5 flex-shrink-0" aria-hidden="true">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 3.82-13 1.5 1.5 0 0 0-2.18 2.06A20.08 20.08 0 0 0 9 6.27a19.5 19.5 0 0 0-6.19 2.65 1.5 1.5 0 0 0 1.66 2.56c2-.84 4.31-1.39 6.6-1.53a3.13 3.13 0 0 1 4.24 4.24c-.14 2.29-.69 4.6-1.53 6.6a1.5 1.5 0 0 0 2.56 1.66A19.5 19.5 0 0 0 19 16.19a20.08 20.08 0 0 0 5.21-1.63 1.5 1.5 0 0 0-2.06-2.18A22 22 0 0 1 12 15z" />
      </svg>
    ),
  },
  {
    title: "Linux System Customization",
    description: "Deep proficiency in Arch Linux, Hyprland ricing, and kernel/driver troubleshooting.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--primary-accent-color)] mt-0.5 flex-shrink-0" aria-hidden="true">
        <rect width="16" height="16" x="4" y="4" rx="2" /><rect width="6" height="6" x="9" y="9" rx="1" /><path d="M15 2v2" /><path d="M15 20v2" /><path d="M2 15h2" /><path d="M2 9h2" /><path d="M20 15h2" /><path d="M20 9h2" /><path d="M9 2v2" /><path d="M9 20v2" />
      </svg>
    ),
  },
  {
    title: "Hardware Modding & Electronics",
    description: "Experience with ESP32 microcontrollers, soldering, and custom cooling system modifications.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--primary-accent-color)] mt-0.5 flex-shrink-0" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    title: "Automated Toolchain Design",
    description: "Building custom CLI tools and build systems for native environment security auditing.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--primary-accent-color)] mt-0.5 flex-shrink-0" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "Lower-Level Optimization",
    description: "Actively transitioning from high-level frameworks to memory allocation, binary toolchain internals, and performance profiling.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--primary-accent-color)] mt-0.5 flex-shrink-0" aria-hidden="true">
        <path d="M10 22L14 2" /><path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" />
      </svg>
    ),
  },
];

const personalDisciplines = [
  {
    title: "Physical Discipline — Table Tennis",
    description: "5+ years of dedicated practice. Demonstrates the same high-level grit, repetition, and technical precision applied to engineering.",
    icon: (
      <svg className="text-[var(--primary-accent-color)] mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" stroke="currentColor" viewBox="0 0 512 512" aria-hidden="true">
        <path d="M496.2 296.5C527.7 218.7 512 126.2 449 63.1 365.1-21 229-21 145.1 63.1l-56 56.1 211.5 211.5c46.1-62.1 131.5-77.4 195.6-34.2zm-217.9 79.7L57.9 155.9c-27.3 45.3-21.7 105 17.3 144.1l34.5 34.6L6.7 424c-8.6 7.5-9.1 20.7-1 28.8l53.4 53.5c8 8.1 21.2 7.6 28.7-1L177.1 402l35.7 35.7c19.7 19.7 44.6 30.5 70.3 33.3-7.1-17-11-35.6-11-55.1-.1-13.8 2.5-27 6.2-39.7zM416 320c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96z" />
      </svg>
    ),
  },
  {
    title: "Strategic Logic — Chess (1100+ ELO)",
    description: "Pattern recognition, opening theory, and tactical pressure management under time constraints — skills that translate directly to system design.",
    icon: (
      <svg className="text-[var(--primary-accent-color)] mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 512 512" fill="currentColor" stroke="currentColor" aria-hidden="true">
        <path d="M168 56l0 40-78.1 0c-14.3 0-25.9 11.6-25.9 25.9 0 4 .9 8 2.7 11.6l33.4 66.8c-11.4 1.8-20.2 11.7-20.2 23.7 0 13.3 10.7 24 24 24l5.6 0-13.6 136-56.2 70.3c-5 6.3-7.8 14.1-7.8 22.2 0 19.6 15.9 35.5 35.5 35.5l248.9 0c19.6 0 35.5-15.9 35.5-35.5 0-8.1-2.7-15.9-7.8-22.2L288 384 274.4 248 280 248c13.3 0 24-10.7 24-24 0-11.9-8.7-21.9-20.2-23.7l33.4-66.8c1.8-3.6 2.7-7.6 2.7-11.6 0-14.3-11.6-25.9-25.9-25.9l-78.1 0 0-40 16 0c13.3 0 24-10.7 24-24S245.3 8 232 8l-16 0 0-16c0-13.3-10.7-24-24-24S168-21.3 168-8l0 16-16 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l16 0z" />
      </svg>
    ),
  },
];

const growthTargets = [
  {
    title: "Cross-Platform Mobile Development",
    description: "Expanding full-stack web expertise into production-grade mobile applications using React Native — targeting App Store deployment.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--primary-accent-color)] mt-0.5 flex-shrink-0" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
  {
    title: "Structured Delivery Under Constraints",
    description: "Implementing sprint-based scheduling to sustain high-output development cycles alongside academic obligations without sacrificing output quality.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--primary-accent-color)] mt-0.5 flex-shrink-0" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Professional UI/UX & Accessibility",
    description: "Acquiring formal interaction design principles — WCAG 2.1 AA standards, Figma workflows, and component-level accessibility — to produce both engineering-correct and visually excellent interfaces.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--primary-accent-color)] mt-0.5 flex-shrink-0" aria-hidden="true">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    title: "Advanced Hardware Tooling",
    description: "Upgrading my workstation with precision tooling (custom digital soldering stations, thermal sensors) and active fume extraction to refine my PCB fabrication process safely.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--primary-accent-color)] mt-0.5 flex-shrink-0" aria-hidden="true">
        <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>
      </svg>
    ),
  },
  {
    title: "Embedded A/V Streaming (WIP)",
    description: "Currently engineering a remote-controlled vehicle capable of streaming synchronized video and audio over a real-time network link.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--primary-accent-color)] mt-0.5 flex-shrink-0" aria-hidden="true">
        <circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/>
      </svg>
    ),
  },
];

function SkillCard({ title, items, accentClass = "" }) {
  const listRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view");
          }
        });
      },
      { threshold: 0 }
    );
    const items = listRef.current?.querySelectorAll("li");
    items?.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`glass-card rounded-2xl p-6 lg:p-8 flex flex-col gap-6 ${accentClass}`}>
      <h3 className="text-lg font-bold text-[var(--primary-accent-color)] tracking-widest uppercase text-sm">
        {title}
      </h3>
      <ul ref={listRef} className="flex flex-col gap-5 select-text">
        {items.map((item, index) => (
          <li
            key={index}
            className="about-me-list-item flex gap-4 items-start"
          >
            {item.icon}
            <div className="flex flex-col gap-1">
              <h4 className="text-base font-bold text-[var(--text-heading)] leading-snug">
                {item.title}
              </h4>
              <p className="text-sm text-[var(--text-body)] leading-relaxed">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AboutMePage() {
  return (
    <div id="page2" className="page2 relative py-16 md:py-24">
      <div className="flex flex-col gap-12 items-center w-full px-4 md:px-8 max-w-7xl mx-auto z-10">

        {/* Section header */}
        <div className="flex items-center gap-4 w-full">
          <div className="h-1 w-12 bg-gradient-to-r from-[#8B2C40] to-[#72363E] rounded-full flex-shrink-0" />
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-text)]">About Me</h2>
        </div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 w-full items-start">

          {/* Left column — Technical + Personal */}
          <div className="flex flex-col gap-8">
            <section aria-labelledby="tech-stack-heading">
              <h2 id="tech-stack-heading" className="sr-only">Core Technical Stack</h2>
              <SkillCard
                title="Core Technical Stack"
                items={technicalStack}
              />
            </section>

            <section aria-labelledby="disciplines-heading">
              <h2 id="disciplines-heading" className="sr-only">Personal & Strategic Disciplines</h2>
              <SkillCard
                title="Personal & Strategic Disciplines"
                items={personalDisciplines}
                accentClass="border-[var(--glass-border)]"
              />
            </section>
          </div>

          {/* Right column — Growth Targets */}
          <section aria-labelledby="growth-heading" className="h-full">
            <h2 id="growth-heading" className="sr-only">Engineering Growth Targets</h2>
            <SkillCard
              title="Engineering Growth Targets"
              items={growthTargets}
              accentClass="h-full"
            />
          </section>

        </div>
      </div>
    </div>
  );
}

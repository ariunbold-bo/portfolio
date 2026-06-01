import React, { useRef, useState } from "react";
import Link from "next/link";

export function CreativeEngineering() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const modalVideoRef = useRef(null);

  const videoClasses =
    "cursor-pointer transform transition-all duration-300 ease-in-out " +
    "hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(139,44,64,0.3)] rounded-xl overflow-hidden border border-[var(--glass-border)]";

  const openModal = (videoSrc) => {
    setSelectedVideo(videoSrc);
    setTimeout(() => setIsOpen(true), 10);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setSelectedVideo(null), 300);
  };

  return (
    <div className="flex select-text flex-col lg:flex-row p-4 sm:p-8 md:p-12 lg:p-20 min-h-screen w-full gap-8 lg:gap-16 justify-center items-center relative">
      {/* Modal Overlay */}
      {selectedVideo && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${isOpen
            ? "opacity-100 pointer-events-auto bg-black/80"
            : "opacity-0 pointer-events-none"
            }`}
          onClick={closeModal}
        >
          <div
            className={`relative p-4 w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 max-w-4xl max-h-full bg-transparent 
                        transform transition-transform duration-300 ease-out`}
            style={{ transform: isOpen ? "scale(1)" : "scale(0.75)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              className="w-full max-h-[80dvh] object-contain rounded-2xl shadow-2xl border border-[var(--glass-border)]"
              controls
              loop
              ref={modalVideoRef}
              autoPlay
              muted={false}
              playsInline
            >
              <source src={selectedVideo} type="video/mp4" />
              <track kind="captions" label="English" srcLang="en" default />
              Your browser does not support the video tag.
            </video>
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-[var(--text-muted)] text-4xl font-light hover:text-[var(--primary-accent-color)] transition-colors p-2 cursor-pointer z-50"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="w-full max-w-7xl flex flex-col gap-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gradient">
          Hardware & Systems Integration
        </h1>
        <div className="w-full flex flex-col xl:flex-row gap-8 lg:gap-12">
          {/* ESP32 Project */}
          <Link href="/esp32" className="w-full xl:w-1/2 flex flex-col sm:flex-row gap-6 p-6 rounded-2xl glass-card hover:bg-[var(--bg-glass-hover)] transition-all duration-300 group cursor-pointer hover:scale-[1.02]">
            <div className="flex-shrink-0 mx-auto sm:mx-0 w-[246px]">
              {/* Explicit aspect ratio prevents CLS while video metadata loads */}
              <div className="aspect-[9/16] w-full overflow-hidden rounded-xl border border-[var(--glass-border)]">
                <video
                  width="246"
                  height="414"
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster="/esp32-poster.webp"
                  aria-label="ESP32 OLED animation demo"
                  className={videoClasses}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openModal("/esp32-demo.mp4");
                  }}
                  onMouseOver={(e) => e.target.play().catch(() => {})}
                  onMouseOut={(e) => e.target.pause()}
                >
                  <source src="/esp32-demo.mp4" type="video/mp4" />
                  <track kind="captions" label="English" srcLang="en" default />
                  <div className="w-full h-full flex items-center justify-center bg-[var(--bg-glass)] text-[var(--text-muted)] text-xs text-center p-4">
                    ESP32 OLED demo — video unavailable
                  </div>
                </video>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-[20px]">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-[var(--primary-accent-color)]">
                ESP32 Microcontroller Integration
              </h2>
              <ul className="space-y-3 text-sm sm:text-base text-[var(--text-body)]">
                <li className="flex gap-2">
                  <span className="text-[var(--primary-accent-color)]">•</span>
                  Developed firmware in C++ for efficient performance.
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--primary-accent-color)]">•</span>
                  Implemented U8g2 library for binary-encoded GIFs on 128x64 OLED.
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--primary-accent-color)]">•</span>
                  Optimized resources for smooth playback on limited hardware.
                </li>
              </ul>
              <div className="mt-4 flex items-center text-[var(--primary-accent-color)] font-medium text-sm group-hover:translate-x-2 transition-transform duration-300">
                View Project Details <span className="ml-2">→</span>
              </div>
            </div>
          </Link>

          {/* Mobile Mod Project */}
          <Link href="/s21-mod" className="w-full xl:w-1/2 flex flex-col sm:flex-row gap-6 p-6 rounded-2xl glass-card hover:bg-[var(--bg-glass-hover)] transition-all duration-300 group cursor-pointer hover:scale-[1.02]">
            <div className="flex-shrink-0 mx-auto sm:mx-0 w-[246px]">
              {/* Explicit aspect ratio prevents CLS while video metadata loads */}
              <div className="aspect-[9/16] w-full overflow-hidden rounded-xl border border-[var(--glass-border)]">
                <video
                  width="246"
                  height="414"
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster="/mobile-poster.webp"
                  aria-label="Project CryoCell phone mod demo"
                  className={videoClasses}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openModal("/mobile-compressed.mp4");
                  }}
                  onMouseOver={(e) => e.target.play().catch(() => {})}
                  onMouseOut={(e) => e.target.pause()}
                >
                  <source src="/mobile-compressed.mp4" type="video/mp4" />
                  <track kind="captions" label="English" srcLang="en" default />
                  <div className="w-full h-full flex items-center justify-center bg-[var(--bg-glass)] text-[var(--text-muted)] text-xs text-center p-4">
                    CryoCell mod demo — video unavailable
                  </div>
                </video>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-[20px]">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-[var(--primary-accent-color)]">
                Project: CryoCell
              </h2>
              <ul className="space-y-3 text-sm sm:text-base text-[var(--text-body)]">
                <li className="flex gap-2">
                  <span className="text-[var(--primary-accent-color)]">•</span>
                  Engineered custom 10000mAh external battery solution.
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--primary-accent-color)]">•</span>
                  Designed fan control module with Power Save/Performance modes.
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--primary-accent-color)]">•</span>
                  Showcased hardware modification and thermal management skills.
                </li>
              </ul>
              <div className="mt-4 flex items-center text-[var(--primary-accent-color)] font-medium text-sm group-hover:translate-x-2 transition-transform duration-300">
                View Project Details <span className="ml-2">→</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

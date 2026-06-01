// Page3.jsx
"use client";

import { useEffect, useRef, useState } from "react";

export function ContactList() {
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const windowRef = useRef(null);
  const pageRef = useRef(null);
  const rafRef = useRef(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);

  useEffect(() => {
    const windowEl = windowRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (rafRef.current) cancelAnimationFrame(rafRef.current);
          rafRef.current = requestAnimationFrame(() => {
            if (entry.isIntersecting) {
              const ratio = entry.intersectionRatio;
              const maxTranslateX = 40;
              const degree = maxTranslateX * (1 - ratio);
              const opacity = Math.min(1, Math.pow(ratio, 0.5) * 1.5);
              const scale = Math.max(0.9, Math.pow(ratio, 0.5));

              windowEl.style.transform = `perspective(1000px) rotateX(${degree}deg)`;
              windowEl.style.opacity = opacity;
            } else {
              windowEl.style.transform = `perspective(1000px) rotateX(40deg)`;
              windowEl.style.opacity = 0;
            }
          });
        });
      },
      {
        threshold: Array.from({ length: 20 }, (_, i) => i / 20),
        root: null,
      },
    );

    observer.observe(pageRef.current);

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleCopy = (text, setter) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => {
      setter(false);
    }, 2000);
  };

  return (
    <div
      id="page4"
      ref={pageRef}
      className="page4 w-full flex justify-center items-center p-4 min-h-[100dvh]"
    >
      <div
        ref={windowRef}
        className="window-animation glass-panel border border-[var(--glass-border)] shadow-2xl
                   p-8 sm:p-12 flex flex-col rounded-2xl
                   w-full max-w-2xl
                   gap-8"
        style={{ willChange: "transform, opacity" }}
      >
        <div className="w-full flex flex-col gap-4 text-center">
          <h2 className="text-[var(--primary-accent-color)] text-lg md:text-xl font-semibold tracking-wider uppercase">
            Get in Touch
          </h2>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-heading)]">
            Let's talk about your project
          </h1>

          {/* Email */}
          <div
            onClick={() =>
              handleCopy("ariunboldbold200@gmail.com", setEmailCopied)
            }
            tabIndex={0}
            role="button"
            aria-label="Copy email address to clipboard"
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleCopy("ariunboldbold200@gmail.com", setEmailCopied); }}
            className={`mt-8 p-4 rounded-xl cursor-pointer transition-all duration-300 ease-in-out group border outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-accent-color)]
              ${
                emailCopied
                  ? "bg-green-500/20 border-green-500 text-green-600 dark:text-green-400"
                  : "bg-[var(--bg-glass)] border-[var(--glass-border)] hover:bg-[var(--bg-glass-hover)] hover:border-[var(--primary-accent-color)] text-[var(--text-body)] hover:text-[var(--text-heading)]"
              }`}
          >
            <p
              ref={emailRef}
              className="text-lg font-medium flex items-center justify-center gap-3"
            >
              {emailCopied 
                ? <span role="status" aria-live="polite">Email Copied!</span> 
                : <a href="mailto:ariunboldbold200@gmail.com" onClick={(e) => e.preventDefault()} className="hover:underline">ariunboldbold200@gmail.com</a>
              }
            </p>
          </div>

          {/* Phone */}
          <div
            onClick={() => handleCopy("+976 95550376", setPhoneCopied)}
            tabIndex={0}
            role="button"
            aria-label="Copy phone number to clipboard"
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleCopy("+976 95550376", setPhoneCopied); }}
            className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ease-in-out group border outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-accent-color)]
              ${
                phoneCopied
                  ? "bg-green-500/20 border-green-500 text-green-600 dark:text-green-400"
                  : "bg-[var(--bg-glass)] border-[var(--glass-border)] hover:bg-[var(--bg-glass-hover)] hover:border-[var(--primary-accent-color)] text-[var(--text-body)] hover:text-[var(--text-heading)]"
              }`}
          >
            <p
              ref={phoneRef}
              className="text-lg font-medium flex items-center justify-center gap-3"
            >
              {phoneCopied 
                ? <span role="status" aria-live="polite">Phone Copied!</span> 
                : <a href="tel:+97695550376" onClick={(e) => e.preventDefault()} className="hover:underline">+976 95550376</a>
              }
            </p>
          </div>

          <div className="flex gap-6 justify-center pt-8">
            <a
              href="https://www.facebook.com/profile.php?id=61553207489957"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Profile"
              className="text-[var(--text-muted)] hover:text-[#1877F2] hover:scale-110 transition-all duration-300"
            >
              <svg
                fill="currentColor"
                width={32}
                height={32}
                viewBox="0 0 512 512"
              >
                <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/ariuka_69/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className="text-[var(--text-muted)] hover:text-[#E4405F] hover:scale-110 transition-all duration-300"
            >
              <svg
                fill="currentColor"
                width={32}
                height={32}
                viewBox="0 0 448 512"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/ariunbold-bold-60058b30a/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="text-[var(--text-muted)] hover:text-[#0A66C2] hover:scale-110 transition-all duration-300"
            >
              <svg
                fill="currentColor"
                width={32}
                height={32}
                viewBox="0 0 448 512"
              >
                <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
              </svg>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:scale-110 transition-all duration-300"
              href="https://github.com/ariunbold-bo"
            >
              <svg
                fill="currentColor"
                width={32}
                height={32}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

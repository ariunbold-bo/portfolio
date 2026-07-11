"use client";

import { useEffect, useRef, useState } from "react";

const phrases = [
  "im just a guy who likes tinkering complex questions",
  "currently exploring lower-level systems & toolchains",
  "Arch Linux · ESP32 · React · C++",
];

export function Typewriter() {
  const [text, setText] = useState("");
  const idxRef = useRef(0);
  const deletingRef = useRef(false);

  useEffect(() => {
    const current = phrases[idxRef.current];
    let timer: ReturnType<typeof setTimeout>;

    if (!deletingRef.current) {
      if (text.length < current.length) {
        timer = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          40 + Math.random() * 30,
        );
      } else {
        timer = setTimeout(() => {
          deletingRef.current = true;
          setText((prev) => prev.slice(0, -1));
        }, 3000);
      }
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => setText((prev) => prev.slice(0, -1)), 20);
      } else {
        deletingRef.current = false;
        idxRef.current = (idxRef.current + 1) % phrases.length;
        timer = setTimeout(() => setText(phrases[idxRef.current][0]), 40);
      }
    }

    return () => clearTimeout(timer);
  }, [text]);

  return (
    <span>
      {text}
      <span className="caret" />
    </span>
  );
}

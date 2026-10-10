// ai component uhhh extra attention pls

"use client";

import * as React from "react";
import { Dialog } from "@base-ui/react/dialog";
import { cn } from "cn";
import Image from "next/image";
import { XIcon, ZoomInIcon } from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────── */

interface ImageModalProps {
  src: string;
  alt: string;
  /** Optional caption shown below the image */
  caption?: string;
  /** Custom trigger; defaults to a thumbnail of the image */
  trigger?: React.ReactNode;
  className?: string;
}

/* ─── Component ─────────────────────────────────────────────── */

export function ImageModal({
  src,
  alt,
  caption,
  trigger,
  className,
}: ImageModalProps) {
  return (
    <Dialog.Root>
      {/* ── Trigger ─────────────────────────────────────────── */}
      <Dialog.Trigger
        className={cn(
          "group relative inline-block cursor-zoom-in overflow-hidden rounded-(--radius) outline-none",
          className,
        )}
        aria-label={`View full image: ${alt}`}
      >
        {trigger ?? (
          <div className="relative">
            {/* zoom icon overlay */}
            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-(--radius) bg-black/0 transition-colors duration-200 group-hover:bg-black/30">
              <ZoomInIcon className="size-7 text-white opacity-0 drop-shadow-md transition-opacity duration-200 group-hover:opacity-100" />
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="block max-h-72 w-full rounded-(--radius) object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
      </Dialog.Trigger>

      <Dialog.Portal>
        {/* ── Backdrop ─────────────────────────────────────── */}
        <Dialog.Backdrop
          className={cn(
            "fixed inset-0 z-50 bg-black/70 backdrop-blur-sm",
            "transition-opacity duration-200",
            "data-starting-style:opacity-0 data-ending-style:opacity-0",
          )}
        />

        {/* ── Popup ────────────────────────────────────────── */}
        <Dialog.Popup
          className={cn(
            "fixed top-[50%] left-[50%] translate-[-50%] z-50 flex flex-col items-center justify-center p-4 outline-none",
            "transition-all duration-200",
            "data-starting-style:opacity-0 data-starting-style:scale-95",
            "data-ending-style:opacity-0 data-ending-style:scale-95",
          )}
        >
          {/* Close button */}
          <Dialog.Close
            className={cn(
              "absolute top-4 right-4 z-10 flex size-9 items-center justify-center rounded-full",
              "bg-black/50 text-white backdrop-blur-sm",
              "transition-colors duration-150 hover:bg-black/70",
            )}
            aria-label="Close image"
          >
            <XIcon className="size-5" />
          </Dialog.Close>

          {/* Image wrapper — click outside to close via backdrop */}
          <figure className="flex max-h-[90dvh] max-w-[90dvw] flex-col items-center gap-3">
            <div className="relative max-h-[80dvh] max-w-[90vw] overflow-hidden rounded-(--radius) shadow-2xl">
              {/* Use a regular img for unknown dimensions in modal */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                className="block max-h-[80dvh] max-w-[90vw] rounded-(--radius) object-contain"
              />
            </div>

            {caption && (
              <figcaption className="max-w-prose text-center text-sm text-white/70">
                {caption}
              </figcaption>
            )}
          </figure>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

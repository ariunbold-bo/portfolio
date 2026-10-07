"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { ImageModal } from "./ui/image-modal";

export function HeroPage() {
  return (
    <div className="w-full h-full flex justify-center items-center gap-20">
      <div>
        <h1>Ariunbold Bold</h1>
        <p>A student, athlete and a full-stack developer</p>
      </div>
      <AspectRatio
        ratio={1 / 1}
        className="w-full max-w-96 rounded-(--radius) bg-muted"
      >
        <ImageModal
          src="/hero.webp"
          alt="Ariunbold Bold"
          caption="Ariunbold bold"
          trigger={
            <img
              src="/hero.webp"
              // loading="eager"
              // alt="Photo"
              // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw (max-height: 300px)"
              className="rounded-(--radius) "
            />
          }
          className="hover:scale-[1.03] hover:cursor-pointer hover:rotate-4 duration-700 object-cover"
        />
      </AspectRatio>
    </div>
  );
}

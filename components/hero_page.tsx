"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

export function HeroPage() {
  return (
    <div className="w-full h-full flex justify-center items-center gap-20">
      <h1>Ariunbold Bold</h1>
      <AspectRatio
        ratio={1 / 1}
        className="w-full max-w-80 rounded-(--radius) bg-muted"
      >
        <Image
          src="/hero.webp"
          alt="Photo"
          fill
          className="rounded-(--radius) object-cover"
        />
      </AspectRatio>
    </div>
  );
}

"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { ImageModal } from "./ui/image-modal";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { Button } from "./ui/button";

export function HeroPage() {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0.1,
    root: null,
    rootMargin: "0px",
  });
  return (
    <div
      ref={ref}
      className="w-full h-full flex justify-center items-center gap-20"
    >
      <div
        className={
          entry?.isIntersecting
            ? "translate-x-0 duration-700 opacity-100 "
            : " -translate-x-125 duration-700 opacity-0"
        }
      >
        <h1 className="text-[foreground] !text-[60px] text-primary !font-extrabold">
          Ariunbold Bold
        </h1>
        <p className="text-muted-foreground">
          A student, athlete and a full-stack developer
        </p>
        <div className="mt-5 flex gap-4">
          <Button className="py-5 px-6 " variant="default">
            <p>Contact me</p>
          </Button>
          <Button className="py-5 px-6 text-bold!" variant="outline">
            <p>Projects</p>
          </Button>
        </div>
      </div>
      <AspectRatio
        ratio={1 / 1}
        className="w-full max-w-xl rounded-(--radius) bg-muted"
      >
        <ImageModal
          src="/hero.webp"
          alt="Ariunbold Bold"
          caption="Ariunbold bold"
          trigger={
            <img
              src="/hero.webp"
              loading="eager"
              alt="Photo"
              // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw (max-height: 300px)"
              className="rounded-(--radius) "
            />
          }
          className="hover:scale-[1.03] hover:cursor-pointer hover:rotate-2 duration-700 object-cover"
        />
      </AspectRatio>
    </div>
  );
}

import { NextResponse } from "next/server";
import en from "@/app/lib/dictionaries/en";
const { identity } = en;

const images = [
  {
    src: "/hero.webp",
    title: "Ariunbold Bold — Hero Portrait",
    caption: "Ariunbold Bold, systems and software developer from Mongolia.",
    page: `${identity.site}/en`,
  },
  {
    src: "/first-code.webp",
    title: "First Lines of Code — Journey",
    caption: "Early C programming setup and first code written by Ariunbold.",
    page: `${identity.site}/en`,
  },
  {
    src: "/arch-linux.webp",
    title: "Arch Linux Setup — Ricing & Workflow",
    caption: "Customized Arch Linux environment and Hyprland ricing.",
    page: `${identity.site}/en`,
  },
  {
    src: "/first-victim-poster.webp",
    title: "First Victim Mod — Hardware Journey",
    caption: "First hardware modification project poster.",
    page: `${identity.site}/en`,
  },
  {
    src: "/self-taught-era-poster.webp",
    title: "Self-Taught Developer Era — Poster",
    caption: "Poster representing the self-taught software & systems journey.",
    page: `${identity.site}/en`,
  },
  {
    src: "/linux-android-poster.webp",
    title: "Linux VMs on Android — Poster",
    caption: "Running Linux distributions and virtual environments on Android.",
    page: `${identity.site}/en`,
  },
  {
    src: "/tts-era-poster.webp",
    title: "Mongolian TTS Engine — Poster",
    caption: "Poster for the Mongolian text-to-speech voice synthesis project.",
    page: `${identity.site}/en`,
  },
  {
    src: "/tsetseg.webp",
    title: "Tsetseg — Flower Photo",
    caption: "A flower photograph taken by Ariunbold Bold.",
    page: `${identity.site}/en/about`,
  },
  {
    src: "/ble_speaker_final_poster.webp",
    title: "Bluetooth Speaker Build Poster",
    caption: "Poster for the custom Bluetooth speaker build in the gallery.",
    page: `${identity.site}/en/about`,
  },
  {
    src: "/esp32-poster.webp",
    title: "ESP32 OLED Animation — Project Poster",
    caption: "ESP32 microcontroller driving a 128×64 OLED with animated GIF frames.",
    page: `${identity.site}/en/work/esp32`,
  },
  {
    src: "/mobile-poster.webp",
    title: "Samsung Galaxy S21 CryoCell Mod — Project Poster",
    caption: "Custom 10,000mAh battery and active cooling mod for the Galaxy S21.",
    page: `${identity.site}/en/work/cryocell`,
  },
  {
    src: "/arch-ricing-poster.webp",
    title: "Arch Linux Hyprland Ricing — Project Poster",
    caption: "Custom Arch Linux setup with Hyprland and keyboard RGB sync reacting to live wallpapers.",
    page: `${identity.site}/en/work/arch-ricing`,
  },
  {
    src: "/pusda_speaker1_poster.webp",
    title: "Pusda Speaker Gen 2 — Demo Poster",
    caption: "Second-generation DIY Bluetooth stereo speaker with dual isolated power rails.",
    page: `${identity.site}/en/work/pusda-speaker`,
  },
  {
    src: "/pusda_speaker2_poster.webp",
    title: "Pusda Speaker Gen 2 — Build Poster",
    caption: "Build detail of the Pusda Speaker Gen 2: enclosure, drivers, and power system.",
    page: `${identity.site}/en/work/pusda-speaker`,
  },
  {
    src: "/pusda_speaker.webp",
    title: "Pusda Speaker — Build Photo",
    caption: "Second-generation DIY Bluetooth stereo speaker using XH-MX8 amplifier, MH-MX8 BT receiver, and dual isolated power rails.",
    page: `${identity.site}/en/work/pusda-speaker`,
  },
];

export async function GET() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${images
    .map(
      (img) => `
  <url>
    <loc>${img.page}</loc>
    <image:image>
      <image:loc>${identity.site}${img.src}</image:loc>
      <image:title>${img.title}</image:title>
      <image:caption>${img.caption}</image:caption>
    </image:image>
  </url>`,
    )
    .join("")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

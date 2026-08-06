import { NextResponse } from "next/server";
import en from "@/app/lib/dictionaries/en";
const { identity } = en;

const images = [
  {
    src: "/hero.JPG",
    title: "Ariunbold Bold — Hero Portrait",
    caption: "Ariunbold Bold, systems developer from Mongolia.",
    page: `${identity.site}/en`,
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
    src: "/ble_speaker_final_poster.webp",
    title: "Custom DIY Bluetooth Speaker — Project Poster",
    caption: "Custom-built portable stereo Bluetooth speaker with dual power rails.",
    page: `${identity.site}/en/work/bt-speaker`,
  },
  {
    src: "/tsetseg.webp",
    title: "Tsetseg — Flower Photo",
    caption: "A flower photograph taken by Ariunbold Bold.",
    page: `${identity.site}/en/about`,
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

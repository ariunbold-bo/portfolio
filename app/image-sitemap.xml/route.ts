import { NextResponse } from "next/server";
import en from "@/app/lib/dictionaries/en";
const { identity } = en;

const images = [
  { src: "/hero.JPG", title: "Hero Background" },
  { src: "/esp32-poster.webp", title: "ESP32 Poster" },
  { src: "/mobile-poster.webp", title: "Mobile Mod Poster" },
  { src: "/ble_speaker_final_poster.jpg", title: "BLE Speaker Poster" },
  { src: "/tsetseg.webp", title: "Tsetseg" },
];

export async function GET() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${images
    .map(
      (img) => `
  <url>
    <loc>${identity.site}</loc>
    <image:image>
      <image:loc>${identity.site}${img.src}</image:loc>
      <image:title>${img.title}</image:title>
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

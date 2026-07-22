import { NextResponse } from "next/server";
import en from "@/app/lib/dictionaries/en";
const { identity } = en;

const videos = [
  { src: "/esp32-demo.mp4", title: "ESP32 Demo", description: "A demonstration of the ESP32 project." },
  { src: "/mobile-compressed.mp4", title: "Mobile App Demo", description: "Mobile application usage demonstration." },
  { src: "/ble_speaker_final.mp4", title: "BLE Speaker Final", description: "Final version of the custom BLE Speaker." },
  { src: "/arch_ricing.mp4", title: "Arch Linux Ricing", description: "Customizing and ricing Arch Linux." },
  { src: "/playing_tts.mp4", title: "Playing TTS", description: "Playing Text-to-Speech audio." },
  { src: "/ble_speaker_mono.mp4", title: "BLE Speaker Mono", description: "Mono version of the BLE Speaker." },
];

export async function GET() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${videos.map((vid) => `
  <url>
    <loc>${identity.site}</loc>
    <video:video>
      <video:thumbnail_loc>${identity.site}/og-image.png</video:thumbnail_loc>
      <video:title>${vid.title}</video:title>
      <video:description>${vid.description}</video:description>
      <video:content_loc>${identity.site}${vid.src}</video:content_loc>
    </video:video>
  </url>`).join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

import { NextResponse } from "next/server";
import en from "@/app/lib/dictionaries/en";
const { identity } = en;

const videos = [
  {
    src: "/esp32-demo.mp4",
    title: "ESP32 OLED Animation",
    description:
      "C++ firmware that decodes binary-encoded GIF frames and drives a 128×64 OLED at smooth framerates on an ESP32 microcontroller.",
    page: `${identity.site}/en/work/esp32`,
    thumbnail: `${identity.site}/esp32-poster.webp`,
    durationSeconds: 5,
    publicationDate: "2026-01-15",
  },
  {
    src: "/mobile-compressed.mp4",
    title: "Samsung Galaxy S21 CryoCell Mod Demo",
    description:
      "Hardware mod pairing a custom 10,000mAh power solution with an active cooling module and dual Power Save / Performance modes on a Galaxy S21.",
    page: `${identity.site}/en/work/cryocell`,
    thumbnail: `${identity.site}/mobile-poster.webp`,
    durationSeconds: 18,
    publicationDate: "2026-02-20",
  },
  {
    src: "/ble_speaker_final.mp4",
    title: "Custom DIY Stereo Bluetooth Speaker Build",
    description:
      "Custom-built portable Bluetooth speaker featuring isolated dual power rails, step-up voltage regulation, and tuned acoustic damping in a custom enclosure.",
    page: `${identity.site}/en/work/bt-speaker`,
    thumbnail: `${identity.site}/ble_speaker_final_poster.webp`,
    durationSeconds: 51,
    publicationDate: "2026-03-10",
  },
  {
    src: "/arch_ricing.mp4",
    title: "Arch Linux Hyprland Ricing and RGB Sync",
    description:
      "Highly customized Arch Linux setup using Hyprland, featuring keyboard RGB syncing that reacts to live and static wallpapers in real time.",
    page: `${identity.site}/en/work/arch-ricing`,
    thumbnail: `${identity.site}/hero.JPG`,
    durationSeconds: 24,
    publicationDate: "2026-04-05",
  },
  {
    src: "/ble_speaker_mono.mp4",
    title: "BLE Speaker Mono Version",
    description:
      "Earlier mono prototype of the custom Bluetooth speaker build — single driver configuration before the stereo final version.",
    page: `${identity.site}/en/about`,
    thumbnail: `${identity.site}/ble_speaker_final_poster.webp`,
    durationSeconds: 17,
    publicationDate: "2026-06-01",
  },
  {
    src: "/playing_tts.mp4",
    title: "Text-to-Speech Playback Demo",
    description:
      "Demonstration of a custom text-to-speech playback system — audio output and interface in action.",
    page: `${identity.site}/en/about`,
    thumbnail: `${identity.site}/hero.JPG`,
    durationSeconds: 60,
    publicationDate: "2026-05-15",
  },
];

export async function GET() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${videos
    .map(
      (vid) => `
  <url>
    <loc>${vid.page}</loc>
    <video:video>
      <video:thumbnail_loc>${vid.thumbnail}</video:thumbnail_loc>
      <video:title>${vid.title}</video:title>
      <video:description>${vid.description}</video:description>
      <video:content_loc>${identity.site}${vid.src}</video:content_loc>
      <video:duration>${vid.durationSeconds}</video:duration>
      <video:publication_date>${vid.publicationDate}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:uploader info="${identity.site}">${identity.name}</video:uploader>
    </video:video>
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

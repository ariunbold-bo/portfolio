import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { type HardwareProject } from "@/app/lib/types";
import en from "@/app/lib/dictionaries/en";
import { buildAlternates } from "@/app/lib/seo";
import { SiteBackground } from "@/app/components/site-background";
import { Icon } from "@/app/components/icons";

const poppinsExtrabold = Poppins({
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
});

const { identity, hardware: hardwareContent } = en;

const videoMeta: Record<string, { duration: number; uploadDate: string; thumbnail: string }> = {
  esp32:         { duration: 5,  uploadDate: "2026-01-15", thumbnail: `${identity.site}/esp32-poster.webp` },
  cryocell:      { duration: 18, uploadDate: "2026-02-20", thumbnail: `${identity.site}/mobile-poster.webp` },
  "bt-speaker":  { duration: 51, uploadDate: "2026-03-10", thumbnail: `${identity.site}/ble_speaker_final_poster.webp` },
  "arch-ricing": { duration: 24, uploadDate: "2026-04-05", thumbnail: `${identity.site}/hero.JPG` },
};

interface Props {
  params: Promise<{ slug: string; lang: string }>;
}

function findProject(slug: string): HardwareProject | undefined {
  return hardwareContent.find((h) => h.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang } = await params;
  const proj = findProject(slug);
  if (!proj) return { title: "Not Found" };
  const meta = videoMeta[slug];
  const ogImage = meta?.thumbnail ?? `${identity.site}/hero.JPG`;
  return {
    title: `Watch ${proj.name}`,
    description: `Watch the full video of ${proj.name}. ${proj.summary}`,
    alternates: buildAlternates(identity.site, lang, `/work/${slug}/watch`),
    openGraph: {
      url: `${identity.site}/${lang}/work/${slug}/watch`,
      title: `Watch ${proj.name}`,
      description: `Watch the full video of ${proj.name}. ${proj.summary}`,
      siteName: identity.siteName,
      type: "video.other",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `Watch ${proj.name} — ${proj.kicker}`,
        },
      ],
    },
    robots: { index: true, follow: true },
  };
}

export default async function WatchPage({ params }: Props) {
  const { lang, slug } = await params;
  const proj = findProject(slug);
  if (!proj) notFound();

  const vMeta = videoMeta[slug];
  const firstVideo = proj.media?.find((m) => m.type === "video");

  if (!firstVideo) notFound(); // If project has no video, 404

  return (
    <>
      {vMeta && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              name: proj.name,
              description: proj.summary,
              thumbnailUrl: vMeta.thumbnail,
              contentUrl: `${identity.site}${firstVideo.src}`,
              uploadDate: vMeta.uploadDate,
              duration: `PT${vMeta.duration}S`,
              author: {
                "@type": "Person",
                name: identity.name,
                url: identity.site,
              },
              publisher: {
                "@type": "Person",
                name: identity.name,
                url: identity.site,
              },
              embedUrl: `${identity.site}/${lang}/work/${slug}/watch`,
            }),
          }}
        />
      )}
      <SiteBackground />

      <main className="relative z-10 flex min-h-[90vh] flex-col items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-5xl">
          <Link
            href={`/${lang}/work/${slug}`}
            className="group mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted transition-colors hover:text-accent"
          >
            <Icon name="arrowLeft" className="h-3.5 w-3.5" />
            <span className="link-underline">Back to Project</span>
          </Link>
          
          <div className="mb-8">
            <h1 className={`${poppinsExtrabold.className} text-3xl font-extrabold tracking-tight text-ink-strong sm:text-4xl md:text-5xl`}>
              {proj.name}
            </h1>
            <p className="mt-2 text-muted">{proj.summary}</p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-black shadow-[var(--shadow)]">
            <video
              src={firstVideo.src}
              poster={firstVideo.poster}
              controls
              playsInline
              preload="metadata"
              className="h-auto w-full max-h-[75vh] object-contain"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </main>
    </>
  );
}

<div align="center">

```
  ╔═╗┌─┐┬─┐┬┌─┐┬┌─┐┌┐┌┬┌─┐┌─┐  ╔╦╗┌─┐┌┬┐┌─┐┌┐ ┬─┐┌─┐
  ╠═╣│  ├┬┘│├┤ ││ │││││└─┐├┤    ║ │ ││││├┤ ├┴┐├┬┘├┤
  ╩ ╩└─┘┴└─┴└  ┴└─┘┘└┘┴└─┘└─┘   ╩ └─┘┴ ┴└─┘└─┘┴└─└─┘
```

### Systems Developer · Hardware Tinkerer · Arch Linux Enjoyer

[🌐 ariunbold.dev](https://ariunbold.dev) &nbsp;·&nbsp; [📧 ariunboldbold200@gmail.com](mailto:ariunboldbold200@gmail.com)

</div>

---

## what is this

my corner of the web. portfolio, sandbox, and case-study dump for everything i build — software, hardware, firmware, and the occasional questionable modification.

built because most templates feel like the same startup landing page copy-pasted with a different gradient. this one actually feels like **me**.

## the vibe

- warm amber & slate palette — muted gold (`#c4a575`) on dark, bronze on light
- glassmorphism cards with ambient blob background
- circuit-dot grid overlay (hardware flavor)
- typewriter tagline cycling through what i'm into
- smooth light/dark mode toggle — no flash-white at 3am
- fully bilingual: english & mongolian via a single dict swap
- **live audio synthesizer** — native Web Audio API oscilloscope with frequency, waveform & gain controls
- responsive — mobile is a first-class citizen

## stack

| layer      | thing                                 |
| ---------- | ------------------------------------- |
| framework  | next.js 16 (app router)               |
| language   | typescript (strict)                   |
| styling    | tailwind css v4                       |
| fonts      | poppins (via next/font, per-route weight loading) |
| animation  | css keyframes + intersection observer |
| audio      | native Web Audio API (no libraries)   |
| i18n       | file-based dict (`en.ts` / `mn.ts`)   |
| deployment | vercel                                |
| scroll     | lenis                                 |

zero runtime deps beyond react + next — except lenis for smooth scroll. no framer motion, no gsap, no radix, no three.js — just css doing work.

## what's inside

```
app/
├── layout.tsx                # THE root layout — html/body, font, theme-flash script.
│                             # Renders for every request, including ones that never
│                             # resolve into `[lang]` (e.g. a bare 404) — see below.
├── not-found.tsx             # global 404 (only place guaranteed to always render)
├── [lang]/
│   ├── layout.tsx            # nested layout — NavRail/SiteBackground/ScrollProgress/
│   │                         # SmoothScroll + per-locale metadata. No html/body here.
│   ├── loading.tsx           # skeleton shown while a route segment is loading
│   ├── page.tsx              # main landing page (server component)
│   ├── about/, contact/, projects/page.tsx
│   └── work/[slug]/page.tsx  # hardware project case-study pages
├── components/
│   ├── sections/
│   │   ├── about.tsx         # about me + disciplines + growth + gallery
│   │   ├── hero.tsx          # landing hero with typewriter
│   │   ├── stack.tsx         # tech stack cards
│   │   ├── synth.tsx         # live audio synthesizer + oscilloscope (Web Audio API)
│   │   ├── journey.tsx       # timeline
│   │   ├── hardware.tsx      # hardware project cards
│   │   ├── projects.tsx      # software project cards
│   │   └── contact.tsx       # contact links + footer
│   ├── glass-card.tsx        # reusable glassmorphism card
│   ├── icons.tsx             # all SVG icons in one file (exports `IconName`)
│   ├── lightbox.tsx          # fullscreen media viewer, locks scroll via lenis
│   ├── nav-rail.tsx          # floating side nav + mobile bottom bar
│   ├── page-shell.tsx        # shared wrapper for about/contact/projects pages
│   ├── reveal.tsx            # scroll-reveal via intersection observer
│   ├── site-background.tsx   # ambient blobs + grid + noise
│   ├── smooth-scroll-provider.tsx  # lenis instance + useLenis() context
│   ├── theme-toggle.tsx      # dark/light with useSyncExternalStore
│   └── typewriter.tsx        # cycling typewriter effect
├── lib/
│   ├── dictionaries/
│   │   ├── en.ts             # all english copy — change text here
│   │   └── mn.ts             # mongolian translation
│   ├── locales.ts            # LOCALES/Locale/resolveLocale — single source of truth
│   ├── hooks.ts              # useLocale(), useRafOnScroll() — shared client hooks
│   ├── seo.ts                # canonical + hreflang alternates helper (en/mn)
│   └── types.ts              # shared TypeScript types
├── sitemap.ts, robots.ts     # generated sitemap (en/mn) + robots rules
└── globals.css               # CSS custom properties + design tokens

proxy.ts                      # locale-prefix redirect + forwards `x-locale` header
public/llms.txt               # site map for AI agents/crawlers
```

## changing any text on the site

every visible string lives in [`app/lib/dictionaries/en.ts`](./app/lib/dictionaries/en.ts). one file, one edit, done — no hunting through components.

```ts
// example: change the hero status badge
ui: {
  openForOpp: "Open for opportunities",  // ← just change this
  ...
}
```

## performance, seo & a11y

some housekeeping that's easy to regress if you're not careful:

- **root layout split**: `app/layout.tsx` is the *only* place that renders `<html>`/`<body>` — `app/[lang]/layout.tsx` is a nested layout (NavRail, SiteBackground, etc.) and must never redeclare them. This split exists because truly unmatched URLs (and anything outside `[lang]`) skip nested layouts entirely; without a real root layout, `app/not-found.tsx` used to render with **zero CSS and no font** (a real bug this repo hit). If you ever see an unstyled page, check this first.
- **locale as data, not duplicated strings**: `app/lib/locales.ts` is the single source of truth for supported locales (`LOCALES`, `Locale`, `resolveLocale`). `proxy.ts`, `lib/seo.ts`, and `sitemap.ts` all import from it — don't redeclare `["en", "mn"]` anywhere else. Client components should derive the current locale with `useLocale()` from `lib/hooks.ts` rather than hand-rolling `pathname.split("/")[1]`.
- **internal links must include the locale**: always build internal hrefs as `` `/${lang}/...` ``, never a bare `/...` path — a few of these slipped through before (work-detail prev/next links, the hardware card's "more" link) and silently bounced users to the English version.
- **fonts**: only the poppins weights actually used site-wide (400/500/600/700) load in the root layout; the 800-weight used solely on `work/[slug]` loads there instead, so it isn't preloaded on every other route.
- **images**: `next/image` serves avif/webp automatically (see `next.config.ts`); any raw asset used outside of it (e.g. `<video poster>`) is pre-converted to `.webp` by hand.
- **canonical + hreflang**: every route generates its own self-referencing canonical plus `en`/`mn`/`x-default` alternates via `app/lib/seo.ts` — don't hardcode `/en/...` in a page's metadata, use `buildAlternates(site, lang, path)`.
- **sitemap**: `app/sitemap.ts` emits both locales per route with `alternates.languages`, matching the hreflang setup above.
- **llms.txt**: `public/llms.txt` lists the site's key pages for AI agents/crawlers — keep it in sync when routes change.
- **AudioContext autoplay**: `synth.tsx` lazy-initialises `AudioContext` on the first user click (play button) to comply with browser autoplay policies — never construct it at module or component init time or Chrome/Firefox will silently suspend it.
- **one `<h1>` per page**: `about`, `contact`, and `projects` are standalone pages, so their primary `SectionHeading` is rendered `as="h1"`. Sections nested inside a page that already has its own `<h1>` (e.g. Hero on the homepage) should keep the default `<h2>`.
- **contrast**: `--muted` is intentionally a *different* hex per theme in `globals.css` (not shared) so it clears WCAG AA (4.5:1) against both the light and dark backgrounds. avoid stacking `opacity-*` on top of `text-muted`/`text-accent` for real content — it re-breaks contrast even when the base token passes.
- **scroll lock**: lenis drives scroll itself, so modals (see `lightbox.tsx`) call `lenis.stop()`/`.start()` via `useLenis()` in addition to toggling `overflow: hidden` — CSS alone won't stop lenis's own scroll loop.

## running locally

```bash
git clone https://github.com/ariunbold-bo/portfolio.git
cd portfolio
npm install
npm run dev
```

open http://localhost:3000. hot reload works. break things.

```bash
npm run build    # production build
npm run lint     # eslint
```

## projects featured

**hardware**
- **ESP32 Animation** — C++/U8g2 firmware decoding binary GIFs onto a 128×64 OLED. tight memory, smooth frames.
- **CryoCell** — Samsung S21 mod: custom 10,000mAh battery + active cooling fan. −10°C under load.
- **BLE Speaker** — Gen 1 custom Bluetooth speaker build from scratch.
- **Pusda Speaker Gen 2** — upgraded stereo BT system: dual isolated power rails (3.7V + 8.4V), XH-MX8 amp, MH-MX8 receiver, 2× 4Ω 15W drivers, cardboard box enclosure. ear-splitting loud.
- **Arch Ricing** — full hyprland/wayland desktop environment setup.

**software**
- **Canu** — collaborative realtime canvas app
- **Photo Sharing Platform** — image host built for pentesting workflows
- **Magalang** — card memorization game with progressive difficulty

## what i'm learning

- cross-platform mobile with react native (app store deployment is the goal)
- proper UI/UX & WCAG 2.1 AA accessibility
- embedded a/v streaming — RC car with real-time video/audio (WIP)
- lower-level everything: memory, binary toolchains, profiling

## audio synthesizer

`components/sections/synth.tsx` — no external audio libraries, just the browser's own APIs:

- **`AudioContext`** — lazy-init on first click; respects autoplay policy
- **`OscillatorNode`** — sine / square / sawtooth / triangle waveforms; rebuilt on waveform change
- **`GainNode`** — volume control with `setTargetAtTime` smoothing (no pops)
- **`AnalyserNode`** — feeds the canvas oscilloscope 2048 samples per frame
- **`requestAnimationFrame` loop** — two-pass draw: glow shadow + crisp gradient line, both using the live `--accent-rgb` CSS token so it matches the active theme
- `ResizeObserver` keeps the canvas pixel-perfect at any DPR
- Frequency slider is **logarithmic** (20 Hz → 2 kHz) — linear would make the low end useless
- Note name display converts Hz → nearest 12-TET pitch (e.g. 440 Hz → A4)

## out of scope

this repo does **not** include:

- a blockchain
- AI-generated everything
- a "book a call" button
- newsletter signup
- my dotfiles (those are classified)

## credits

built by [ariunbold](https://github.com/ariunbold-bo). every pixel is intentional.

---

<div align="center">
  <sub>
    <a href="https://ariunbold.dev">ariunbold.dev</a>
  </sub>
</div>

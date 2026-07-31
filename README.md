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

- deep pine green palette pulled directly from my hero photo
- glassmorphism cards with ambient blob background
- circuit-dot grid overlay (hardware flavor 👾)
- typewriter tagline cycling through what i'm into
- smooth light/dark mode toggle — no flash-white at 3am
- fully bilingual: english & mongolian (🇲🇳) via a single dict swap
- responsive — mobile is a first-class citizen

## stack

| layer      | thing                                 |
| ---------- | ------------------------------------- |
| framework  | next.js 15 (app router)               |
| language   | typescript (strict)                   |
| styling    | tailwind css v4                       |
| fonts      | poppins (via next/font)               |
| animation  | css keyframes + intersection observer |
| i18n       | file-based dict (`en.ts` / `mn.ts`)   |
| deployment | vercel                                |
| scroll     | lenis                                 |

zero runtime deps beyond react + next. no framer motion, no radix, no three.js — just css doing work.

## what's inside

```
app/
├── [lang]/
│   ├── page.tsx              # main landing page (server component)
│   └── work/[slug]/page.tsx  # hardware project case-study pages
├── components/
│   ├── sections/
│   │   ├── about.tsx         # about me + disciplines + growth + gallery
│   │   ├── hero.tsx          # landing hero with typewriter
│   │   ├── stack.tsx         # tech stack cards
│   │   ├── journey.tsx       # timeline
│   │   ├── hardware.tsx      # hardware project cards
│   │   ├── projects.tsx      # software project cards
│   │   └── contact.tsx       # contact links + footer
│   ├── glass-card.tsx        # reusable glassmorphism card
│   ├── icons.tsx             # all SVG icons in one file
│   ├── nav-rail.tsx          # floating side nav + mobile bottom bar
│   ├── reveal.tsx            # scroll-reveal via intersection observer
│   ├── site-background.tsx   # ambient blobs + grid + noise
│   ├── theme-toggle.tsx      # dark/light with useSyncExternalStore
│   └── typewriter.tsx        # cycling typewriter effect
├── lib/
│   ├── dictionaries/
│   │   ├── en.ts             # all english copy — change text here
│   │   └── mn.ts             # mongolian translation
│   └── types.ts              # shared TypeScript types
└── globals.css               # CSS custom properties + design tokens
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
- **BLE Speaker** — custom bluetooth speaker build from scratch.
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

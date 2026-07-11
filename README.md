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

my lil corner of the web. a portfolio / sandbox / case-study dump for the stuff I build — software, hardware, firmware, and questionable modifications.

built because most templates are boring and i wanted something that actually feels like **me** — not another Tailwind startup landing page with a gradient hero and a Calendly link.

## the vibe

- rosewood & blush color palette (tired: blue SaaS gradient, wired: warm clay)
- chunky brutalist cards with glass morphism
- circuit-dot sprinkles (hardware flavor 👾)
- typewriter tagline that cycles through what i'm into
- theme toggle that doesn't flash-white you at 3am
- works on a phone, barely

## stack

| layer      | thing                                 |
| ---------- | ------------------------------------- |
| framework  | next.js 16 (app router)               |
| language   | typescript (strict)                   |
| styling    | tailwind css v4                       |
| fonts      | poppins (via next/font)               |
| animation  | css keyframes + intersection observer |
| build      | turbopack                             |
| deployment | vercel                                |

zero runtime deps beyond react + next. no framer motion, no radix, no three.js — just css doing work.

## what's inside

```
app/
├── components/
│   ├── sections/         # each page section (hero, about, stack, etc.)
│   ├── glass-card.tsx    # reusable glassmorphism card
│   ├── icons.tsx         # all SVG icons in one file
│   ├── nav-rail.tsx      # floating side nav + mobile bottom bar
│   ├── reveal.tsx        # scroll-reveal intersection observer
│   ├── site-background.tsx  # ambient blobs + grid + noise
│   ├── theme-toggle.tsx  # dark/light with useSyncExternalStore
│   ├── typewriter.tsx    # cycling typewriter effect
│   └── ...               # scroll-progress, timeline-line, etc.
├── lib/
│   └── content.ts        # single source of truth for all copy
├── work/
│   └── [slug]/page.tsx   # project case-study pages (esp32, cryocell)
└── globals.css           # CSS custom properties + Tailwind config
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
npm run lint     # eslint (it will yell about my theme toggle)
```

## projects featured

- **ESP32 Animation** — C++/U8g2 firmware that decodes binary GIFs onto a 128×64 OLED. 4 wires, no color, full send.
- **CryoCell** — Samsung S21 hardware mod: custom 10,000mAh battery integration + active cooling fan with dual power modes. −10°C under load.
- **Canu** — collaborative canvas app (realtime drawing)
- **Photo Sharing Platform** — image host built for pentesting workflows
- **Magalang** — card memorization game

## the hardware desk

(this is my actual desk setup that i built the CryoCell mod on, described in the first person because it's my README and i can do that)

- **laptop:** some acer nitro with an i5-12500H and an RTX 3050 that i've definitely dropped once
- **os:** arch linux (hyprland, wayland, and way too many dotfiles)
- **microcontrollers:** esp32 dev boards, soldering iron that's seen better days
- **cooling:** a noctua fan that i absolutely did not rip out of an old PC

## stuff i'm learning

- cross-platform mobile (react native — app store deployment is the goal)
- proper UI/UX & WCAG accessibility (not just vibes)
- embedded a/v streaming (RC car with real-time video/audio — WIP)
- lower-level everything (memory allocation, binary toolchains, profiling)

## out of scope

this repo does **not** include:

- a blockchain
- AI-generated everything
- a "book a call" button
- newsletter signup
- my dotfiles (those are classified)

## credits

built by [ariunbold](https://github.com/ariunbold-bo). inspired by every hardware zine i've ever read and the general aesthetic of a well-worn thinkpad.

---

<div align="center">
  <sub>
    <code>cat README.md | grep -c "vibes" # 2</code>
    <br>
    <a href="https://ariunbold.dev">ariunbold.dev</a>
  </sub>
</div>

import { Dictionary } from "../types";

const en: Dictionary = {
  identity: {
    name: "Ariunbold Bold",
    firstName: "Ariunbold",
    role: "Systems Developer",
    seoTitle: "Software & Hardware Developer",
    site: "https://ariunbold.dev",
    siteName: "Ariunbold Bold Portfolio",
    location: "Mongolia",
    initials: "AB",
    tagline: "If it works, don't touch it — unless it needs an upgrade, then I'll risk the entire project to make it better.",
    dob: "2009-07-01",
    resumeUrl: "/resume.pdf",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "C++",
    "ESP32",
    "Hardware Engineering",
    "Full-Stack Development",
  ],
  contact: [
    {
      label: "Email",
      value: "ariunboldbold200@gmail.com",
      href: "mailto:ariunboldbold200@gmail.com",
      icon: "mail",
      external: false,
    },
    {
      label: "Phone",
      value: "+976 95550376",
      href: "tel:+97695550376",
      icon: "phone",
      external: false,
    },
    {
      label: "GitHub",
      value: "github.com/ariunbold-bo",
      href: "https://github.com/ariunbold-bo",
      icon: "github",
      external: true,
    },
    {
      label: "LinkedIn",
      value: "in/ariunbold-bold",
      href: "https://www.linkedin.com/in/ariunbold-bold-60058b30a/",
      icon: "linkedin",
      external: true,
    },

    {
      label: "Facebook",
      value: "Ariunbold Bold",
      href: "https://www.facebook.com/profile.php?id=61553207489957",
      icon: "facebook",
      external: true,
    },
  ],
  stack: [
    {
      no: "01",
      title: "Full-Stack Architecture",
      tag: "Next.js & React",
      body: "Advanced experience with the App Router, SSR, and building high-performance web applications.",
      icon: "layers",
    },
    {
      no: "02",
      title: "Linux System Customization",
      tag: "Arch / Hyprland",
      body: "Deep proficiency in Arch Linux, Hyprland ricing, and kernel/driver troubleshooting.",
      icon: "terminal",
    },
    {
      no: "03",
      title: "Hardware Modding & Electronics",
      tag: "ESP32 / Soldering",
      body: "Working with ESP32 microcontrollers, soldering, and custom cooling system modifications.",
      icon: "chip",
    },
  ],
  timeline: [
    {
      when: "2009",
      title: "Came to this world",
      body: "My mom and dad had a shebang and thus here i am.",
      image: null,
    },
    {
      when: "2014",
      title: "The First Victim",
      body: "Took apart an RC car in kindergarten. The battery wire broke, so I taped it back together since I didn't have a soldering iron. It worked for a few hours. The rest is history.",
      image: { type: "video", src: "/first-victim.webm", alt: "First Victim", aspectRatio: "9/16" },
    },
    {
      when: "2017",
      title: "First Lines of Code",
      body: "It started when his mom brought home a computer twice his age. He learned the basics from a kids' programming book that taught Scratch and Python.",
      image: { type: "image", src: "/first-code.webp", alt: "First lines of code", aspectRatio: "16/9" },
    },
    {
      when: "2017 – 2021",
      title: "The Self-Taught Era",
      body: "Self-taught HTML, CSS, and JS. Built early Python apps like music players and web scrapers — days spent digging through Stack Overflow before AI assistants existed.",
      image: { type: "video", src: "/self-taught-era.webm", alt: "Self taught era", aspectRatio: "16/9" },
    },
    {
      when: "2020",
      title: "The Pizza Box Incident",
      body: "Disassembled a perfectly working antique Windows XP Thinkpad and tried mounting the motherboard inside a pizza box. Broke something along the way and it never turned on again. An expensive, time-consuming lesson.",
      image: null,
    },
    {
      when: "2022",
      title: "Pinecone School",
      body: "Attended Pinecone programming school and graduated with flying colors thanks to prior knowledge. Refreshing to finally have a real teacher to code alongside.",
      image: null,
    },
    {
      when: "2023",
      title: "GitHub & Real Teams",
      body: "Still at Pinecone, but leveled up the workflow. Learned Git, GitHub, and how to collaborate with real colleagues on everyday projects.",
      image: null,
    },
    {
      when: "Early 2024",
      title: "Linux VMs & Android Modding",
      body: "Set up his first Linux VM (Kali) and dove deep into ADB, scrcpy, and Android internals — building a reputation at school for formatting locked devices.",
      image: { type: "video", src: "/linux-android.webm", alt: "Linux VMs", aspectRatio: "3/4" },
    },
    {
      when: "2024",
      title: "The Unofficial School IT Guy",
      body: "Fixed teachers' laptops, HDMI cables, and forgotten passwords. Competed in a C++ olympiad (with zero prior knowledge of hashmaps or arrays—at least I tried!). Secured straight 100%s in informatics class every year, sometimes by 'borrowing' the Wi-Fi password.",
      image: null,
    },
    {
      when: "Late 2024",
      title: "The Arch Linux Switch",
      body: "Started dual-booting Windows and Arch. After a Windows update wiped un-pushed code, he nuked the partition, switched fully to Arch Linux, and never looked back.",
      image: { type: "image", src: "/arch-linux.webp", alt: "Arch Linux Switch", aspectRatio: "16/9" },
    },
    {
      when: "2025 – Present",
      title: "The TTS Era",
      body: "Continued pushing boundaries. My biggest achievement to date has been building and deploying my custom TTS (Text-to-Speech) project.",
      image: { type: "video", src: "/tts-era.webm", alt: "TTS Era", aspectRatio: "16/9" },
    },
  ],
  hardware: [
    {
      slug: "esp32",
      name: "ESP32 Animation",
      kicker: "Microcontroller Integration",
      summary:
        "C++ firmware that decodes binary-encoded GIF frames and drives a 128×64 OLED at smooth framerates — squeezed onto tightly limited hardware.",
      highlights: [
        "Firmware written in C++ for efficient performance",
        "U8g2 library rendering binary-encoded GIFs on a 128×64 OLED",
        "Resources optimized for smooth playback on limited hardware",
      ],
      sections: [
        {
          title: "Toolchain on Arch",
          body: "The dev environment was built on Arch Linux, which meant wrestling with drivers and toolchain configuration to get reliable ESP32 compilation working end to end.",
        },
        {
          title: "Fitting motion onto 128×64",
          body: "The biggest challenge was fitting animation onto a 128×64 pixel OLED. Color was dropped entirely; every frame was converted to monochrome binary data and the resolution reduced to fit the ESP32's limited memory. A custom C++/U8g2 rendering pipeline decodes the binary-encoded GIF frames and pushes them to the display at smooth framerates. A demo posted on Instagram pulled solid views.",
        },
        {
          title: "Wiring",
          body: "The ESP32 connects to the SSD1306 OLED over I2C using just four wires: VCC, GND, SDA, and SCL.",
        },
      ],
      specs: [
        { label: "MCU", value: "ESP32" },
        { label: "Display", value: "SSD1306 128×64" },
        { label: "Bus", value: "I2C · 4 wires" },
        { label: "Stack", value: "C++ · U8g2" },
      ],
      icon: "chip",
      media: [
        { type: "video", src: "/esp32-demo.webm", poster: "/esp32-poster.webp" },
      ],
    },
    {
      slug: "cryocell",
      name: "CryoCell",
      kicker: "Samsung Galaxy S21 Mod",
      summary:
        "A hardware mod pairing a custom 10,000mAh power solution with an active cooling module and dual Power Save / Performance modes.",
      highlights: [
        "Engineered a custom 10,000mAh external battery solution",
        "Fan control module with Power Save / Performance modes",
        "Thermal management and hardware modification skills on display",
      ],
      sections: [
        {
          title: "Active Cooling Architecture",
          body: "Standard passive cooling on the S21 wasn't enough for sustained peak performance. Thermal hotspots were mapped across the chassis, then a precise circular mount was carved for a custom cooling fan assembly sitting flush against the device — lowering temperature by 10°C and maintaining stability under max load.",
        },
        {
          title: "Power Delivery & Bypassing Limitations",
          body: "A 10,000mAh external power bank was integrated directly into the S21's internal circuitry. The custom fan assembly was soldered to a dedicated controller, creating dual operational modes — Power Save and Performance. Direct wiring bypasses standard hardware limitations for extended, uninterrupted battery life.",
        },
      ],
      specs: [
        { label: "Device", value: "Galaxy S21" },
        { label: "Battery", value: "10,000mAh" },
        { label: "Cooling", value: "−10°C load" },
        { label: "Modes", value: "Save · Perf" },
      ],
      icon: "battery",
      media: [
        {
          type: "video",
          src: "/mobile-compressed.webm",
          poster: "/mobile-poster.webp",
        },
      ],
    },
    {
      slug: "pusda-speaker",
      name: "Pusda Speaker Stereo BT System",
      kicker: "Audio Engineering • DIY Hardware",
      summary:
        "True stereo with dual isolated power rails. a 3.7V battery powering the MH-MX8 BT receiver and an 8.4V series-pack driving the XH-MX8 amplifier.",
      highlights: [
        "Dual isolated power rails: separate 3.7V for the BT receiver and 8.4V (2×3.7V series) for the amplifier — eliminates common-ground back-noise completely.",
        "True stereo: two independent 4Ω 15W full-range drivers, one per channel, for genuine left/right separation.",
        "Insane SPL: at full volume you cannot hear someone yelling beside you. Peak draw 3A on heavy bass; idle 0.04A.",
      ],
      sections: [
        {
          title: "Why Two Power Sources?",
          body: "In Gen 1 a single common ground shared between the MH-MX8 Bluetooth receiver and the amplifier board created a massive hum — digital switching noise from the BT module bled straight into the audio path. The fix: completely separate supplies. The MH-MX8 receiver runs off a dedicated 3.7V lithium cell. The XH-MX8 amplifier board gets its own 8.4V pack (two 3.7V cells wired in series, giving 7.4V nominal and 8.4V at full charge). No shared ground, no noise floor.",
        },
        {
          title: "Amplifier & Bluetooth Receiver — XH-MX8 + MH-MX8",
          body: "The MH-MX8 is a compact Bluetooth 5.0 audio receiver/decoder module that handles wireless audio input and feeds a clean line-level signal to the amplifier. The XH-MX8 is a stereo class-D amplifier board rated for 12–24V DC input with dual-channel output — here driven at 8.4V for controlled headroom that still pushes the 4Ω 15W drivers hard. Class-D efficiency means the 8.4V pack lasts a respectable time at moderate volumes despite the peak 3A draw during bass transients.",
        },
        {
          title: "The Enclosure — Yes, That's the Amplifier Box",
          body: "The speaker enclosure is literally the cardboard box the XH-MX8 amplifier arrived in. It was the right size, already had character, and cost nothing. Acoustic damping cotton was packed inside to reduce standing waves and give the drivers the impression of a larger chamber. The result is surprisingly punchy low-end for a cardboard box. Engineering sometimes means using whatever is on hand.",
        },
      ],
      specs: [
        { label: "Amp", value: "XH-MX8" },
        { label: "Supply", value: "8.4V (2S Li)" },
        { label: "Idle Draw", value: "0.04A" },
        { label: "Enclosure", value: "shipping box" },
      ],
      icon: "speaker",
      media: [
        { type: "video", src: "/pusda_speaker1.webm", poster: "/pusda_speaker1_poster.webp" },
        { type: "video", src: "/pusda_speaker2.webm", poster: "/pusda_speaker2_poster.webp" },
        { type: "image", src: "/pusda_speaker.webp" },
      ],
    },
    {
      slug: "arch-ricing",
      name: "Arch Linux Ricing & RGB Sync",
      kicker: "Hyprland • System Customization",
      summary:
        "A highly customized Arch Linux setup using Hyprland, featuring keyboard RGB syncing that reacts to live and static wallpapers.",
      highlights: [
        "Dynamic Aesthetic Sync: The keyboard RGB automatically synchronizes with the dominant colors of the active wallpaper.",
        "Performance Optimized: Automatically detects full-screen applications and pauses live wallpapers to free up system resources.",
        "mpvpaper: uses only 800mb of gpu memory. Compared to windows it uses 2000% less resources specially designed to use less.",
      ],
      sections: [
        {
          title: "Keyboard Color Syncing",
          body: "Built custom scripts to extract color palettes from both static and live wallpapers, piping them directly to the keyboard's RGB controller in real time.",
        },
        {
          title: "Resource Management",
          body: "To ensure gaming and heavy workloads aren't impacted by the live wallpaper engine, I implemented a window-manager hook in Hyprland that detects full-screen states and gracefully pauses background rendering.",
        },
      ],
      specs: [
        { label: "OS", value: "Arch Linux" },
        { label: "terminal", value: "zsh" },
        { label: "WM", value: "Hyprland" },
        { label: "Hardware", value: "RGB Keyboard" },
      ],
      icon: "terminal",
      media: [{ type: "video", src: "/arch_ricing.webm" }],
    },
  ],
  projects: [
    {
      name: "Canu",
      blurb: "A collaborative painting canvas — work with teams in real time.",
      live: "https://canu.vercel.app",
      source: "https://github.com/ariunbold-bo/canu.git",
      tags: ["Realtime", "Canvas"],
    },
    {
      name: "Photo Sharing Platform",
      blurb:
        "A secure image-sharing platform built for penetration-testing workflows.",
      live: "https://psp-ten-zeta.vercel.app/",
      source: "https://github.com/ariunbold-bo/psp.git",
      tags: ["Security", "Full-Stack"],
    },
    {
      name: "Magalang",
      blurb: "A card memorization game with progressive difficulty scaling.",
      live: "https://magalang.vercel.app",
      source: "https://github.com/ariunbold-bo/magalang.git",
      tags: ["Game", "React"],
    },
  ],
  disciplines: [
    {
      title: "Table Tennis",
      meta: "National 3rd Degree",
      body: "Hold a nationally recognized 3rd-degree ranking in Mongolia with an official ID passport. Five-plus years of dedicated practice — the same grit, repetition, and technical precision applied to engineering.",
      icon: "pingpong",
    },
    {
      title: "Chess",
      meta: "1100+ ELO",
      body: "Pattern recognition, opening theory, and tactical pressure under time constraints — skills that translate directly to system design.",
      icon: "chess",
    },
    {
      title: "Piano",
      meta: "Self-taught",
      body: "Translating sheet music into muscle memory. Playing piano builds the same mental pathways needed for mastering new programming languages.",
      icon: "piano",
      youtubeId: "G0U57a5Enpk",
    },
  ],
  gallery: [
    {
      src: "/ble_speaker_mono.webm",
      type: "video",
      alt: "Mono Speaker Version",
      aspectRatio: "aspect-[9/16]",
    },
    {
      src: "/playing_tts.webm",
      type: "video",
      alt: "Playing TTS",
      aspectRatio: "aspect-video",
    },
    {
      src: "/tsetseg.webp",
      type: "image",
      alt: "Just a flower",
      aspectRatio: "aspect-[2/3]",
    },
  ],
  growth: [
    {
      no: "01",
      title: "Cross-Platform Mobile",
      body: "Expanding full-stack web expertise into production-grade mobile apps with React Native — targeting App Store deployment.",
    },
    {
      no: "02",
      title: "Delivery Under Constraints",
      body: "Sprint-based scheduling to sustain high-output development cycles alongside academic obligations without sacrificing quality.",
    },
    {
      no: "03",
      title: "Pro UI/UX & Accessibility",
      body: "Formal interaction-design principles — WCAG 2.1 AA standards, Figma workflows, and component-level accessibility.",
    },
    {
      no: "04",
      title: "Advanced Hardware Tooling",
      body: "A precision workstation — digital soldering stations, thermal sensors, and active fume extraction — to refine PCB fabrication safely.",
    },
    {
      no: "05",
      title: "Embedded A/V Streaming",
      body: "Engineering a remote-controlled vehicle that streams synchronized video and audio over a real-time network link.",
      wip: true,
    },
    {
      no: "06",
      title: "The Endgame",
      body: "Currently a 12th grader leaning towards Computer Science or Electrical Engineering. The ultimate goal isn't yachts or supercars — it's a peaceful 2-story house, financial stability with my future family, and a dedicated room for my electronics and coding lab.",
    },
  ],
  nav: [
    { id: "home", label: "Home", icon: "home" },
    { id: "about", label: "About", icon: "user" },
    { id: "projects", label: "Projects", icon: "grid" },
    { id: "journey", label: "Journey", icon: "route" },
  ],
  ui: {
    // Hero
    easterEgg: `⠀⠀⠀⣠⠔⠋⢁⡼⠁⠀⣴⣶⡦⠀⠀⠈⣿⣿⣷⣶⠏⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠐⠃⠈⠑⠆⠀⣧⠀⠐⠀⠀⠃⡨⠟⠁⠀⠀⠀⠀
⠀⢰⡏⠁⠀⠀⣸⠃⠤⢤⣼⣿⣦⣤⣀⡞⣻⣿⣿⠏⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⠀⠀⢀⠀⠀⠉⠛⠲⣼⡴⠒⠲⡖⠉⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢻⡀⠀⠀⣧⡀⠀⠀⠀⠀⠉⠙⠾⣾⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡶⣄⣈⣳⣶⠶⠂⡴⠉⠹⣦⠘⢷⠀⠀⠀⠀⠀⠀⠀⠀
⡰⠀⠀⢳⡀⠀⡟⠷⡀⠀⠀⠀⠀⠀⠀⠈⢿⡆⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣯⣉⠀⢠⠏⠻⣄⠀⠀⠀⣄⠘⢆⣘⡆⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢳⡀⠁⠀⠹⣆⠀⠀⠀⠀⠀⠀⠈⢿⡄⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣴⣿⣧⣀⡀⠙⠒⠚⣠⡉⠉⠉⢇⠀⠀⠀⠀⠀⠀⠀
⠁⠀⠀⠀⠀⠻⡄⠀⠀⠸⣦⡀⠀⠀⠀⠀⠀⠀⢷⠀⢀⣠⣤⣴⣶⣾⣿⣿⣿⠟⠋⠉⠉⠛⢳⡿⠛⢋⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣖⠺⣁⠉⣖⣲⢿⡆⠀⠀⠀⠀⠀⠀
⡀⠀⠀⠀⠀⠀⢱⡄⢀⣴⣾⣷⡀⠀⠀⢀⣠⣴⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⡋⢶⡀⠀⠀⠀⠀⠀⠈⢨⣷⣶⣿⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠀⠀⢋⠳⢈⡇⠀⠀⠀⠀⠀⠀
⠟⠀⠀⠀⠀⠀⠀⠹⣎⠙⣿⣿⣿⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣏⠀⠚⠀⠄⠀⠀⠀⠠⣦⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⡀⣠⣿⣭⣿⠀⠀⠀⠀⠀⠀
⡐⠀⠀⠀⠀⠀⠀⠀⠙⣿⢾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠦⠴⠖⠒⠛⠛⡛⢉⠙⠋⠹⣍⣯⡉⠉⠉⠛⠿⣿⣿⡿⠿⢿⣿⣌⣉⠈⣿⣿⣿⡀⠀⠀⠀⠀⠀
⡛⠀⠀⠀⠀⠀⠀⠀⣰⡟⢻⣿⣿⡿⣿⣿⣿⣿⣿⣿⣿⠿⠟⠛⠋⠉⠁⠀⠀⠀⠀⠂⠀⠐⠤⣈⠓⢕⡤⡀⢘⣟⡧⣄⡀⠀⠀⠈⠙⠻⣷⣄⠙⢿⣿⣿⣿⣿⣿⠇⠀⠀⠀⠀⠀
⠃⠀⠀⠀⠀⠀⠀⣰⣿⠓⣾⡟⢾⢀⣻⣿⣿⠛⠋⠉⠀⠀⠀⠀⢠⣄⡀⠀⠀⢼⣶⠄⠀⠀⠘⠺⣷⡁⠛⠋⠁⠀⠀⠀⠑⢦⡀⠀⢀⠀⠀⠙⠳⣌⠻⣿⡟⠉⠀⠀⠀⠀⠀⠀⠀
⢀⠀⠀⠀⠀⠀⣰⣿⢋⣼⣿⣿⣾⢿⠋⠀⠈⢧⡀⠀⠀⠀⢀⢐⡦⣘⢽⡶⣤⡀⠈⣝⡦⠂⠀⠀⠀⠉⠛⠲⢄⣀⡀⠀⠀⠀⠳⡄⠈⢧⠀⠀⠀⢈⣿⠿⣷⣾⣿⣧⠀⠀⠀⠀⠀
⠊⠀⠀⠀⠀⣠⡿⢁⣽⣿⡟⣿⠃⢸⠀⢠⠀⣿⡻⢠⡄⡀⠀⠑⠀⠊⠕⠮⠓⠿⣗⠶⠉⣁⠀⠀⠀⠀⠀⠀⠀⠀⠉⠙⠛⠻⠿⠿⣆⠘⣧⠀⠀⠀⠀⠀⠘⢿⣿⣿⠀⠀⠀⠀⠀
⠄⠀⠀⠀⢠⣿⣤⣾⡿⠹⢿⡇⠀⠈⣇⠈⡆⣟⡇⠈⢧⣿⣳⠦⠄⠤⠓⠛⠙⠛⠤⢄⣀⣈⣳⣤⣀⡀⢀⣀⣠⠤⣀⣀⣀⣀⣠⣼⣬⢧⣿⡆⠀⠀⠀⠀⠀⠘⢿⡿⠀⠀⠀⠀⠀
⠀⠀⠀⢀⣾⣿⣿⣯⡅⢀⡾⠀⠀⢠⠙⣴⣀⣼⣿⡇⠘⢷⡉⠓⠢⢤⣀⠀⠀⠀⠀⠀⠈⠉⠉⠉⠉⢉⣭⠛⠓⢛⡿⠟⠛⠛⢩⠏⠀⣸⣿⣧⠀⠀⠀⠀⠀⠀⢸⣇⠀⠀⠀⠀⠀
⠀⠀⠀⣾⣿⡿⢿⣿⡖⣿⠇⠀⢀⣸⠀⠘⠛⠛⣟⣆⠀⠀⢹⣄⠀⠀⠈⠉⠉⠑⠒⠒⠒⡒⠒⣚⠉⣩⡭⠷⢮⣥⡔⣺⣭⣶⣿⣖⡚⢣⠌⣿⠀⠀⠀⠀⠀⠀⠀⢿⡟⢦⡀⠀⠀
⠀⠀⠀⠻⢿⣆⣼⣁⠁⣾⠀⢀⣾⠘⡆⠀⠀⠀⠀⢻⡄⠀⠘⣿⡙⢦⣀⠀⠀⠀⠀⠀⠀⠉⠳⢦⣭⣥⣀⣀⣠⣴⣿⠟⠉⠁⡠⠉⣴⡹⠀⢹⡇⠀⠀⡄⠀⠀⠀⠈⣷⠀⢳⡄⠀
⠀⠀⠀⠀⠀⠀⡟⠉⠉⡽⠀⡸⣿⠀⣷⠀⢀⡤⠂⠀⢳⡀⠀⢻⣇⢸⠝⠳⣦⣘⡀⠀⢀⣀⠀⠀⠙⠳⠤⣤⣸⠟⣁⠀⢀⡼⢀⡼⠟⠀⠀⢸⠀⠀⢰⢷⡆⠀⠀⣷⡸⣦⡀⠹⡄
⠀⠀⠀⠀⠀⠀⡇⠀⠀⡇⢰⠃⡇⠀⣿⠀⡎⠀⠀⠀⠈⢷⡀⠀⢿⣼⠀⣀⠼⠛⢻⣷⣦⣟⡟⠃⠒⣠⣴⣶⠿⠛⠁⠞⠈⠀⠊⠀⠀⠀⠀⡼⠀⢠⡞⣾⡇⠀⠀⣿⠛⠚⢿⠂⠙
⠀⠀⠀⠀⠀⢸⠃⠀⠀⡇⢸⠀⡇⠀⣿⡆⠡⠀⠀⠀⠀⠈⢷⡄⠘⣿⠋⣁⣲⣭⣭⣭⣭⠍⠛⠓⠾⣿⣽⣶⡦⠤⠒⠋⢀⣀⠀⠀⠀⠀⣰⠃⣠⠏⣰⣿⡇⠀⢠⣿⡇⠀⢸⠀⠀
⠀⠀⠀⠀⠀⢸⠀⠀⠀⢻⣞⠀⣷⠀⣿⣧⠀⠹⡄⠀⠀⠀⠈⢿⣆⠸⣾⣿⢿⡉⠉⠉⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⢀⡴⠋⠀⠙⡦⣤⠼⢷⡿⠃⣴⣿⣿⠇⠀⡾⢸⡇⠀⣿⠀⠀
⠀⠀⠀⠀⠀⢸⠀⠀⠀⠸⣼⡀⢻⠀⢻⣿⡆⠀⠹⣆⠀⠀⠀⠀⢻⣦⢻⣷⣾⣁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠎⠀⠀⠀⠀⢹⠀⣠⣾⠖⣿⣿⣟⡏⢀⡼⠁⢸⠇⣰⡛⠀⠀
⠀⠀⠀⠀⠀⠸⠀⠀⠀⠀⢻⣷⣘⡄⢸⣿⣿⡀⠀⠈⢧⡀⠀⠀⠀⠙⣿⣿⣟⠉⠳⣦⡀⠀⠀⠀⠀⠀⠀⢴⣿⠁⠀⠀⠀⠀⢀⡼⠋⠁⢀⣾⣿⡟⣼⣤⢾⡇⠀⡾⣸⠏⠁⠀⠀
⠀⠀⢀⣀⠠⠤⠀⠀⠀⠀⠀⠙⠯⣇⠀⣿⠋⣧⠀⣦⠀⠙⢿⣦⣄⡀⢈⠻⣿⣧⠂⢅⢹⢤⡀⠀⠀⠀⠀⠀⠙⠓⠢⠄⠐⠒⠋⠀⠀⡠⢛⣾⡿⠜⠛⡁⣼⠻⣾⣽⣧⣀⣀⣀⣀
⠔⡊⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣀⡇⠀⢹⣇⢸⣆⠀⠀⠻⣾⣿⡾⣷⣮⣿⣶⣤⡿⠤⠬⢷⡒⠉⠙⢦⣤⣤⣤⣤⣤⣀⣀⣠⣞⣵⣿⡟⠀⠀⢰⠁⡏⠀⣸⣿⣦⣀⠈⠈⠉
⣼⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡿⠀⢀⡿⠙⢮⢿⣆⠀⠀⢿⡍⠙⠓⠿⣟⣛⣃⣀⣀⡀⠀⠉⢳⣦⣬⣿⣿⡇⠀⢀⣼⣿⣿⣿⡿⠋⠀⠀⠀⠸⡄⡇⠀⠀⣿⣿⣿⣿⣶⡀
⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡼⠀⣠⠋⠀⠀⢸⣷⣍⠃⠀⠈⢻⡀⠀⠀⠀⠈⣿⠃⠀⠈⠳⣄⡠⣞⠿⠿⠀⠘⣾⣟⢽⣿⣿⠟⠁⣼⠀⠀⠀⠀⢿⣽⠀⢰⣿⣿⣿⣿⣿⣿
⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⡥⠞⠁⠀⠀⠀⣼⣿⣿⣷⣦⣄⡀⠈⢙⣻⠶⢻⠇⣀⣀⣀⣀⣈⣟⡁⠀⠀⠀⠀⠈⠻⣾⡞⢁⣠⣼⣿⠀⠀⠀⠀⠈⠻⣇⣸⣿⣿⣿⣿⣿⣿
⠻⢿⣦⣀⣀⢀⣀⣀⣠⡤⠶⠛⠉⠀⠀⠀⠀⠀⣰⣿⣿⣿⣿⣿⠁⠉⠓⠦⣝⣦⠾⠞⠛⠈⠀⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠈⠙⢯⣽⠟⢻⡆⠀⠀⠀⠀⠀⠙⠿⣿⣿⣿⣿⣿⣿
⠐⠲⣤⣉⠉⠉⠉⠁⣀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣿⣿⣿⣿⡿⠁⠀⠀⢀⣶⠿⢃⣠⣴⣶⣶⣶⣤⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣄⢻⣶⣶⣦⡀⠠⣄⡀⠉⠛⠿⢿⣿⣿
⠀⠀⠀⠈⠉⢉⡽⠛⠁⠀⠀⠀⠀⠀⠀⠀⣴⣷⢿⣿⣾⠋⠀⠀⡆⠀⠈⡍⢹⡏⠀⣿⣿⣇⣠⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣽⣿⣿⣿⣿⣿⣷⣄⠉⠓⠶⣤⣤⣀⣠
⠀⠀⠀⢀⠔⠉⠀⠀⣠⠇⠀⠀⠀⠀⢀⡼⡿⣿⢭⣾⠋⠀⠀⣸⡇⣼⠀⢳⡼⠀⠀⢸⣿⡿⠙⠒⢒⣣⣤⣄⣀⠀⠀⠀⠀⠀⠀⢀⣴⠋⠀⠙⠉⢿⣿⣿⣿⣿⣷⣦⡀⠀⠀⠉⠉
⠄⠀⢤⠄⢀⣀⣀⣠⠃⠀⠀⠀⣀⣴⣿⣶⣿⣿⡿⠁⠀⠀⠀⣿⣿⣿⡀⢸⣇⠀⠀⠀⣿⠁⠀⣴⣿⣛⣿⣿⣿⣿⣦⣄⣀⢀⣠⡞⡁⠀⠀⠀⠀⠈⠛⢻⣿⣿⣿⣿⣿⣦⣀⣀⠀`,
    openForOpp: "Open for opportunities",
    viewProjects: "View Projects",
    contactMe: "Contact Me",
    yearsOld: "Years old",
    yearsCoding: "Years coding",
    projectsBuilt: "Projects built",

    // Navigation & Common
    backToHome: "Back to Home",
    language: "Language",
    theme: "Theme",
    wantToKnowMore: "Want to know more about me or get in touch?",

    // About
    aboutLabel: "About Me",
    aboutTitle: "Bridging software and hardware.",
    coreTechnologies: "Core Technologies",
    activelyMoving:
      "Actively moving lower level, into memory, toolchains, and the metal underneath the frameworks.",
    personalDisciplines: "Personal Disciplines",
    growthTargets: "Current Growth Targets",
    wip: "WIP",

    // Stack
    stackLabel: "The Stack",
    stackTitle: "Engineering capabilities.",

    // Journey
    journeyLabel: "Journey",
    journeyTitle: "My path in technology.",
    clickToReveal: "Click any card to reveal the story ↑",
    readFullStory: "Read my full story",

    // Hardware
    hardwareLabel: "Hardware projects",
    hardwareTitle: "Where software meets physical logic.",
    hardwareDesc:
      "A selection of my physical engineering projects, including microcontrollers and hardware modification.",
    more: "Read Case Study",

    // Projects
    softwareLabel: "Software Projects",
    softwareTitle: "Selected web applications.",
    liveSite: "Live Site",
    source: "Source",

    // Contact
    contactLabel: "Contact",
    contactTitle: "Let's build something.",
    contactDesc:
      "Whether it's a software project or a hardware idea, I'm always open to discussing new opportunities.",
    footer:
      "© {year} Ariunbold Bold. Built with React, Next.js, and plenty of coffee.",

    // Gallery / Modal
    close: "Close",

    // Resume
    downloadResume: "Download Résumé",
    viewResume: "View Résumé",

    // Gallery for things that i value <3
    galleryLabel: "Gallery",
    thingsIValue: "Things i value.",
  },
};

export default en;

import { Dictionary } from "../types";

const en: Dictionary = {
  identity: {
    name: "Ariunbold Bold",
    firstName: "Ariunbold",
    role: "Systems Developer & Multidisciplinary Learner",
    seoTitle: "Software & Hardware Developer",
    site: "https://ariunbold.dev",
    siteName: "Ariunbold Bold Portfolio",
    location: "Mongolia",
    initials: "AB",
    tagline: "im just a guy who likes thinkering complex questions",
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
      label: "Instagram",
      value: "@ariuka_69",
      href: "https://www.instagram.com/ariuka_69/",
      icon: "instagram",
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
    {
      no: "04",
      title: "Automated Toolchain Design",
      tag: "CLI / Build systems",
      body: "Building custom CLI tools and build systems for native environment security auditing.",
      icon: "wrench",
    },
    {
      no: "05",
      title: "Lower-Level Optimization",
      tag: "Memory / Profiling",
      body: "Transitioning from high-level frameworks to memory allocation, binary toolchain internals, and performance profiling.",
      icon: "gauge",
    },
  ],
  timeline: [
    {
      when: "2009",
      title: "Came to this world",
      body: "My mom and dad had a shebang and thus here i am.",
    },
    {
      when: "2017",
      title: "First Lines of Code",
      body: "It started when his mom brought home a computer twice his age. He learned the basics from a kids' programming book that taught Scratch and Python.",
    },
    {
      when: "2017 – 2021",
      title: "The Self-Taught Era",
      body: "Self-taught HTML, CSS, and JS. Built early Python apps like music players and web scrapers — days spent digging through Stack Overflow before AI assistants existed.",
    },
    {
      when: "2022",
      title: "Pinecone School",
      body: "Attended Pinecone programming school and graduated with flying colors thanks to prior knowledge. Refreshing to finally have a real teacher to code alongside.",
    },
    {
      when: "Early 2024",
      title: "Linux VMs & Android Modding",
      body: "Set up his first Linux VM (Kali) and dove deep into ADB, scrcpy, and Android internals — building a reputation at school for formatting locked devices.",
    },
    {
      when: "Late 2024",
      title: "The Arch Linux Switch",
      body: "Started dual-booting Windows and Arch. After a Windows update wiped un-pushed code, he nuked the partition, switched fully to Arch Linux, and never looked back.",
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
        { type: "video", src: "/esp32-demo.mp4", poster: "/esp32-poster.webp" },
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
        { type: "video", src: "/mobile-compressed.mp4", poster: "/mobile-poster.webp" },
      ],
    },
    {
      slug: "bt-speaker",
      name: "Custom DIY Stereo Bluetooth Speaker & Power System",
      kicker: "Hardware Systems • Circuit Design • Acoustic Engineering",
      summary:
        "A custom-built portable Bluetooth speaker featuring isolated dual power rails, step-up voltage regulation, and tuned acoustic damping in a custom enclosure.",
      highlights: [
        "Dual-Power Circuit Isolation: Separated power delivery between the Bluetooth receiver and stereo amplifier to eliminate ground-loop feedback and audio noise floor.",
        "DC-DC Step-Up Regulation: Integrated boost converter module to boost battery voltage for cleaner output headroom at higher volumes.",
        "Acoustic Tuning: Implemented internal cotton polyfill absorption to reduce standing wave distortion and improve low-end frequency response in a compact chamber.",
      ],
      sections: [
        {
          title: "Dual-Rail Power System & Voltage Boost",
          body: "A custom lithium battery pack with BMS supplies isolated power lines to the BLE module and the PAM8610 power amplifier, preventing digital ground loop noise (buzzing/whining in the speakers). A blue DC-DC step-up module elevates supply voltage to maximize amplifier headroom and output power.",
        },
        {
          title: "Acoustic Damping & Hardware Setup",
          body: "Two full-range drivers are mounted on custom cardboard baffle plates and sealed with tape to prevent acoustic air leakage. White cotton polyfill acts as acoustic dampening, slowing internal sound waves and tricking the drivers into 'seeing' a larger acoustic enclosure for deeper bass response.",
        },
      ],
      specs: [
        { label: "Amp", value: "PAM8610" },
        { label: "Power", value: "3.7V to 22V  Converter" },
        { label: "Wiring", value: "An absolute mess" },
        { label: "Speaker", value: "30W" },
      ],
      icon: "speaker",
      media: [
        { type: "video", src: "/ble_speaker_final.mp4", poster: "/ble_speaker_final_poster.jpg" },
        { type: "image", src: "/voltage_amplifier+audio_amplifier.JPG" },
        { type: "image", src: "/first version of the ble speaker.JPG" },
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
        { label: "terimnal", value: "zsh" },
        { label: "WM", value: "Hyprland" },
        { label: "Hardware", value: "RGB Keyboard" },
      ],
      icon: "terminal",
      media: [{ type: "video", src: "/arch_ricing.mp4" }],
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
      blurb: "A secure image-sharing platform built for penetration-testing workflows.",
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
      meta: "5+ years",
      body: "Five-plus years of dedicated practice — the same grit, repetition, and technical precision he applies to engineering.",
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
    { src: "/playing_tts.mp4", type: "video", alt: "playing tts", aspectRatio: "aspect-video" },
    { src: "/tsetseg.webp", type: "image", alt: "just a flower ", aspectRatio: "aspect-[2/3]" },
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
  ],
  nav: [
    { id: "home", label: "Home", icon: "home" },
    { id: "about", label: "About", icon: "user" },
    { id: "stack", label: "Stack", icon: "layers" },
    { id: "journey", label: "Journey", icon: "route" },
    { id: "hardware", label: "Hardware", icon: "chip" },
    { id: "projects", label: "Projects", icon: "grid" },
    { id: "beyond", label: "Beyond", icon: "spark" },
    { id: "contact", label: "Contact", icon: "mail" },
  ],
  ui: {
    coreTechnologies: "Core Technologies",
    activelyMoving: "Actively moving lower level, into memory, toolchains, and the metal underneath the frameworks.",
    viewProject: "View Project",
    hardwareProjects: "Hardware Projects",
    hardwareDesc: "Exploring circuits, microcontrollers, and custom physical computing systems.",
    softwareProjects: "Software Projects",
    softwareDesc: "Full-stack web applications, interactive canvas tools, and performance-focused frontend architectures.",
    learning: "Learning & Disciplines",
    learningDesc: "Systems thinking applied beyond the screen — mastering analog mechanics and cognitive patterns.",
    sendMeEmail: "Send me an email",
    connectWithMe: "Connect with me",
  },
};

export default en;

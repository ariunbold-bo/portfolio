// locales/translations.js
// All UI text for English (en) and Mongolian (mn)

export const translations = {
  en: {
    // ── Header ─────────────────────────────────────────────
    header: {
      brand: "Portfolio",
      nav: {
        about: "About",
        journey: "Journey",
        projects: "Projects",
        contact: "Contact",
      },
      theme: {
        toLight: "Switch to light mode",
        toDark: "Switch to dark mode",
      },
      lang: {
        label: "Language",
        en: "English",
        mn: "Mongolian",
      },
    },

    // ── Intro ───────────────────────────────────────────────
    intro: {
      greeting: "Hi,",
      name: "I'm Ariunbold Bold",
      subtitle: "Systems Developer & Multidisciplinary Learner",
      cta: {
        contact: "Contact Me",
        about: "About Me",
      },
      imgAlt: "Ariunbold Bold - Developer & Multidisciplinary Learner",
    },

    // ── About Me ────────────────────────────────────────────
    about: {
      sectionTitle: "About Me",
      cards: {
        tech: {
          title: "Core Technical Stack",
          srLabel: "Core Technical Stack",
        },
        personal: {
          title: "Personal & Strategic Disciplines",
          srLabel: "Personal & Strategic Disciplines",
        },
        growth: {
          title: "Engineering Growth Targets",
          srLabel: "Engineering Growth Targets",
        },
      },
      techStack: [
        {
          title: "Full-Stack Architecture (Next.js & React)",
          description:
            "Advanced experience with App Router, SSR, and building high-performance web applications.",
        },
        {
          title: "Linux System Customization",
          description:
            "Deep proficiency in Arch Linux, Hyprland ricing, and kernel/driver troubleshooting.",
        },
        {
          title: "Hardware Modding & Electronics",
          description:
            "Experience with ESP32 microcontrollers, soldering, and custom cooling system modifications.",
        },
        {
          title: "Automated Toolchain Design",
          description:
            "Building custom CLI tools and build systems for native environment security auditing.",
        },
        {
          title: "Lower-Level Optimization",
          description:
            "Actively transitioning from high-level frameworks to memory allocation, binary toolchain internals, and performance profiling.",
        },
      ],
      personalDisciplines: [
        {
          title: "Physical Discipline — Table Tennis",
          description:
            "5+ years of dedicated practice. Demonstrates the same high-level grit, repetition, and technical precision applied to engineering.",
        },
        {
          title: "Strategic Logic — Chess (1100+ ELO)",
          description:
            "Pattern recognition, opening theory, and tactical pressure management under time constraints — skills that translate directly to system design.",
        },
      ],
      growthTargets: [
        {
          title: "Cross-Platform Mobile Development",
          description:
            "Expanding full-stack web expertise into production-grade mobile applications using React Native — targeting App Store deployment.",
        },
        {
          title: "Structured Delivery Under Constraints",
          description:
            "Implementing sprint-based scheduling to sustain high-output development cycles alongside academic obligations without sacrificing output quality.",
        },
        {
          title: "Professional UI/UX & Accessibility",
          description:
            "Acquiring formal interaction design principles — WCAG 2.1 AA standards, Figma workflows, and component-level accessibility — to produce both engineering-correct and visually excellent interfaces.",
        },
        {
          title: "Advanced Hardware Tooling",
          description:
            "Upgrading my workstation with precision tooling (custom digital soldering stations, thermal sensors) and active fume extraction to refine my PCB fabrication process safely.",
        },
        {
          title: "Embedded A/V Streaming (WIP)",
          description:
            "Currently engineering a remote-controlled vehicle capable of streaming synchronized video and audio over a real-time network link.",
        },
      ],
    },

    // ── Projects ─────────────────────────────────────────────
    projects: {
      sectionTitle: "My Projects",
      visitSite: "Visit Site",
      viewSource: "View Source Code",
      hoverHint: "Hover to see preview",
      tapHint: "Tap to preview",
      pressToOpen: "Press Enter to open project.",
      pressToPreview: "Press Enter to preview.",
      items: [
        {
          name: "Canu",
          description: "A collaborative painting canvas — work with teams in real time.",
        },
        {
          name: "Photo Sharing Platform",
          description: "Secure image-sharing platform built for penetration testing workflows.",
        },
        {
          name: "Mogio",
          description: "Two-player competitive Snake game with real-time collision logic.",
        },
        {
          name: "Snowflakes",
          description: "Generative New Year celebration snowflake animation.",
        },
        {
          name: "Magalang",
          description: "Card memorization game with progressive difficulty scaling.",
        },
        {
          name: "Guess the Number",
          description: "Classic number guessing game with hint-based feedback.",
        },
      ],
    },

    // ── Creative Engineering ──────────────────────────────────
    hardware: {
      sectionTitle: "Hardware & Systems Integration",
      esp32: {
        title: "ESP32 Microcontroller Integration",
        bullets: [
          "Developed firmware in C++ for efficient performance.",
          "Implemented U8g2 library for binary-encoded GIFs on 128x64 OLED.",
          "Optimized resources for smooth playback on limited hardware.",
        ],
        videoAlt: "ESP32 OLED animation demo",
        videoUnavailable: "ESP32 OLED demo — video unavailable",
      },
      cryocell: {
        title: "Project: CryoCell",
        bullets: [
          "Engineered custom 10000mAh external battery solution.",
          "Designed fan control module with Power Save/Performance modes.",
          "Showcased hardware modification and thermal management skills.",
        ],
        videoAlt: "Project CryoCell phone mod demo",
        videoUnavailable: "CryoCell mod demo — video unavailable",
      },
      viewDetails: "View Project Details",
    },

    // ── Timeline ──────────────────────────────────────────────
    timeline: {
      sectionTitle: "My Journey",
      items: [
        {
          year: "2014",
          title: "First Lines of Code",
          description:
            "It all started when my mom brought home a computer that was twice my age. I learned the basics from a kids' programming book that taught Scratch and Python.",
        },
        {
          year: "2015 - 2021",
          title: "The Self-Taught Era",
          description:
            "Taught myself HTML, CSS, and JS. Built early Python apps like music players and web scrapers. Spent days digging through Stack Overflow before AI assistants existed.",
        },
        {
          year: "2022",
          title: "Pinecone School",
          description:
            "Attended Pinecone programming school and graduated with flying colors thanks to my prior knowledge. It was incredibly refreshing to finally have a real teacher to code alongside.",
        },
        {
          year: "Early 2024",
          title: "Linux VMs & Android Modding",
          description:
            "Set up my first Linux VM (Kali). Dove deep into ADB, scrcpy, and Android internals. Built a reputation at school for formatting locked devices—and occasionally helping the local 'gang' for a small cut.",
        },
        {
          year: "Late 2024",
          title: "The Arch Linux Switch",
          description:
            "Started dual-booting Windows and Arch Linux. After a Windows update wiped my un-pushed code, I nuked the partition and completely switched to Arch Linux. Never looked back.",
        },
      ],
    },

    // ── Contact ───────────────────────────────────────────────
    contact: {
      label: "Get in Touch",
      headline: "Let's talk about your project",
      emailCopied: "Email Copied!",
      phoneCopied: "Phone Copied!",
      copyEmailLabel: "Copy email address to clipboard",
      copyPhoneLabel: "Copy phone number to clipboard",
    },
  },

  // ════════════════════════════════════════════════════════════
  // MONGOLIAN translation by ariunbold.b
  // ════════════════════════════════════════════════════════════
  mn: {
    header: {
      brand: "Портфолио",
      nav: {
        about: "Миний тухай",
        journey: "Туршлага",
        projects: "Төслүүд",
        contact: "Холбоо барих",
      },
      theme: {
        toLight: "Цайвар горим руу шилжих",
        toDark: "Харанхуй горим руу шилжих",
      },
      lang: {
        label: "Хэл",
        en: "Англи",
        mn: "Монгол",
      },
    },

    intro: {
      greeting: "Сайн уу,",
      name: "Намайг Ариунболд гэдэг.",
      subtitle: "Систем хөгжүүлэгч & Олон талт суралцагч",
      cta: {
        contact: "Холбоо барих",
        about: "Миний тухай",
      },
      imgAlt: "Ариунболд Болд - Хөгжүүлэгч & Олон талт суралцагч",
    },

    about: {
      sectionTitle: "Миний тухай",
      cards: {
        tech: { title: "Үндсэн технологийн ур чадварууд", srLabel: "Үндсэн технологийн ур чадварууд" },
        personal: { title: "Хувийн & Стратегийн чадварууд", srLabel: "Хувийн & Стратегийн чадварууд" },
        growth: { title: "Инженерчлэлийн өсөлтийн зорилтууд", srLabel: "Инженерчлэлийн өсөлтийн зорилтууд" },
      },
      techStack: [
        {
          title: "Full-stack архитектур (Next.js & React)",
          description: "App Router, SSR болон өндөр гүйцэтгэлтэй вэб аппликейшн бүтээх дэвшилтэт туршлага.",
        },
        {
          title: "Linux системийг өөртөө тохируулах",
          description: "Arch Linux, Hyprland дизайн (ricing) болон кэрнэл/драйверийн асуудлыг оношилж, шийдвэрлэх гүнзгий мэдлэг.",
        },
        {
          title: "Техник хангамжийн өөрчлөлт & Электроник",
          description: "ESP32 микроконтроллер, гагнуурын ажил болон хөргөлтийн системийг өөрчлөн сайжруулах туршлага.",
        },
        {
          title: "Автоматжуулсан багаж хэрэгслийн дизайн",
          description: "Орчны аюулгүй байдлын аудитад зориулсан захиалгат CLI хэрэгсэл болон build системүүдийг хөгжүүлэх.",
        },
        {
          title: "Доод түвшний оновчлол",
          description: "Өндөр түвшний фреймворкуудаас санах ойн хуваарилалт (memory allocation), бинари хэрэгслийн дотоод бүтэц болон гүйцэтгэлийн профайлинг (performance profiling) руу гүнзгийрэн шилжиж буй.",
        },
      ],
      personalDisciplines: [
        {
          title: "Бие бялдрын сахилга бат — Ширээний теннис",
          description: "5 гаруй жилийн тууштай хичээллэлт. Инженерчлэлд хэрэгцээтэй тууштай зан, давталт болон техникийн нарийвчлалыг спортоор дамжуулан харуулдаг.",
        },
        {
          title: "Стратегийн логик — Шатар (1100+ ELO)",
          description: "Хээ угалз, өрөг таних (pattern recognition), гарааны онол болон цагийн хязгаарлалт дор тактикийн дарамтыг удирдах — системийн дизайнд шууд хөрвөх чадварууд.",
        },
      ],
      growthTargets: [
        {
          title: "Кросс-платформ мобайл хөгжүүлэлт",
          description: "Full-stack вэб хөгжүүлэлтийн туршлагаа React Native ашиглан App Store-д гаргах хэмжээний мобайл аппликейшн болгон өргөжүүлэх зорилготой.",
        },
        {
          title: "Хязгаарлагдмал хугацаанд бүтээмжтэй ажиллах",
          description: "Сургуулийн үүрэг хариуцлагын зэрэгцээ чанарыг алдагдуулахгүйгээр өндөр бүтээмжтэй ажиллахын тулд sprint-д суурилсан төлөвлөлтийг хэрэгжүүлэх.",
        },
        {
          title: "Мэргэжлийн UI/UX болон Хүртээмжтэй байдал",
          description: "Инженерчлэлийн хувьд зөв бөгөөд харагдацын хувьд төгс интерфейс бүтээхийн тулд харилцан ажиллагааны дизайн (interaction design)-ы үндсэн зарчмууд болох WCAG 2.1 AA стандарт, Figma ажлын урсгал, компонентын түвшний хүртээмжтэй байдлыг эзэмших.",
        },
        {
          title: "Дэвшилтэт техник хангамжийн багаж хэрэгсэл",
          description: "Нарийн ажиллагаатай багаж хэрэгсэл (захиалгат тоон гагнуурын станц, дулааны мэдрэгч) болон идэвхтэй утаа сорогчоор ажлын байраа тоноглож, PCB хавтан үйлдвэрлэх процессоо аюулгүйгээр боловсронгуй болгох.",
        },
        {
          title: "Embedded A/V Стриминг (Хөгжүүлэгдэж буй)",
          description: "Бодит цагийн сүлжээгээр синхрончлогдсон видео болон аудиог шууд дамжуулах чадвартай, зайнаас удирддаг тээврийн хэрэгслийг инженерчлэн хөгжүүлж байна.",
        },
      ],
    },

    projects: {
      sectionTitle: "Миний Төслүүд",
      visitSite: "Сайт үзэх",
      viewSource: "Эх код харах",
      hoverHint: "Хулганаа дээгүүр нь аваачиж урьдчилан харна уу",
      tapHint: "Дарж урьдчилан харна уу",
      pressToOpen: "Нээхийн тулд Enter дарна уу.",
      pressToPreview: "Урьдчилан харахын тулд Enter дарна уу.",
      items: [
        { name: "Canu", description: "Хамтран зурах канвас — баг хамт олонтойгоо бодит цаг хугацаанд ажиллах боломжтой." },
        { name: "Зургийн хуваалцах платформ", description: "Нэвтрэлтийн тест (penetration testing)-ийн ажлын урсгалд зориулсан аюулгүй зураг хуваалцах платформ." },
        { name: "Mogio", description: "Бодит цагийн мөргөлдөөний логик бүхий хоёр тоглогч өрсөлдөх Могой тоглоом." },
        { name: "Цасны ширхэгүүд", description: "Шинэ жилийн баярт зориулсан генератив цасны ширхэгийн анимэйшн." },
        { name: "Magalang", description: "Шат дараалсан хүндрэл бүхий карт цээжлэх тоглоом." },
        { name: "Тоог таах тоглоом", description: "Зөвлөмж өгөх систем бүхий сонгодог тоо таах тоглоом." },
      ],
    },

    hardware: {
      sectionTitle: "Техник хангамж & Системийн интеграци",
      esp32: {
        title: "ESP32 Микроконтроллерийн интеграци",
        bullets: [
          "Өндөр бүтээмж, гүйцэтгэлийн тулд C++ хэл дээр firmware хөгжүүлсэн.",
          "128x64 OLED дэлгэц дээр бинар кодоор форматлагдсан GIF-үүдийг тоглуулахын тулд U8g2 санг ашигласан.",
          "Хязгаарлагдмал техник хангамжийн нөөцийг оновчтой болгож, гацахгүй, жигд ажиллагааг хангасан.",
        ],
        videoAlt: "ESP32 OLED анимэйшны демо",
        videoUnavailable: "ESP32 OLED демо — видео боломжгүй",
      },
      cryocell: {
        title: "Төсөл: CryoCell",
        bullets: [
          "Захиалгат 10000mAh гадаад батерейны шийдлийг зохион бүтээсэн.",
          "Эрчим хүч хэмнэх / Өндөр гүйцэтгэлийн (Power Save/Performance) горим бүхий сэнсний удирдлагын модулийг зохион бүтээсэн.",
          "Техник хангамжийг өөрчлөн сайжруулах болон дулааны зохицуулалтын (thermal management) ур чадварыг харуулсан.",
        ],
        videoAlt: "CryoCell утасны өөрчлөлтийн демо",
        videoUnavailable: "CryoCell демо — видео боломжгүй",
      },
      viewDetails: "Төслийн дэлгэрэнгүй",
    },

    timeline: {
      sectionTitle: "Миний Зам Мөр",
      items: [
        {
          year: "2014",
          title: "Анхны кодын мөрүүд",
          description: "Миний наснаас хоёр дахин ахмад компьютерийг ээж минь гэртээ авчирснаар бүх зүйл эхэлсэн. Scratch болон Python заадаг хүүхдийн программчлалын номноос анхны үндсийг сурч билээ.",
        },
        {
          year: "2015 - 2021",
          title: "Бие даан суралцсан үе",
          description: "HTML, CSS, JS-ийг бие даан сурсан. Хөгжмийн тоглуулагч, вэб хусагч (web scraper) зэрэг анхны Python аппуудаа бүтээж байв. Хиймэл оюуны туслахууд гарахаас өмнө Stack Overflow-оос хариулт хайн өдрүүдийг өнгөрөөдөг байлаа.",
        },
        {
          year: "2022",
          title: "Pinecone Академи",
          description: "Pinecone академид суралцаж, өмнөх суурь мэдлэгийнхээ ачаар амжилттай төгссөн. Хамтдаа код бичих бодит багштай болсон нь маш том давуу тал, шинэ мэдрэмж байв.",
        },
        {
          year: "2024 оны эхэн",
          title: "Linux VM & Android Моддинг",
          description: "Анхны Linux VM (Kali)-ээ суулгав. ADB, scrcpy болон Android-ын дотоод бүтцийг гүнзгий судалсан. Сургууль дээрээ цоожлогдсон төхөөрөмжүүдийг форматладаг гэдгээрээ танигдаж, заримдаа нутгийн 'хөвгүүдэд' туслан жижиг ашиг олдог байлаа.",
        },
        {
          year: "2024 оны сүүл",
          title: "Arch Linux руу бүрэн шилжсэн нь",
          description: "Windows болон Arch Linux-ийг хамт ажиллуулж (dual-boot) эхлэв. Windows-ийн шинэчлэлт хийгдсэний улмаас push хийж амжаагүй байсан кодууд минь устсаны дараа Windows-ийн partition-оо бүрэн устгаж, Arch Linux руу эргэлт буцалтгүй шилжсэн. Түүнээс хойш хэзээ ч харамсаагүй.",
        },
      ],
    },

    contact: {
      label: "Холбогдох",
      headline: "Таны төслийн талаар ярилцъя",
      emailCopied: "Имэйл хуулагдлаа!",
      phoneCopied: "Утас хуулагдлаа!",
      copyEmailLabel: "Имэйл хаягийг санах ойд хуулах",
      copyPhoneLabel: "Утасны дугаарыг санах ойд хуулах",
    },
  },
};

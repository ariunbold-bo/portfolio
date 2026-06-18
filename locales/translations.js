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

    // ── S21 Mod ──────────────────────────────────────────────
    s21: {
      section1: {
        subtitle: "Thermal Dissipation",
        title: "Active Cooling Architecture",
        p1: "It started with a simple idea: extreme cooling. Standard passive cooling wasn't enough to sustain peak performance during intensive tasks. I took a standard S21 case, mapped out the thermal hotspots on the chassis, and carefully carved a precise circular mount.",
        p2: "This allowed a custom cooling fan assembly to sit flush against the device. This active cooling setup pulls heat directly away from the chassis, lowering the temperature of the device by whole 10 degrees Celsius and maintaining hardware stability under maximum load.",
      },
      section2: {
        subtitle: "Power Delivery",
        title: "Bypassing Limitations",
        p1: "Cooling is nothing without the power to sustain it. I integrated a massive 10,000mAh external power bank directly into the S21's internal circuitry.",
        p2: "By soldering the custom fan assembly to a dedicated controller, I created dual operational modes: Power Save and Performance. This direct wiring bypasses standard hardware limitations, feeding raw power directly to the cells and the cooling system for unprecedented, uninterrupted battery life.",
      }
    },
    // ── ESP32 ──────────────────────────────────────────────
    esp32_page: {
      section1: {
        subtitle: "The Environment",
        title: "Built on Arch Linux",
        p1: "Setting up the Arduino development environment on Arch Linux was a journey in itself. From wrestling with drivers that refused to cooperate to configuring the toolchain for ESP32 compilation — every step was a battle against Linux's \"do it yourself\" philosophy. The driver issues alone consumed hours of debugging, but the payoff was a lean, powerful dev setup that worked exactly how I wanted.",
      },
      section2: {
        subtitle: "The Engineering",
        title: "Optimized for Constraints",
        p1: "The real challenge was fitting animation onto a 128x64 pixel OLED display. Color had to go entirely — every frame was converted to monochrome binary data. Resolution was deliberately reduced to keep frame data small enough for the ESP32's limited memory. Using the U8g2 library in C++, I built a custom rendering pipeline that decodes binary-encoded GIF frames and pushes them to the display at smooth framerates. The result caught attention — a demo posted on Instagram pulled in solid views.",
      },
      section3: {
        subtitle: "The Wiring",
        title: "Simple but Effective",
        p1: "Despite the software complexity, the hardware side was refreshingly straightforward. The ESP32 connects to the SSD1306 OLED via I2C — just four wires: VCC, GND, SDA, and SCL. Clean wiring, solid connections, and the display comes alive with custom animations.",
      }
    },
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
        journey: "Түүх",
        projects: "Төслүүд",
        contact: "Холбогдох",
      },
      theme: {
        toLight: "Гэрэлтэй горимд шилжих",
        toDark: "Харанхуй горимд шилжих",
      },
      lang: {
        label: "Хэл",
        en: "Англи",
        mn: "Монгол",
      },
    },

    intro: {
      greeting: "Сайн уу,",
      name: "Намайг Ариунболд гэдэг",
      subtitle: "Систем хөгжүүлэгч & Олон чиглэлээр суралцагч",
      cta: {
        contact: "Холбогдох",
        about: "Миний тухай",
      },
      imgAlt: "Болдын Ариунболд - Хөгжүүлэгч",
    },

    about: {
      sectionTitle: "Миний тухай",
      cards: {
        tech: { title: "Үндсэн технологиуд", srLabel: "Үндсэн технологиуд" },
        personal: { title: "Хувь хүний болон стратегийн сахилга бат", srLabel: "Хувь хүний болон стратегийн сахилга бат" },
        growth: { title: "Цаашдын зорилтууд", srLabel: "Цаашдын зорилтууд" },
      },
      techStack: [
        {
          title: "Full-Stack Архитектур (Next.js & React)",
          description: "App Router, SSR болон өндөр ачаалал даах чадвартай вэб аппликейшн хөгжүүлэх гүнзгий туршлага.",
        },
        {
          title: "Linux Системийн Тохиргоо",
          description: "Arch Linux, Hyprland орчныг өөриймшүүлж тохируулах (ricing) болон кернел, драйверын түвшний алдааг оношилж засах чадвар.",
        },
        {
          title: "Электроник ба Техник Хангамж",
          description: "ESP32 микроконтроллер програмчлах, нарийн гагнуур хийх, хөргөлтийн системийг өөрчлөн сайжруулах туршлага.",
        },
        {
          title: "Автоматжуулалтын Хэрэгсэл",
          description: "Системийн аюулгүй байдлыг шалгах, хөгжүүлэлтийн процессыг хурдасгах зориулалттай тусгай CLI хэрэгслүүдийг бүтээх.",
        },
        {
          title: "Доод Түвшний Оновчлол",
          description: "Өндөр түвшний фреймворкоос илүүтэйгээр санах ойн хуваарилалт (memory allocation), бинар файлын бүтэц, гүйцэтгэлийн шинжилгээ (performance profiling) зэрэгт гүнзгийрэн суралцаж байна.",
        },
      ],
      personalDisciplines: [
        {
          title: "Бие Бялдрын Сахилга Бат — Ширээний теннис",
          description: "5+ жилийн тууштай бэлтгэл. Инженерчлэлд ч мөн адил шаардагддаг тууштай зан, тасралтгүй давталт болон техникийн нарийвчлалыг шаарддаг спортоор хичээллэдэг.",
        },
        {
          title: "Стратегийн Сэтгэлгээ — Шатар (1100+ ELO)",
          description: "Зүй тогтлыг таних, гарааны онол, цагийн хязгаарлалттай үед дарамтыг удирдах зэрэг чадварууд нь системийн архитектур гаргахад шууд ашиглагддаг.",
        },
      ],
      growthTargets: [
        {
          title: "Кросс-платформ Мобайл Хөгжүүлэлт",
          description: "Вэб хөгжүүлэлтийн туршлагаа React Native ашиглан App Store-д гаргах түвшний мобайл аппликейшн хөгжүүлэхэд чиглүүлж байна.",
        },
        {
          title: "Цагийн Удирдлага ба Бүтээмж",
          description: "Хичээл сургуулийн хажуугаар төслүүдээ чанартай, хугацаанд нь дуусгахын тулд sprint буюу үе шаттай төлөвлөлтийг хэрэгжүүлдэг.",
        },
        {
          title: "Мэргэжлийн UI/UX ба Хүртээмжтэй Байдал",
          description: "Аппликейшнээ зөвхөн код талаас нь бус, харагдац, хэрэглэхэд хялбар байдлын хувьд төгс байлгах үүднээс Figma болон WCAG 2.1 AA стандартуудыг судалж байна.",
        },
        {
          title: "Дэвшилтэт Техник Хангамжийн Багаж",
          description: "PCB хавтан үйлдвэрлэх процессоо аюулгүй, нарийвчлалтай болгохын тулд ажлын орчноо дижитал гагнуурын станц, утаа сорогч зэргээр тоноглож байна.",
        },
        {
          title: "Embedded A/V Стриминг (Хийгдэж буй)",
          description: "Бодит хугацаанд аудио болон видео дүрс дамжуулах чадвартай, зайнаас удирддаг тээврийн хэрэгслийг зохион бүтээж байна.",
        },
      ],
    },

    projects: {
      sectionTitle: "Миний Төслүүд",
      visitSite: "Сайт руу орох",
      viewSource: "Эх кодыг үзэх",
      hoverHint: "Хулганаа дээгүүр нь гүйлгэж харна уу",
      tapHint: "Дарж харна уу",
      pressToOpen: "Enter дарж нээнэ үү.",
      pressToPreview: "Enter дарж урьдчилан харна уу.",
      items: [
        { name: "Canu", description: "Багаараа бодит хугацаанд хамтран зурах боломжтой ухаалаг самбар." },
        { name: "Зураг Хуваалцах Платформ", description: "Нэвтрэлтийн тест (Penetration testing) хийхэд зориулагдсан аюулгүй байдал өндөртэй систем." },
        { name: "Mogio", description: "Бодит хугацааны мөргөлдөөний тооцоололтой, хоёр хүн өрсөлдөн тоглох боломжтой Могой тоглоом." },
        { name: "Цасан Ширхгүүд", description: "Шинэ жилийн баярт зориулсан генератив арт хэлбэрийн цасан ширхгийн анимэйшн." },
        { name: "Magalang", description: "Түвшин ахих тусам хүндрэх, ой тогтоолт сайжруулах картын тоглоом." },
        { name: "Тоог Таах", description: "Өгөгдсөн зөвлөмжүүдийг ашиглан нууц тоог таах сонгодог тоглоом." },
      ],
    },

    hardware: {
      sectionTitle: "Техник Хангамж & Системийн Интеграци",
      esp32: {
        title: "ESP32 Микроконтроллерийн Интеграци",
        bullets: [
          "C++ хэл дээр өндөр хурдтай ажиллах firmware бичсэн.",
          "128x64 OLED дэлгэц дээр бинар өгөгдөлтэй GIF дүрсийг гаргахын тулд U8g2 санг ашигласан.",
          "Микроконтроллерийн хязгаарлагдмал нөөцийг оновчтой ашиглаж дүрсийг гацалтгүй тоглуулсан.",
        ],
        videoAlt: "ESP32 OLED анимэйшны демо видео",
        videoUnavailable: "ESP32 OLED демо — видеог тоглуулах боломжгүй байна",
      },
      cryocell: {
        title: "Төсөл: CryoCell",
        bullets: [
          "Ухаалаг утсанд зориулсан 10000mAh багтаамжтай гадаад батерейны шийдлийг боловсруулсан.",
          "Эрчим хүч хэмнэх болон өндөр хүчин чадлын (Power Save/Performance) горим бүхий сэнсний удирдлагын модулийг зохион бүтээсэн.",
          "Техник хангамжийн дизайныг өөрчлөх болон төхөөрөмжийн халалтыг шийдвэрлэх инженерийн чадвараа баталсан.",
        ],
        videoAlt: "Project CryoCell төслийн демо видео",
        videoUnavailable: "CryoCell демо — видеог тоглуулах боломжгүй байна",
      },
      viewDetails: "Дэлгэрэнгүй",
    },

    timeline: {
      sectionTitle: "Миний Түүх",
      items: [
        {
          year: "2014",
          title: "Анхны Код",
          description: "Надаас хоёр дахин хөгшин компьютерыг ээж минь гэртээ авчирснаар бүх зүйл эхэлсэн юм. Хүүхдийн программчлалын номноос Scratch болон Python хэлний анхны мэдэгдэхүүнийг олж авч байлаа.",
        },
        {
          year: "2015 - 2021",
          title: "Бие Даан Суралцсан Он Жилүүд",
          description: "HTML, CSS, болон JS-г бие даан сурч, дуу тоглуулагч, вэб хусагч (web scraper) зэрэг анхны Python аппликейшнуудаа бүтээв. AI туслахууд байхгүй байсан тэр үед Stack Overflow-с хариулт хайж олон өдрийг өнгөрөөдөг байсан.",
        },
        {
          year: "2022",
          title: "Pinecone Академи",
          description: "Pinecone академид элсэн орж, өмнөх суурь мэдлэгийнхээ ачаар онц дүнтэй төгссөн. Хамтдаа сууж код бичих бодит багштай болсон нь маш урам зоригтой, шинэ мэдрэмж байсан.",
        },
        {
          year: "2024 оны эхэн",
          title: "Linux VM & Android Моддинг",
          description: "Анхны Linux VM (Kali)-гээ суулгаж, ADB, scrcpy зэрэг Android-н дотоод системүүдийг гүнзгий судалж эхлэв. Сургууль дээрээ түгжигдсэн утаснуудыг форматладаг гэдгээрээ танигдаж, заримдаа нутгийн 'атамануудад' туслан бага сага мөнгө олдог байлаа.",
        },
        {
          year: "2024 оны сүүл",
          title: "Arch Linux-д Бүрэн Шилжив",
          description: "Windows болон Arch Linux-ийг зэрэг ашигладаг (dual-boot) байв. Гэвч Windows-н гэнэтийн апдейтээс болж хадгалж амжаагүй байсан бүх код минь устсаны дараа би Windows-г бүрмөсөн устгаж, Arch Linux руу эргэлт буцалтгүй шилжсэн. Энэ шийдвэртээ хэзээ ч харамсдаггүй.",
        },
      ],
    },

    
    s21: {
      section1: {
        subtitle: "Дулаан Гадагшлуулах Систем",
        title: "Идэвхтэй Хөргөлтийн Архитектур",
        p1: "Бүх зүйл энгийн санаанаас эхэлсэн: хэт хөргөлт. Хүнд ачаалалтай үед өндөр хүчин чадлыг тогтвортой барихад гар утасны үйлдвэрийн идэвхгүй хөргөлт хангалтгүй байсан юм. Би энгийн S21-ийн гэрийг авч, дулаан хамгийн их ялгардаг цэгүүдийг нь тооцоолон, маш нарийвчлалтайгаар дугуй нүх гаргасан.",
        p2: "Ингэснээр тусгайлан угсарсан хөргөлтийн сэнсийг төхөөрөмжид яг тааруулан суурилуулах боломжтой болсон. Энэхүү идэвхтэй хөргөлтийн систем нь халалтыг шууд гадагшлуулж, төхөөрөмжийн температурыг бүхэл бүтэн 10 хэмээр бууруулснаар, хамгийн өндөр ачаалалтай үед ч системийн тогтвортой байдлыг хадгалж чаддаг.",
      },
      section2: {
        subtitle: "Цахилгаан Тэжээл",
        title: "Хязгаарлалтыг Давах нь",
        p1: "Тэжээлгүйгээр хөргөлт байгаад нэмэргүй. Тиймээс би 10,000mAh багтаамжтай гадаад батерейг S21-ийн дотоод хэлхээнд шууд холбож өгсөн.",
        p2: "Хөргөлтийн сэнсийг тусгай удирдлагын модультай гагнаж холбосноор 'Эрчим хүч хэмнэх' болон 'Өндөр хүчин чадлын' гэсэн хоёр горимыг бий болгосон. Ингэж шууд утасдаж холбосноор төхөөрөмжийн үйлдвэрийн хязгаарлалтыг давж, батерей болон хөргөлтийн системийг шууд тэжээлээр хангаснаар маш урт хугацааны, тасалдалгүй ажиллах боломжийг бүрдүүлсэн.",
      }
    },
    esp32_page: {
      section1: {
        subtitle: "Хөгжүүлэлтийн Орчин",
        title: "Arch Linux Дээр Бүтээв",
        p1: "Arch Linux дээр Arduino хөгжүүлэлтийн орчинг бүрдүүлэх нь өөрөө бие даасан томоохон ажил байлаа. Ажиллахгүй байгаа драйверуудтай тэмцэлдэхээс эхлээд ESP32-ийг компайл хийх хэрэгслүүдийг тохируулах хүртэлх алхам бүр нь Linux-ийн \"Өөрөө бүхнийг хий\" гэдэг гүн ухаантай хийсэн тэмцэл байв. Зөвхөн драйверын асуудлыг шийдэхийн тулд хэдэн цагийг зарцуулсан боловч, үр дүнд нь миний хүссэнээр яг таг ажилладаг, маш хурдан бөгөөд хүчирхэг хөгжүүлэлтийн орчинтой болж чадсан.",
      },
      section2: {
        subtitle: "Инженерчлэл",
        title: "Хязгаарлагдмал Нөөцөд Оновчлох нь",
        p1: "Хамгийн том сорилт бол 128x64 хэмжээтэй OLED дэлгэц дээр анимэйшн гаргах байв. Өнгөний мэдээллийг бүхэлд нь хаяж, фрейм бүрийг хар-цагаан бинар өгөгдөл рүү хөрвүүлэх шаардлагатай болсон. ESP32-ийн санах ой багатай тул өгөгдлийн хэмжээг багасгахын тулд дэлгэцийн нягтаршлыг зориудаар бууруулсан. C++ хэлний U8g2 санг ашиглан бинар код руу хөрвүүлсэн GIF фреймүүдийг уншиж, дэлгэц рүү өндөр хурдтайгаар дамжуулах тусгай рендеринг пайплайн (rendering pipeline) бичсэн. Үр дүн нь маш сонирхолтой болсон бөгөөд Instagram-д оруулсан демо видео багагүй хүмүүст хүрсэн.",
      },
      section3: {
        subtitle: "Холболт",
        title: "Энгийн Бөгөөд Үр Дүнтэй",
        p1: "Програм хангамжийн хувьд нэлээд түвэгтэй байсан хэдий ч техник хангамжийн тал нь маш ойлгомжтой бөгөөд хялбар байлаа. ESP32 микроконтроллерийг SSD1306 OLED дэлгэцтэй I2C протоколоор ердөө 4 утсаар холбодог: VCC, GND, SDA, болон SCL. Цэвэрхэн, найдвартай холболтын үр дүнд дэлгэц дээр тусгайлан бэлтгэсэн анимэйшнууд амилан ассан юм.",
      }
    },
contact: {
      label: "Холбоо Барих",
      headline: "Таны төслийн талаар ярилцъя",
      emailCopied: "И-мэйл хаяг хуулагдлаа!",
      phoneCopied: "Утасны дугаар хуулагдлаа!",
      copyEmailLabel: "И-мэйл хаягийг санах ойд хуулах",
      copyPhoneLabel: "Утасны дугаарыг санах ойд хуулах",
    },
  },
};

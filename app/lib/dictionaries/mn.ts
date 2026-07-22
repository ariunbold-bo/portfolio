import { Dictionary } from "../types";

const mn: Dictionary = {
  identity: {
    name: "Ариунболд Болд",
    firstName: "Ариунболд",
    role: "Систем хөгжүүлэгч & Олон талт судлаач",
    seoTitle: "Програм болон техник хангамж хөгжүүлэгч",
    site: "https://ariunbold.dev",
    siteName: "Ариунболд Болд Портфолио",
    location: "Монгол улс",
    initials: "АБ",
    tagline: "Би зүгээр л нарийн төвөгтэй асуудлуудыг шийдвэрлэх дуртай залуу",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "C++",
    "ESP32",
    "Техник хангамжийн инженерчлэл",
    "Full-Stack хөгжүүлэлт",
  ],
  contact: [
    {
      label: "И-мэйл",
      value: "ariunboldbold200@gmail.com",
      href: "mailto:ariunboldbold200@gmail.com",
      icon: "mail",
      external: false,
    },
    {
      label: "Утас",
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
      title: "Full-Stack Архитектур",
      tag: "Next.js & React",
      body: "App Router, SSR болон өндөр хурдны вэб аппликейшн бүтээх арвин туршлагатай.",
      icon: "layers",
    },
    {
      no: "02",
      title: "Linux Системийн Тохиргоо",
      tag: "Arch / Hyprland",
      body: "Arch Linux, Hyprland болон kernel/driver-ийн асуудал шийдвэрлэх гүнзгий мэдлэгтэй.",
      icon: "terminal",
    },
    {
      no: "03",
      title: "Техник хангамж & Электроник",
      tag: "ESP32 / Гагнуур",
      body: "ESP32 микроконтроллер, гагнуур болон хөргөлтийн системийг өөрчлөн сайжруулах чиглэлээр ажилладаг.",
      icon: "chip",
    },
    {
      no: "04",
      title: "Автоматжуулалтын хэрэгсэл",
      tag: "CLI / Build systems",
      body: "Аюулгүй байдлын аудит хийхэд зориулсан тусгай CLI хэрэгсэл болон build системүүдийг бүтээх.",
      icon: "wrench",
    },
    {
      no: "05",
      title: "Доод түвшний оновчлол",
      tag: "Санах ой / Profiling",
      body: "Дээд түвшний фреймворкоос эхлээд санах ойн хуваарилалт, toolchain-ийн дотоод бүтэц, гүйцэтгэлийн оновчлол руу шилжих.",
      icon: "gauge",
    },
  ],
  timeline: [
    {
      when: "2009",
      title: "Энэ ертөнцөд ирсэн нь",
      body: "Аав ээж хоёр минь гэрлэж, би энэ хорвоод мэндэлсэн.",
    },
    {
      when: "2017",
      title: "Анхны кодын мөр",
      body: "Ээж минь надаас хоёр дахин хөгшин компьютер авчирснаар эхэлсэн. Scratch, Python заасан хүүхдийн номноос суурь мэдлэг олж авсан.",
    },
    {
      when: "2017 – 2021",
      title: "Бие даан суралцсан үе",
      body: "HTML, CSS, JS-ийг бие даан сурсан. Хиймэл оюун ухаан гаргахаас өмнө Stack Overflow ухаж, хөгжим тоглуулагч, вэб скрапер зэрэг Python аппууд хийж байв.",
    },
    {
      when: "2022",
      title: "Pinecone Сургууль",
      body: "Pinecone програмчлалын сургуульд суралцаж, өмнөх мэдлэгийнхээ ачаар амжилттай төгссөн. Жинхэнэ багштай хамт код бичих нь сайхан байсан.",
    },
    {
      when: "2024 оны эхээр",
      title: "Linux VMs & Android Modding",
      body: "Анхны Linux VM (Kali)-г тохируулж, ADB, scrcpy, Android-ийн дотоод бүтцэд гүнзгий нэвтэрч, түгжигдсэн төхөөрөмжүүдийг форматлах тал дээр сургуульдаа алдартай болсон.",
    },
    {
      when: "2024 оны сүүлээр",
      title: "Arch Linux руу шилжсэн нь",
      body: "Windows болон Arch-г хослуулан хэрэглэж эхэлсэн. Windows update-ийн улмаас push хийгээгүй кодоо устгуулсны дараа бүрэн Arch Linux руу шилжиж, дахин хэзээ ч Windows руу буцаагүй.",
    },
  ],
  hardware: [
    {
      slug: "esp32",
      name: "ESP32 Анимейшн",
      kicker: "Микроконтроллерийн Интеграци",
      summary:
        "Бинар кодчилогдсон GIF фреймүүдийг тайлж, 128×64 OLED дэлгэц дээр өндөр хурдтай харуулдаг, хязгаарлагдмал хүчин чадалтай төхөөрөмжид зориулсан C++ програм.",
      highlights: [
        "Өндөр гүйцэтгэлтэй C++ хэл дээр бичигдсэн програм",
        "U8g2 сан ашиглан бинар GIF-ийг 128×64 OLED дээр зурах",
        "Хязгаарлагдмал хүчин чадалтай төхөөрөмж дээр зөөлөн тоглуулах оновчлол",
      ],
      sections: [
        {
          title: "Arch дээрх Toolchain",
          body: "Хөгжүүлэлтийн орчныг Arch Linux дээр тохируулж, ESP32-ийн компайл хийх үйлдлийг саадгүй ажиллуулахын тулд драйвер болон toolchain-ийн тохиргоотой багагүй ноцолдсон.",
        },
        {
          title: "128×64 хэмжээнд багтаах",
          body: "Хамгийн том сорилт бол анимейшнийг 128×64 пикселийн OLED дээр багтаах байв. Өнгийг бүхэлд нь хасч, фрейм бүрийг хар цагаан бинар өгөгдөл болгон хөрвүүлж, ESP32-ийн хязгаарлагдмал санах ойд багтаасан.",
        },
        {
          title: "Утасны холболт",
          body: "ESP32 нь SSD1306 OLED-тэй I2C ашиглан VCC, GND, SDA, SCL гэсэн дөрөвхөн утсаар холбогддог.",
        },
      ],
      specs: [
        { label: "MCU", value: "ESP32" },
        { label: "Дэлгэц", value: "SSD1306 128×64" },
        { label: "Холболт", value: "I2C · 4 утас" },
        { label: "Технологи", value: "C++ · U8g2" },
      ],
      icon: "chip",
      media: [
        { type: "video", src: "/esp32-demo.mp4", poster: "/esp32-poster.webp" },
      ],
    },
    {
      slug: "cryocell",
      name: "CryoCell",
      kicker: "Samsung Galaxy S21 Өөрчлөлт",
      summary:
        "10,000mAh хүчин чадалтай тусгай батерей, идэвхтэй хөргөлтийн систем болон Power Save / Performance хос горимтой техник хангамжийн өөрчлөлт.",
      highlights: [
        "10,000mAh хүчин чадалтай гадаад батерейн системийг бүтээсэн",
        "Power Save / Performance горим бүхий сэнсний хяналтын модуль",
        "Дулааны удирдлага болон техник хангамжийн өөрчлөлт хийх ур чадвар",
      ],
      sections: [
        {
          title: "Идэвхтэй Хөргөлтийн Архитектур",
          body: "S21-ийн энгийн хөргөлт нь өндөр ачааллын үед хангалтгүй байсан тул дулааны цэгүүдийг тодорхойлж, хөргөлтийн сэнсийг суулгаснаар температурыг 10°C-аар бууруулж, тогтвортой ажиллагааг хангасан.",
        },
        {
          title: "Цахилгаан хангамж",
          body: "10,000mAh батерейг S21-ийн дотоод хэлхээнд шууд нэгтгэсэн. Хөргөлтийн сэнсийг тусгай хянагчтай холбосноор стандарт хязгаарлалтыг давж гарсан.",
        },
      ],
      specs: [
        { label: "Төхөөрөмж", value: "Galaxy S21" },
        { label: "Батерей", value: "10,000mAh" },
        { label: "Хөргөлт", value: "−10°C ачаалал" },
        { label: "Горим", value: "Save · Perf" },
      ],
      icon: "battery",
      media: [
        { type: "video", src: "/mobile-compressed.mp4", poster: "/mobile-poster.webp" },
      ],
    },
    {
      slug: "bt-speaker",
      name: "Custom DIY Stereo Bluetooth Speaker",
      kicker: "Техник хангамж • Хэлхээний Дизайн • Акустик инженерчлэл",
      summary:
        "Тусгаарлагдсан хос тэжээл, хүчдэл өсгөгч болон тохируулсан акустик шингээлт бүхий зөөврийн Bluetooth чанга яригч.",
      highlights: [
        "Хос тэжээлийн тусгаарлалт: Bluetooth хүлээн авагч болон өсгөгчийн тэжээлийг салгаснаар шуугианыг арилгасан.",
        "Хүчдэл өсгөгч: Батерейн хүчдэлийг өсгөж, дууны гаралтын чадлыг нэмэгдүүлэх boost converter ашигласан.",
        "Акустик тохируулга: Дотоод дууны долгионыг багасгаж, басс дуугаралтыг сайжруулахын тулд хөвөн шингээгч ашигласан.",
      ],
      sections: [
        {
          title: "Хос тэжээлийн систем & Хүчдэл өсгөгч",
          body: "BMS бүхий лити батерей нь BLE модуль болон PAM8610 өсгөгчийг тэжээлээр хангаж, дижитал шуугианаас сэргийлдэг. Цэнхэр DC-DC өсгөгч нь хүчдэлийг нэмэгдүүлдэг.",
        },
        {
          title: "Акустик шингээлт & Тохиргоо",
          body: "Хоёр чанга яригчийг картон хавтан дээр суурилуулж, агаарын алдагдалаас сэргийлж битүүмжилсэн. Хөвөн шингээгч нь дууны долгионыг удаашруулж, илүү гүн басс гаргахад тусалдаг.",
        },
      ],
      specs: [
        { label: "Төрөл", value: "Bluetooth Audio" },
        { label: "Өсгөгч", value: "PAM8610 (PAM)" },
        { label: "Хянагч", value: "Pi BLE Cheap Controller" },
        { label: "Тэжээл", value: "3.7V - 22V Boost Converter" },
        { label: "Утас", value: "An absolute mess (damn)" },
        { label: "Гадна", value: "Гар хийцийн гэр" },
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
      kicker: "Hyprland • Системийн Тохиргоо",
      summary:
        "Амьд болон статик ханын цаасанд хариу үйлдэл үзүүлдэг гарын RGB синхрончлол бүхий өндөр түвшний Arch Linux тохиргоо.",
      highlights: [
        "Динамик гоо зүйн синхрончлол: Гарын RGB нь идэвхтэй ханын цаасны давамгайлах өнгөтэй автоматаар синхрончлогддог.",
        "Гүйцэтгэлийн оновчлол: Бүрэн дэлгэцийн аппликейшнийг автоматаар илрүүлж, амьд ханын цаасыг зогсоож системийн нөөцийг хэмнэдэг.",
        "mpvpaper: GPU-ийн санах ойг ердөө 800mb ашигладаг бөгөөд Windows-тэй харьцуулахад нөөцийн ашиглалт 2000% бага.",
      ],
      sections: [
        {
          title: "Гарын өнгөний синхрончлол",
          body: "Амьд болон статик ханын цааснаас өнгөний палитрыг гаргаж, гарын RGB хянагч руу бодит хугацаанд дамжуулдаг тусгай скриптүүд бичсэн.",
        },
        {
          title: "Нөөцийн удирдлага",
          body: "Тоглоом тоглох болон хүнд ачааллын үед амьд ханын цаас нөлөөлөхөөс сэргийлж, Hyprland дээр бүрэн дэлгэцийн төлөвийг илрүүлдэг hook хэрэгжүүлсэн.",
        },
      ],
      specs: [
        { label: "Үйлдлийн систем", value: "Arch Linux" },
        { label: "Терминал", value: "RGB Keyboard" },
        { label: "WM", value: "Hyprland" },
        { label: "Техник", value: "RGB Keyboard" },
      ],
      icon: "terminal",
      media: [{ type: "video", src: "/arch_ricing.mp4" }],
    },
  ],
  projects: [
    {
      name: "Canu",
      blurb: "Багаараа бодит хугацаанд хамтран зурах зориулалттай canvas.",
      live: "https://canu.vercel.app",
      source: "https://github.com/ariunbold-bo/canu.git",
      tags: ["Realtime", "Canvas"],
    },
    {
      name: "Зураг хуваалцах платформ",
      blurb: "Нэвтрэлтийн тест хийхэд зориулагдсан аюулгүй зураг хуваалцах платформ.",
      live: "https://psp-ten-zeta.vercel.app/",
      source: "https://github.com/ariunbold-bo/psp.git",
      tags: ["Security", "Full-Stack"],
    },
    {
      name: "Magalang",
      blurb: "Хүндрэл нь аажмаар нэмэгддэг карт цээжлэх тоглоом.",
      live: "https://magalang.vercel.app",
      source: "https://github.com/ariunbold-bo/magalang.git",
      tags: ["Game", "React"],
    },
  ],
  disciplines: [
    {
      title: "Ширээний теннис",
      meta: "5+ жил",
      body: "Таван жилийн турш тасралтгүй хичээллэж буй бөгөөд инженерчлэлд шаардлагатай тууштай байдал, нарийвчлалыг эндээс суралцдаг.",
      icon: "pingpong",
    },
    {
      title: "Шатар",
      meta: "1100+ ELO",
      body: "Хэв маягийг таних, гарааны онол болон цагийн хязгаарлалтан дахь тактикийн дарамт — эдгээр нь системийн дизайнд шууд хөрвөх чадварууд юм.",
      icon: "chess",
    },
    {
      title: "Төгөлдөр хуур",
      meta: "Бие даан сурсан",
      body: "Нотыг булчингийн санах ой руу хөрвүүлэх. Төгөлдөр хуур тоглох нь програмчлалын шинэ хэл сурахад шаардлагатай тархины замыг бий болгодог.",
      icon: "piano",
      youtubeId: "G0U57a5Enpk",
    },
  ],
  gallery: [
    { src: "/arch_ricing.mp4", type: "video", alt: "Arch Linux Ricing", aspectRatio: "aspect-video" },
    { src: "/ble_speaker_mono.mp4", type: "video", alt: "Mono Speaker Version", aspectRatio: "aspect-[9/16]" },
  ],
  growth: [
    {
      no: "01",
      title: "Платформ дамнасан гар утасны апп",
      body: "React Native ашиглан full-stack вэб мэдлэгээ гар утасны апп хөгжүүлэлт рүү өргөжүүлж, App Store-д гаргах зорилттой.",
    },
    {
      no: "02",
      title: "Цагийн хязгаарт багтаж ажиллах",
      body: "Хичээлийн хажуугаар чанараа алдалгүйгээр өндөр бүтээмжтэй хөгжүүлэлт хийхийн тулд спринт дээр суурилсан цагийн хуваарь баримтлах.",
    },
    {
      no: "03",
      title: "Мэргэжлийн UI/UX & Хүртээмжтэй байдал",
      body: "Харилцан үйлчлэлийн дизайны албан ёсны зарчмууд — WCAG 2.1 AA стандартууд, Figma ажлын урсгал болон компонентийн түвшний хүртээмж.",
    },
    {
      no: "04",
      title: "Нарийвчилсан техник хангамжийн хэрэгсэл",
      body: "Гагнуурын станц, дулаан мэдрэгч зэрэг нарийн багаж хэрэгслийг ашиглан PCB хавтанг аюулгүй бүтээх.",
    },
    {
      no: "05",
      title: "Embedded A/V Streaming",
      body: "Бодит хугацааны сүлжээгээр дүрс болон дууг дамжуулдаг алсын удирдлагатай тээврийн хэрэгсэл бүтээх.",
      wip: true,
    },
  ],
  nav: [
    { id: "home", label: "Нүүр", icon: "home" },
    { id: "about", label: "Тухай", icon: "user" },
    { id: "stack", label: "Технологи", icon: "layers" },
    { id: "journey", label: "Аялал", icon: "route" },
    { id: "hardware", label: "Техник", icon: "chip" },
    { id: "projects", label: "Төслүүд", icon: "grid" },
    { id: "beyond", label: "Цаашдаа", icon: "spark" },
    { id: "contact", label: "Холбогдох", icon: "mail" },
  ],
  ui: {
    coreTechnologies: "Үндсэн Технологиуд",
    activelyMoving: "Доод түвшний санах ой, toolchain болон фреймворкуудын доорх металл руу идэвхтэй шилжиж байна.",
    viewProject: "Төслийг үзэх",
    hardwareProjects: "Техник Хангамжийн Төслүүд",
    hardwareDesc: "Цахилгаан хэлхээ, микроконтроллер болон биет тооцоолон бодох системийг судалж байна.",
    softwareProjects: "Програм Хангамжийн Төслүүд",
    softwareDesc: "Full-stack вэб аппликейшн, интерактив canvas хэрэгслүүд болон гүйцэтгэлд чиглэсэн frontend архитектур.",
    learning: "Суралцах & Сахилга бат",
    learningDesc: "Дэлгэцнээс гадуурх системийн сэтгэлгээ — механик болон танин мэдэхүйн хэв маягийг эзэмших.",
    sendMeEmail: "И-мэйл илгээх",
    connectWithMe: "Надтай холбогдох",
  },
};

export default mn;

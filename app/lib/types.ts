import type { IconName } from "@/app/components/icons";

export type NavId =
  "home" | "about" | "stack" | "journey" | "projects" | "contact";

export type ContactLink = {
  label: string;
  value: string;
  href: string;
  icon: "mail" | "phone" | "github" | "linkedin" | "facebook";
  external: boolean;
};

export type StackIcon = "layers" | "terminal" | "chip" | "wrench" | "gauge";

export type StackItem = {
  no: string;
  title: string;
  tag: string;
  body: string;
  icon: StackIcon;
};

export type TimelineEntry = {
  when: string;
  title: string;
  body: string;
  image?: { src: string; alt: string; aspectRatio: string; type?: "image" | "video" } | null;
};

export type HardwareProject = {
  slug: "esp32" | "cryocell" | "arch-ricing" | "pusda-speaker";
  name: string;
  kicker: string;
  summary: string;
  highlights: string[];
  sections: { title: string; body: string }[];
  specs: { label: string; value: string }[];
  icon: "chip" | "battery" | "speaker" | "terminal";
  media?: { type: "video" | "image"; src: string; poster?: string }[];
};

export type SoftwareProject = {
  name: string;
  blurb: string;
  live: string;
  source: string;
  tags: string[];
};

export type Discipline = {
  title: string;
  meta: string;
  body: string;
  icon: "pingpong" | "chess" | "piano";
  youtubeId?: string;
};

export type GalleryItem = {
  src: string;
  type: "image" | "video";
  alt: string;
  aspectRatio: string;
};

export type GrowthTarget = {
  no: string;
  title: string;
  body: string;
  wip?: boolean;
};

export type Dictionary = {
  identity: {
    name: string;
    firstName: string;
    role: string;
    seoTitle: string;
    site: string;
    siteName: string;
    location: string;
    initials: string;
    tagline: string;
    dob: string;
    resumeUrl: string;
  };
  knowsAbout: readonly string[];
  contact: ContactLink[];
  stack: StackItem[];
  timeline: TimelineEntry[];
  hardware: HardwareProject[];
  projects: SoftwareProject[];
  disciplines: Discipline[];
  gallery: GalleryItem[];
  growth: GrowthTarget[];
  nav: { id: NavId; label: string; icon: IconName }[];
  ui: {
    easterEgg: string;
    openForOpp: string;
    viewProjects: string;
    contactMe: string;
    aboutLabel: string;
    aboutTitle: string;
    coreTechnologies: string;
    activelyMoving: string;
    personalDisciplines: string;
    growthTargets: string;
    wip: string;
    stackLabel: string;
    stackTitle: string;
    journeyLabel: string;
    journeyTitle: string;
    hardwareLabel: string;
    hardwareTitle: string;
    hardwareDesc: string;
    more: string;
    softwareLabel: string;
    softwareTitle: string;
    liveSite: string;
    source: string;
    contactLabel: string;
    contactTitle: string;
    contactDesc: string;
    footer: string;
    close: string;
    downloadResume: string;
    viewResume: string;
    backToHome: string;
    wantToKnowMore: string;
    yearsOld: string;
    yearsCoding: string;
    projectsBuilt: string;
    language: string;
    theme: string;
    clickToReveal: string;
    readFullStory: string;
    galleryLabel: string;
    thingsIValue: string;
  };
};

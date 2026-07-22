export type NavId =
  | "home"
  | "about"
  | "stack"
  | "journey"
  | "hardware"
  | "projects"
  | "beyond"
  | "contact";

export type ContactLink = {
  label: string;
  value: string;
  href: string;
  icon: "mail" | "phone" | "github" | "linkedin" | "instagram" | "facebook";
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
};

export type HardwareProject = {
  slug: "esp32" | "cryocell" | "bt-speaker" | "arch-ricing";
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
  nav: { id: NavId; label: string; icon: string }[];
  ui: {
    coreTechnologies: string;
    activelyMoving: string;
    viewProject: string;
    hardwareProjects: string;
    hardwareDesc: string;
    softwareProjects: string;
    softwareDesc: string;
    learning: string;
    learningDesc: string;
    sendMeEmail: string;
    connectWithMe: string;
  };
};

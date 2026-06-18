import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { Intro } from "@/components/IntroPage";

// Skeleton Loaders
const GenericSkeleton = () => (
  <div className="w-full min-h-[50dvh] flex items-center justify-center">
    <div className="w-12 h-12 rounded-full border-4 border-[var(--primary-accent-color)] border-t-transparent animate-spin" />
  </div>
);

const AboutMeSkeleton = () => (
  <section className="w-full min-h-screen flex items-center justify-center p-4 md:p-8">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 w-full animate-pulse">
      {/* Image Skeleton */}
      <div className="w-64 h-64 md:w-96 md:h-96 rounded-3xl bg-[var(--bg-glass)] border border-[var(--glass-border)]" />
      {/* Text Skeleton */}
      <div className="flex-1 flex flex-col gap-6 w-full">
        <div className="h-12 w-48 bg-[var(--bg-glass)] rounded-xl" />
        <div className="flex flex-col gap-3">
          <div className="h-4 w-full bg-[var(--bg-glass)] rounded" />
          <div className="h-4 w-[90%] bg-[var(--bg-glass)] rounded" />
          <div className="h-4 w-[95%] bg-[var(--bg-glass)] rounded" />
          <div className="h-4 w-[80%] bg-[var(--bg-glass)] rounded" />
        </div>
      </div>
    </div>
  </section>
);

const AboutMePage = dynamic(
  () => import("@/components/AboutMe").then((mod) => mod.AboutMePage),
  { loading: AboutMeSkeleton }
);
const Timeline = dynamic(
  () => import("@/components/Timeline").then((mod) => mod.Timeline),
  { loading: GenericSkeleton } 
);
const ProjectShowcase = dynamic(
  () => import("@/components/projectShowcase").then((mod) => mod.ProjectShowcase),
  { loading: GenericSkeleton }
);
const CreativeEngineering = dynamic(
  () => import("@/components/CreativeEngineering").then((mod) => mod.CreativeEngineering),
  { loading: GenericSkeleton }
);
const ContactList = dynamic(
  () => import("@/components/ContactList").then((mod) => mod.ContactList),
  { loading: GenericSkeleton } 
);

export default function App() {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <Intro />
      <ProjectShowcase />
      <CreativeEngineering />
      <AboutMePage />
      <Timeline />
      <ContactList />
    </main>
  );
}

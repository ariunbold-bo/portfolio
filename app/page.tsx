import { Header } from "@/components/Header";
import { HeroPage } from "@/components/hero_page";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { ProjectsPage } from "@/components/Projects";

export default function LandingPage() {
  return (
    <div className="min-w-dvw">
      <Header />
      <AppSidebar />
      <HeroPage />
      <ProjectsPage />
    </div>
  );
}

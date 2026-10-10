import { Header } from "@/components/Header";
import { HeroPage } from "@/components/hero_page";
import { AppSidebar } from "@/components/ui/app-sidebar";

export default function LandingPage() {
  return (
    <div className="min-h-[calc(100dvh-header-height)] min-w-dvw">
      <Header />
      <AppSidebar />
      <HeroPage />
    </div>
  );
}

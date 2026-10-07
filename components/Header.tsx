import { ModeToggle } from "@/components/ui/mode-toggle";
import { SidebarTrigger } from "./ui/sidebar";

export function Header() {
  return (
    <div className="sticky z-50 justify-between top-5 flex p-5 items-center ml-auto mr-auto w-115 h-12 backdrop-blur-3xl bg-transparent rounded-xl">
      <h3 className="hover:cursor-pointer">Portfolio</h3>
      <div className="flex flex-row gap-2 ">
        <ModeToggle />
        <SidebarTrigger variant="outline" size="icon" />
      </div>
    </div>
  );
}

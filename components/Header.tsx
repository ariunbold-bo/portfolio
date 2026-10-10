import { ModeToggle } from "@/components/ui/mode-toggle";
import { SidebarTrigger } from "./ui/sidebar";

export function Header() {
  return (
    <div className="sticky bg-muted z-50 justify-between top-5 flex py-6.5 px-7 items-center ml-auto mr-auto w-[576px] h-12 backdrop-blur-sm rounded-(--radius)">
      <h3 className="hover:cursor-pointer">Portfolio</h3>
      <div className="flex flex-row gap-4 ">
        <SidebarTrigger variant="outline" size="icon" />
        <ModeToggle />
      </div>
    </div>
  );
}

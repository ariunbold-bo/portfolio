import { ModeToggle } from "@/components/ui/mode-toggle";

export function Header() {
  return (
    <div className="sticky header_cool_ahh_style justify-between top-5 flex p-5 items-center ml-auto mr-auto w-1/3 h-12 backdrop-blur-3xl bg-transparent rounded-xl">
      <h3>Portfolio</h3>
      <ModeToggle />
    </div>
  );
}

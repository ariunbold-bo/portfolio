import { ClerkProvider } from "@clerk/nextjs";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

export const metadata = {
  title: "Canu — Collaborative Drawing Board",
  description:
    "Draw together in real-time. Create a room, share the code, and collaborate on a shared canvas.",
};

export default function CanuLayout({ children }) {
  return (
    <ClerkProvider>
      <div className="canu-wrapper dark">
        <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
      </div>
    </ClerkProvider>
  );
}

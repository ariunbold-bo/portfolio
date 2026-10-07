import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LenisProvider } from "@/components/providers/lenis-provider";
import "lenis/dist/lenis.css";
import { Blob } from "@/components/blob";
import { SidebarProvider } from "@/components/ui/sidebar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Ariunbold Bold",
  description: "Ariunbold Bold portfolio",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <html
        suppressHydrationWarning
        lang="en"
        className={cn(
          "h-full",
          "antialiased",
          poppins.variable,
          "font-poppins",
        )}
      >
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
          >
            <SidebarProvider defaultOpen={false}>
              <LenisProvider>{children}</LenisProvider>
            </SidebarProvider>
          </ThemeProvider>
          {/* gpu heavy prolly migrating to idk static bg? */}
          {/* <Blob /> */}
        </body>
      </html>
    </>
  );
}

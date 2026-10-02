"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (!document.startViewTransition) {
      setTheme(theme == "light" ? "dark" : "light");
      return;
    }

    document.startViewTransition(() => {
      setTheme(theme == "dark" ? "light" : "dark");
    });
  };
  return (
    <div>
      <Button onClick={toggleTheme} variant="outline" size="icon">
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 duration-300" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 duration-300" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}

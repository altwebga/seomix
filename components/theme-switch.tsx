"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeSwitch() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="w-12 h-12"
    >
      <Sun className="h-12 w-12 dark:hidden" />
      <Moon className="h-12 w-12 hidden dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

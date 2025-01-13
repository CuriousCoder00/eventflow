import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useTheme } from "@/components/theme-provider";
import { DropdownMenuItem } from "./ui/dropdown-menu";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex flex-auto items-center justify-center">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    </div>
  );
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      asChild
      className="w-full flex items-center justify-start pl-3"
      variant={"ghost"}
    >
      {theme === "light" ? (
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon /> Dark Mode
        </DropdownMenuItem>
      ) : (
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Moon /> Light Mode
        </DropdownMenuItem>
      )}
    </Button>
  );
}
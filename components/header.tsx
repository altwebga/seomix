import { Logo } from "./logo";
import { ThemeSwitch } from "./theme-switch";

export function Header() {
  return (
    <header className="bg-background/50 backdrop-blur-md shadow sticky top-0 left-0 border-b z-10">
      <div className="h-16 px-4 container mx-auto flex flex-row gap-4 justify-between items-center">
        <Logo />
        <div className="hidden md:flex flex-row gap-8 items-center">
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}

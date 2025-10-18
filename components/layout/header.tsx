import { AppMenu } from "./app-menu";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { ThemeSwitch } from "../theme/theme-switch";

export function Header() {
  return (
    <header className="bg-background/50 backdrop-blur-md shadow sticky top-0 left-0 border-b z-20">
      <div className="h-16 px-4 container mx-auto flex flex-row gap-4 justify-between items-center">
        <Logo />
        <div className="hidden md:flex flex-row gap-20 items-center">
          <AppMenu />
          <ThemeSwitch />
        </div>
        <MobileMenu />
      </div>
    </header>
  );
}

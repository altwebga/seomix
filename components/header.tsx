import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { SiteNav } from "./site-nav";
import { ThemeSwitch } from "./theme-switch";
import { Separator } from "./ui/separator";

export function Header() {
  return (
    <header className="bg-background/50 backdrop-blur-md shadow sticky top-0 left-0 border-b">
      <div className="h-16 px-4 container mx-auto flex flex-row gap-4 justify-between items-center">
        <Logo />
        <div className="hidden md:flex flex-row gap-8 items-center">
          <SiteNav />
          <Separator orientation="vertical" decorative />
          <ThemeSwitch />
        </div>
        <MobileNav />
      </div>
    </header>
  );
}

import { menuLinks } from "@/config/menu-links";
import { MobileMenu } from "../shared/mobile-menu";
import { ThemeToggler } from "../ui/theme-toggler";
import { DesktopMenu } from "../shared/desktop-menu";
import { Logo } from "../shared/logo";

export function Header() {
  return (
    <header className="bg-background/50 backdrop-blur-md border-b z-50 fixed w-full">
      <div className="h-16 container mx-auto flex items-center justify-between px-4">
        <Logo />
        <DesktopMenu links={menuLinks} />
        <ThemeToggler className="flex justify-end basis-full md:basis-0 pr-4 md:pr-0" />
        <MobileMenu links={menuLinks} />
      </div>
    </header>
  );
}

import { menuLinks } from "@/config/menu-links";
import { MobileMenu } from "../shared/mobile-menu";
import { ThemeToggler } from "../ui/theme-toggler";

export function Header() {
  return (
    <header className="bg-background/20 backdrop-blur-md border-b z-50 fixed w-full">
      <div className="h-16 container mx-auto flex items-center justify-between px-4">
        <ThemeToggler />
        <MobileMenu links={menuLinks} />
      </div>
    </header>
  );
}

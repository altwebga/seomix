import Link from "next/link";
import { HeaderDesktopNavigation } from "./HeaderDesktopNavigation";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { HeaderMobileNavigation } from "./HeaderMobileNavigation";
import { UserDropdownMenu } from "./UserDropdownMenu";
export function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-md sticky top-0 z-40 w-full border-b">
      <div className="h-16 w-full flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-2xl font-bold">seomix.</span>
        </Link>
        <div className="hidden md:block">
          <HeaderDesktopNavigation />
        </div>
        <div className="hidden md:flex items-center gap-4">
          <UserDropdownMenu />
          <ThemeToggle />
        </div>
        <div className="md:hidden flex items-center gap-4">
          <HeaderMobileNavigation />
          <UserDropdownMenu />
        </div>
      </div>
    </header>
  );
}

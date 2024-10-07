import Link from "next/link";
import { HeaderNav } from "./HeaderNav";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";
import { UserDropdownMenu } from "./UserDropdownMenu";

export function Header() {
  return (
    <header className="sticky top-0 flex w-full items-center justify-between border-b bg-background px-4 py-2 shadow-sm">
      <Link href="/" className="flex items-center gap-2">
        <Logo />
        <span className="text-lg font-bold">seomix.</span>
      </Link>
      <HeaderNav />
      <div className="hidden lg:flex items-center gap-4">
        <UserDropdownMenu />
        <ThemeToggle />
      </div>
      <div className="lg:hidden flex items-center gap-4">
        <MobileNav />
        <ThemeToggle />
      </div>
    </header>
  );
}

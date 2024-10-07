import { HeaderNav } from "./HeaderNav";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";
import { UserDropdownMenu } from "./UserDropdownMenu";

export function Header() {
  return (
    <header className="sticky top-0 flex w-full items-center justify-between border-b bg-background px-4 py-2 shadow-sm">
      <Link href="/" className="flex items-center gap-2">
        <Logo />
        <span className="text-lg font-bold">seomix.</span>
      </Link>
      <HeaderNav />
      <div className="hidden lg:flex items-center gap-8">
        <UserDropdownMenu />
        <ThemeToggle />
      </div>
      <div className="flex items-center gap-4 lg:hidden">
        <MobileNav />
        <ThemeToggle />
      </div>
    </header>
  );
}

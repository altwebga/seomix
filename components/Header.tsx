import { HeaderNav } from "./HeaderNav";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 flex w-full items-center justify-between border-b bg-background px-4 py-2 shadow-sm">
      <Link href="/" className="flex items-center gap-2">
        <Logo />
        <h4>seomix.</h4>
      </Link>
      <HeaderNav />
      <div className="flex items-center gap-4">
        <MobileNav />
        <ThemeToggle />
      </div>
    </header>
  );
}

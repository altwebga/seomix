import { HeaderNav } from "./HeaderNav";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 flex w-full items-center justify-between border-b bg-background px-4 py-2 shadow-sm">
      <div>logo</div>
      <HeaderNav />
      <div className="flex items-center gap-4">
        <MobileNav />
        <ThemeToggle />
      </div>
    </header>
  );
}

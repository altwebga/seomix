import { Logo } from "./Logo";
import { NavMenu } from "./NavMenu";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="flex items-center justify-between bg-background/80 backdrop-blur-md sticky top-0 z-40 w-full border-b px-4">
      <div className="flex gap-2 items-center">
        <Logo />
        <span className="scroll-m-20 text-2xl font-semibold tracking-tight font-[family-name:var(--font-geist-sans)]">
          seomix
        </span>
      </div>
      <div className="hidden md:block">
        <NavMenu className="flex gap-6 items-center" />
      </div>
      <div>
        <ThemeToggle />
      </div>
    </header>
  );
}

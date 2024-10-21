import { Logo } from "./Logo";
import { NavMenu } from "./NavMenu";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="flex items-center justify-between p-2 border-b">
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

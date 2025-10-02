import { Logo } from "../logo";
import { ThemeSwitch } from "../theme-switch";
import { NavApp } from "./nav-app";

export function Header() {
  return (
    <header className="flex flex-row justify-between items-center px-4 h-14 sticky top-0 left-0 z-20">
      <Logo />
      <div className="flex flex-row gap-8 items-center">
        <NavApp />
        <ThemeSwitch />
      </div>
    </header>
  );
}

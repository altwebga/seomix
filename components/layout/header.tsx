import { ThemeToggler } from "../ui/theme-toggler";

export function Header() {
  return (
    <header className="bg-background/20 backdrop-blur-md border-b z-50 fixed w-full">
      <div className="h-16">
        <ThemeToggler />
      </div>
    </header>
  );
}

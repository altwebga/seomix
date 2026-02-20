import { AnimatedThemeToggler } from "../ui/theme-toggler";

export function Header() {
  return (
    <header className="bg-background/50 backdrop-blur-md border-b z-50 fixed w-full">
      <div className="container mx-auto px-4 flex flex-row justify-between items-center py-4">
        <AnimatedThemeToggler />
      </div>
    </header>
  );
}

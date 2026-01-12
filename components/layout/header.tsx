import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";

export function Header() {
  return (
    <header className="bg-background fixed top-0 w-full shadow-md z-10 border-b">
      <div className="container mx-auto h-16 flex items-center justify-between px-4">
        <p>logo</p>
        <p>menu</p>
        <AnimatedThemeToggler />
      </div>
    </header>
  );
}

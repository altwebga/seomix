import Link from "next/link";
import { Logo } from "./app-logo";
export function Header() {
  return (
    <header className="bg-background/50 backdrop-blur-md sticky top-0 z-40 w-full border-b">
      <div className="h-14 flex items-center justify-center container mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="w-6 h-6" />
          <span className="hidden md:block">seomix.</span>
        </Link>
      </div>
    </header>
  );
}

import { socialLinks } from "@/config/social-links";
import { Logo } from "../shared/logo";
import { ThemeSwitcher } from "../theme";

export function TronFooter() {
  return (
    <footer className="bg-background border-t border-primary">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <ThemeSwitcher />
        <p>{new Date().getFullYear()} seomix. Все права защищены.</p>
      </div>
    </footer>
  );
}

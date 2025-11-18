import { AppMenu } from "../shared/app-menu";
import { Logo } from "../shared/logo";

export function Header() {
  return (
    <header className="bg-background/50 backdrop-blur-md shadow sticky top-0 left-0 border-b z-20">
      <div className="h-16 px-4 container mx-auto flex flex-row gap-4 justify-between items-center">
        <Logo width="28" height="28"/>
        <AppMenu />
      </div>
    </header>
  );
}

import { ThemeTogglerButton } from "../animate-ui/components/buttons/theme-toggler";

export function Header() {
  return (
    <header>
      <ThemeTogglerButton modes={["dark", "light"]} direction={"rtl"} />
    </header>
  );
}

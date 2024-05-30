'use client'
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { CodeBracketIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { link as linkStyles } from "@nextui-org/theme";
import { useReducer } from "react";

const Header = () => {
  const [isMenuOpen, toggleMenuOpen] = useReducer((current) => !current, false);

  const renderNavItems = () => (
    siteConfig.navItems.map((item) => (
      <NavbarItem key={item.href}>
        <Link
          className={clsx(
            linkStyles({ color: "foreground" }),
            "data-[active=true]:text-primary data-[active=true]:font-medium"
          )}
          href={item.href}
        >
          {item.label}
        </Link>
      </NavbarItem>
    ))
  );

  const renderMobileMenuItems = () => (
    siteConfig.navMenuItems.map((item, index) => (
      <NavbarMenuItem key={`${item.href}-${index}`}>
        <Link
          color={
            index === 2 ? "primary" :
            index === siteConfig.navMenuItems.length - 1 ? "danger" :
            "foreground"
          }
          href={item.href}
          onClick={toggleMenuOpen}
        >
          {item.label}
        </Link>
      </NavbarMenuItem>
    ))
  );

  return (
    <NextUINavbar maxWidth="xl" position="sticky" isMenuOpen={isMenuOpen} onMenuOpenChange={toggleMenuOpen}>
      <NavbarContent>
        <NavbarBrand>
          <Link className="flex justify-start items-center gap-1" href="/">
            <CodeBracketIcon className="h-6 w-6" />
            <p className="text-xl">seomix.</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <ul className="hidden lg:flex gap-6 justify-start ml-2">
          {renderNavItems()}
        </ul>
        <ThemeSwitch className="ml-5 hidden lg:block" />
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle
          data-open={isMenuOpen}
          aria-expanded={isMenuOpen}
          onClick={toggleMenuOpen}
        />
      </NavbarContent>

      <NavbarMenu className={clsx({ 'hidden': !isMenuOpen })}>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {renderMobileMenuItems()}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};

export default Header;

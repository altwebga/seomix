"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";

import { UserAvatar } from "./user-avatar";

import { siteConfig } from "@/config/site";

export function DashboardNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Navbar maxWidth="2xl" position="sticky" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {siteConfig.dashboardNavItems.map((link, index) => (
          <NavbarItem key={`${link}-${index}`} className="px-2">
            <Link
              className={clsx(
                pathname === link.href ? "text-primary" : "text-inherit",
              )}
              href={link.href}
              size="lg"
            >
              {link.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent>
        <UserAvatar />
      </NavbarContent>
      <NavbarMenu>
        {siteConfig.dashboardNavItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className={clsx(
                pathname === item.href ? "text-primary" : "text-inherit",
              )}
              href={item.href}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

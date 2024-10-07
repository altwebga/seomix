"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { siteNavigation } from "@/lib/siteConfig";

export function HeaderNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="hidden lg:flex">
        {siteNavigation.map((item) => (
          <NavigationMenuItem key={item.href}>
            <Link className={navigationMenuTriggerStyle()} href={item.href}>
              {item.title}
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type navigationMenuItemsProps = {
  title: string;
  href: string;
};

export const navigationMenuItems: navigationMenuItemsProps[] = [
  {
    title: "Услуги",
    href: "/services",
  },
  {
    title: "Портфолио",
    href: "/portfolio",
  },
  {
    title: "Обо мне",
    href: "/about",
  },
  {
    title: "Контакты",
    href: "/contact",
  },
  {
    title: "Блог",
    href: "/blog",
  },
];

export function SiteNav({ className }: { className?: string }) {
  const pathname = usePathname();
  return (
    <NavigationMenu className={cn(className)}>
      <NavigationMenuList className="flex flex-row gap-6">
        {navigationMenuItems.map((item, index) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuLink
              asChild
              className={cn(
                "relative inline-block py-1 bg-gradient-to-r from-primary to-primary bg-[length:0%_2px] bg-no-repeat bg-left-bottom transition-[background-size] duration-300 hover:bg-[length:100%_2px]",
                pathname === item.href && "bg-[length:100%_2px]"
              )}
            >
              <Link href={item.href}>{item.title}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

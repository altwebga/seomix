"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { menuLinks } from "@/config/menu-links";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeSwitch } from "../theme/theme-switch";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { SocialIcon } from "./social-icon";

export function AppMenu() {
  const path = usePathname();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  // Мобильное меню (Sheet)
  if (isMobile) {
    return (
      <Sheet defaultOpen={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant={"outline"}>
            {open ? <X /> : <Menu />}
            Меню
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="text-sm">Меню</SheetTitle>
            <SheetDescription className="hidden"></SheetDescription>
            <NavigationMenu orientation="vertical">
              <NavigationMenuList className="flex flex-col gap-4 items-center">
                {menuLinks.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        className={cn(
                          "text-lg min-w-44 text-center px-4 py-2 rounded-md transition-colors",
                          path === item.href &&
                            "bg-accent text-accent-foreground underline underline-offset-4"
                        )}
                        href={item.href}
                      >
                        <SheetClose>{item.title}</SheetClose>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </SheetHeader>
          <SheetFooter className="flex flex-row gap-8 items-center">
            <ThemeSwitch />
            <SocialIcon />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }

  // Десктопное меню
  return (
    <div className="flex items-center gap-4">
      <NavigationMenu>
        <NavigationMenuList>
          {menuLinks.map((item) => (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink asChild>
                <Link
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    path === item.href &&
                      "bg-accent text-accent-foreground underline underline-offset-4"
                  )}
                  href={item.href}
                >
                  {item.title}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <ThemeSwitch />
    </div>
  );
}

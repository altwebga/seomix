"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { menuLinks } from "@/config/menu-links";
import { usePathname } from "next/navigation";
import { MenuIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ThemeSwitch } from "../theme/theme-switch";

export function MobileMenu() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="lg" className="text-lg">
            {open ? <XIcon /> : <MenuIcon />}
            Меню
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="text-sm">Меню</SheetTitle>
            <SheetDescription></SheetDescription>
            <nav aria-label="Главное меню">
              <ul className="flex flex-col gap-8 justify-baseline items-start list-none">
                {menuLinks.map((item) => {
                  const isActive =
                    path === item.href || path.startsWith(item.href + "/");

                  return (
                    <li key={item.title} className="relative">
                      <Link
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "relative pb-1 transition-all duration-300",
                          "after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300",
                          "hover:after:w-full",
                          isActive && "after:w-full"
                        )}
                      >
                        <SheetClose>{item.title}</SheetClose>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </SheetHeader>
          <SheetFooter>
            <ThemeSwitch />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

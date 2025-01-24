"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { UserNav } from "./user-nav";

export const navItems = [
  {
    title: "Услуги",
    href: "/services",
  },
  {
    title: "Кейсы",
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

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button> {open ? <X /> : <Menu />} Меню</Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="text-left">
              <UserNav />
            </SheetTitle>
            <SheetDescription className="text-left">Меню</SheetDescription>
            <nav className="text-left">
              <ul className="list-none space-y-4">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "cursor-pointer font-medium transition-colors hover:text-primary",
                        pathname === item.href
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      <SheetClose>{item.title}</SheetClose>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </SheetHeader>
          <SheetFooter className="mt-4">
            <ThemeToggle />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

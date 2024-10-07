"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteNavigation } from "@/lib/siteConfig";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Logo } from "./Logo";

export function MobileNav() {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden">
        <div className="flex items-center gap-2 border border-muted px-4 py-2 rounded-md">
          <Menu className="h-6 w-6" />
          <span>Меню</span>
        </div>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Logo />
            <Link href="/">
              <SheetClose>seomix.</SheetClose>
            </Link>
          </SheetTitle>

          <nav className="text-left">
            <ul className="space-y-2 list-none">
              {siteNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm font-medium no-underline",
                      pathname === item.href
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent/10 hover:text-accent"
                    )}
                  >
                    <SheetClose>{item.title}</SheetClose>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </SheetHeader>
        <SheetFooter>
          <Button variant="outline">Войти</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

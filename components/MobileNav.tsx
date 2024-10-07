"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { siteNavigation } from "@/lib/siteConfig";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden">Меню</SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>SEOMIX</SheetTitle>
          <SheetDescription>
            Разработка и продвижение сайтов в Горно-Алтайске
          </SheetDescription>
          <nav>
            <ul className="flex flex-col gap-2 py-2 list-none">
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

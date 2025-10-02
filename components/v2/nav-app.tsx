"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { setting } from "@/lib/setting";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { EqualIcon, XIcon } from "lucide-react";

export function NavApp() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="flex flex-row gap-2 items-center text-xl">
        {open ? <XIcon /> : <EqualIcon className="w-8 h-8" />}
        Меню
      </SheetTrigger>
      <SheetContent
        className="min-w-1/2 text-center bg-background/50 backdrop-blur-md"
        side="left"
      >
        <SheetHeader>
          <SheetTitle className="font-extrabold">Навигация</SheetTitle>
          <SheetDescription></SheetDescription>
          <nav>
            <ul className="flex flex-col list-none space-y-8">
              {setting.menuLinks.map((item) => (
                <li key={item.href} className="text-2xl">
                  <Link
                    href={item.href}
                    className={cn(
                      "relative pb-1 transition-all duration-300",
                      "after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300",
                      "hover:after:w-full",
                      path &&
                        (path === item.href ||
                          path.startsWith(`${item.href}/`)) &&
                        "after:w-full"
                    )}
                  >
                    <SheetClose className="font-bold">{item.title}</SheetClose>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuLink } from "@/config/menu-links";
import * as motion from "motion/react-client";
import { easeOut } from "motion";
import { Menu, X } from "lucide-react";

type MobileMenuProps = {
  links: MenuLink[];
};

const navVariants = {
  closed: {
    opacity: 1, // пусть контейнер не исчезает резко
    transition: {
      when: "afterChildren",
      staggerChildren: 0.06,
      staggerDirection: -1,
    },
  },
  open: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  closed: { opacity: 0, y: 8, filter: "blur(4px)" },
  open: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.25, ease: easeOut },
  },
} as const;

export function MobileMenu({ links }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size={"lg"}>
            {isOpen ? (
              <X className="w-6! h-6!" />
            ) : (
              <Menu className="w-6! h-6!" />
            )}
            <p className="ml-2">Меню</p>
          </Button>
        </SheetTrigger>

        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="text-lg font-bold">Меню</SheetTitle>
            <SheetDescription />
          </SheetHeader>
          <motion.nav
            className="flex flex-col space-y-2 px-8 py-6"
            variants={navVariants}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
          >
            {links.map((link) => (
              <div
                key={link.href}
                className="flex flex-row items-center gap-2 hover:-translate-y-1 transition-transform ease-linear duration-200"
              >
                <svg
                  className={cn(
                    "h-8 w-8 text-primary transition-opacity",
                    pathname === link.href ||
                      (link.href !== "/" &&
                        pathname?.startsWith(`${link.href}/`))
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <circle cx="12" cy="12" r="6" />
                </svg>
                <Link href={link.href}>
                  <motion.div
                    variants={itemVariants}
                    className="text-lg font-medium"
                  >
                    <SheetClose>{link.title}</SheetClose>
                  </motion.div>
                </Link>
              </div>
            ))}
          </motion.nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

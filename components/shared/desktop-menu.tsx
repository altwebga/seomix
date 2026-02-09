"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { MenuLink } from "@/config/menu-links";
import { cn } from "@/lib/utils";

type DesktopMenuProps = {
  links: MenuLink[];
};

export function DesktopMenu({ links }: DesktopMenuProps) {
  const pathname = usePathname();

  return (
    <nav className="hidden md:block">
      <ul className="flex gap-10 relative">
        {links.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/" && pathname?.startsWith(`${link.href}/`));

          return (
            <li key={link.href} className="relative">
              <Link
                href={link.href}
                className={cn(
                  "relative font-bold transition-colors",
                  isActive ? "text-primary" : "hover:text-primary",
                )}
              >
                {link.title}
              </Link>

              {isActive && (
                <motion.div
                  layoutId="menu-underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

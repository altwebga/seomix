"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/siteConfig";

type NavMenuProps = {
  className?: string;
};

export function NavMenu({ className }: NavMenuProps) {
  const pathname = usePathname();
  return (
    <nav className="w-full">
      <ul className={cn("list-none", className)}>
        {navLinks.map((link) => (
          <li
            key={link.id}
            className={cn(
              "text-primary text-lg font-semibold",
              pathname === link.href ? " text-sky-600" : "text-primary"
            )}
          >
            <Link href={link.href}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

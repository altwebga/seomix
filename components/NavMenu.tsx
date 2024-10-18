"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";

type NavMenuProps = {
  className: string;
};

export function NavMenu({ className }: NavMenuProps) {
  const pathname = usePathname();
  return (
    <nav className={cn(className, "w-full")}>
      <ul className="flex gap-4 list-none">
        {navLinks.map((link) => (
          <li key={link.id}>
            <Link
              href={link.href}
              className={cn(
                "text-lg",
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

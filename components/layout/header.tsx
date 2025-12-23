"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { menuLinks } from "@/config/menu-links";
import { socialLinks } from "@/config/social-links";
import { cn } from "@/lib/utils";
import { AnimatedThemeToggler } from "../ui/theme-toggle";
import { Button } from "../ui/button";

const isActivePath = (pathname: string, href: string) => {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
};

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-lg font-semibold">
            Seomix
          </Link>

          <nav className="hidden gap-1 lg:flex">
            {menuLinks.map(({ title, href }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                  isActivePath(pathname, href)
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 sm:flex">
            {socialLinks.map((link) => (
              <Link
                key={link.title}
                href={link.url}
                aria-label={link.title}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border bg-background/60 p-2 transition hover:border-primary/50 hover:bg-accent"
              >
                <img
                  src={link.icon}
                  alt={link.title}
                  className="h-4 w-4 object-contain"
                />
              </Link>
            ))}
          </div>

          <AnimatedThemeToggler className="rounded-full border p-2 transition hover:border-primary/50 hover:bg-accent" />

          <Button asChild size="sm">
            <Link href="/contact">Связаться</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

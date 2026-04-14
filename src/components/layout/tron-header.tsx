"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { TheGridcnLogo } from "./thegridcn-logo";
import { menuLinks } from "@/config/menu-links";
import { socialLinks } from "@/config/social-links";
import Image from "next/image";
import { Logo } from "../shared/logo";

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function TronHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const items = menuLinks;

  // Close menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50">
      {/* Main header bar */}
      <div className="relative border-b border-primary/30 bg-panel">
        {/* CRT scanline effect */}
        <div className="crt-scanlines pointer-events-none absolute inset-0 opacity-[0.03]" />
        {/* Top accent line */}
        <div className="absolute left-0 right-0 top-0 h-px bg-linear-to-r from-transparent via-primary to-transparent" />

        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Left section - Logo */}
            <div className="flex flex-1 justify-start">
              <Logo className="text-primary" />
            </div>

            {/* Center section - Navigation (Desktop) */}
            <nav className="hidden items-center gap-4 lg:flex">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative px-4 py-2 font-mono text-xs tracking-widest transition-colors uppercase",
                    pathname === item.href
                      ? "text-primary"
                      : "text-foreground hover:text-primary",
                  )}
                >
                  {/* Active/Hover indicator */}
                  <span
                    className={cn(
                      "absolute inset-x-2 bottom-0 h-px bg-primary transition-transform",
                      pathname === item.href
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right section - Social & Actions */}
            <div className="flex flex-1 items-center justify-end gap-3">
              <div className="hidden lg:flex gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={link.icon}
                      alt={link.label}
                      width={24}
                      height={24}
                      className="h-6 w-6"
                    />
                  </a>
                ))}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex items-center rounded border border-primary/30 bg-primary/5 px-2.5 py-1.5 text-primary transition-colors hover:border-primary/50 hover:bg-primary/10 lg:hidden"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? (
                  <CloseIcon className="h-4 w-4" />
                ) : (
                  <MenuIcon className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity lg:hidden",
          mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-72 transform border-l border-primary/30 bg-panel transition-transform duration-300 ease-in-out lg:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* CRT scanline effect */}
        <div className="crt-scanlines pointer-events-none absolute inset-0 opacity-[0.03]" />
        {/* Menu Header - Tron terminal style */}
        <div className="relative flex h-14 items-center justify-between border-b border-primary/20 px-4">
          {/* Top accent line */}
          <div className="absolute left-0 right-8 top-0 h-px bg-linear-to-r from-primary/60 via-primary/30 to-transparent" />

          <span className="font-mono text-[11px] tracking-[0.2em] text-foreground">
            NAVIGATION: <span className="text-foreground/70">00.SYS</span>
          </span>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center text-foreground/50 transition-colors hover:text-primary"
            aria-label="Close menu"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Menu Content */}
        <div className="relative flex flex-col p-4">
          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            {items.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "group relative flex items-center gap-3 rounded border px-4 py-3 font-mono text-sm tracking-widest transition-all",
                  pathname === item.href
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-primary/20 text-foreground/80 hover:border-primary/50 hover:bg-primary/5 hover:text-primary",
                )}
              >
                {/* Index number */}
                <span className="font-mono text-[10px] text-primary/50">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Label */}
                <span>{item.label}</span>

                {/* Active indicator */}
                {pathname === item.href && (
                  <span className="ml-auto font-mono text-[10px] text-primary">
                    ACTIVE
                  </span>
                )}

                {/* Corner accents */}
                <span className="absolute left-0 top-0 h-2 w-2 border-l border-t border-primary/50" />
                <span className="absolute right-0 top-0 h-2 w-2 border-r border-t border-primary/50" />
                <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-primary/50" />
                <span className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-primary/50" />
              </Link>
            ))}
          </nav>

          {/* Divider */}
          <div className="my-6 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />

          {/* Social Links */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[10px] tracking-widest text-foreground uppercase">
              Мессенджеры
            </span>
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded border border-primary/30 px-4 py-3 font-mono text-sm tracking-wider text-foreground transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
              >
                <Image
                  src={link.icon}
                  alt={link.label}
                  width={20}
                  height={20}
                />
                <span>{link.label}</span>
              </a>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-6">
            <div className="rounded border border-primary/30 bg-primary/5 p-3">
              <div className="font-mono text-[10px] tracking-widest text-foreground uppercase">
                system status
              </div>
              <div className="mt-1 font-mono text-xs text-primary uppercase">
                Все системы в норме
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

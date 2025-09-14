"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { setting } from "@/lib/setting";
import { usePathname } from "next/navigation";

export function AppMenu() {
  const path = usePathname();

  return (
    <nav aria-label="Главное меню">
      <ul className="flex flex-row gap-12 justify-baseline items-center list-none">
        {setting.menuLinks.map((item) => {
          const isActive =
            path === item.href || path.startsWith(item.href + "/");

          return (
            <li key={item.title} className="relative">
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative pb-1 transition-all duration-300",
                  "after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300",
                  "hover:after:w-full",
                  isActive && "after:w-full"
                )}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

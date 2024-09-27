"use client";
import { Link } from "@nextui-org/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

import { siteConfig } from "@/config/site";
export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="space-y-4">
        {siteConfig.dashboardNavItems.map((item) => (
          <li key={item.href}>
            <Link
              className={clsx(
                pathname === item.href ? "text-primary" : "text-inherit",
              )}
              href={item.href}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

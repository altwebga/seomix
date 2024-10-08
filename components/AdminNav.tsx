"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const adminNavigation = [
  {
    title: "Контент",
    href: "/dashboard/admin",
  },
  {
    title: "Изображения",
    href: "/dashboard/admin/gallery",
  },
  {
    title: "Пользователи",
    href: "/dashboard/admin/users",
  },
  {
    title: "Настройки",
    href: "/dashboard/admin/settings",
  },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="container mx-auto w-full">
      <ul className="flex gap-2 py-4 items-center">
        {adminNavigation.map((item) => (
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
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

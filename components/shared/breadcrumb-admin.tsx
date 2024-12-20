"use client";
import Link from "next/link";
import React from "react";
import { Slash } from "lucide-react";
import { useSelectedLayoutSegments } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const segmentTitles: Record<string, string> = {
  admin: "Панель администратора",
  settings: "Настройки",
  users: "Пользователи",
  home: "Главная",
  listings: "Объявления",
  add: "Добавить",
  categories: "Категории",
  regions: "Регионы",
};

export function BreadcrumbAdmin() {
  const segments = useSelectedLayoutSegments();

  const buildPath = (segments: string[], index: number) => {
    return "/" + ["admin", ...segments.slice(0, index + 1)].join("/");
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Главная страница */}
        <BreadcrumbItem key="admin">
          <BreadcrumbLink asChild>
            <Link href="/admin">
              <BreadcrumbPage>{segmentTitles["admin"]}</BreadcrumbPage>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator key="separator-admin">
          <Slash />
        </BreadcrumbSeparator>

        {/* Остальные сегменты */}
        {segments.map((segment, index) => {
          const path = buildPath(segments, index);
          const title = segmentTitles[segment] || segment;

          return (
            <React.Fragment key={`breadcrumb-segment-${index}`}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={path}>
                    <BreadcrumbPage>{title}</BreadcrumbPage>
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              {index < segments.length - 1 && (
                <BreadcrumbSeparator key={`separator-${index}`}>
                  <Slash />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

"use client";
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

// Маппинг маршрутов к названиям страниц
const segmentTitles: Record<string, string> = {
  dashboard: "Панель управления",
  settings: "Настройки",
  account: "Аккаунт",
  home: "Главная",
  post: "Пост",
  add: "Добавить",
};

export function BreadcrumbDashboard() {
  const segments = useSelectedLayoutSegments();

  // Построение пути для хлебных крошек
  const buildPath = (segments: string[], index: number) => {
    return "/" + ["dashboard", ...segments.slice(0, index + 1)].join("/");
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Главная страница */}
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">
            <BreadcrumbPage>{segmentTitles["dashboard"]}</BreadcrumbPage>
          </BreadcrumbLink>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
        </BreadcrumbItem>

        {/* Остальные сегменты */}
        {segments.map((segment, index) => {
          const path = buildPath(segments, index);
          const title = segmentTitles[segment] || segment;

          return (
            <BreadcrumbItem key={index}>
              <BreadcrumbLink href={path}>
                <BreadcrumbPage>{title}</BreadcrumbPage>
              </BreadcrumbLink>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

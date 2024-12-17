"use client";
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
  dashboard: "Панель управления",
  settings: "Настройки",
  account: "Аккаунт",
  home: "Главная",
  post: "Пост",
  add: "Добавить",
};

export function BreadcrumbDashboard() {
  const segments = useSelectedLayoutSegments();

  const buildPath = (segments: string[], index: number) => {
    return "/" + ["dashboard", ...segments.slice(0, index + 1)].join("/");
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Главная страница */}
        <BreadcrumbItem key="dashboard">
          <BreadcrumbLink href="/dashboard">
            <BreadcrumbPage>{segmentTitles["dashboard"]}</BreadcrumbPage>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator key="separator-dashboard">
          <Slash />
        </BreadcrumbSeparator>

        {/* Остальные сегменты */}
        {segments.map((segment, index) => {
          const path = buildPath(segments, index);
          const title = segmentTitles[segment] || segment;

          return (
            <React.Fragment key={`breadcrumb-segment-${index}`}>
              <BreadcrumbItem>
                <BreadcrumbLink href={path}>
                  <BreadcrumbPage>{title}</BreadcrumbPage>
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

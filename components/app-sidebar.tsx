"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Frame,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "./theme-toggle";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Блог",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Все статьи",
          url: "#",
        },
        {
          title: "Добавить статью",
          url: "#",
        },
        {
          title: "Категории",
          url: "#",
        },
      ],
    },
    {
      title: "Портфолио",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Все кейсы",
          url: "#",
        },
        {
          title: "Добавить кейс",
          url: "#",
        },
        {
          title: "Категории",
          url: "#",
        },
      ],
    },
    {
      title: "Услуги",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Все услуги",
          url: "#",
        },
        {
          title: "Добавить услугу",
          url: "#",
        },
        {
          title: "Категории",
          url: "#",
        },
      ],
    },
    {
      title: "Клиенты",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Все клиенты",
          url: "#",
        },
        {
          title: "Добавить клиента",
          url: "#",
        },
        {
          title: "Категории",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Задачи",
      url: "#",
      icon: Frame,
    },
    {
      name: "Настройки сайта",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Медиа",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <ThemeToggle />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

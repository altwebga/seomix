"use client";

import * as React from "react";
import { BookOpen, Bot, Settings2, SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/nav-main";
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
      title: "Все посты",
      url: "/dashboard",
      icon: SquareTerminal,
    },
    {
      title: "Создать пост",
      url: "/dashboard/post/add",
      icon: Bot,
    },
    {
      title: "Аккаунт",
      url: "/dashboard/account",
      icon: BookOpen,
    },
    {
      title: "Задачи",
      url: "/dashboard/tasks",
      icon: Settings2,
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
      </SidebarContent>
      <SidebarFooter>
        <ThemeToggle />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

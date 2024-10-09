import { UserRoleType, SiteNavigationType, ContentType } from "./types";

export const userRoles: UserRoleType[] = [
  {
    label: "Администратор",
    value: "admin",
  },
  {
    label: "Пользователь",
    value: "user",
  },
];

export const siteNavigation: SiteNavigationType[] = [
  {
    title: "Главная",
    href: "/",
  },
  {
    title: "Услуги",
    href: "/services",
  },
  {
    title: "Портфолио",
    href: "/portfolio",
  },
  {
    title: "Обо мне",
    href: "/about",
  },
  {
    title: "Контакты",
    href: "/contact",
  },
  {
    title: "Блог",
    href: "/blog",
  },
];
export const contentType: ContentType[] = [
  {
    id: 1,
    label: "Статья",
    value: "blog",
  },
  {
    id: 2,
    label: "Портфолио",
    value: "portfolio",
  },
  {
    id: 3,
    label: "Клиент",
    value: "client",
  },
  {
    id: 4,
    label: "Услуга",
    value: "service",
  },
  {
    id: 5,
    label: "Задача",
    value: "task",
  },
];

import { SiteNavigationType, ContentType, UserRoleType } from "./types";

export const siteNavigation: SiteNavigationType[] = [
  {
    title: "Главная",
    href: "/",
    description: "Главная страница сайта",
  },
  {
    title: "Услуги",
    href: "/services",
    description: "Полный список услуг",
  },
  {
    title: "Портфолио",
    href: "/portfolio",
    description: "Мои работы и проекты",
  },
  {
    title: "Обо мне",
    href: "/about",
    description: "Био, статистика и контакты",
  },
  {
    title: "Контакты",
    href: "/contact",
    description: "Мои контакты и адрес",
  },
  {
    title: "Блог",
    href: "/blog",
    description: "Последние посты из блога",
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
export const userRoles: UserRoleType[] = [
  {
    label: "Администратор",
    value: "admin",
  },
  {
    label: "Клиент",
    value: "client",
  },
];

import { navLinksType, UserRoleType, BlogCategoryType } from "./types";

export const navLinks: navLinksType[] = [
  {
    id: 1,
    title: "Услуги",
    href: "/services",
  },
  {
    id: 2,
    title: "Портфолио",
    href: "/portfolio",
  },
  {
    id: 3,
    title: "Обо мне",
    href: "/about",
  },
  {
    id: 4,
    title: "Контакты",
    href: "/contact",
  },
  {
    id: 5,
    title: "Блог",
    href: "/blog",
  },
];

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
export const blogCategories: BlogCategoryType[] = [
  {
    title: "Регионы",
    href: "#",
    description: "Регионы и города Сибири. Краткий обзор и интересные факты.",
  },
  {
    title: "Достопримечательности",
    href: "#",
    description:
      "Все достопримечательности Сибири. Интерактивная карта с описанием и маршрутами.",
  },
  {
    title: "История",
    href: "#",
    description: "История региона. Краткий обзор и интересные факты.",
  },
  {
    title: "Народы",
    href: "#",
    description: "История народов Сибири. Религия, культура, традиции.",
  },
  {
    title: "Легенды",
    href: "#",
    description: "Легенды и эпос Сибири.",
  },
  {
    title: "Флора и фауна",
    href: "#",
    description:
      "Обзор растительного и животного мира. История растений, археология.",
  },
];

import { ListingType, UserRoleType, BlogCategoryType } from "./types";

export const listing: ListingType[] = [
  {
    id: 1,
    value: "post",
    label: "Статья",
  },
  {
    id: 2,
    value: "place",
    label: "Место",
  },
  {
    id: 3,
    value: "tour",
    label: "Тур",
  },
  {
    id: 4,
    value: "event",
    label: "Мероприятие",
  },
  {
    id: 5,
    value: "excursion",
    label: "Экскурсия",
  },
  {
    id: 6,
    value: "hotel",
    label: "Отель",
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
  {
    label: "Владелец",
    value: "owner",
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

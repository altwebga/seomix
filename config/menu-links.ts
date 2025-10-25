export interface MenuLinks {
  title: string;
  href: string;
  priority?: number;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
}

export const menuLinks: MenuLinks[] = [
  {
    title: "Главная",
    href: "/",
    priority: 1.0,
    changeFrequency: "weekly",
  },
  {
    title: "Услуги",
    href: "/services",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    title: "Портфолио",
    href: "/portfolio",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    title: "О нас",
    href: "/about",
    priority: 0.6,
    changeFrequency: "yearly",
  },
  {
    title: "Контакты",
    href: "/contact",
    priority: 0.5,
    changeFrequency: "yearly",
  },
  {
    title: "Блог",
    href: "/blog",
    priority: 0.7,
    changeFrequency: "weekly",
  },
];

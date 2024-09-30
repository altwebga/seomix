export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  siteNavItems: [
    {
      label: "Главная",
      href: "/",
    },
    {
      label: "Услуги",
      href: "/services",
    },
    {
      label: "Портфолио",
      href: "/portfolio",
    },
    {
      label: "Обо мне",
      href: "/about",
    },
    {
      label: "Контакты",
      href: "/contacts",
    },
    {
      label: "Блог",
      href: "/blog",
    },
  ],
  dashboardNavItems: [
    {
      label: "Записи",
      href: "/dashboard",
    },
    {
      label: "Медиа",
      href: "/dashboard/media",
    },
    {
      label: "Пользователи",
      href: "/dashboard/users",
    },
    {
      label: "Настройки",
      href: "/dashboard/settings",
    },
  ],
  postTypes: [
    {
      value: "post",
      label: "Статья",
    },
    {
      value: "portfolio",
      label: "Портфолио",
    },
    {
      value: "client",
      label: "Клиент",
    },
    {
      value: "services",
      label: "Услуга",
    },
  ],
};

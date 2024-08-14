import {
  FaWhatsapp,
  FaTelegram,
  FaVk,
  FaGithub,
  FaYandex,
  FaSkype,
} from "react-icons/fa6";

import { navLinksType, socialLinksType } from "@/types";

export const siteMetadata = {
  title: "SeoMix",
  description: "SeoMix - React UI library",
};

export const navLinks: navLinksType[] = [
  {
    id: 1,
    title: "Услуги",
    href: "/services",
  },
  {
    id: 2,
    title: "Обо мне",
    href: "/portfolio",
  },
  {
    id: 3,
    title: "Контакты",
    href: "/contact",
  },
  {
    id: 4,
    title: "Блог",
    href: "/blog",
  },
];

export const socialLinks: socialLinksType[] = [
  {
    title: "WhatsApp",
    url: "https://wa.me/79236609500",
    icon: FaWhatsapp,
  },
  {
    title: "Telegram",
    url: "https://t.me/sib_kos",
    icon: FaTelegram,
  },
  {
    title: "ВКонтакте",
    url: "https://vk.com/kuznecov_kn",
    icon: FaVk,
  },
  {
    title: "GitHub",
    url: "https://github.com/altwebga",
    icon: FaGithub,
  },
  {
    title: "Яндекс.Услуги",
    url: "https://uslugi.yandex.ru/profile/KonstantinK-2288483",
    icon: FaYandex,
  },
  {
    title: "Skype",
    url: "https://join.skype.com/invite/bQh27VHgyxIW",
    icon: FaSkype,
  },
];

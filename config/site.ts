export type SiteConfig = typeof siteConfig;
import Parnas from "@/public/images/client_1.png";
import Kalina from "@/public/images/client_2.png";
import MCAltay from "@/public/images/client_3.png";
import GAZdorovie from "@/public/images/client_4.png";
import TransferAltay from "@/public/images/client_5.png";
import Inovamed from "@/public/images/client_6.png";
import Omma from "@/public/images/client_7.png";
import AltaiActive from "@/public/images/client_8.jpg";

import {
  GlobeAltIcon,
  PhotoIcon,
  CreditCardIcon,
  DevicePhoneMobileIcon,
  PresentationChartLineIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    { label: "Услуги", href: "/services" },
    { label: "Обо мне", href: "/about" },
    { label: "Портфолио", href: "/portfolio" },
    { label: "Блог", href: "/blog" },
    { label: "Контакты", href: "/contact" },
  ],
  navMenuItems: [
    { label: "Услуги", href: "/services" },
    { label: "Обо мне", href: "/about" },
    { label: "Портфолио", href: "/portfolio" },
    { label: "Блог", href: "/blog" },
    { label: "Контакты", href: "/contact" },
  ],
  socialLinks: {
    github: "https://github.com/altwebga",
    telegram: "https://t.me/sib_kos",
    whatsapp: "https://wa.me/79236609500",
    vk: "https://vk.com/kuznecov_kn",
    skype: "https://join.skype.com/invite/bQh27VHgyxIW",
    yandex: "https://uslugi.yandex.ru/profile/KonstantinK-2288483",
  },
  client: [
    { logo: Parnas, name: "Гостиница Парнас", url: "https://hotel-parnas.ru/" },
    { logo: Kalina, name: "Калина мебель", url: "https://mebel-kalina.ru/" },
    {
      logo: MCAltay,
      name: "Медицинский центр Алтай",
      url: "https://mc-altay.ru/",
    },
    {
      logo: GAZdorovie,
      name: "Гармония Здоровья",
      url: "https://ga-zdorovie.ru/",
    },
    {
      logo: TransferAltay,
      name: "Трансфер Алтай",
      url: "https://transfer-altay.ru/",
    },
    { logo: Inovamed, name: "ИнноваМед", url: "https://inovamed.ru/" },
    { logo: Omma, name: "ОММА", url: "https://omma.pro/" },
    {
      logo: AltaiActive,
      name: "Бюро путешествий Созвездие",
      url: "https://altaiactive.ru/",
    },
  ],
  servicesItems: [
    {
      title: "Разработка веб-сайтов",
      description:
        "Делаю индивидуальные, отзывчивые веб-сайты, которые отлично выглядят на всех устройствах, обеспечивая удобный пользовательский интерфейс и оптимизацию под поисковые системы.",
      icon: GlobeAltIcon,
    },
    {
      title: "Дизайн и брендинг",
      description:
        "Помогу разработать уникальный и запоминающийся бренд, включая логотипы, фирменный стиль и рекламные материалы.",
      icon: PhotoIcon,
    },
    {
      title: "Электронная коммерция",
      description:
        "Делаю интуитивно понятные и безопасные интернет-магазины, которые помогают увеличивать продажи и расширять рынок сбыта.",
      icon: CreditCardIcon,
    },
    {
      title: "Мобильная разработка",
      description:
        "Разрабатываю мобильные приложения для iOS и Android, обеспечивая высокое качество и функциональность для лучшего взаимодействия с вашей аудиторией.",
      icon: DevicePhoneMobileIcon,
    },
    {
      title: "SEO и продвижение сайтов",
      description:
        "Комплексные услуги по поисковой оптимизации и интернет-маркетингу для улучшения видимости вашего сайта и привлечения целевой аудитории.",
      icon: PresentationChartLineIcon,
    },
    {
      title: "Техническая поддержка и обслуживание",
      description:
        "Обеспечиваю надежную техническую поддержку и регулярное обновление вашего сайта для его бесперебойной работы.",
      icon: WrenchScrewdriverIcon,
    },
  ],
};

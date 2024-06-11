import WebDevelopment from "@/public/images/services/service_01.webp";
import DesignBranding from "@/public/images/services/service_02.webp";
import ECommerce from "@/public/images/services/service_03.webp";
import MobileDevelopment from "@/public/images/services/service_04.webp";
import SEOPromotion from "@/public/images/services/service_05.webp";
import TechSupport from "@/public/images/services/service_06.webp";
import ContentMarketing from "@/public/images/services/service_07.webp";
import Advertising from "@/public/images/services/service_08.webp";
import SMM from "@/public/images/services/service_09.webp";
import EmailMarketing from "@/public/images/services/service_10.webp";
import WebAnalytics from "@/public/images/services/service_11.webp";
import MobileOptimization from "@/public/images/services/service_12.webp";
import {ServiceItem} from '@/types'


export const Services:ServiceItem[] = [
  {
    id: 1,
    slug: 'web-development',
    title: "Разработка веб-сайтов",
    description:
      "Делаю индивидуальные, отзывчивые веб-сайты, которые отлично выглядят на всех устройствах, обеспечивая удобный пользовательский интерфейс и оптимизацию под поисковые системы.",
    image: WebDevelopment,
    price:'от 15 000 ₽'
  },
  {
    id: 2,
    slug: 'design-branding',
    title: "Дизайн и брендинг",
    description:
      "Помогу разработать уникальный и запоминающийся бренд, включая логотипы, фирменный стиль и рекламные материалы.",
    image: DesignBranding,
    price:'от 15 000 ₽'
  },
  {
    id: 3,
    slug: 'e-commerce',
    title: "Электронная коммерция",
    description:
      "Делаю интуитивно понятные и безопасные интернет-магазины, которые помогают увеличивать продажи и расширять рынок сбыта.",
    image: ECommerce,
    price:'от 27 000 ₽'
  },
  {
    id: 4,
    slug: 'mobile-development',
    title: "Мобильная разработка",
    description:
      "Разрабатываю мобильные приложения для iOS и Android, обеспечивая высокое качество и функциональность для лучшего взаимодействия с вашей аудиторией.",
    image: MobileDevelopment,
    price:'от 150 000 ₽'
  },
  {
    id: 5,
    slug: 'website-promotion',
    title: "SEO и продвижение сайтов",
    description:
      "Комплексные услуги по поисковой оптимизации и интернет-маркетингу для улучшения видимости вашего сайта и привлечения целевой аудитории.",
    image: SEOPromotion,
    price:'от 5 000 ₽/мес.'
  },
  {
    id: 6,
    slug: 'support-maintenance',
    title: "Техническая поддержка и обслуживание",
    description:
      "Обеспечиваю надежную техническую поддержку и регулярное обновление вашего сайта для его бесперебойной работы.",
    image: TechSupport,
    price:'от 5 000 ₽/мес.'
  },
  {
    id: 7,
    slug: 'content-marketing',
    title: "Контент-маркетинг",
    description:
      "Разработка и реализация стратегии контент-маркетинга, включая создание и распространение полезного и интересного контента для привлечения и удержания аудитории.",
    image: ContentMarketing,
    price:'от 15 000 ₽/мес.'
  },
  {
    id: 8,
    slug: 'contextual-advertising',
    title: "Контекстная реклама",
    description:
      "Настройка и управление рекламными кампаниями в поисковых системах и на партнерских сайтах, включая Google AdWords, Яндекс.Директ.",
    image: Advertising,
    price:'от 5 000 ₽/мес.'
  },
  {
    id: 9,
    slug: 'smm',
    title: "SMM (Social Media Marketing)",
    description:
      "Продвижение бренда, продуктов или услуг через социальные сети. Это включает в себя разработку стратегии присутствия в социальных сетях, создание и публикацию контента, управление сообществами.",
    image: SMM,
    price:'от 10 000 ₽/мес.'
  },
  {
    id: 10,
    slug: 'email-marketing',
    title: "Email-маркетинг",
    description:
      "Создание и рассылка электронных писем, направленных на повышение лояльности клиентов, уведомление о новых предложениях, продуктах или услугах.",
    image: EmailMarketing,
    price:'от 5 000 ₽'
  },
  {
    id: 11,
    slug: 'web-analytics',
    title: "Веб-аналитика и UX/UI дизайн",
    description:
      "Сбор и анализ данных о посетителях веб-сайта, их поведении и эффективности различных маркетинговых кампаний. Создание удобного и интуитивно понятного интерфейса, исследование пользовательского опыта для улучшения взаимодействия с сайтом.",
    image: WebAnalytics,
    price:'от 5 000 ₽'
  },
  {
    id: 12,
    slug: 'mobile-optimization',
    title: "Мобильная оптимизация и техническая поддержка",
    description:
      "Адаптация сайта для корректной работы на мобильных устройствах, включая смартфоны и планшеты. Включает в себя техническую поддержку, обновление версий CMS и плагинов, резервное копирование данных, обеспечение безопасности сайта.",
    image: MobileOptimization,
    price:'от 10 000 ₽'
  }
];

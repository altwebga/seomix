"use client";
import { title, subtitle } from "@/components/primitives";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
const servicesItems = [
  {
    title: "SEO-оптимизация",
    description:
      "Повышение видимости сайта в поисковых системах через оптимизацию контента, улучшение структуры сайта, исследование ключевых слов, создание SEO-дружественного контента.",
  },
  {
    title: "Контент-маркетинг",
    description:
      "Разработка и реализация стратегии контент-маркетинга, включая создание и распространение полезного и интересного контента для привлечения и удержания аудитории.",
  },
  {
    title: "Контекстная реклама",
    description:
      "Настройка и управление рекламными кампаниями в поисковых системах и на партнерских сайтах, включая Google AdWords, Яндекс.Директ.",
  },
  {
    title: "SMM (Social Media Marketing)",
    description:
      "Продвижение бренда, продуктов или услуг через социальные сети. Это включает в себя разработку стратегии присутствия в социальных сетях, создание и публикацию контента, управление сообществами.",
  },
  {
    title: "Email-маркетинг",
    description:
      "Создание и рассылка электронных писем, направленных на повышение лояльности клиентов, уведомление о новых предложениях, продуктах или услугах.",
  },
  {
    title: "Веб-аналитика",
    description:
      "Сбор и анализ данных о посетителях веб-сайта, их поведении и эффективности различных маркетинговых кампаний.",
  },
  {
    title: "Услуги по поддержке и обслуживанию",
    description:
      "Включает в себя техническую поддержку, обновление версий CMS и плагинов, резервное копирование данных, обеспечение безопасности сайта.",
  },
  {
    title: "Услуги по улучшению пользовательского опыта (UX/UI дизайн)",
    description:
      "Создание удобного и интуитивно понятного интерфейса, исследование пользовательского опыта для улучшения взаимодействия с сайтом.",
  },
  {
    title: "Мобильная оптимизация",
    description:
      "Адаптация сайта для корректной работы на мобильных устройствах, включая смартфоны и планшеты.",
  },
  {
    title: "Консалтинг и стратегическое планирование",
    description:
      "Помощь в разработке онлайн-стратегии, включая анализ рынка, целевой аудитории, конкурентов.",
  },
];

export default function ServicesPage() {
  return (
    <section className="mt-6 flex flex-col md:flex-row items-center">
      <div className="md:w-1/2">
        <h1 className={title()}>Простые шаги для переезда</h1>
        <h1 className={title({ color: "violet" })}> в Онлайн</h1>
        <p className="py-8 md:pr-4">
          Хотите достичь большей видимости в поисковых системах, привлечь больше
          трафика на сайт, улучшить конверсию и повысить уровень вовлеченности
          пользователей напишите мне.
        </p>
            <Button
              className="my-8"
              color="primary"
              variant="shadow"
              size="md"
              endContent={<ArrowRightIcon className="h-4 w-4" />}
            >
              <Link href="/contact">Спросите меня</Link>
            </Button>
      </div>
      <div className="md:w-1/2">
        <Accordion>
          {servicesItems.map((item) => (
            <AccordionItem
              key={item.title}
              aria-label={item.title}
              title={item.title}
            >
              {item.description}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

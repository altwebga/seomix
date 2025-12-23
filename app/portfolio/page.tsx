import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = {
  title: "Портфолио | Seomix",
  description:
    "Завершаем раздел с кейсами и примерами работ. Скоро покажем результаты проектов Seomix.",
};

export default function PortfolioPage() {
  return (
    <PagePlaceholder
      title="Портфолио"
      description="Собираем подробные кейсы с цифрами, скриншотами и отзывами клиентов. Совсем скоро вы сможете посмотреть наши реализованные проекты и выбрать подходящий формат сотрудничества."
    />
  );
}


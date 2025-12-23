import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = {
  title: "Контакты | Seomix",
  description:
    "Контакты, формы связи и карта офиса Seomix скоро будут доступны на этой странице.",
};

export default function ContactPage() {
  return (
    <PagePlaceholder
      title="Контакты"
      description="Добавляем удобные способы связи, форму для брифов и карту офиса. Если нужно связаться уже сейчас — напишите нам через любой из мессенджеров из шапки сайта."
    />
  );
}


import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = {
  title: "О нас | Seomix",
  description:
    "Узнайте больше о команде Seomix, наших принципах работы и опыте — страница скоро будет готова.",
};

export default function AboutPage() {
  return (
    <PagePlaceholder
      title="О нас"
      description="Мы готовим рассказ о команде, экспертизе и подходах к работе. Здесь появится информация о наших ценностях, процессах и результатах, чтобы вы могли лучше узнать Seomix."
    />
  );
}


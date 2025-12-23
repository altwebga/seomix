import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = {
  title: "Услуги | Seomix",
  description: "Раздел с описанием услуг Seomix — скоро здесь будет контент.",
};

export default function ServicesPage() {
  return (
    <PagePlaceholder
      title="Услуги"
      description="Здесь появится описание наших услуг, стоимости и формата работы. Мы готовим подробные предложения и кейсы, чтобы вам было проще выбрать подходящее решение."
    />
  );
}


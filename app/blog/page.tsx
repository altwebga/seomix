import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = {
  title: "Блог | Seomix",
  description:
    "Новости, статьи и разборы Seomix появятся в этом разделе. Страница уже готовится.",
};

export default function BlogPage() {
  return (
    <PagePlaceholder
      title="Блог"
      description="Готовим подборку статей о SEO, разработке и маркетинге. Совсем скоро здесь появятся полезные материалы и наши наблюдения по проектам."
    />
  );
}


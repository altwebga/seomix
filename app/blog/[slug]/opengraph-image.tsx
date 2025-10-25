import { ImageResponse } from "next/og";
import { getContentForOG } from "@/lib/og-image-utils";
import { generateOGImage } from "@/components/handlers/og-image-generator";

// Метаданные изображения
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Генерация изображения
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;

    const contentData = await getContentForOG("article", slug);

    if (!contentData) {
      // Fallback изображение если данные не найдены
      return generateOGImage({
        title: "Статья не найдена",
        description: "Запрашиваемая статья не существует или была удалена",
      });
    }

    return generateOGImage({
      title: contentData.title,
      description: contentData.description,
    });
  } catch (error) {
    console.error("Error generating OG image for article:", error);
    return generateOGImage({
      title: "Ошибка загрузки",
      description: "Не удалось загрузить данные статьи",
    });
  }
}

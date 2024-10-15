// app/blog/[slug]/page.tsx

import { Metadata } from "next";
import MdxPage from "@/components/MdxPage";
import fs from "fs";
import path from "path";
import slugify from "slugify";

type Props = {
  params: { slug: string };
};

// Асинхронная функция для получения поста и метаданных
async function getMdxContent(slug: string) {
  const postsDir = path.join(process.cwd(), "content", "posts");
  const filenames = fs.readdirSync(postsDir);

  for (const filename of filenames) {
    const { metadata, default: Content } = await import(
      `@content/posts/${filename}`
    );

    // Проверяем, соответствует ли сгенерированный slug текущему
    if (slugify(metadata.title, { lower: true, strict: true }) === slug) {
      return { metadata, Content };
    }
  }

  return null; // Если пост не найден
}

// Генерация метаданных для страницы
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getMdxContent(params.slug);

  if (!post) {
    return {
      title: "Post not found",
      description: "This post could not be found",
    };
  }

  const { metadata } = post;

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      images: [metadata.featureImage || "/default-og-image.jpg"],
    },
  };
}

// Основной компонент страницы
export default async function PostPage({ params }: Props) {
  const post = await getMdxContent(params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  const { Content, metadata } = post;

  return (
    <MdxPage metadata={metadata}>
      <Content />
    </MdxPage>
  );
}

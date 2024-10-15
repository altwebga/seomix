import { promises as fs } from "fs";
import path from "path";
import slugify from "slugify";
import PostList from "@/components/PostList"; // Импортируем клиентский компонент

type PostMetaData = {
  title: string;
  description: string;
  featureImage?: string;
  slug: string;
};

// Путь к директории с постами
const postsDirectory = path.join(process.cwd(), "content", "posts");

// Функция для асинхронного чтения файлов и получения метаданных
async function getAllPosts(): Promise<PostMetaData[]> {
  const filenames = await fs.readdir(postsDirectory); // Чтение файлов асинхронно

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const { metadata } = await import(`@/content/posts/${filename}`); // Импортируем файл по названию

      // Генерация slug из заголовка через slugify
      const slug = slugify(metadata.title, { lower: true, strict: true });

      return {
        ...metadata,
        slug, // Возвращаем сгенерированный slug
      };
    })
  );

  return posts;
}

export default async function BlogPage() {
  // Получаем все посты
  const posts = await getAllPosts();

  // Передаём посты в клиентский компонент
  return (
    <div>
      <h1>Blog</h1>
      <PostList posts={posts} />
    </div>
  );
}

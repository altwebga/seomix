import { promises as fs } from "fs";
import path from "path";
import { pathToFileURL } from "url";

// Определяем интерфейс для frontmatter
interface Frontmatter {
  title: string;
  description?: string;
  price?: string;
  date?: string;
  excerpt?: string;
}

// Определяем структуру возвращаемых данных
interface FileData {
  filename: string;
  frontmatter: Frontmatter;
}

// Функция для получения файлов
export async function getFiles(directory: string): Promise<FileData[]> {
  try {
    // Формируем полный путь к папке
    const directoryPath = path.join(process.cwd(), directory);

    // Получаем список файлов и фильтруем только MDX
    const files = (await fs.readdir(directoryPath)).filter((file) =>
      file.endsWith(".mdx")
    );

    // Читаем содержимое файлов с использованием корректного URL
    const content = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(directoryPath, file);
        // Преобразуем абсолютный путь в file URL
        const fileUrl = pathToFileURL(filePath).href;
        const { frontmatter } = await import(fileUrl);

        return {
          filename: file,
          frontmatter,
        };
      })
    );

    return content;
  } catch (error) {
    console.error("Ошибка при загрузке файлов:", error);
    return [];
  }
}

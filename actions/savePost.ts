"use server";

import { prisma } from "@/lib/prisma";
import slugify from "slugify";

export async function savePost(data: {
  postType: string;
  title: string;
  description: string;
  images: string[];
  userEmail: string;
}) {
  try {
    // Генерируем slug с помощью slugify
    const slug = slugify(data.title, {
      lower: true, // Переводим в нижний регистр
      strict: true, // Удаляем ненужные символы
      locale: "ru", // Опционально: используем локализацию для корректного транслитерации (в случае русского языка)
    });

    // Проверяем, уникален ли slug
    let uniqueSlug = slug;
    let count = 1;

    // Пытаемся найти существующий пост с таким же slug
    while (await prisma.post.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${slug}-${count}`;
      count++;
    }

    const newPost = await prisma.post.create({
      data: {
        postType: data.postType,
        title: data.title,
        description: data.description,
        slug: uniqueSlug, // Используем уникальный slug
        userEmail: data.userEmail,
        images: {
          create: data.images.map((imageId) => ({
            image: {
              connect: { id: imageId },
            },
          })),
        },
      },
    });
    return newPost;
  } catch (error) {
    console.error("Ошибка при сохранении поста:", error);
    throw new Error("Произошла ошибка при сохранении поста.");
  }
}

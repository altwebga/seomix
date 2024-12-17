"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import slugify from "slugify";
import { z } from "zod";

// Схема валидации с zod
const postSchema = z.object({
  title: z.string().min(1, "Заголовок обязателен"),
  description: z.string().min(1, "Описание обязательно"),
  postType: z.enum(["ARTICLE", "PORTFOLIO", "CLIENT", "SERVICES"]),
  image: z.string().url("Неверный URL изображения"),
});

type PostFormData = z.infer<typeof postSchema>;

export async function createPost(data: PostFormData) {
  const session = await auth();

  if (!session?.user?.email) {
    return { error: "Пользователь не авторизован!" };
  }

  // Валидация данных с помощью zod
  const result = postSchema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((e) => e.message).join(", ");
    return { error: `Ошибка валидации: ${errors}` };
  }

  const { title, description, postType, image } = result.data;

  // Генерация slug
  const slug = slugify(title, { lower: true, strict: true, trim: true });

  try {
    // Извлечение s3Key из URL изображения
    const s3Key = new URL(image).pathname.split("/").pop();
    if (!s3Key) {
      return { error: "Неверный формат URL изображения!" };
    }

    // Создание записи изображения
    const imageRecord = await prisma.image.create({
      data: {
        url: image,
        title,
        s3Key,
      },
    });

    // Создание поста и привязка изображения
    const post = await prisma.post.create({
      data: {
        title,
        description,
        postType,
        slug,
        userEmail: session.user.email,
        images: {
          create: {
            image: {
              connect: { id: imageRecord.id },
            },
          },
        },
      },
    });

    return { success: true, post };
  } catch (error) {
    console.error("Ошибка при создании поста:", error);
    return { error: "Ошибка при создании поста. Попробуйте снова." };
  }
}

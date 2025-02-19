"use server";
import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/lib/s3-client";
import { v4 as uuidv4 } from "uuid";
import slugify from "slugify";

// Функция для генерации уникального slug
async function generateUniqueSlug(title: string): Promise<string> {
  // Генерация базового slug
  let slug = slugify(title, {
    lower: true, // Приводим к нижнему регистру
    strict: true, // Удаляем специальные символы
  });

  // Проверка на уникальность
  let existingPost = await prisma.post.findUnique({
    where: { slug },
  });

  // Если slug уже существует, добавляем суффикс
  let suffix = 1;
  while (existingPost) {
    const newSlug = `${slug}-${suffix}`;
    existingPost = await prisma.post.findUnique({
      where: { slug: newSlug },
    });

    if (!existingPost) {
      slug = newSlug;
      break;
    }

    suffix++;
  }

  return slug;
}

export async function createPost(data: FormData) {
  // Проверка авторизации пользователя
  const session = await auth();
  console.log("Session:", session); // Логируем сессию для отладки

  if (!session || !session.user || !session.user.id) {
    return { error: "Unauthorized" };
  }

  const userId = session.user.id;
  const postType = data.get("postType") as string;
  const title = data.get("title") as string;
  const description = data.get("description") as string;
  const imageFile = data.get("image") as File;

  // Валидация данных
  if (!postType || !title || !description || !imageFile) {
    return { error: "All fields are required" };
  }

  if (!["ARTICLE", "PORTFOLIO", "SERVICE"].includes(postType)) {
    return { error: "Invalid post type" };
  }

  // Генерация уникального slug
  const slug = await generateUniqueSlug(title);

  // Генерация уникального имени файла для изображения
  const fileExtension = imageFile.name.split(".").pop();
  const uniqueFileName = `${uuidv4()}.${fileExtension}`;

  // Загрузка изображения на S3
  const buffer = await imageFile.arrayBuffer();
  const params = {
    Bucket: process.env.YANDEX_S3_BUCKET_NAME,
    Key: uniqueFileName,
    Body: Buffer.from(buffer),
    ContentType: imageFile.type,
  };

  try {
    // Загрузка файла на S3
    await s3Client.send(new PutObjectCommand(params));
    const imageUrl = `${process.env.YANDEX_S3_ENDPOINT}/${process.env.YANDEX_S3_BUCKET_NAME}/${uniqueFileName}`;

    // Создание записи в базе данных
    const post = await prisma.post.create({
      data: {
        postType: postType as "ARTICLE" | "PORTFOLIO" | "SERVICE",
        title,
        description,
        image: imageUrl,
        slug, // Уникальный slug
        userId,
      },
    });

    return { success: true, post };
  } catch (error) {
    console.error("Error creating post:", error);
    return { error: "Failed to create post" };
  }
}

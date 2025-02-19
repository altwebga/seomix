"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/lib/s3-client";
import { v4 as uuidv4 } from "uuid";

export async function createPost(data: FormData) {
  const session = await auth();
  if (!session) {
    return { error: "Unauthorized" };
  }

  const userId = session.user.id;
  const postType = data.get("postType") as string;
  const title = data.get("title") as string;
  const description = data.get("description") as string;
  const imageFile = data.get("image") as File;

  if (!imageFile) {
    return { error: "Image is required" };
  }

  // Генерация уникального имени файла с сохранением расширения
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
    await s3Client.send(new PutObjectCommand(params));
    const imageUrl = `${process.env.YANDEX_S3_ENDPOINT}/${process.env.YANDEX_S3_BUCKET_NAME}/${uniqueFileName}`;

    // Создание записи в базе данных
    const post = await prisma.post.create({
      data: {
        postType: postType as "ARTICLE" | "PORTFOLIO" | "SERVICE",
        title,
        description,
        image: imageUrl,
        userId,
      },
    });

    return { success: true, post };
  } catch (error) {
    console.error("Error creating post:", error);
    return { error: "Failed to create post" };
  }
}

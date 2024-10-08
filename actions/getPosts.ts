"use server";

import { prisma } from "@/lib/prisma";

export async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        images: {
          include: {
            image: true, // Получаем всю информацию об изображении
          },
        },
      },
    });
    return posts.map((post) => ({
      id: post.id,
      slug: post.slug,
      postType: post.postType,
      title: post.title,
      description: post.description,
      userEmail: post.userEmail,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      images: post.images.map((postImage) => ({
        id: postImage.image.id,
        url: postImage.image.url,
        s3Key: postImage.image.s3Key,
      })),
    }));
  } catch (error) {
    console.error("Ошибка при получении постов:", error);
    throw new Error("Произошла ошибка при получении постов.");
  }
}

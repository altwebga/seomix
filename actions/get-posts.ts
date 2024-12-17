"use server";

import { auth } from "@/auth"; // Подключаем auth для получения текущего пользователя
import { prisma } from "@/prisma";

export async function getPosts() {
  const session = await auth(); // Получаем текущего пользователя из сессии

  if (!session?.user?.email) {
    throw new Error("Пользователь не авторизован");
  }

  return await prisma.post.findMany({
    where: {
      userEmail: session.user.email, // Показывать только посты текущего пользователя
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      images: {
        include: {
          image: true, // Включаем связанные изображения
        },
      },
    },
  });
}

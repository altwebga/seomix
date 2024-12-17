"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";

export async function deletePost(postId: string) {
  try {
    // Получаем текущую сессию пользователя
    const session = await auth();

    // Проверяем авторизацию
    if (!session?.user?.email) {
      return { error: "Пользователь не авторизован" };
    }

    // Находим пост и проверяем право собственности
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { userEmail: true }, // Получаем только поле userEmail
    });

    if (!post) {
      return { error: "Пост не найден" };
    }

    if (post.userEmail !== session.user.email) {
      return { error: "У вас нет прав на удаление этого поста" };
    }

    // Удаляем пост
    await prisma.post.delete({
      where: { id: postId },
    });

    return { success: true, message: "Пост успешно удалён" };
  } catch (error) {
    console.error("Ошибка при удалении поста:", error);
    return { error: "Произошла ошибка при удалении поста. Попробуйте снова." };
  }
}

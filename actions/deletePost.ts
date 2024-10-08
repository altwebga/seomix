"use server";

import { prisma } from "@/lib/prisma";

export async function deletePost(postId: string) {
  try {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

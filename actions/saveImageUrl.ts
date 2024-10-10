"use server";

import { prisma } from "@/lib/prisma";

export async function saveImageUrl(
  imageUrl: string,
  s3Key: string,
  userEmail: string
) {
  try {
    await prisma.image.create({
      data: {
        url: imageUrl,
        s3Key: s3Key,
        userEmail: userEmail,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

"use server";
import { auth } from "@/auth";
import { prisma } from "@/prisma";

export async function getAllMedia() {
  const session = await auth();
  if (session?.user.role !== "ADMIN") {
    throw new Error("Все фото доступны только администраторам");
  }
  const images = await prisma.image.findMany();
  return images;
}

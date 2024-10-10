"use server";
import { prisma } from "@/lib/prisma";

export async function getImages() {
  try {
    const images = await prisma.image.findMany();
    return images;
  } catch (error) {
    console.log(error);
  }
}

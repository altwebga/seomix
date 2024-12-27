"use server";
import { auth } from "@/auth";
import { prisma } from "@/prisma";

export async function getAllUsers() {
  const session = await auth();
  if (session?.user.role !== "ADMIN") {
    throw new Error("Список пользователей доступен только администраторам");
  }
  const users = await prisma.user.findMany();
  return users;
}

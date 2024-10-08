"use server";

import { s3Client } from "@/lib/s3Client";
import { prisma } from "@/lib/prisma";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export async function deleteImage(imageId: string, s3Key: string) {
  try {
    // Удаляем изображение из S3 с использованием переданного s3Key
    const deleteParams = {
      Bucket: process.env.YANDEX_S3_BUCKET_NAME!,
      Key: s3Key, // Используем переданный ключ s3Key
    };

    await s3Client.send(new DeleteObjectCommand(deleteParams));
    console.log(`Изображение с ключом ${s3Key} успешно удалено из S3.`);

    // Удаляем запись изображения из базы данных
    await prisma.image.delete({
      where: {
        id: imageId,
      },
    });
    console.log(
      `Запись изображения с ID ${imageId} успешно удалена из базы данных.`
    );
  } catch (error) {
    console.error(`Ошибка при удалении изображения с ID ${imageId}:`, error);
  }
}

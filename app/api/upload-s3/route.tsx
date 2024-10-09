import { PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { s3Client } from "@/lib/s3Client";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return new Response(JSON.stringify({ error: "Файл не найден" }), {
        status: 400,
      });
    }

    // Определяем расширение файла на основе его типа
    const fileExtension = file.name.split(".").pop();
    const uniqueFileName = `${uuidv4()}.${fileExtension}`;

    console.log("Получен файл:", file);
    console.log("Имя файла для загрузки:", uniqueFileName);

    const params = {
      Bucket: process.env.YANDEX_S3_BUCKET_NAME!,
      Key: uniqueFileName,
      Body: Buffer.from(await file.arrayBuffer()),
      ContentType: file.type,
    };

    console.log("S3 параметры загрузки:", params);

    // Загрузка файла в S3
    await s3Client.send(new PutObjectCommand(params));

    // Генерация ссылки на файл
    const fileUrl = `${process.env.YANDEX_S3_ENDPOINT}/${process.env.YANDEX_S3_BUCKET_NAME}/${uniqueFileName}`;

    // Сохранение данных в базу данных
    const newImage = await prisma.image.create({
      data: {
        url: fileUrl,
        s3Key: uniqueFileName,
      },
    });

    console.log("Изображение успешно сохранено в базе данных:", newImage);

    return new Response(JSON.stringify({ url: fileUrl }), { status: 200 });
  } catch (error) {
    console.error("Ошибка при загрузке файла:", error);

    return new Response(
      JSON.stringify({ error: "Ошибка при загрузке файла на сервере" }),
      { status: 500 }
    );
  }
}

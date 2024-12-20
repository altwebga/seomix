import { NextRequest, NextResponse } from "next/server";
import { uploadFileToS3 } from "@/lib/s3-client";
import { prisma } from "@/prisma";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[]; // Получаем массив файлов
    const titles = formData.getAll("titles") as string[]; // Получаем массив названий
    const descriptions = formData.getAll("descriptions") as string[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "Файлы не предоставлены" },
        { status: 400 }
      );
    }

    if (files.length !== titles.length) {
      return NextResponse.json(
        { error: "Количество файлов и названий не совпадает" },
        { status: 400 }
      );
    }

    const allowedFileTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
    ];
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

    const uploadedImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const title = titles[i]; // Название для текущего файла
      const desc = descriptions[i]; // Описание для текущего файла

      // Проверка типа файла
      if (!allowedFileTypes.includes(file.type)) {
        return NextResponse.json(
          { error: `Недопустимый тип файла: ${file.name}` },
          { status: 400 }
        );
      }

      // Проверка размера файла
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `Размер файла превышает допустимый лимит: ${file.name}` },
          { status: 400 }
        );
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Генерация уникального имени файла
      const fileExtension = file.name.split(".").pop() || "unknown";
      const fileName = `${uuidv4()}.${fileExtension}`;

      try {
        // Загрузка в S3
        const fileUrl = await uploadFileToS3(buffer, fileName, file.type);

        // Сохранение в базу данных
        const image = await prisma.image.create({
          data: {
            url: fileUrl,
            s3Key: fileName,
            title: title, // Используем пользовательское название
            description: desc, // Используем пользовательское описание
          },
        });

        uploadedImages.push({
          url: image.url,
          title: image.title,
        });
      } catch (error) {
        console.error(`Ошибка при обработке файла: ${file.name}`, error);
        return NextResponse.json(
          { error: `Ошибка при загрузке файла: ${file.name}` },
          { status: 500 }
        );
      }
    }

    // Возвращаем все загруженные изображения
    return NextResponse.json({
      success: true,
      images: uploadedImages,
    });
  } catch (error) {
    console.error("Ошибка при загрузке файлов:", error);
    return NextResponse.json(
      { error: "Ошибка при загрузке файлов" },
      { status: 500 }
    );
  }
}

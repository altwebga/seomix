import { NextRequest, NextResponse } from "next/server";
import { uploadFileToS3 } from "@/lib/s3-client";
import { prisma } from "@/prisma";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Файл не предоставлен" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Генерация уникального имени файла
    const fileExtension = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExtension}`;

    // Загрузка в S3
    const fileUrl = await uploadFileToS3(buffer, fileName, file.type);

    // Сохранение в базу данных
    const image = await prisma.image.create({
      data: {
        url: fileUrl,
        s3Key: fileName,
        title: file.name,
      },
    });

    return NextResponse.json({ success: true, image });
  } catch (error) {
    console.error("Ошибка при загрузке файла:", error);
    return NextResponse.json(
      { error: "Ошибка при загрузке файла" },
      { status: 500 }
    );
  }
}

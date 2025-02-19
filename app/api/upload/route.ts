import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/lib/s3-client";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  // Генерация уникального имени файла с сохранением расширения
  const fileExtension = file.name.split(".").pop(); // Получаем расширение файла
  const uniqueFileName = `${uuidv4()}.${fileExtension}`; // Генерируем уникальное имя с тем же расширением

  const buffer = await file.arrayBuffer();
  const params = {
    Bucket: process.env.YANDEX_S3_BUCKET_NAME,
    Key: uniqueFileName, // Используем уникальное имя файла
    Body: Buffer.from(buffer),
    ContentType: file.type,
  };

  try {
    await s3Client.send(new PutObjectCommand(params));
    const fileUrl = `${process.env.YANDEX_S3_ENDPOINT}/${process.env.YANDEX_S3_BUCKET_NAME}/${uniqueFileName}`;
    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

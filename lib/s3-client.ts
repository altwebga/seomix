import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.YANDEX_S3_REGION,
  endpoint: process.env.YANDEX_S3_ENDPOINT, // Схема уже в .env
  credentials: {
    accessKeyId: process.env.YANDEX_ACCESS_KEY_ID!,
    secretAccessKey: process.env.YANDEX_SECRET_ACCESS_KEY!,
  },
});

export const uploadFileToS3 = async (
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string
) => {
  const params = {
    Bucket: process.env.YANDEX_S3_BUCKET_NAME,
    Key: fileName,
    Body: fileBuffer,
    ContentType: mimeType,
  };

  await s3Client.send(new PutObjectCommand(params));

  // Формирование корректного URL для сохранения в базе
  const bucketName = process.env.YANDEX_S3_BUCKET_NAME;
  const endpoint = process.env.YANDEX_S3_ENDPOINT!.replace("https://", ""); // Удаляем схему для домена
  return `https://${bucketName}.${endpoint}/${fileName}`;
};

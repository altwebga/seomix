import { S3Client } from "@aws-sdk/client-s3";

// Проверка наличия всех переменных окружения
const requiredEnvVars = [
  "YANDEX_S3_ENDPOINT",
  "YANDEX_S3_REGION",
  "YANDEX_ACCESS_KEY_ID",
  "YANDEX_SECRET_ACCESS_KEY",
  "YANDEX_S3_BUCKET_NAME",
];

// Проверка каждой переменной окружения
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Переменная окружения ${envVar} не задана.`);
  }
});

// Создание клиента для S3-совместимого облака
const s3Client = new S3Client({
  region: process.env.YANDEX_S3_REGION!,
  endpoint: process.env.YANDEX_S3_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.YANDEX_ACCESS_KEY_ID!,
    secretAccessKey: process.env.YANDEX_SECRET_ACCESS_KEY!,
  },
});

export { s3Client };

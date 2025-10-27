import { z } from "zod";

const serverEnvSchema = z
  .object({
    GRAPHQL_ENDPOINT: z
      .string()
      .url({ message: "GRAPHQL_ENDPOINT должен быть валидным URL" }),
    ACCESS_TOKEN: z
      .string()
      .min(1, "ACCESS_TOKEN не может быть пустым"),
    EMAIL_SERVER_HOST: z
      .string()
      .min(1, "EMAIL_SERVER_HOST не может быть пустым"),
    EMAIL_SERVER_PORT: z
      .coerce
      .number()
      .int()
      .positive()
      .default(465),
    EMAIL_SERVER_USER: z
      .string()
      .min(1, "EMAIL_SERVER_USER не может быть пустым"),
    EMAIL_SERVER_PASSWORD: z
      .string()
      .min(1, "EMAIL_SERVER_PASSWORD не может быть пустым"),
    EMAIL_FROM: z
      .string()
      .email({ message: "EMAIL_FROM должен быть валидным email" }),
    EMAIL_TO: z
      .string()
      .email({ message: "EMAIL_TO должен быть валидным email" }),
    YANDEX_SMART_CAPTCHA_SECRET_KEY: z
      .string()
      .min(1, "YANDEX_SMART_CAPTCHA_SECRET_KEY обязателен"),
  })
  .transform((value) => ({
    ...value,
    EMAIL_SERVER_SECURE: value.EMAIL_SERVER_PORT === 465,
  }));

type ServerEnv = z.infer<typeof serverEnvSchema> & {
  EMAIL_SERVER_SECURE: boolean;
};

let cachedServerEnv: ServerEnv | null = null;

export function getServerEnv(): ServerEnv {
  if (cachedServerEnv) {
    return cachedServerEnv;
  }

  const parsed = serverEnvSchema.safeParse({
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
    EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
    EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
    EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
    EMAIL_FROM: process.env.EMAIL_FROM,
    EMAIL_TO: process.env.EMAIL_TO,
    YANDEX_SMART_CAPTCHA_SECRET_KEY:
      process.env.YANDEX_SMART_CAPTCHA_SECRET_KEY,
  });

  if (!parsed.success) {
    const formatted = parsed.error.format();
    const message = Object.entries(formatted)
      .filter(([key]) => key !== "_")
      .map(([key, value]) => `${key}: ${value?._errors?.join(", ")}`)
      .join("\n");

    throw new Error(`Неверная конфигурация переменных окружения:\n${message}`);
  }

  cachedServerEnv = parsed.data;
  return cachedServerEnv;
}

import { z } from "zod";

const publicEnvSchema = z.object({
  NEXT_PUBLIC_IMAGE_URL: z
    .string()
    .url({ message: "NEXT_PUBLIC_IMAGE_URL должен быть валидным URL" }),
  NEXT_PUBLIC_YANDEX_SMART_CAPTCHA_CLIENT_KEY: z
    .string()
    .min(1, "NEXT_PUBLIC_YANDEX_SMART_CAPTCHA_CLIENT_KEY обязателен"),
});

let cachedPublicEnv: z.infer<typeof publicEnvSchema> | null = null;

export function getPublicEnv() {
  if (cachedPublicEnv) {
    return cachedPublicEnv;
  }

  const parsed = publicEnvSchema.safeParse({
    NEXT_PUBLIC_IMAGE_URL: process.env.NEXT_PUBLIC_IMAGE_URL,
    NEXT_PUBLIC_YANDEX_SMART_CAPTCHA_CLIENT_KEY:
      process.env.NEXT_PUBLIC_YANDEX_SMART_CAPTCHA_CLIENT_KEY,
  });

  if (!parsed.success) {
    const formatted = parsed.error.format();
    const message = Object.entries(formatted)
      .filter(([key]) => key !== "_")
      .map(([key, value]) => `${key}: ${value?._errors?.join(", ")}`)
      .join("\n");

    throw new Error(
      `Неверные публичные переменные окружения:\n${message}`
    );
  }

  cachedPublicEnv = parsed.data;
  return cachedPublicEnv;
}

import { z } from "zod";

export const contactRequestSchema = z.object({
  username: z.string().min(2, "Имя должно содержать не менее 2 символов"),
  phone: z.string().min(10, "Укажите корректный номер телефона"),
  captchaToken: z.string().min(1, "Необходимо пройти проверку"),
  url: z.string().url().optional(),
});

export type ContactRequestInput = z.infer<typeof contactRequestSchema>;

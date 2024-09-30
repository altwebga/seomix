import { z } from "zod";

export const PostSchema = z.object({
  postType: z.string(),
  title: z.string().min(2, {
    message: "Название должно содержать хотя бы 2 символа.",
  }),
  description: z.string().min(2, {
    message: "Описание должно содержать хотя бы 2 символа.",
  }),
  file: z.any().refine((files) => files?.length > 0, {
    message: "Необходимо выбрать файл",
  }),
  userEmail: z.string().email(),
});

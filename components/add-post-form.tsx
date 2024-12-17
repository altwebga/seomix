"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createPost } from "@/app/dashboard/post/add/action";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
  postType: z.enum(["ARTICLE", "PORTFOLIO", "CLIENT", "SERVICES"]),
  title: z.string().min(2, "Заголовок должен содержать не менее 2 символов."),
  description: z
    .string()
    .min(2, "Описание должно содержать не менее 2 символов."),
  image: z.instanceof(File).refine((file) => file.size > 0, "Файл обязателен"),
});

export function AddPostForm() {
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      postType: "ARTICLE",
      title: "",
      description: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsUploading(true);

      // Загрузка изображения на сервер
      const formData = new FormData();
      formData.append("file", data.image);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Ошибка загрузки изображения");
      }

      const { image } = await uploadResponse.json();

      // Отправка данных поста через серверный экшен
      const result = await createPost({
        title: data.title,
        description: data.description,
        postType: data.postType,
        image: image.url, // URL загруженного изображения
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      toast({ title: "Пост успешно создан!" });
      form.reset(); // Очистка формы после отправки
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message || "Неизвестная ошибка",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6 max-w-lg"
      >
        <FormField
          control={form.control}
          name="postType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Тип поста</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип поста" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ARTICLE">Пост</SelectItem>
                  <SelectItem value="PORTFOLIO">Портфолио</SelectItem>
                  <SelectItem value="CLIENT">Клиент</SelectItem>
                  <SelectItem value="SERVICES">Услуга</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Заголовок</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea {...field} className="h-40" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Изображение</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    field.onChange(e.target.files ? e.target.files[0] : null)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isUploading}>
          {isUploading ? "Загрузка..." : "Сохранить"}
        </Button>
      </form>
    </Form>
  );
}

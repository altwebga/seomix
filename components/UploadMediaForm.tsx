"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { saveImageUrl } from "@/actions/saveImageUrl";

const FormSchema = z.object({
  file: z.any().refine((files) => files?.length > 0, {
    message: "Необходимо выбрать файл",
  }),
});

export function UploadMediaForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // Состояние для отслеживания загрузки

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      file: null,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const selectedFile = data.file[0];
    setIsLoading(true); // Устанавливаем состояние загрузки в true перед началом загрузки

    try {
      let imageUrl = null;
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const imageResponse = await fetch("/api/upload-s3", {
          method: "POST",
          body: formData,
        });

        const imageResult = await imageResponse.json();

        if (!imageResponse.ok) {
          throw new Error(imageResult.error);
        }

        imageUrl = imageResult.url;

        // Сохранение URL изображения
        await saveImageUrl(imageUrl, imageResult.key);
      }

      // Показать уведомление об успешной загрузке
      toast({
        title: "Файл успешно загружен",
        description: <p>{imageUrl}</p>,
      });

      // Очистка формы после успешной загрузки
      form.reset({
        file: null,
      });

      setTimeout(() => {
        router.push("/dashboard/gallery");
      }, 1000); // Задержка в 1 секунду
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Ошибка",
          description: error.message,
        });
      }
    } finally {
      setIsLoading(false); // Сбрасываем состояние загрузки после завершения (в случае успеха или ошибки)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Фото</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => {
                    field.onChange(e.target.files);
                  }}
                  ref={field.ref}
                />
              </FormControl>
              <FormDescription>Загрузите файл</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Загрузка..." : "Загрузить"}
        </Button>
      </form>
    </Form>
  );
}

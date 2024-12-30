"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

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
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";

// Схема валидации для одного файла
const FileSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  desc: z.string().optional(), // Описание может быть пустым
  file: z.instanceof(File).optional(), // Файл может быть undefined до выбора
});

// Схема для всей формы
const FormSchema = z.object({
  files: z.array(FileSchema).min(1, "Добавьте хотя бы один файл"),
});

// Универсальный компонент для поля
function Field({
  label,
  name,
  placeholder,
  control,
  type = "text",
  isFile = false,
}: {
  label: string;
  name: string;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  type?: string;
  isFile?: boolean;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {isFile ? (
              <Input
                type="file"
                onChange={(e) => field.onChange(e.target.files?.[0])}
              />
            ) : type === "textarea" ? (
              <Textarea {...field} placeholder={placeholder} />
            ) : (
              <Input {...field} placeholder={placeholder} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function UploadMediaForm() {
  const [isLoading, setIsLoading] = useState(false); // Добавляем состояние загрузки

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { files: [] },
  });

  const { fields, append, remove } = useFieldArray({
    name: "files",
    control: form.control,
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true); // Включаем состояние загрузки

    const formData = new FormData();

    data.files.forEach(({ title, desc, file }) => {
      if (file) {
        formData.append("files", file);
        formData.append("titles", title);
        formData.append("descriptions", desc || ""); // Добавляем описание или пустую строку
      }
    });

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        toast({
          title: "Успешно!",
          description: "Файлы загружены.",
        });
        form.reset();
      } else {
        toast({
          title: "Ошибка",
          description: result.error || "Не удалось загрузить файлы.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при загрузке.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false); // Выключаем состояние загрузки
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-xl"
      >
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-4">
            <Field
              label="Название"
              name={`files.${index}.title`}
              placeholder="Введите название"
              control={form.control}
            />
            <Field
              label="Описание"
              name={`files.${index}.desc`}
              placeholder="Введите описание"
              control={form.control}
              type="textarea"
            />

            <Field
              label="Файл"
              name={`files.${index}.file`}
              placeholder=""
              control={form.control}
              isFile
            />
            <Button
              type="button"
              onClick={() => remove(index)}
              disabled={isLoading} // Блокируем кнопку во время загрузки
              variant={"destructive"}
            >
              Удалить файл
            </Button>
          </div>
        ))}
        <div className="flex justify-between">
          <Button
            type="button"
            onClick={() => append({ title: "", desc: "", file: undefined })}
            disabled={isLoading} // Блокируем кнопку во время загрузки
          >
            Добавить файл
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Фото загружаются..." : "Загрузить"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

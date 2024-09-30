"use client";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { PostSchema } from "@/config/validate-form";
import { siteConfig } from "@/config/site";

type AddListingFormProps = {
  userEmail: string;
};

export function AddPostForm({ userEmail }: AddListingFormProps) {
  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      userEmail: userEmail,
      postType: siteConfig.postTypes[0].value,
      title: "",
      description: "",
      file: null,
    },
  });

  // Обработка отправки формы
  async function onSubmit(data: z.infer<typeof PostSchema>) {
    try {
      // Шаг 1: Создаём пост через серверный экшен addPostAction
      await addPostAction({
        postType: data.postType,
        title: data.title,
        description: data.description,
        file: data.file[0],
        userEmail: data.userEmail,
      });
      // Шаг 2: Обновляем список постов через fetch
      // Шаг 3: Очищаем форму
      form.reset();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form action="">
      <Select
        isRequired
        className="max-w-xs"
        defaultSelectedKeys={["post"]}
        label="Тип поста"
        placeholder="Выберите тип поста"
      >
        {siteConfig.postTypes.map((post) => (
          <SelectItem key={post.value} value={post.value}>
            {post.label}
          </SelectItem>
        ))}
      </Select>
      <Input
        className="my-4"
        label="Заголовок"
        type="text"
        variant="bordered"
      />
      <Textarea
        className="my-4"
        placeholder="Контент"
        type="text"
        variant="bordered"
      />

      <Input
        className="my-4"
        label="Изображение"
        type="text"
        variant="bordered"
      />
      <Button type="submit">Сохранить</Button>
    </Form>
  );
}

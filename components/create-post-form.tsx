"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { toast } from "sonner";
import { z } from "zod";

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
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PostType } from "@prisma/client";
import { createPost } from "@/app/dashboard/actions";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Название не может быть короче 2 символов",
  }),
  postType: z.enum([PostType.POST, PostType.SERVICES, PostType.PORTFOLIO]),
  content: z.string().min(2, {
    message: "Описание не может быть короче 2 символов",
  }),
});

export function CreatePostForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      postType: "POST",
      content: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      try {
        await createPost(data);
        form.reset();
        toast.success("Запись создана");
      } catch {
        toast.error("Не удалось создать запись");
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название записи</FormLabel>
              <FormControl>
                <Input placeholder="Разработка сайтов" {...field} />
              </FormControl>
              <FormDescription>Как будет называться запись</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="postType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип поста" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="POST">Запись блога</SelectItem>
                  <SelectItem value="SERVICES">Услугу</SelectItem>
                  <SelectItem value="PORTFOLIO">Портфолио</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                В какой раздел будет опубликована запись
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Контент записи</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="....."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Контент записи можно в mdx</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Опубликовать
        </Button>
      </form>
    </Form>
  );
}

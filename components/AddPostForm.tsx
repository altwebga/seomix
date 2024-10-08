"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { contentType } from "@/lib/siteConfig";
import { Textarea } from "./ui/textarea";
import { getImages } from "@/actions/getImages";
import { savePost } from "@/actions/savePost";
import { Checkbox } from "@/components/ui/checkbox";

const FormSchema = z.object({
  postType: z.enum(["blog", "portfolio", "client", "service"]),
  title: z.string().min(2, {
    message: "Заголовок должен содержать хотя бы 2 символа.",
  }),
  description: z.string().min(2, {
    message: "Описание должно содержать хотя бы 2 символа.",
  }),
  images: z.array(z.string()).default([]), // Убедитесь, что images — это всегда массив строк
  userEmail: z.string().email(),
});

export function AddPostForm({ userEmail }: { userEmail: string }) {
  const [images, setImages] = useState<{ id: string; url: string }[]>([]);

  const router = useRouter();
  useEffect(() => {
    async function fetchImages() {
      try {
        const data = await getImages();
        if (data) {
          setImages(data.map(({ id, url }) => ({ id, url })));
        }
      } catch (error) {
        console.error("Ошибка при загрузке изображений:", error);
      }
    }
    fetchImages();
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      postType: "blog",
      title: "",
      description: "",
      images: [],
      userEmail: userEmail,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await savePost(data);

      toast({
        title: "Форма отправлена",
        description: (
          <pre>
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
      form.reset();
      setTimeout(() => {
        router.push("/dashboard/admin");
      }, 2000);
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить форму.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
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
                  {contentType.map((type) => (
                    <SelectItem key={type.id} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Выберите тип поста</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Заголовок поста</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Введите заголовок поста</FormDescription>
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
                <Textarea {...field} />
              </FormControl>
              <FormDescription>Введите описание</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Выберите изображения для поста</FormLabel>
              <FormControl>
                <div className="grid grid-cols-3 gap-4">
                  {images.map((image) => (
                    <div key={image.id} className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value?.includes(image.id) ?? false}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            field.onChange([...(field.value ?? []), image.id]);
                          } else {
                            field.onChange(
                              (field.value ?? []).filter(
                                (id) => id !== image.id
                              )
                            );
                          }
                        }}
                      />
                      <Image
                        src={image.url}
                        alt="Selected image"
                        className="w-16 h-16 object-cover"
                        width={64}
                        height={64}
                      />
                    </div>
                  ))}
                </div>
              </FormControl>
              <FormDescription>
                Выберите одно или несколько изображений
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="default" type="submit">
          Сохранить пост
        </Button>
      </form>
    </Form>
  );
}

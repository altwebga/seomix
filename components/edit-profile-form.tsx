"use client";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole } from "@prisma/client";
import { saveUserProfile } from "@/actions/saveUserProfile";

const FormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  role: z.enum([UserRole.admin, UserRole.user, UserRole.client]),
});

type EditProfileFormProps = z.infer<typeof FormSchema> & {
  isAdmin: boolean;
};

export function EditProfileForm({ isAdmin, ...props }: EditProfileFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "user",
    },
  });
  const { reset } = form;

  useEffect(() => {
    reset({
      name: props.name,
      email: props.email,
      role: props.role,
    });
  }, [reset, props.name, props.email, props.role]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      saveUserProfile(data); // Передаем объект данных напрямую

      toast({
        title: "Profile updated successfully",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Update failed",
        description:
          "There was an error updating your profile. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6 max-w-sm"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ваше имя</FormLabel>
              <FormControl>
                <Input placeholder="Имя не задано" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email не задан"
                  {...field}
                  disabled={!isAdmin}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Роль</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={!isAdmin}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="user">Пользователь</SelectItem>
                  <SelectItem value="admin">Администратор</SelectItem>
                  <SelectItem value="client">Клиент</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Выберите роль</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

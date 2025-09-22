"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Loader2Icon } from "lucide-react";
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
import { PhoneInput } from "./ui/phone-input";
import { YandexCaptcha } from "@/components/smart-captcha";
import { useState } from "react";
import { submitContactForm } from "@/actions/send-form";
import { usePathname } from "next/navigation";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Имя не может быть короче 2 символов",
  }),
  phone: z.string().min(1, { message: "Укажите номер телефона" }),
  // Требуем наличие токена от капчи
  captchaToken: z.string().min(1, { message: "Подтвердите, что вы не робот" }),
});

type FormValues = z.infer<typeof FormSchema>;

interface ContactFormProps {
  onSuccess?: () => void;
}

export function ContactForm({ onSuccess }: ContactFormProps) {
  const [captchaSolved, setCaptchaSolved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaKey, setCaptchaKey] = useState(0);
  const pathname = usePathname();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      phone: "",
      captchaToken: "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: FormValues) {
    // Дополнительная проверка капчи перед отправкой
    if (!captchaSolved || !data.captchaToken) {
      toast.error("Пожалуйста, пройдите проверку капчи");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitContactForm({
        username: data.username,
        phone: data.phone,
        captchaToken: data.captchaToken,
        url: process.env.NEXT_PUBLIC_BASE_URL + pathname,
      });

      if (result.success) {
        toast.success("Заявка успешно отправлена!", {
          description: result.message,
        });

        // Сбрасываем форму после успешной отправки
        form.reset({
          username: "",
          phone: "",
          captchaToken: "",
        });
        setCaptchaSolved(false);

        // Сбрасываем капчу
        setCaptchaKey((prev) => prev + 1);

        // Вызываем функцию закрытия модального окна
        onSuccess?.();
      } else {
        toast.error("Ошибка отправки формы", {
          description: result.error,
        });
      }
    } catch (error) {
      console.error("Ошибка отправки формы:", error);
      toast.error("Ошибка отправки формы", {
        description: "Попробуйте позже",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="m-0">Ваше имя</FormLabel>
              <FormControl>
                <Input placeholder="Тони Старк" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="m-0">Номер телефона</FormLabel>
              <FormControl>
                <PhoneInput
                  defaultCountry="RU"
                  countryCallingCodeEditable={false}
                  international
                  placeholder="Ваш номер"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Скрытое поле под токен — чтобы schema его видела */}
        <input type="hidden" {...form.register("captchaToken")} />

        <div className="space-y-2">
          <YandexCaptcha
            key={captchaKey}
            onVerify={(token) => {
              form.setValue("captchaToken", token, {
                shouldValidate: true,
                shouldDirty: true,
              });
              setCaptchaSolved(true);
            }}
            onInvalidate={() => {
              form.setValue("captchaToken", "", {
                shouldValidate: true,
                shouldDirty: true,
              });
              setCaptchaSolved(false);
            }}
            language="ru"
            test={false}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={!captchaSolved || isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex flex-row gap-2 items-center">
              <Loader2Icon className="animate-spin" /> Отправка
            </div>
          ) : (
            "Отправить"
          )}
        </Button>
      </form>
    </Form>
  );
}

"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { YandexCaptcha } from "./smart-captcha";
import { submitContactForm } from "@/actions/send-form";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ContactFormProps {
  trigger: string;
  className?: string;
}

const formSchema = z.object({
  yourName: z.string().min(2, "Имя должно содержать не менее 2 символов."),
  yourPhone: z
    .string()
    .min(10, "Номер телефона должен содержать не менее 10 символов."),
  captchaToken: z.string().min(1, "Необходимо пройти проверку капчи."),
});

export function ContactForm({ trigger, className }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetCaptcha, setResetCaptcha] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      yourName: "",
      yourPhone: "",
      captchaToken: "",
    },
  });

  const handleCaptchaVerify = (token: string) => {
    form.setValue("captchaToken", token);
  };

  const handleCaptchaInvalidate = () => {
    form.setValue("captchaToken", "");
  };

  const handleResetCaptcha = () => {
    form.setValue("captchaToken", "");
    setResetCaptcha((prev) => prev + 1); // Принудительно перерендериваем капчу
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (isSubmitting) return; // Предотвращаем множественные отправки

    try {
      setIsSubmitting(true);
      // Показываем состояние загрузки
      toast.loading("Отправка формы...", { id: "form-submit" });

      // Подготавливаем данные для отправки
      const formSubmissionData = {
        username: data.yourName,
        phone: data.yourPhone,
        captchaToken: data.captchaToken,
        url: window.location.href,
      };

      // Отправляем форму
      const result = await submitContactForm(formSubmissionData);

      if (result.success) {
        toast.success("Форма отправлена!", {
          description: result.message,
          id: "form-submit",
        });
        // Сбрасываем форму после успешной отправки
        form.reset();
        handleResetCaptcha();
        // Закрываем диалог только после успешной отправки
        setIsOpen(false);
      } else {
        toast.error("Ошибка отправки", {
          description: result.error || "Произошла ошибка при отправке формы",
          id: "form-submit",
        });
      }
    } catch (error) {
      toast.error("Ошибка отправки", {
        description: "Произошла неожиданная ошибка. Попробуйте еще раз.",
        id: "form-submit",
      });
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        <Button variant={"default"} size={"lg"} className={cn(className)}>
          {trigger}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Заявка на проект</DialogTitle>
          <DialogDescription>
            Оставьте ваши контактные данные. Я свяжусь с вами в течении 15
            минут.
          </DialogDescription>
        </DialogHeader>

        <form id="contact-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="flex flex-col gap-0">
            <Controller
              name="yourName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="contact-form-name" className="p-0 m-0">
                    Ваше имя
                  </FieldLabel>
                  <Input
                    {...field}
                    id="contact-form-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Введите ваше имя"
                    autoComplete="name"
                  />
                  <div className="min-h-[1.25rem]">
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                </Field>
              )}
            />
            <Controller
              name="yourPhone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="contact-form-phone" className="p-0 m-0">
                    Номер телефона
                  </FieldLabel>
                  <Input
                    {...field}
                    id="contact-form-phone"
                    aria-invalid={fieldState.invalid}
                    placeholder="+7 (999) 123-45-67"
                    autoComplete="tel"
                    type="tel"
                  />
                  <div className="min-h-[1.25rem]">
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                </Field>
              )}
            />
            <Field className="rounded-md">
              <YandexCaptcha
                key={resetCaptcha}
                onVerify={handleCaptchaVerify}
                onInvalidate={handleCaptchaInvalidate}
                language="ru"
                theme="dark"
              />
              <div className="min-h-[1.25rem]">
                {form.formState.errors.captchaToken && (
                  <FieldError errors={[form.formState.errors.captchaToken]} />
                )}
              </div>
            </Field>
          </FieldGroup>
        </form>

        <DialogFooter>
          <Field orientation="horizontal" className="w-full">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset();
                handleResetCaptcha();
              }}
              disabled={isSubmitting}
              className="w-1/3"
            >
              Сбросить
            </Button>

            <Button
              type="submit"
              form="contact-form"
              disabled={isSubmitting}
              className="w-2/3"
            >
              {isSubmitting ? "Отправка..." : "Отправить"}
            </Button>
          </Field>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { contactRequestSchema } from "@/features/contact-request/model/schema";
import { submitContactRequest } from "@/features/contact-request/api/submit-contact-request";
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { YandexCaptcha } from "./smart-captcha";

const formSchema = contactRequestSchema.omit({ url: true });

type FormValues = z.infer<typeof formSchema>;

interface ContactRequestFormProps {
  onSuccess?: () => void;
}

export function ContactRequestForm({ onSuccess }: ContactRequestFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetCaptcha, setResetCaptcha] = useState(0);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      phone: "",
      captchaToken: "",
    },
  });

  const handleCaptchaVerify = (token: string) => {
    form.setValue("captchaToken", token);
  };

  const handleCaptchaInvalidate = () => {
    form.setValue("captchaToken", "");
  };

  const handleReset = () => {
    form.reset();
    setResetCaptcha((prev) => prev + 1);
  };

  const handleSuccess = () => {
    handleReset();
    onSuccess?.();
  };

  async function onSubmit(data: FormValues) {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    toast.loading("Отправка формы...", { id: "contact-request" });

    try {
      const result = await submitContactRequest({
        ...data,
        url: typeof window !== "undefined" ? window.location.href : undefined,
      });

      if (result.success) {
        toast.success("Форма отправлена!", {
          description: result.message,
          id: "contact-request",
        });
        handleSuccess();
      } else {
        const description =
          typeof result.error === "string"
            ? result.error
            : "Произошла ошибка при отправке формы";

        toast.error("Ошибка отправки", {
          description,
          id: "contact-request",
        });
      }
    } catch (error) {
      console.error("[ContactRequestForm] Ошибка отправки", error);
      toast.error("Ошибка отправки", {
        description: "Произошла неожиданная ошибка. Попробуйте ещё раз.",
        id: "contact-request",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Заявка на проект</DialogTitle>
        <DialogDescription>
          Оставьте ваши контактные данные. Я свяжусь с вами в течение 15 минут.
        </DialogDescription>
      </DialogHeader>

      <form
        id="contact-request-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-4"
      >
        <FieldGroup className="flex flex-col gap-4">
          <Controller
            name="username"
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
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </div>
              </Field>
            )}
          />

          <Controller
            name="phone"
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
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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

      <DialogFooter className="mt-6 gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          disabled={isSubmitting}
          className="w-1/3"
        >
          Сбросить
        </Button>

        <Button
          type="submit"
          form="contact-request-form"
          disabled={isSubmitting}
          className="w-2/3"
        >
          {isSubmitting ? "Отправка..." : "Отправить"}
        </Button>
      </DialogFooter>
    </>
  );
}

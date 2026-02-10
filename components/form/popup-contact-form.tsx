"use client";
import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { sendForm } from "@/actions/send-form";

const formSchema = z.object({
  name: z.string().min(2, "Имя должно содержать не менее 2 символов"),
  phone: z
    .string()
    .min(10, "Телефон должен содержать не менее 10 символов")
    .max(15, "Телефон должен содержать не более 15 символов"),
  agreement: z.boolean().refine((value) => value, {
    message: "Вы должны согласиться с условиями обработки персональных данных",
  }),
});

type PopupContactFormProps = {
  buttonLabel?: string;
};

export function PopupContactForm({
  buttonLabel = "Начать проект",
}: PopupContactFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      sendForm(data);
      toast.success("Заявка отправлена!");
      setIsOpen(false);
      form.reset();
    } catch (error) {
      toast.error("Ошибка отправки заявки!");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-40">
          {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form id="contact-form" onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="text-xl">Перезвоните мне</DialogTitle>
            <DialogDescription>
              Заполните форму и мы свяжемся с вами в течении 15 минут
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="gap-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="contact-form-name">Имя</FieldLabel>
                  <Input
                    {...field}
                    id="contact-form-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Введите ваше имя"
                    autoComplete="given-name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="contact-form-phone">Телефон</FieldLabel>
                  <Input
                    {...field}
                    id="contact-form-phone"
                    aria-invalid={fieldState.invalid}
                    placeholder="+7 (999) 999-99-99"
                    autoComplete="tel-national"
                    type="tel"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Field orientation="horizontal">
              <Checkbox
                checked={checked}
                onCheckedChange={() => setChecked(!checked)}
                id="contact-form-agreement"
                name="contact-form-agreement"
              />
              <FieldLabel htmlFor="contact-form-agreement">
                <Link
                  href="/privacy-policy"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Я согласен с условиямиобработки персональных данных
                </Link>
              </FieldLabel>
            </Field>
          </FieldGroup>
          <DialogFooter className="mt-4">
            <Button
              type="submit"
              disabled={isLoading || !checked}
              className="w-full"
            >
              {isLoading ? "Отправка..." : "Отправить"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

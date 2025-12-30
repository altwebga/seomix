"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { createRequestWebsite } from "@/actions/request-website";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  client: z.string().trim().min(1, "Укажите ваше имя"),
  phone: z
    .string()
    .trim()
    .min(1, "Укажите номер телефона")
    .regex(/^\+?[\d\s()-]{7,20}$/, "Некорректный номер телефона"),
  agreement: z.boolean().refine(Boolean, {
    message: "Нужно согласиться на обработку данных",
  }),
});

export function ContactForm() {
  const [open, setOpen] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      client: "",
      phone: "",
      agreement: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createRequestWebsite({
        ...values,
        page_url: window.location.href,
      });

      toast.success("Заявка отправлена");
      setOpen(false);
      form.reset();
    } catch (e) {
      toast.error("Не удалось отправить заявку");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" type="button">
          Начать проект
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Заявка на звонок</DialogTitle>
            <DialogDescription>
              Оставьте свой номер и мы перезвоним вам в течение 15 минут.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="flex flex-col gap-4">
            {/* Имя */}
            <Controller
              name="client"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="m-0">Имя</FieldLabel>
                  <Input {...field} placeholder="Тони Старк" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Телефон */}
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="m-0">Номер телефона</FieldLabel>
                  <Input {...field} placeholder="+7 123 456 7890" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Согласие */}
            <Controller
              name="agreement"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(v) => field.onChange(Boolean(v))}
                    />
                    <FieldLabel className="m-0">
                      Я согласен(а) на обработку персональных данных
                    </FieldLabel>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <DialogFooter className="mt-4">
            <Button type="submit" className="w-full">
              Отправить
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

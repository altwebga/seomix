"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  TronCard,
  TronCardContent,
  TronCardDescription,
  TronCardFooter,
  TronCardHeader,
  TronCardTitle,
} from "../thegridcn/card"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Имя должно быть не менее 1 символа")
    .max(32, "Имя должно быть не более 32 символов"),
  tel: z
    .string()
    .min(8, "Номер телефона должен быть не менее 8 символов")
    .max(12, "Номер телефона должен быть не более 12 символов"),
  message: z
    .string()
    .min(10, "Сообщение должно быть не менее 10 символов")
    .max(250, "Сообщение должно быть не более 250 символов"),
})

export function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      tel: "",
      message: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    })
  }

  return (
    <TronCard className="w-full px-2 sm:max-w-md">
      <TronCardHeader>
        <TronCardTitle className="text-2xl">Оставьте заявку</TronCardTitle>
        <TronCardDescription>
          Свяжитесь с нами — обсудим ваш проект и подберём оптимальное решение.
        </TronCardDescription>
      </TronCardHeader>
      <TronCardContent>
        <form id="contact-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="contact-form-name">Ваше имя</FieldLabel>
                  <Input
                    {...field}
                    id="contact-form-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Тони Старк"
                    autoComplete="name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="tel"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="contact-form-tel">
                    Номер телефона
                  </FieldLabel>
                  <Input
                    {...field}
                    id="contact-form-tel"
                    aria-invalid={fieldState.invalid}
                    placeholder="+7 999 999 99 99"
                    autoComplete="tel"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="message"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="contact-form-message">
                    Сообщение
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="contact-form-message"
                      placeholder="Что вы хотели бы обсудить?"
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/250 символов
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription>
                    Расскажите подробнее о вашем проекте
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </TronCardContent>
      <TronCardFooter>
        <Field
          orientation="horizontal"
          className="flex flex-row justify-between"
        >
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            className="rounded border border-primary/30 px-5 py-2 font-mono text-[10px] tracking-widest text-foreground/60 uppercase transition-colors hover:border-primary/50 hover:text-primary"
          >
            Сбросить
          </Button>
          <Button
            type="submit"
            form="contact-form"
            className="rounded border border-primary bg-primary/20 px-5 py-2 font-mono text-[10px] tracking-widest text-primary uppercase shadow-[0_0_12px_rgba(var(--primary-rgb,0,180,255),0.15)] transition-all duration-300 hover:bg-primary/30"
          >
            Отправить
          </Button>
        </Field>
      </TronCardFooter>
    </TronCard>
  )
}

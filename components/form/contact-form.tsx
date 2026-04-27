"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { sendForm } from "@/actions/send-form"
import Link from "next/link"
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
import { SmartCaptchaWidget } from "../shared/smart-captcha"

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Имя должно быть не менее 1 символа")
    .max(32, "Имя должно быть не более 32 символов"),
  phone: z
    .string()
    .min(8, "Номер телефона должен быть не менее 8 символов")
    .max(12, "Номер телефона должен быть не более 12 символов"),
  message: z
    .string()
    .max(2000, "Сообщение должно быть не более 2000 символов")
    .trim()
    .optional()
    .or(z.literal("")),
})

export function ContactForm() {
  const [captchaToken, setCaptchaToken] = React.useState("")
  const [agreement, setAgreement] = React.useState(true)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      message: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!agreement) {
      toast.error("Нужно согласиться на обработку персональных данных")
      return
    }

    if (!captchaToken) {
      toast.error("Подтвердите, что вы не робот")
      return
    }

    const res = await sendForm({
      ...data,
      url: window.location.href,
    })

    if (!res.ok) {
      toast.error(res.error || "Ошибка при отправке формы")
      return
    }

    toast.success("Заявка отправлена")
    form.reset()
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
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="contact-form-phone">
                    Номер телефона
                  </FieldLabel>
                  <Input
                    {...field}
                    id="contact-form-phone"
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
                        {field.value ? field.value.length : 0}/2000 символов
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
            <SmartCaptchaWidget onToken={setCaptchaToken} language="ru" />

            <Field>
              <div className="ml-2 flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={agreement}
                  onChange={(e) => setAgreement(e.target.checked)}
                  className="h-4 w-4 shrink-0 rounded-[4px] border border-input accent-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                />

                <Link
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener"
                  className="cursor-pointer"
                >
                  Я согласен(а) на обработку персональных данных
                </Link>
              </div>
            </Field>
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
            disabled={
              !agreement || !captchaToken || form.formState.isSubmitting
            }
          >
            Отправить
          </Button>
        </Field>
      </TronCardFooter>
    </TronCard>
  )
}

"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { sendForm } from "@/actions/send-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { SmartCaptchaWidget } from "../shared/smart-captcha"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Имя должно быть не менее 1 символа")
    .max(32, "Имя должно быть не более 32 символов"),
  phone: z
    .string()
    .min(8, "Номер телефона должен быть не менее 8 символов")
    .max(12, "Номер телефона должен быть не более 12 символов"),
})

interface CallMeFormProps {
  modalButtonText: string
}

export function CallMeForm({
  modalButtonText = "Начать проект",
}: CallMeFormProps) {
  const [captchaToken, setCaptchaToken] = useState("")
  const [agreement, setAgreement] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
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
    setModalOpen(false)
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button
          size={"lg"}
          className="rounded border border-primary bg-primary/20 px-5 py-2 font-mono text-[10px] tracking-widest text-primary uppercase shadow-[0_0_12px_rgba(var(--primary-rgb,0,180,255),0.15)] transition-all duration-300 hover:bg-primary/30"
        >
          {modalButtonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full rounded-sm p-8 md:min-w-xl">
        <DialogHeader className="flex flex-col gap-4 py-4">
          <DialogTitle className="text-2xl">Оставьте заявку</DialogTitle>
          <DialogDescription className="font-mono text-xs">
            Свяжитесь с нами — обсудим ваш проект и подберём оптимальное
            решение.
          </DialogDescription>
        </DialogHeader>
        <form id="call-me-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="flex flex-col gap-4 md:flex-row">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="call-me-form-name">
                      Ваше имя
                    </FieldLabel>
                    <Input
                      {...field}
                      id="call-me-form-name"
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
                    <FieldLabel htmlFor="call-me-form-phone">
                      Номер телефона
                    </FieldLabel>
                    <Input
                      {...field}
                      id="call-me-form-phone"
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
            </div>
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
        <DialogFooter>
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
              form="call-me-form"
              className="rounded border border-primary bg-primary/20 px-5 py-2 font-mono text-[10px] tracking-widest text-primary uppercase shadow-[0_0_12px_rgba(var(--primary-rgb,0,180,255),0.15)] transition-all duration-300 hover:bg-primary/30"
              disabled={
                !agreement || !captchaToken || form.formState.isSubmitting
              }
            >
              Отправить
            </Button>
          </Field>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

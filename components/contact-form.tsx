"use client";

import { useState } from "react";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { useForm, SubmitHandler } from "react-hook-form";

import { sendContactForm } from "@/app/contact/actions"; // Импортируем Server Action

type Inputs = {
  name: string;
  phone: string;
  message?: string;
};

export function ContactForm() {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    const result = await sendContactForm(data); // Вызов серверного действия

    setLoading(false);

    if (result.success) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  };

  return (
    <div className="mt-8 p-4 border border-gray-300 rounded-md flex flex-col gap-4">
      {success === null && (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              className="max-w-xs"
              errorMessage={errors.name?.message}
              isInvalid={!!errors.name}
              label="Ваше имя"
              placeholder="Иван Иванович"
              type="text"
              {...register("name", { required: "Пожалуйста, введите имя" })}
              variant="bordered"
            />
            <Input
              className="max-w-xs"
              errorMessage={errors.phone?.message}
              isInvalid={!!errors.phone}
              label="Номер телефона"
              placeholder="+7 (999) 999-99-99"
              type="text"
              {...register("phone", {
                required: "Пожалуйста, введите номер телефона",
                pattern: {
                  value: /^\+?[1-9]\d{1,14}$/,
                  message: "Некорректный номер телефона",
                },
              })}
              variant="bordered"
            />
          </div>
          <Textarea
            className="max-w-2xl"
            label="Ваше сообщение"
            labelPlacement="outside"
            placeholder="Ваше сообщение (не обязательно)"
            variant="bordered"
            {...register("message")}
          />

          <Checkbox isSelected={isSelected} onValueChange={setIsSelected}>
            Selected: {isSelected ? "true" : "false"}
          </Checkbox>

          <Button
            className="max-w-xs"
            color="primary"
            isDisabled={!isSelected || loading}
            isLoading={loading}
            type="submit"
          >
            Submit
          </Button>
        </form>
      )}
      {success === true && <p>Форма успешно отправлена!</p>}
      {success === false && <p>Ошибка при отправке формы. Попробуйте позже.</p>}
    </div>
  );
}

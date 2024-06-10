"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { title } from "@/components/primitives";
import { Input, Textarea } from "@nextui-org/input";
import {
  UserIcon,
  DevicePhoneMobileIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { socialLinks } from "@/config/socialLink";
import { Link } from "@nextui-org/link";

interface FormData {
  name: string;
  phone: string;
  message: string;
  privacyPolicy: boolean;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    message: "",
    privacyPolicy: false,
  });
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleCheckboxChange = (isSelected: boolean) => {
    setFormData({
      ...formData,
      privacyPolicy: isSelected,
    });
  };

  const validateForm = () => {
    let valid = true;
    let newErrors: { [key: string]: string } = {};

    if (!formData.name) {
      valid = false;
      newErrors.name = "Имя обязательно для заполнения";
    }
    if (!formData.phone) {
      valid = false;
      newErrors.phone = "Номер телефона обязателен для заполнения";
    }
    if (!formData.message) {
      valid = false;
      newErrors.message = "Сообщение обязательно для заполнения";
    }
    if (!formData.privacyPolicy) {
      valid = false;
      newErrors.privacyPolicy =
        "Необходимо согласие с политикой конфиденциальности";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setResponseMessage(data.message);
    setIsLoading(false);
  };

  return (
    <div className="my-5">
      <h1 className={title()}>Мои контакты</h1>
      <div className="flex flex-col md:flex-row py-6">
        <div className="w-full md:w-1/2">
          <h3 className="py-4 text-2xl">Я в социальных сетях</h3>
          <p className="py-4 max-w-lg">
            Я не публикую номер телефона т.к. не хочу попасть в базу спам
            звонков. Вы можете легко получить его перейдя в любой из моих
            социальных аккаунтов.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
            {socialLinks.map((item, index) => (
              <li key={index}>
                <Link href={item.url} isExternal showAnchorIcon size="lg">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-1/2">
          <h3 className="py-4 text-2xl">Напишите мне</h3>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 border border-gray-400 p-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                type="text"
                label="Ваше имя"
                placeholder="Иван"
                name="name"
                value={formData.name}
                onValueChange={(value) => handleInputChange("name", value)}
                labelPlacement="outside"
                startContent={<UserIcon className="w-6 h-6" />}
                isInvalid={!!errors.name}
                errorMessage={errors.name}
                isRequired
              />

              <Input
                type="text"
                label="Номер телефона"
                placeholder="+7 123 456 7788"
                name="phone"
                value={formData.phone}
                onValueChange={(value) => handleInputChange("phone", value)}
                labelPlacement="outside"
                startContent={<DevicePhoneMobileIcon className="w-6 h-6" />}
                isInvalid={!!errors.phone}
                errorMessage={errors.phone}
                isRequired
              />
            </div>
            <Textarea
              label="Ваше сообщение"
              placeholder="Сообщение"
              name="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              labelPlacement="outside"
              startContent={<PencilIcon className="w-6 h-6" />}
              isInvalid={!!errors.message}
              errorMessage={errors.message}
              isRequired
            />
            <Checkbox
              name="privacyPolicy"
              isSelected={formData.privacyPolicy}
              onValueChange={handleCheckboxChange}
              isInvalid={!!errors.privacyPolicy}
            >
              <a href="/privacy-policy/" target="_blank">
                Согласен(а) с политикой конфиденциальности
              </a>
            </Checkbox>
            <Button
              color="primary"
              type="submit"
              isLoading={isLoading}
              isDisabled={!formData.privacyPolicy || isLoading}
              spinnerPlacement="start"
            >
              {isLoading ? "Отправка..." : "Отправить"}
            </Button>
          </form>
          {responseMessage && <p>{responseMessage}</p>}
        </div>
      </div>
    </div>
  );
}

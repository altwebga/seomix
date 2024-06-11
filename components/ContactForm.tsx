"use client";

import { useState, useEffect, FormEvent } from "react";
import { Input, Textarea } from "@nextui-org/input";
import {
  UserIcon,
  DevicePhoneMobileIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";

interface FormData {
  name: string;
  phone: string;
  message: string;
  privacyPolicy: boolean;
  pagePath: string; // Новое поле для хранения пути страницы
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    message: "",
    privacyPolicy: false,
    pagePath: "", // Инициализация нового поля
  });
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Установите путь страницы при загрузке компонента
    setFormData((prevData) => ({
      ...prevData,
      pagePath: window.location.pathname,
    }));
  }, []);

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
      newErrors.name = "Введите ваше имя";
    }
    if (!formData.phone) {
      valid = false;
      newErrors.phone = "Введите ваш номер телефона";
    }
    if (!formData.message) {
      valid = false;
      newErrors.message = "Введите сообщение";
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
        {/* Скрытое поле для пути страницы */}
        <input type="hidden" name="pagePath" value={formData.pagePath} />
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
      {responseMessage && <p className="text-green-600 text-center">{responseMessage}</p>}
    </div>
  );
}

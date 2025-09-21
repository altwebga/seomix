"use server";
import nodemailer from "nodemailer";
import { z } from "zod";

// Схема валидации данных формы
const ContactFormSchema = z.object({
  username: z.string().min(2, {
    message: "Имя не может быть короче 2 символов",
  }),
  phone: z.string().min(1, { message: "Укажите номер телефона" }),
  captchaToken: z.string().min(1, { message: "Подтвердите, что вы не робот" }),
});

// Тип данных формы
type FormDataType = {
  name: string;
  phone: string;
  url: string;
};

// Функция для валидации Yandex Smart Captcha
async function validateYandexCaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.YANDEX_SMART_CAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error("YANDEX_SMART_CAPTCHA_SECRET_KEY не установлен");
    return false;
  }

  try {
    const response = await fetch(
      "https://smartcaptcha.yandexcloud.net/validate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: secretKey,
          token: token,
          ip: "127.0.0.1", // В продакшене нужно получать реальный IP
        }),
      }
    );

    const result = await response.json();
    return result.status === "ok";
  } catch (error) {
    console.error("Ошибка валидации капчи:", error);
    return false;
  }
}

// Внутренняя функция для отправки email
async function sendFormSMTP(formData: FormDataType) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: "Заявка с сайта",
      text: `Имя: ${formData.name}\nТелефон: ${formData.phone}\nСсылка: ${formData.url}`,
      html: `
        <h1>Новая заявка с сайта</h1>
        <p><strong>Имя:</strong> ${formData.name}</p>
        <p><strong>Телефон:</strong> ${formData.phone}</p>
        <p><strong>Ссылка:</strong> <a href="${formData.url}">${
        formData.url
      }</a></p>
        <p><strong>Дата:</strong> ${new Date().toLocaleString("ru-RU")}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email успешно отправлен");
  } catch (error) {
    console.error("Ошибка отправки email:", error);
    throw new Error("Не удалось отправить заявку. Попробуйте позже.");
  }
}

// Основная server action для обработки формы
export async function submitContactForm(formData: {
  username: string;
  phone: string;
  captchaToken: string;
  url: string;
}) {
  try {
    // Валидация данных формы
    const validatedData = ContactFormSchema.parse(formData);

    // Валидация капчи
    const isCaptchaValid = await validateYandexCaptcha(
      validatedData.captchaToken
    );

    if (!isCaptchaValid) {
      return {
        success: false,
        error: "Неверная капча. Пожалуйста, пройдите проверку заново.",
      };
    }

    // Отправляем email
    await sendFormSMTP({
      name: validatedData.username,
      phone: validatedData.phone,
      url: formData.url,
    });

    return {
      success: true,
      message:
        "Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.",
    };
  } catch (error) {
    console.error("Ошибка обработки формы:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Неверные данные формы",
        details: error.issues,
      };
    }

    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Внутренняя ошибка сервера",
    };
  }
}

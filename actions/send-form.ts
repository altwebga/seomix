"use server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { headers } from "next/headers";

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
  timestamp: string;
  clientIP: string;
  clientInfo: {
    userAgent: string;
    referer: string;
    language: string;
  };
};

// Функция для получения IP-адреса пользователя
async function getClientIP(): Promise<string> {
  const headersList = await headers();

  // Получаем заголовки из Next.js headers
  const forwarded = headersList.get("x-forwarded-for");
  const realIP = headersList.get("x-real-ip");
  const cfConnectingIP = headersList.get("cf-connecting-ip"); // Cloudflare
  const xClientIP = headersList.get("x-client-ip");

  // Приоритет заголовков (от более надежных к менее надежным)
  if (cfConnectingIP) {
    return cfConnectingIP.split(",")[0].trim();
  }

  if (xClientIP) {
    return xClientIP.split(",")[0].trim();
  }

  if (realIP) {
    return realIP.split(",")[0].trim();
  }

  if (forwarded) {
    // x-forwarded-for может содержать несколько IP через запятую
    // Первый IP - это оригинальный клиент
    return forwarded.split(",")[0].trim();
  }

  // Fallback для разработки
  return "127.0.0.1";
}

// Функция для получения информации о клиенте
async function getClientInfo(): Promise<{
  userAgent: string;
  referer: string;
  language: string;
}> {
  const headersList = await headers();

  return {
    userAgent: headersList.get("user-agent") || "Неизвестно",
    referer: headersList.get("referer") || "Прямой переход",
    language: headersList.get("accept-language")?.split(",")[0] || "Неизвестно",
  };
}

// Функция для валидации Yandex Smart Captcha
async function validateYandexCaptcha(
  token: string,
  clientIP: string
): Promise<boolean> {
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
          ip: clientIP, // Используем реальный IP пользователя
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
      text: `Имя: ${formData.name}\nТелефон: ${formData.phone}\nСсылка: ${formData.url}\nВремя отправки: ${formData.timestamp}\nIP-адрес: ${formData.clientIP}\nБраузер: ${formData.clientInfo.userAgent}\nИсточник: ${formData.clientInfo.referer}\nЯзык: ${formData.clientInfo.language}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">Новая заявка с сайта</h1>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #495057; margin-top: 0;">Контактная информация</h2>
            <p><strong>Имя:</strong> ${formData.name}</p>
            <p><strong>Телефон:</strong> <a href="tel:${formData.phone}">${formData.phone}</a></p>
            <p><strong>Ссылка:</strong> <a href="${formData.url}" target="_blank">${formData.url}</a></p>
          </div>
          
          <div style="background: #e9ecef; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #495057; margin-top: 0;">Техническая информация</h2>
            <p><strong>Время отправки:</strong> ${formData.timestamp}</p>
            <p><strong>IP-адрес:</strong> <code style="background: #fff; padding: 2px 4px; border-radius: 3px;">${formData.clientIP}</code></p>
            <p><strong>Источник перехода:</strong> ${formData.clientInfo.referer}</p>
            <p><strong>Язык браузера:</strong> ${formData.clientInfo.language}</p>
          </div>
          
          <div style="background: #d1ecf1; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0c5460; margin-top: 0;">Информация о браузере</h3>
            <p style="word-break: break-all; font-size: 12px; color: #666;">${formData.clientInfo.userAgent}</p>
          </div>
        </div>
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

    // Получаем IP-адрес пользователя из заголовков запроса
    const clientIP = await getClientIP();

    // Получаем информацию о клиенте
    const clientInfo = await getClientInfo();

    // Создаем timestamp
    const timestamp = new Date().toLocaleString("ru-RU", {
      timeZone: "Europe/Moscow",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // Валидация капчи
    const isCaptchaValid = await validateYandexCaptcha(
      validatedData.captchaToken,
      clientIP
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
      timestamp,
      clientIP,
      clientInfo,
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

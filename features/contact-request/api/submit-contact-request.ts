"use server";

import { headers } from "next/headers";

import { contactRequestSchema } from "@/features/contact-request/model/schema";
import { getEmailTransporter } from "@/shared/lib/email";
import { getServerEnv } from "@/shared/config/server-env";
import { checkRateLimit } from "@/shared/lib/rate-limit";

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 минута
const RATE_LIMIT_ATTEMPTS = 3;
const CAPTCHA_TIMEOUT_MS = 5_000;

interface ContactRequestSuccess {
  success: true;
  message: string;
}

interface ContactRequestFailure {
  success: false;
  error: string;
  details?: unknown;
}

function getHeaderValue(headersList: Headers, key: string) {
  return headersList.get(key) ?? undefined;
}

function getClientIP(headersList: Headers) {
  const forwarded = getHeaderValue(headersList, "x-forwarded-for");
  const realIP = getHeaderValue(headersList, "x-real-ip");
  const cfConnectingIP = getHeaderValue(headersList, "cf-connecting-ip");
  const xClientIP = getHeaderValue(headersList, "x-client-ip");

  return (
    cfConnectingIP?.split(",")[0]?.trim() ||
    xClientIP?.split(",")[0]?.trim() ||
    realIP?.split(",")[0]?.trim() ||
    forwarded?.split(",")[0]?.trim() ||
    "127.0.0.1"
  );
}

async function validateCaptcha(token: string, clientIP: string) {
  const { YANDEX_SMART_CAPTCHA_SECRET_KEY } = getServerEnv();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CAPTCHA_TIMEOUT_MS);

  try {
    const response = await fetch(
      "https://smartcaptcha.yandexcloud.net/validate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: YANDEX_SMART_CAPTCHA_SECRET_KEY,
          token,
          ip: clientIP,
        }),
        signal: controller.signal,
      }
    );

    if (!response.ok) {
      throw new Error(
        `Ошибка валидации капчи: ${response.status} ${response.statusText}`
      );
    }

    const result = (await response.json()) as { status?: string };
    return result.status === "ok";
  } catch (error) {
    console.error("[Captcha] Ошибка валидации", error);
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

export async function submitContactRequest(
  payload: unknown
): Promise<ContactRequestSuccess | ContactRequestFailure> {
  const parsed = contactRequestSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      success: false,
      error: "Неверные данные формы",
      details: parsed.error.flatten(),
    };
  }

  const data = parsed.data;
  const headersList = headers();
  const clientIP = getClientIP(headersList);

  const rateLimit = checkRateLimit({
    identifier: clientIP,
    limit: RATE_LIMIT_ATTEMPTS,
    windowMs: RATE_LIMIT_WINDOW_MS,
  });

  if (!rateLimit.allowed) {
    return {
      success: false,
      error: `Слишком много попыток. Попробуйте снова через ${rateLimit.retryAfter} секунд`,
    };
  }

  const isCaptchaValid = await validateCaptcha(data.captchaToken, clientIP);

  if (!isCaptchaValid) {
    return {
      success: false,
      error: "Капча не пройдена. Попробуйте ещё раз.",
    };
  }

  const { EMAIL_FROM, EMAIL_TO } = getServerEnv();
  const transporter = await getEmailTransporter();

  const timestamp = new Date().toISOString();
  const userAgent = getHeaderValue(headersList, "user-agent") ?? "Неизвестно";
  const referer = getHeaderValue(headersList, "referer") ?? "Прямой переход";
  const language = getHeaderValue(headersList, "accept-language") ?? "Неизвестно";

  try {
    await transporter.sendMail({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      subject: "Новая заявка с сайта",
      text: `Имя: ${data.username}\nТелефон: ${data.phone}\nСсылка: ${
        data.url ?? "—"
      }\nВремя: ${timestamp}\nIP: ${clientIP}\nUserAgent: ${userAgent}\nReferer: ${referer}\nЯзык: ${language}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">Новая заявка с сайта</h1>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #495057; margin-top: 0;">Контактная информация</h2>
            <p><strong>Имя:</strong> ${data.username}</p>
            <p><strong>Телефон:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
            <p><strong>Ссылка:</strong> <a href="${data.url ?? ""}" target="_blank">${
        data.url ?? "—"
      }</a></p>
          </div>
          <div style="background: #e9ecef; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #495057; margin-top: 0;">Техническая информация</h2>
            <p><strong>Время отправки:</strong> ${timestamp}</p>
            <p><strong>IP-адрес:</strong> <code style="background: #fff; padding: 2px 4px; border-radius: 3px;">${clientIP}</code></p>
            <p><strong>Источник перехода:</strong> ${referer}</p>
            <p><strong>Язык браузера:</strong> ${language}</p>
          </div>
          <div style="background: #d1ecf1; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0c5460; margin-top: 0;">Информация о браузере</h3>
            <p style="word-break: break-all; font-size: 12px; color: #666;">${userAgent}</p>
          </div>
        </div>
      `,
    });

    return {
      success: true,
      message: "Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.",
    };
  } catch (error) {
    console.error("[ContactRequest] Ошибка отправки письма", error);

    return {
      success: false,
      error: "Не удалось отправить заявку. Попробуйте позже.",
    };
  }
}

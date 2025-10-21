"use client";

import React from "react";
import { SmartCaptcha } from "@yandex/smart-captcha";

const sitekey =
  process.env.NEXT_PUBLIC_YANDEX_SMART_CAPTCHA_CLIENT_KEY || "test";

export interface YandexCaptchaProps {
  /** Вернёт одноразовый токен после успешного прохождения капчи */
  onVerify: (token: string) => void;
  /** Сбрасываем токен, если истёк / ошибка (опционально) */
  onInvalidate?: () => void;
  /** RU/EN и т.п. */
  language?: "tr" | "ru" | "en" | "be" | "kk" | "tt" | "uk" | "uz";
  /** В режиме разработки удобно не включать тестовый режим = false */
  test?: boolean;
  /** "light" | "dark" — если нужно */
  theme?: "light" | "dark";
}

export const YandexCaptcha: React.FC<YandexCaptchaProps> = ({
  onVerify,
  onInvalidate,
  language = "ru",
  test = false,
  theme = "light",
}) => {
  // Библиотека эмитит onSuccess с токеном; в примерах также встречается onTokenExpired.
  const handleSuccess = (captchaToken: string) => {
    onVerify(captchaToken);
  };

  const handleExpired = () => {
    onInvalidate?.();
  };

  return (
    <div className="w-full">
      <SmartCaptcha
        sitekey={sitekey}
        onSuccess={handleSuccess}
        // многие примеры используют onTokenExpired

        onTokenExpired={handleExpired}
        language={language}
        test={test}
        theme={theme}
      />
    </div>
  );
};

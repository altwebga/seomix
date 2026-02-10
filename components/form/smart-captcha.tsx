"use client";

import { SmartCaptcha } from "@yandex/smart-captcha";

const sitekey = process.env.NEXT_PUBLIC_YANDEX_SMARTCAPTCHA_SITEKEY || "";

type Props = {
  onToken: (token: string) => void;
  resetKey: number;
};

export function YandexSmartCaptcha({ onToken, resetKey }: Props) {
  return (
    <SmartCaptcha
      key={resetKey}
      sitekey={sitekey}
      onSuccess={(token) => onToken(token)}
      onChallengeHidden={() => onToken("")}
      onNetworkError={() => onToken("")}
    />
  );
}

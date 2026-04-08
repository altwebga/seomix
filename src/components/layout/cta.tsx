"use client";

import { CTABanner } from "../thegridcn";

export function CTA() {
  return (
    <section id="cta" className="px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <CTABanner
          title="Готовы к запуску?"
          description="Оставьте заявку и мы свяжемся с вами в течение 24 часов"
          primaryAction={{
            label: "Начать проект",
            onClick: () => console.log("primary clicked"),
          }}
          secondaryAction={{
            label: "Примеры работ",
            onClick: () => console.log("secondary clicked"),
          }}
        />
      </div>
    </section>
  );
}

"use client";
import { cn } from "@/lib/utils";
import { CTABanner } from "../thegridcn/cta-banner";

interface CTAProps {
  title?: string;
  description?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function CTA({
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
}: CTAProps) {
  return (
    <section id="cta" className={cn(className)}>
      <div className="max-w-6xl mx-auto">
        <CTABanner
          title={title || "Готовы к запуску?"}
          description={
            description ||
            "Оставьте заявку и мы свяжемся с вами в течение 24 часов"
          }
          primaryAction={{
            label: primaryAction?.label || "Начать проект",
            onClick:
              primaryAction?.onClick || (() => console.log("primary clicked")),
          }}
          secondaryAction={{
            label: secondaryAction?.label || "Примеры работ",
            onClick:
              secondaryAction?.onClick ||
              (() => console.log("secondary clicked")),
          }}
        />
      </div>
    </section>
  );
}

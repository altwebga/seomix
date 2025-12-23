import { BackgroundImageTexture } from "@/components/ui/background-image";
import { TextEffect } from "@/components/ui/text-effect";

interface PagePlaceholderProps {
  title: string;
  description: string;
}

/**
 * Унифицированный плейсхолдер для статичных страниц,
 * чтобы они не отдавали 404, пока контент в разработке.
 */
export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <section className="min-h-[60vh]">
      <BackgroundImageTexture
        variant="grid-noise"
        opacity={0.25}
        className="w-full"
      >
        <div className="container mx-auto px-4 py-16 space-y-6">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Страница в разработке
          </p>
          <h1 className="text-4xl font-semibold sm:text-5xl">{title}</h1>
          <TextEffect className="max-w-2xl text-lg text-muted-foreground">
            {description}
          </TextEffect>
        </div>
      </BackgroundImageTexture>
    </section>
  );
}

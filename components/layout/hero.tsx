import { BackgroundImageTexture } from "../ui/background-image";
import { Button } from "../ui/button";
import { RainbowButton } from "../ui/rainbow-button";
import { TextEffect } from "../ui/text-effect";

export function Hero() {
  return (
    <section className="h-[80vh]">
      <BackgroundImageTexture
        variant="debut-light"
        opacity={0.2}
        className="h-[80vh]"
      >
        <div className="container mx-auto px-4 space-y-4">
          <h1>text</h1>
          <TextEffect>
            Создаем эффективные сайты, запускаем SEO и рекламу, настраиваем
            аналитику и помогаем бизнесу расти. Работаем на результат — если не
            понравится, вернем деньги.
          </TextEffect>
          <RainbowButton variant={"outline"} className="hover:translate-2">
            Rainbow Button
          </RainbowButton>
          <Button>acascac</Button>
        </div>
      </BackgroundImageTexture>
    </section>
  );
}

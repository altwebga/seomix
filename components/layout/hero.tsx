import { BackgroundImageTexture } from "../ui/background-image";
import { Button } from "../ui/button";
import { RainbowButton } from "../ui/rainbow-button";
import { TextEffect } from "../ui/text-effect";
import Image from "next/image";

export function Hero() {
  return (
    <section className="h-[80vh]">
      <BackgroundImageTexture
        variant="debut-light"
        opacity={0.4}
        className="h-[80vh] flex flex-col justify-center"
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row">
          <div className="w-1/3 hidden md:flex justify-center">
            <Image
              src={"/img/hero_image.png"}
              alt="hero image"
              width={350}
              height={400}
              className="w-auto object-cover"
            />
          </div>
          <div className="md:w-2/3 space-y-8 flex flex-col justify-center">
            <h1 className="flex flex-col md:text-4xl">
              Разработка и продвижение сайтов{" "}
              <span className="text-5xl md:text-8xl font-extrabold">
                в Краснодаре
              </span>
            </h1>
            <TextEffect className="max-w-2xl">
              Создаем эффективные сайты, запускаем SEO и рекламу, настраиваем
              аналитику и помогаем бизнесу расти. Работаем на результат — если
              не понравится, вернем деньги.
            </TextEffect>
            <div className="flex gap-6">
              <RainbowButton className="hover:translate-1" size={"lg"}>
                Начать проект
              </RainbowButton>
              <Button
                variant={"outline"}
                className="hover:translate-1"
                size={"lg"}
              >
                Приметры работ
              </Button>
            </div>
          </div>
        </div>
      </BackgroundImageTexture>
    </section>
  );
}

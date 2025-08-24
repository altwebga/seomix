import Image from "next/image";
type HeroProps = {
  cityPrep: string;
  description: string;
  bgImage: string;
};

export function Hero({ cityPrep, description, bgImage }: HeroProps) {
  return (
    <section className="bg-background/80">
      <div className="container mx-auto px-4 h-[80vh] flex flex-col justify-center gap-4">
        <h1 className="flex flex-col gap-4 max-w-4xl">
          Разработка и продвижение сайтов{" "}
          <span className="text-4xl md:text-8xl text-primary">{cityPrep}</span>
        </h1>
        {description ? (
          <span dangerouslySetInnerHTML={{ __html: description }} />
        ) : (
          <p>
            Создаем эффективные сайты, запускаем SEO и рекламу, настраиваем
            аналитику и помогаем бизнесу расти. Работаем на результат — если не
            понравится, вернем деньги.
          </p>
        )}
      </div>
      <Image
        src={bgImage}
        alt={cityPrep}
        width={"1440"}
        height={"1440"}
        className="absolute top-0 left-0 z-[-1] object-cover w-full h-[80vh]"
      />
    </section>
  );
}

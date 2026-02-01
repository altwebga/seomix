import { AuroraText } from "../ui/aurora-text";

const text = {
  title: "Разработка и продвижение сайтов ",
  inCity: "в Краснодаре",
  subtitle:
    "Создаем эффективные сайты, запускаем SEO и рекламу, настраиваем аналитику и помогаем бизнесу расти. Работаем на результат — если не понравится, вернем деньги.",
};

export function Hero() {
  return (
    <section className="h-screen bg-hero  bg-cover bg-center flex items-center">
      <div className="container mx-auto px-4 mt-20 pl-80">
        <h1 className="text-5xl">
          {text.title}
          <AuroraText className="text-9xl font-extrabold" speed={5}>
            {text.inCity}
          </AuroraText>
        </h1>
        <p className="mt-4 max-w-2xl">{text.subtitle}</p>
      </div>
    </section>
  );
}

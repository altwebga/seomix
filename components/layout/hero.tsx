const text = {
  title: "Разработка и продвижение сайтов",
  inCity: "в Краснодаре",
  description:
    "Создаем эффективные сайты, запускаем SEO и рекламу, настраиваем аналитику и помогаем бизнесу расти. Работаем на результат — если не понравится, вернем деньги.",
};

export function Hero() {
  return (
    <section className="bg-[url(/img/hero-grid.svg)] bg-contain bg-center bg-no-repeat h-[80vh]">
      <div className="container mx-auto px-4 mt-20 md:mr-20 flex flex-col justify-center h-full w-full bg-[url(/img/hero_1.png)] bg-position-[right_top_1rem] bg-no-repeat">
        <div className="flex flex-col gap-8">
          <h1 className="text-4xl font-bold flex flex-col">
            {text.title}
            <span className="text-primary text-5xl md:text-8xl">
              {text.inCity}
            </span>
          </h1>
          <p className="text-muted-foreground max-w-2xl">{text.description}</p>
        </div>
      </div>
    </section>
  );
}

const text = {
  title: "Разработка и продвижение сайтов ",
  city: "в Краснодаре",
};

export function Hero() {
  return (
    <section className="h-[80vh] flex flex-col justify-center bg-[url(/images/hero-bg.min.svg)] bg-center bg-no-repeat bg-contain">
      <div className="container mx-auto px-4">
        <h1 className="flex flex-col text-center">
          {text.title}
          <span className="md:text-8xl text-red-500 text-shadow-2xs text-shadow-red-300">
            {text.city}
          </span>
        </h1>
      </div>
    </section>
  );
}

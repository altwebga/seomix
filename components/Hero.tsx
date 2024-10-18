import { Button } from "./ui/button";
export function Hero() {
  return (
    <section className="bg-hero-bg bg-cover bg-no-repeat h-screen dark:bg-hero-bg-dark bg-fixed">
      <div className="flex flex-col md:flex-row items-center justify-center h-full container mx-auto px-4">
        <div className="flex-1">
          <h1>Разработка и продвижение сайтов в Горно-Алтайске</h1>
          <p>Адекватный креатив и технологичные решения для вашего бизнеса</p>
          <div className="mt-4 flex flex-row gap-4">
            <Button className="min-w-[150px]">Подробнее</Button>
            <Button className="min-w-[150px]">Заказать</Button>
          </div>
        </div>
        <div className="flex-1"></div>
      </div>
    </section>
  );
}

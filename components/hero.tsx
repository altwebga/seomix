import Link from "next/link";
import { Button } from "./ui/button";
import { PopUpForm } from "./popup-container";

type HeroProps = {
  cityPrep: string;
  cityIn: string;
};

export function Hero({ cityPrep, cityIn }: HeroProps) {
  return (
    <section className="bg-background/80">
      <div className="container mx-auto px-4 h-[80vh] flex flex-col justify-center gap-4">
        <h1 className="flex flex-col gap-4 max-w-4xl">
          Разработка и продвижение сайтов{" "}
          <span className="bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text text-4xl md:text-8xl font-extrabold text-transparent">
            {cityPrep}
          </span>
        </h1>
        <p className="max-w-4xl">
          Создаем эффективные сайты для компаний {cityIn}, запускаем SEO и
          рекламу, настраиваем аналитику и помогаем бизнесу расти. Работаем на
          результат — если не понравится, вернем деньги.
        </p>

        <div className="flex flex-col md:flex-row gap-6 mt-8">
          <PopUpForm />
          <Button asChild size={"lg"} variant={"secondary"}>
            <Link href="/services">Все услуги</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

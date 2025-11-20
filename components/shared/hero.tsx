import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Clients } from "./clients";

const text = {
  title: "Разработка и продвижение сайтов ",
  city: "в Краснодаре",
  subtitle: "Забираем лиды у конкурентов. Быстро, чисто, по науке.",
};

export function Hero() {
  return (
    <section className="h-screen flex flex-col justify-center bg-[url(/images/hero_bg.svg)] bg-no-repeat bg-cover">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-14">
        <div className="md:w-2/3 md:pl-40">
          <h1 className="flex flex-col text-4xl">
            {text.title}
            <span className="text-6xl md:text-8xl bg-[linear-gradient(128deg,#ff1cf7_0%,#00f0ff_100%)] bg-clip-text text-transparent">
              {text.city}
            </span>
          </h1>
          <p className="my-4">{text.subtitle}</p>
          <div className="flex flex-row gap-8">
            <Button size={"lg"}>Начать проект</Button>
            <Button asChild size={"lg"} variant={"outline"}>
              <Link href={"/portfolio"}>Примеры работ</Link>
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl">
            <div>
              <div className="text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                200+
              </div>
              <div className="text-sm text-muted-foreground mt-1">Проектов</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                12+
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Лет опыта
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-linear-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                98%
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Довольных клиентов
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/3">
          <Image
            src={"/images/hero_image.png"}
            alt="Hero Image"
            width={600}
            height={600}
            className="w-48 md:w-sm h-auto aspect-auto hidden md:block"
          />
        </div>
      </div>
      <Clients />
    </section>
  );
}

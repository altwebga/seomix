import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Clients } from "./clients";
import { Experience } from "./experience";
import { EncryptedText } from "../ui/encrypted-text";

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

            <EncryptedText
              text="в Краснодаре"
              encryptedClassName="text-6xl md:text-8xl bg-[linear-gradient(128deg,#ff1cf7_0%,#00f0ff_100%)] bg-clip-text text-transparent"
              revealDelayMs={50}
            />
          </h1>
          <p className="my-4">{text.subtitle}</p>
          <div className="flex flex-row gap-8">
            <Button size={"lg"}>Начать проект</Button>
            <Button asChild size={"lg"} variant={"outline"}>
              <Link href={"/portfolio"}>Примеры работ</Link>
            </Button>
          </div>
          <Experience />
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

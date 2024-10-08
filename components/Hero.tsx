import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import HeroImage from "@/public/images/mobile_development.svg";
export function Hero() {
  return (
    <section className="h-full bg-hero-bg bg-cover bg-center">
      <div className="flex flex-col md:flex-row gap-2 h-[70vh] items-center justify-center container mx-auto">
        <div className="flex-1">
          <h1>
            Разработка и продвижение сайтов{" "}
            <span className="dark:text-sky-400 text-sky-600">
              в Горно-Алтайске
            </span>
          </h1>
          <p>Адекватный креатив и технологичные решения для вашего бизнеса</p>
          <div className="mt-8 flex items-center gap-4">
            <Button asChild className="min-w-40">
              <Link href="/portfolio">Примеры работ</Link>
            </Button>
            <Button className="bg-green-500 min-w-40">
              <Link href="/dashboard">Заказать</Link>
            </Button>
          </div>
        </div>
        <div className="flex-1">
          <Image src={HeroImage} alt="Hero" width={600} height={600} />
        </div>
      </div>
    </section>
  );
}

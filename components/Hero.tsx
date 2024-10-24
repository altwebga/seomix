import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { PopUpForm } from "./PopUpForm";
import heroImage from "@/public/images/undraw_mobile_development_re_wwsn.svg";
import { Flame } from "lucide-react";

export function Hero() {
  return (
    <section className="bg-hero-bg bg-no-repeat bg-left h-[80vh] flex flex-col justify-center">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold">
            Разработка и продвижение сайтов{" "}
            <span className="text-sky-500">в Горно-Алтайске</span>
          </h1>
          <p>Адекватный креатив и технологичные решения для вашего бизнеса.</p>
          <div className="flex flex-col md:flex-row gap-4 mt-12">
            <PopUpForm />
            <Button
              asChild
              variant={"outline"}
              className="w-full md:w-48 shadow-md"
            >
              <Link href={"/services"}>Услуги</Link>
            </Button>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Flame className="text-red-800 w-8 h-8" />
            <span>Все под ключ</span>
          </div>
        </div>
        <div>
          <Image src={heroImage} alt="hero image" width={500} height={500} />
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

import { PopupForm } from "./popup-form";

import HeroImage from "@/public/images/hero.svg";

export function Hero() {
  return (
    <section className="bg-hero-grid">
      <div className="flex flex-col md:flex-row items-center justify-center h-screen container max-w-7xl mx-auto gap-8">
        <div className="md:w-1/2">
          <h1>
            Разработка и продвижение сайтов{" "}
            <span className="text-blue-500">в Горно-Алтайске</span>
          </h1>
          <p>
            Разработка, продвижение, техническая поддержка, интеграция со
            сторонними системами — весь спектр услуг для вашего бизнеса
          </p>
          <div className="flex space-x-4 mt-4">
            <PopupForm />
            <Button as={Link} color="default" href="/portfolio" variant="solid">
              Примеры работ
            </Button>
          </div>
        </div>
        <div className="md:w-1/2">
          <Image
            alt="Hero Image"
            className="w-auto h-auto"
            height={500}
            src={HeroImage}
            width={500}
          />
        </div>
      </div>
    </section>
  );
}

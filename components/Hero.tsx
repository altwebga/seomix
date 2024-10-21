import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { PopUpForm } from "./PopUpForm";
import heroImage from "@/public/images/hero-image.png";

export function Hero() {
  return (
    <section className="bg-hero-bg bg-no-repeat bg-left h-screen flex flex-col justify-center items-baseline">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <h1>
            Разработка и продвижение сайтов{" "}
            <span className="text-sky-500">в Горно-Алтайске</span>
          </h1>
          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <PopUpForm />
            <Button asChild variant={"outline"} className="min-w-48">
              <Link href={"/services"}>Услуги</Link>
            </Button>
          </div>
        </div>
        <div>
          <Image src={heroImage} alt="hero image" width={500} height={500} />
        </div>
      </div>
    </section>
  );
}

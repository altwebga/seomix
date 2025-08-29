import Link from "next/link";
import { Button } from "./ui/button";
import { PopUpForm } from "./popup-container";

export function HeroHome() {
  return (
    <section className="dark:bg-background/50 dark:bg-none bg-[url(/img/bg-image.jpg)] bg-no-repeat bg-cover">
      <div className="container mx-auto px-4 h-screen flex flex-col justify-center">
        <h1 className="text-2xl md:text-5xl">
          Разработка и продвижение сайтов <br />
          <span className="bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text text-4xl md:text-8xl font-extrabold text-transparent">
            в Краснодаре
          </span>
        </h1>
        <p className="mt-4 max-w-4xl">
          Делю эффективные сайты, запускаю SEO и рекламу, настраиваю аналитику и
          помогаю бизнесу расти. Работаю на результат — если не понравится,
          верну деньги.
        </p>
        <div className="flex flex-col md:flex-row gap-6 mt-8">
          <PopUpForm />
          <Button asChild size={"lg"} variant={"secondary"}>
            <Link href="/services">Все услуги</Link>
          </Button>
        </div>
      </div>
      <video
        src="/videos/bg_video_4.webm"
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1] hidden dark:block"
      ></video>
    </section>
  );
}

import { AuroraText } from "../ui/aurora-text";
import { socialLinks } from "@/config/social-links";
import Link from "next/link";
import { Button } from "../ui/button";
import { ScrollDown } from "../shared/scroll-down";
import { PopupContactForm } from "../form/popup-contact-form";

const text = {
  title: "Разработка и продвижение сайтов ",
  inCity: "в Краснодаре",
  subtitle:
    "Создаем эффективные сайты, запускаем SEO и рекламу, настраиваем аналитику и помогаем бизнесу расти. Работаем на результат — если не понравится, вернем деньги.",
};

export function Hero() {
  return (
    <section className="h-screen bg-hero bg-cover bg-center flex flex-col justify-between">
      <div className="container mx-auto px-4 mt-20 flex flex-col">
        <div className="md:pl-80 mt-44">
          <h1 className="text-2xl md:text-5xl">
            {text.title}
            <AuroraText className="md:text-9xl text-5xl font-extrabold">
              {text.inCity}
            </AuroraText>
          </h1>
          <p className="mt-4 max-w-2xl">{text.subtitle}</p>
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <PopupContactForm />
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full md:w-60"
            >
              <Link href="/portfolio">Портфолио</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex gap-4 justify-between items-center container mx-auto px-4 py-10">
        <div className="flex gap-8">
          {socialLinks.map((link) => (
            <Link key={link.title} href={link.url}>
              <p className="text-muted-foreground">{link.title}</p>
            </Link>
          ))}
        </div>
        <ScrollDown />
      </div>
    </section>
  );
}

"use client";
import { title, subtitle } from "@/components/primitives";
import animationData from "@/public/animations/home_banner.json";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import {
  CursorArrowRippleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import ClientCard from "@/components/ClientCard";
import { Divider } from "@nextui-org/divider";
import PortfolioCard from "@/components/PortfolioCard";
import LottieAnimation from "@/components/LottieAnimation";
import { Services } from "@/config/services";
import Quiz from "@/components/Quiz";

export default function Home() {
  const showWorkId = [1, 3, 14, 13, 8, 11];
  return (
    <div className="container mx-auto max-w-7xl px-4">
      <section className="flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="md:w-1/2">
          <h1 className={title()}>Разработка&nbsp;</h1>
          <h1 className={title()}>сайтов и мобильных приложений&nbsp;</h1>
          <br />
          <h1 className={title({ color: "violet" })}> в Горно-Алтайске</h1>
          <h2 className={subtitle({ class: "mt-4" })}>
            Хотите узнать больше о том, как мы можем сотрудничать?
          </h2>
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <Button
              href="/contact"
              as={Link}
              color="primary"
              variant="shadow"
              size="md"
              startContent={<CursorArrowRippleIcon className="h-4 w-4" />}
            >
              Контакты
            </Button>
            <Button
              href="/portfolio"
              as={Link}
              color="default"
              variant="shadow"
              size="md"
            >
              Мои работы
            </Button>
          </div>
        </div>
        <div className="flex justify-center items-center w-[20rem] h-[20rem] md:w-[30rem] md:h-[30rem] lg:w-[38rem] lg:h-[38rem] mt-6">
          <LottieAnimation
            animationData={animationData}
            height="100%"
            width="100%"
          />
        </div>
      </section>
      <section className="my-4">
        <h2 className={title({ color: "cyan", size: "sm" })}>Мои услуги</h2>
        <p className="pt-2 mb-8">
          Весь спектр услуг для старта продаж и привлечения клиентов.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Services.map((item) => (
            <Link
              href={`/services/${item.slug}`}
              className="flex flex-row gap-2"
              key={item.id}
            >
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
              <p className="font-bold text-xl">{item.title}</p>
            </Link>
          ))}
        </div>
        <Button
          href="/services"
          as={Link}
          className="mt-8"
          color="primary"
          variant="shadow"
          size="md"
          startContent={<CursorArrowRippleIcon className="h-4 w-4" />}
        >
          Подробнее
        </Button>
      </section>
      <section className="my-20">
        <h2 className={title({ color: "cyan", size: "sm" })}>
          Среди моих клиентов
        </h2>
        <p className="pt-2">Малый и средний бизнес.</p>
        <Divider className="my-8" />
        <ClientCard />
      </section>
      <section className="my-20">
        <h2 className={title({ color: "cyan", size: "sm" })}>Новые работы</h2>
        <p className="pt-2 pb-6">От дизайна до продвижения и интеграций</p>
        <PortfolioCard showWorkId={showWorkId} />
        <Button
          href="/portfolio"
          as={Link}
          className="mt-8"
          color="primary"
          variant="shadow"
          size="md"
          startContent={<CursorArrowRippleIcon className="h-4 w-4" />}
        >
          Все работы
        </Button>
      </section>
      <section>
        <Quiz/>
      </section>
    </div>
  );
}

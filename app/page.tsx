"use client";

import { title, subtitle } from "@/components/primitives";
import dynamic from "next/dynamic";
import animationData from "@/public/animations/home_banner.json";
import { Button } from "@nextui-org/button";
import { CursorArrowRippleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import ServicesCard from '@/components/ServicesCard'
import ClientCard from "@/components/ClientCard";
import { Divider } from "@nextui-org/divider";

export default function Home() {
  const LottieAnimation = dynamic(
    () => import("../components/LottieAnimation"),
    { ssr: false }
  );

  return (
    <>
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
            color="primary"
            variant="shadow"
            size="md"
            startContent={<CursorArrowRippleIcon className="h-4 w-4" />}
          >
            <Link href="/contact">Контакты</Link>
          </Button>
          <Button color="default" variant="shadow" size="md">
            <Link href="/portfolio">Мои работы</Link>
          </Button>
        </div>
      </div>
      <div className="md:1/2">
        <LottieAnimation
          animationData={animationData}
          height="300px md:height-[600px]"
          width="300px md:width-[600px]"
        />
      </div>
    </section>
    <section className="my-4">
      <h2 className={title({color: 'cyan', size: 'sm'})}>Мои услуги</h2>
      <p className="pt-2">
      Весть спектр услуг для старта продаж в интернете.
      </p>
      <Divider className="my-8"/>
      <ServicesCard/>
    </section>
    <section className="mt-20">
      <h2 className={title({color: 'cyan', size: 'sm'})}>Среди моих клиентов</h2>
      <p className="pt-2">малый и средний бизнес.</p>
      <Divider className="my-8"/>
      <ClientCard/>
    </section>
    </>
  );
}

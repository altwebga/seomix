"use client";

import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import dynamic from "next/dynamic";
import animationData from "@/public/animations/home_banner.json";
import { Button } from "@nextui-org/button";
import { CursorArrowRippleIcon} from "@heroicons/react/24/outline";

export default function Home() {
  const LottieAnimation = dynamic(
    () => import("../components/LottieAnimation"),
    { ssr: false }
  );
  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-4">
      <div className="md:w-1/2">
        <h1 className={title()}>Разработка&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>сайтов&nbsp;</h1>
        <br />
        <h1 className={title()}>и мобильных приложений в Горно-Алтайске</h1>
        <h2 className={subtitle({ class: "mt-4" })}>
        Хотите узнать больше о том, как мы можем сотрудничать?
        </h2>
        <div className="flex flex-col md:flex-row gap-4 mt-4">
        <Button color="primary" variant="shadow" size="md" startContent={<CursorArrowRippleIcon className="h-4 w-4"/>}>Контакты</Button>
        <Button color="default" variant="shadow" size="md" >Мои работы</Button>
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
  );
}

import { CallActions } from "@/components/shared/call-actions";
import { Hero } from "@/components/shared/hero";
import { Portfolio } from "@/components/shared/portfolio";
import { Process } from "@/components/shared/process";
import { Services } from "@/components/shared/services";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <Portfolio />
      <CallActions textButton="Начать проект" className="" />
    </>
  );
}

import { HeroSection } from "../thegridcn";
import { Button } from "../ui/button";

export function Hero() {
  return (
    <section className="relative py-12 md:py-0 my-2 md:my-4">
      {/* Subtle circuit-like background pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(var(--primary-rgb,0,180,255),0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary-rgb,0,180,255),0.02)_1px,transparent_1px)] bg-size-[60px_60px]" />

      <div className="mx-auto container px-4">
        <HeroSection
          title="seomix"
          subtitle="Разработка и продвижение сайтов"
          description="Создаем эффективные сайты, запускаем SEO и рекламу, настраиваем аналитику и помогаем бизнесу расти. Работаем на результат — если не понравится, вернем деньги."
          badge="NEW — v2.0 Released"
          align="center"
          className="border-0 bg-transparent px-0 md:px-0 md:py-28 lg:py-36"
        >
          <Button variant="default" size="lg" className="rounded-md">
            Начать проект
          </Button>
          <Button variant="outline" size="lg" className="rounded-md">
            Примеры работ
          </Button>
        </HeroSection>
      </div>
    </section>
  );
}

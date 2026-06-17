import Link from "next/link"
import { Divider } from "../thegridcn/divider"
import { HeroSection } from "../thegridcn/hero-section"
import { Button } from "../ui/button"

interface IRegionHeroProps {
  in_city: string
  description: string
}

export function RegionHero({ in_city, description }: IRegionHeroProps) {
  return (
    <section className="relative container mx-auto my-2 px-4 py-12 md:my-4 md:py-0">
      <Divider label="hero" />
      <HeroSection
        badge="студия полного цикла"
        title={`Разработка и продвижение сайтов  ${in_city}`}
        description={description}
        align="center"
      >
        <Button
          variant="default"
          size="lg"
          className="rounded border border-primary bg-primary/20 px-5 py-2 font-mono text-[10px] tracking-widest text-primary uppercase shadow-[0_0_12px_rgba(var(--primary-rgb,0,180,255),0.15)] transition-all duration-300 hover:bg-primary/30"
          asChild
        >
          <Link href="/contact">Начать проект</Link>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="rounded border border-primary/30 px-5 py-2 font-mono text-[10px] tracking-widest text-foreground/60 uppercase transition-colors hover:border-primary/50 hover:text-primary"
          asChild
        >
          <Link href="/portfolio">Примеры работ</Link>
        </Button>
      </HeroSection>
    </section>
  )
}

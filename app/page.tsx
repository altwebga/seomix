import { ClientSlider } from "@/components/layout/client-slider"
import { Features } from "@/components/layout/features"
import { Hero } from "@/components/layout/hero"
import { Portfolio } from "@/components/layout/portfolio"
import { Services } from "@/components/layout/services"
import { CTABanner } from "@/components/thegridcn/cta-banner"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <ClientSlider />
      <Features />
      <Portfolio />
      <div className="container mx-auto px-4">
        <CTABanner
          title="Готовы начать?"
          description="Оставьте заявку и мы поможем"
          primaryAction={{ label: "Связаться с нами", href: "/contact" }}
          secondaryAction={{ label: "Наши услуги", href: "/services" }}
        />
      </div>
    </>
  )
}

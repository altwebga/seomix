import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { SectionContainer } from "@/components/layout/section-container";
import { ServiceCard } from "@/entities/service/ui/service-card";
import { getServices } from "@/entities/service/api/get-services";
import { CallToActionCard } from "@/widgets/call-to-action/ui/call-to-action-card";

export default async function ServicesPage() {
  const result = await getServices();
  const services = result?.services ?? [];

  if (services.length === 0) {
    return (
      <SectionContainer>
        <h1>Услуги</h1>
        <p>Список услуг временно пуст.</p>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer>
      <h1>Услуги</h1>
      <p>
        Разработка, SEO и digital-маркетинг. Комплексный подход к созданию и
        продвижению сайтов.
      </p>
      <Carousel
        opts={{
          align: "start",
          loop: true,
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="py-4">
          {services.map((service) => (
            <CarouselItem
              key={service.id}
              className="md:basis-1/3 lg:basis-1/4"
            >
              <ServiceCard
                slug={`/services/${service.slug}`}
                title={service.title}
                price={service.price}
                imageId={service.cover_image?.id}
                imageTitle={service.cover_image?.title}
                shortContent={service.short_content}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:block" />
        <CarouselNext className="hidden md:block" />
      </Carousel>
      <CallToActionCard className="mt-12" />
    </SectionContainer>
  );
}

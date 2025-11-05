import { Container } from "@/components/layout/container";
import { ServiceCard } from "@/components/card/service-card";
import { getPublishedServicesList } from "@/actions/content";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default async function ServicesPage() {
  const services = await getPublishedServicesList();
  return (
    <Container>
      <div className="py-8">
        <h1 className="text-4xl font-bold mb-6">Услуги</h1>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="p-8">
            {services.map((service) => (
              <CarouselItem
                key={service.id}
                className="md:basis-1/3 lg:basis-1/4"
              >
                <ServiceCard
                  slug={`services/${service.slug}` || ""}
                  title={service.title}
                  imageId={service.cover_image || ""}
                  shortContent={service.short_content || ""}
                  price={service.price || ""}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="absolute right-0" />
          <CarouselPrevious className="absolute left-0" />
        </Carousel>
      </div>
    </Container>
  );
}

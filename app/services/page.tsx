import { Container } from "@/components/layout/container";
import { Metadata } from "next";
import { getPublishedServicesList } from "@/actions/feth-data";
import { ServiceCard } from "@/components/card/service-card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const metadata: Metadata = {
  title: "Услуги",
  description: "Наши услуги по SEO-оптимизации и веб-разработке",
};

export default async function ServicesPage() {
  const services = await getPublishedServicesList();

  return (
    <Container>
      <h1>Услуги</h1>
      <p>Здесь будет представлена информация о наших услугах.</p>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {services?.map((service) => (
            <CarouselItem
              key={service.id}
              className="md:basis-1/3 lg:basis-1/4"
            >
              <div className="py-4 px-2">
                <ServiceCard
                  slug={`/services/${service.slug}`}
                  title={service.title}
                  shortContent={service.short_content ?? undefined}
                  price={service.price ?? undefined}
                  imageId={service.cover_image ?? undefined}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious  className="absolute left-0"/>
        <CarouselNext className="abcolute right-0" />
      </Carousel>
    </Container>
  );
}

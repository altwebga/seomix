import { getContent } from "@/actions/fetch-data";
import { ServiceCard } from "@/components/card/service-card";
import { GET_SERVICES } from "@/config/queries";
import { IService } from "@/config/types";
import { CallAction } from "@/components/layout/call-action";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface GraphQLResponse {
  services?: IService[];
}

export default async function ServicesPage() {
  const result = await getContent<GraphQLResponse>(GET_SERVICES, {
    revalidate: 3600 * 24,
  });

  const services = result?.services ?? [];

  if (services.length === 0) {
    return <p>услуг нет</p>;
  }

  return (
    <section className="container mx-auto p-4">
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
                key={service.id}
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
      <CallAction />
    </section>
  );
}

import { getContent } from "@/actions/get-content";
import { DirectusImage } from "../shared/directus-image";
import Link from "next/link";
import { MagicCard } from "../ui/magic-card";
import { Heading } from "../ui/heading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SectionContainer } from "../containers/section-container";

const text = {
  title:
    "Полный спектр решений для быстрого и эффективного старта вашего бизнеса в интернете",
  subtitle:
    "Разрабатываем современные сайты с продуманной структурой и дизайном, настраиваем контекстную рекламу в Яндекс Директ, занимаемся SEO-продвижением и аналитикой. Помогаем привлекать клиентов, увеличивать продажи и усиливать присутствие бренда в сети.",
};

export async function Services() {
  const services = await getContent({
    content_type: "service",
    status: "published",
    fields: ["id", "title", "cover_image", "short_description", "slug"],
  });
  return (
    <SectionContainer className="my-20">
      <Heading
        title={text.title}
        subtitle={text.subtitle}
        level="h2"
        className="md:ml-20 max-w-4xl"
      />
      <Carousel className="w-full mt-10">
        <CarouselContent className="py-4">
          {services
            .sort((a, b) => (a.sort || 0) - (b.sort || 0))
            .map((service) => (
              <CarouselItem className="md:basis-1/4" key={service.id}>
                <Link href={`/services/${service.slug}`}>
                  <MagicCard className="rounded-md p-4 hover:-translate-y-2 transition-transform ease-linear duration-100 h-full">
                    <DirectusImage
                      url={service.cover_image}
                      alt={service.title}
                      width={600}
                      height={600}
                      className="rounded-t-md object-cover"
                    />
                    <h2 className="text-xl font-semibold mt-4">
                      {service.title}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground leading-5">
                      {service.short_description}
                    </p>
                  </MagicCard>
                </Link>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0" />
        <CarouselNext className="absolute right-0" />
      </Carousel>
    </SectionContainer>
  );
}

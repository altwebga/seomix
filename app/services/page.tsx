import { SectionContainer } from "@/components/containers/section-container";
import { getContent } from "@/actions/get-content";
import { Heading } from "@/components/ui/heading";
import { MagicCard } from "@/components/ui/magic-card";
import { DirectusImage } from "@/components/shared/directus-image";
import Link from "next/link";

export default async function ServicesPage() {
  const services = await getContent({
    content_type: "service",
    status: "published",
    fields: [
      "id",
      "title",
      "description",
      "short_description",
      "cover_image",
      "slug",
      "sort",
    ],
  });

  return (
    <SectionContainer>
      <Heading
        title="Наши услуги"
        subtitle="Полный комплекс услуг для быстрого старта вашего бизнеса в интернете."
        level="h1"
      />
      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
        {services
          .sort((a, b) => (a.sort || 0) - (b.sort || 0))
          .map((service) => (
            <li key={service.id} className="list-none h-full">
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
            </li>
          ))}
      </ul>
    </SectionContainer>
  );
}

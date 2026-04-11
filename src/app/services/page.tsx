import { PageHeading } from "@/components/shared/page-heading";
import { getContent } from "@/actions/get-content";
import Link from "next/link";
import {
  TronCard,
  TronCardContent,
  TronCardHeader,
  TronCardTitle,
  TronCardDescription,
} from "@/components/thegridcn";
import { DirectusImage } from "@/components/shared/directus-image";

export default async function ServicesPage() {
  const services = await getContent({ content_type: "service" });
  return (
    <div className="container mx-auto px-4 my-8">
      <PageHeading
        title="Услуги"
        description="Полный комплекс услуг для быстрого старта вашего бизнеса в интернете."
        hue={180}
        size={60}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-4">
        {services.map((service) => (
          <Link key={service.id} href={`/services/${service.slug}`}>
            <TronCard>
              <TronCardHeader>
                <TronCardTitle>{service.title}</TronCardTitle>
                <TronCardDescription>
                  {service.short_description}
                </TronCardDescription>
              </TronCardHeader>
              <TronCardContent>
                <DirectusImage
                  url={service.cover_image}
                  alt={service.title}
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </TronCardContent>
            </TronCard>
          </Link>
        ))}
      </div>
    </div>
  );
}

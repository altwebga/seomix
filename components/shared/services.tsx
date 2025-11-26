import { getPublishedServicesList } from "@/actions/feth-data";
import { ServiceCard } from "../card/service-card";
import { Badge } from "../ui/badge";
import { LinkButton } from "../layout/link-button";

export async function Services() {
  const services = await getPublishedServicesList();

  return (
    <section className="bg-[url(/images/fog.png)] bg-no-repeat bg-cover py-8">
      <div className="px-4 container mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4">Наши услуги</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Что мы предлагаем
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Полный спектр услуг для развития вашего бизнеса в интернете
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 py-4 px-2">
          {services.slice(0, 4).map((service) => (
            <ServiceCard
              key={service.id}
              slug={`/services/${service.slug}`}
              title={service.title}
              shortContent={service.short_content ?? undefined}
              price={service.price ?? undefined}
              imageId={service.cover_image ?? undefined}
            />
          ))}
        </div>
        <div className="flex justify-end">
          <LinkButton href="/services" title="Все услуги" />
        </div>
      </div>
    </section>
  );
}

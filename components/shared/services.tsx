import { getPublishedServicesList } from "@/actions/feth-data";
import { ServiceCard } from "../card/service-card";
import { Button } from "../ui/button";

export async function Services() {
  const services = await getPublishedServicesList();

  return (
    <section className="bg-[url(/images/fog.png)] bg-no-repeat bg-cover py-8">
      <div className="px-4 container mx-auto">
        <h2 className="text-center">Комплексные решения для бизнеса</h2>
        <p className="text-center">
          Создаём сайты, продвигаем их в ТОП и сопровождаем на каждом этапе.
        </p>
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
          <Button size={"lg"} className="w-54">
            Все услуги
          </Button>
        </div>
      </div>
    </section>
  );
}

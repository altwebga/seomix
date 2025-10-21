import Link from "next/link";
import { getContent } from "@/actions/fetch-data";
import { GET_SERVICES } from "@/config/queries";
import { IService } from "@/config/types";
import { ServiceCard } from "../card/service-card";
import { Button } from "../ui/button";

interface GraphQLResponse {
  services?: IService[];
}

export async function ServicesHome() {
  const result = await getContent<GraphQLResponse>(GET_SERVICES, {
    revalidate: 3600 * 24,
  });

  const services = result?.services ?? [];

  if (services.length === 0) {
    return <p>услуг нет</p>;
  }

  return (
    <section className="bg-[url(/images/fog.png)] bg-no-repeat bg-cover">
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-2 justify-between">
          <h2 className="md:text-5xl flex flex-col gap-2 uppercase justify-center py-8">
            Избавим ваш бизнес от цифровых демонов
          </h2>
          <p></p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {services.slice(0, 4).map((service) => (
            <ServiceCard
              key={service.id}
              slug={`services/${service.slug}`}
              title={service.title}
              //price={service.price}
              imageId={service.cover_image.id}
              imageTitle={service.cover_image.title}
              shortContent={service.short_content}
            />
          ))}
        </div>
        <div className="pt-8 flex justify-end">
          <Button asChild size={"lg"} className="w-56">
            <Link href={"/services"}>Все услуги</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

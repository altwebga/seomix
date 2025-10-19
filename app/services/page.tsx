import { getContent } from "@/actions/fetch-data";
import { ServiceCard } from "@/components/card/service-card";
import { GET_SERVICES } from "@/config/queries";
import { IService } from "@/config/types";

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            slug={`/services/${service.slug}`}
            title={service.title}
            price={service.price}
            imageId={service.cover_image?.id}
          />
        ))}
      </div>
    </section>
  );
}

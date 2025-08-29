import { notFound } from "next/navigation";
import { getCities, getCityBySlug } from "@/actions/cities";
import { Hero } from "@/components/hero";
import { CityServicesCard } from "@/components/city-services-card";
import { CityFeaturedCard } from "@/components/city-featured-card";

export const revalidate = 60 * 60 * 24;
export const dynamicParams = false;
export const dynamic = "error";

export default async function CityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { city } = await getCityBySlug(slug);
  if (!city) return notFound();

  return (
    <>
      <Hero
        cityPrep={city.cityExtra?.prep || "в Краснодаре"}
        description={
          city.excerpt ||
          "Создаем эффективные сайты, запускаем SEO и рекламу, настраиваем аналитику и помогаем бизнесу расти. Работаем на результат — если не понравится, вернем деньги."
        }
        bgImage={city.featuredImage?.node.mediaItemUrl || "/img/krasnodar.jpg"}
      />
      {city.cityExtra?.services && (
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Продвижение в интернете для компаний {city.cityExtra.prepFrom}
            </h2>
            <div className="text-muted-foreground max-w-2xl mx-auto">
              <span dangerouslySetInnerHTML={{ __html: city.content || "" }} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {city.cityExtra.services.map((service, index) => (
              <CityServicesCard
                key={index}
                servicesTitle={service.serviceName}
                servicesDescription={service.serviceDescription}
              />
            ))}
          </div>
        </section>
      )}

      {city.cityExtra?.advantages && (
        <section className="container mx-auto px-4 py-16 bg-muted/50">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Преимущества работы с нами
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Почему компании {city.cityExtra.prepFrom} выбирают нас для
              развития бизнеса
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {city.cityExtra.advantages.map((advantage, index) => (
              <CityFeaturedCard
                key={index}
                featuredTitle={advantage.advantagesName}
                featuredDescription={advantage.advantagesDescription}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export async function generateStaticParams() {
  const { cities } = await getCities();
  return (cities?.nodes ?? []).map(({ slug }) => ({ slug }));
}

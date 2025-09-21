import { Card } from "@/components/ui/card";

import { getContentLite, ServiceContent } from "@/actions/get-content";
import Link from "next/link";
import Image from "next/image";
import { getDirectusImage } from "@/lib/get-directus-image";

export default async function ServicesPage() {
  const { content: services } = await getContentLite("service");
  if (!services) {
    return <p>not found</p>;
  }
  return (
    <section className="container mx-auto p-4">
      <h1>Услуги</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4">
        {services.map((service) => {
          const serviceData = service as ServiceContent;
          return (
            <Link href={`services/${service.slug}`} key={service.id}>
              <Card className="py-0 relative transition delay-10 duration-50 ease-linear hover:-translate-y-1 hover:scale-102">
                <p className="p-4 absolute right-0 top-0 z-10 text-white">
                  {serviceData.price}
                </p>
                <h3 className="px-4 pb-2 text-white absolute bottom-0 left-0 z-10">
                  {service.title}
                </h3>
                <Image
                  src={getDirectusImage(service.cover_image?.id, {
                    width: 600,
                    height: 600,
                    fit: "cover",
                  })}
                  alt={service.title}
                  width={600}
                  height={600}
                  className="object-cover aspect-square w-full h-full rounded-md"
                />
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

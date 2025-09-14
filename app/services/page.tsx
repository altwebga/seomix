import { Card } from "@/components/ui/card";

import { getServicesLite } from "@/actions/get-services";
import Link from "next/link";
import Image from "next/image";

export default async function ServicesPage() {
  const { services } = await getServicesLite();
  if (!services) {
    return <p>not found</p>;
  }
  return (
    <section className="container mx-auto p-4">
      <h1>Услуги</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4">
        {services.map((service) => (
          <Link href={`services/${service.slug}`} key={service.id}>
            <Card className="py-0 relative transition delay-10 duration-50 ease-linear hover:-translate-y-1 hover:scale-102">
              <div className="absolute right-0 top-0 z-10 text-white">
                <p className="p-4">{service.price}</p>
              </div>
              <div className="absolute bottom-0 left-0 z-10">
                <h3 className="px-4 pb-2 text-white">{service.title}</h3>
              </div>
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL || ""}/${
                  service.image.id
                }`}
                alt={service.title}
                width={300}
                height={300}
                className="object-cover aspect-square w-full h-full rounded-md"
              />
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

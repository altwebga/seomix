import { Image } from "@nextui-org/image";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import Link from "next/link";

import { getServices } from "@/config/fetch";

export default async function ServicesPage() {
  const { services } = await getServices();

  return (
    <div>
      <h1>Услуги</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8">
        {services.map((item) => (
          <Link key={item.id} href={`/services/${item.slug}`}>
            <Card isFooterBlurred className="max-w-sm" shadow="md">
              <Image
                alt={item.title.rendered}
                className="w-full object-cover"
                height={400}
                src={item.featured_media_url}
                width={400}
              />
              <CardHeader className="absolute top-0 z-10">
                <p className="text-3xl font-bold w-full text-right text-white">
                  {item.acf.price}
                </p>
              </CardHeader>

              <CardFooter className="absolute bottom-0 left-0 z-10 flex flex-col min-h-52 bg-black/70 text-white">
                <h3>{item.title.rendered}</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }}
                />
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

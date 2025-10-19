import Image from "next/image";

import { getContentParams } from "@/actions/fetch-data";
import { GET_SERVICE } from "@/config/queries";
import { IService } from "@/config/types";
import { Markdown } from "@/components/handlers/markdown";

const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

export default async function ServiceSinglePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await getContentParams<{ services: IService[] }>(GET_SERVICE, {
    slug,
  });
  const service = res?.services[0];

  if (!service) {
    return <div>Услуга не найдена</div>;
  }

  return (
    <section className="container mx-auto p-4 space-y-6">
      <header className="space-y-2">
        <h1>{service.title}</h1>
        {service.price ? (
          <p className="text-lg font-semibold">Стоимость: {service.price}</p>
        ) : null}
      </header>
      {service.cover_image?.id ? (
        <div className="w-full max-w-3xl">
          <Image
            src={`${imageUrl}/${service.cover_image.id}`}
            alt={service.cover_image.title ?? service.title}
            width={800}
            height={450}
            className="w-full h-auto rounded-lg object-cover"
            priority={false}
          />
        </div>
      ) : null}
      <Markdown markdown={service.content} />
    </section>
  );
}

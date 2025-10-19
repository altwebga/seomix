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
      <div className="flex flex-col md:flex-row gap-2">
        <div className="md:w-2/3 space-y-4">
          <h1>{service.title}</h1>
          <Markdown markdown={service.content} />
        </div>
        <div className="md:w-1/3">
          <Image
            src={`${imageUrl}/${service.cover_image.id}`}
            alt={service.cover_image.title}
            width={600}
            height={600}
          />
        </div>
      </div>
    </section>
  );
}

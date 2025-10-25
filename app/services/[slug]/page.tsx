import Image from "next/image";

import { getContentParams } from "@/actions/fetch-data";
import { GET_SERVICE } from "@/config/queries";
import { IService } from "@/config/types";
import { Markdown } from "@/components/handlers/markdown";
import { CallAction } from "@/components/layout/call-action";
import { SplitContainerFixed } from "@/components/layout/split-container-fixed";

const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

export default async function ServiceSinglePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await getContentParams<{ services: IService[] }>(
    GET_SERVICE,
    { slug },
    { revalidate: 3600 * 24 }
  );
  const service = res?.services[0];

  if (!service) {
    return <div>Услуга не найдена</div>;
  }

  return (
    <SplitContainerFixed
      main={
        <>
          <h1>{service.title}</h1>
          <Markdown markdown={service.content} />
          <CallAction />
        </>
      }
      sidebar={
        <div>
          <Image
            src={`${imageUrl}/${service.cover_image.id}`}
            alt={service.cover_image.title}
            width={600}
            height={600}
            className="object-contain md:fixed md:top-20"
          />
        </div>
      }
    />
  );
}

import { Image } from "@nextui-org/image";

import { getService } from "@/config/fetch";
export default async function ServicePage({
  params,
}: {
  params: { slug: string };
}) {
  const service = await getService(params.slug);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div>
        <h1 className="py-8">{service.title.rendered}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: service.content.rendered }}
          className="space-y-4"
        />
      </div>
      <Image
        isBlurred
        alt={service.title.rendered}
        className="object-contain"
        height={600}
        src={service.featured_media_url}
        width={600}
      />
    </div>
  );
}

import { getService } from "@/actions/get-services";
import { Markdown } from "@/components/markdown";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  return {
    title: service.seo.title,
    description: service.seo.meta_description,
    openGraph: {
      images: [`process.env.NEXT_PUBLIC_IMAGE_URL || "") + service.image.id`],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const service = await getService(slug);
  return (
    <section className="container mx-auto p-4 bg-[url(/images/squares-bg.min.svg)] bg-no-repeat">
      <h1 className="pb-4">{service.title}</h1>
      <Markdown
        className="max-w-5xl"
        markdown={String(service.content ?? "")}
      />
    </section>
  );
}

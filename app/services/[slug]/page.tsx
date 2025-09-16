import { getContentBySlug } from "@/actions/get-content";
import { Markdown } from "@/components/markdown";
import { Metadata } from "next";
import { getDirectusImage } from "@/lib/get-directus-image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getContentBySlug({ type: "service", slug });

  if (!service) {
    return {
      title: "Услуга не найдена",
      description: "Запрашиваемая услуга не найдена",
    };
  }

  return {
    title: service.seo.title,
    description: service.seo.meta_description,
    openGraph: {
      images: [
        getDirectusImage(service.cover_image?.id, {
          width: 1200,
          height: 630,
          fit: "cover",
          quality: 80,
        }),
      ],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const service = await getContentBySlug({ type: "service", slug });

  if (!service) {
    return <p>Услуга не найдена</p>;
  }

  return (
    <section className="container mx-auto p-4 bg-[url(/images/squares-bg.min.svg)] bg-no-repeat">
      <h1 className="pb-4">{service.title}</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <Markdown
          className="md:w-3/4 w-full"
          markdown={String(service.description ?? "")}
        />
        <div className="md:w-1/4 w-full lg:sticky lg:top-20 lg:self-start">
          <Button asChild variant={"outline"}>
            <Link href={"/services"}>
              <MoveLeft /> Назад к услугам
            </Link>
          </Button>
          <p className="mt-4">Тут вставить баннер</p>
        </div>
      </div>
    </section>
  );
}

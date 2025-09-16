import { Metadata } from "next";
import Image from "next/image";
import { getContentBySlug } from "@/actions/get-content";
import { Markdown } from "@/components/markdown";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { RuTubeFrame } from "@/components/rutube-frame";
import { getDirectusImage } from "@/lib/get-directus-image";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const portfolioItem = await getContentBySlug({ type: "portfolio", slug });

  if (!portfolioItem) {
    return {
      title: "Портфолио не найдено",
      description: "Запрашиваемый элемент портфолио не найден",
    };
  }

  return {
    title: portfolioItem.seo.title,
    description: portfolioItem.seo.meta_description,
    openGraph: {
      images: [
        getDirectusImage(portfolioItem.cover_image?.id, {
          width: 1200,
          height: 630,
          fit: "cover",
          quality: 80,
        }),
      ],
    },
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const portfolioItem = await getContentBySlug({ type: "portfolio", slug });

  if (!portfolioItem) {
    return <div>Портфолио не найдено</div>;
  }

  // если getDirectusImage вернёт "", используем локальный плейсхолдер
  const src =
    getDirectusImage(portfolioItem.client_logo?.id, {
      width: 100,
      height: 100,
    }) || "/images/no-image.png";

  return (
    <section className="container mx-auto p-4">
      <div className="flex flex-row gap-4 items-center">
        <Image
          src={src}
          alt={portfolioItem.client_logo?.title ?? portfolioItem.title}
          width={100}
          height={100}
          sizes="100px"
          className="w-24 h-24 rounded-full p-2 border object-cover"
          priority={false}
        />
        <div>
          <h1 className="p-0">{portfolioItem.title}</h1>
          <p className="p-0">{portfolioItem.client_tag}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-3/4">
          <Markdown markdown={String(portfolioItem.description ?? "")} />
          {portfolioItem.video_id && (
            <RuTubeFrame
              videoId={portfolioItem.video_id}
              title={portfolioItem.title}
            />
          )}
        </div>
        <div className="md:w-1/4 w-full lg:sticky lg:top-20 lg:self-start">
          {portfolioItem.site_url && (
            <Button asChild>
              <a
                href={portfolioItem.site_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Посмотреть сайт <ArrowUpRight />
              </a>
            </Button>
          )}
          <p className="mt-4">Тут вставить баннер</p>
        </div>
      </div>
    </section>
  );
}

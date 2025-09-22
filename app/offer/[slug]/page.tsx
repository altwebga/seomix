import { getContentBySlug } from "@/actions/get-content";
import { Metadata } from "next";
import { Markdown } from "@/components/markdown";
import { getDirectusImage } from "@/lib/get-directus-image";
import Image from "next/image";
import { ModalForm } from "@/components/modal-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const offer = await getContentBySlug({ type: "offer", slug });

  if (!offer) {
    return {
      title: "Предложение не найдено",
      description: "Запрашиваемое предложение не найдено",
    };
  }

  return {
    title: offer.seo.title,
    description: offer.seo.meta_description,
    openGraph: {
      images: [
        getDirectusImage(offer.cover_image?.id, {
          width: 1200,
          height: 630,
          fit: "cover",
        }) || "",
      ],
    },
  };
}
export default async function OfferPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const offer = await getContentBySlug({ type: "offer", slug });

  if (!offer) {
    return <div>Предложение не найдено</div>;
  }

  return (
    <section className="bg-background/50">
      <div className="container mx-auto flex flex-col h-screen justify-center px-4">
        <div className="backdrop-blur max-w-5xl px-4 py-8 rounded-4xl space-y-6">
          <h1 className="flex flex-col gap-2">
            Разработка и продвижение сайтов{" "}
            <span className="text-5xl md:text-8xl text-red-500">
              {offer.in_city}
            </span>
          </h1>
          <Markdown markdown={String(offer.description ?? "")} />
          <div className="flex flex-row gap-4">
            <ModalForm />
            <Button asChild variant={"outline"} size={"lg"}>
              <Link href={"/portfolio"}>Портфолио</Link>
            </Button>
          </div>
        </div>
      </div>
      <Image
        src={
          getDirectusImage(offer.cover_image?.id, {
            width: 1920,
            height: 1080,
            fit: "cover",
          }) || ""
        }
        alt={offer.cover_image?.title || ""}
        width={1920}
        height={1080}
        className="w-full h-full fixed top-0 left-0 z-[-10] object-cover"
      />
    </section>
  );
}

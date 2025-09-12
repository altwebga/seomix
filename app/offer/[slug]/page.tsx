import { getOffer } from "@/actions/get-offers";
import { Metadata } from "next";
import { Markdown } from "@/components/markdown";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const offer = await getOffer(slug);
  return {
    title: offer.seo.title,
    description: offer.seo.meta_description,
  };
}
export default async function OfferPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const offer = await getOffer(slug);
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">{offer.title}</h1>
      <Markdown markdown={String(offer.content ?? "")} />
    </div>
  );
}

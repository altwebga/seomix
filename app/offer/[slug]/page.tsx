import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getOfferBySlug } from "@/actions/offers";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const { offer } = await getOfferBySlug(slug);

  return {
    title: offer?.cityExtra?.seo?.seoTitle,
    description: offer?.cityExtra?.seo?.seoDescription,
  };
}
export default async function OfferPage({ params }: Props) {
  const { slug } = await params;
  const { offer } = await getOfferBySlug(slug);
  if (!offer) return notFound();

  return (
    <>
      <Hero
        cityPrep={offer.cityExtra?.vGorode ?? ""}
        cityIn={offer.cityExtra?.izGoroda ?? ""}
      />
      <Services
        servicesTitle={"Наши услуги"}
        servicesDescription={offer.content ?? ""}
      />
    </>
  );
}

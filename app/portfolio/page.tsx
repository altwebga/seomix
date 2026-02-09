import { SectionContainer } from "@/components/containers/section-container";
import { Heading } from "@/components/ui/heading";
import { getContent } from "@/actions/get-content";
import { MagicCard } from "@/components/ui/magic-card";
import { DirectusImage } from "@/components/shared/directus-image";
import Link from "next/link";

const text = {
  title: "Портфолио",
  subtitle: "Примеры наших работ",
};

export default async function PortfolioPage() {
  const portfolio = await getContent({ content_type: "project" });
  return (
    <SectionContainer>
      <Heading title={text.title} subtitle={text.subtitle} level="h1" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolio.map((item) => (
          <MagicCard key={item.id} className="rounded-md p-4">
            <Link href={`/portfolio/${item.slug}`} className="flex flex-col">
              <div className="relative">
                <DirectusImage
                  url={item.cover_image}
                  alt={item.title}
                  width={300}
                  height={300}
                  className="w-full object-cover"
                />
                <h3 className="my-2">{item.title}</h3>
              </div>
            </Link>
          </MagicCard>
        ))}
      </div>
    </SectionContainer>
  );
}

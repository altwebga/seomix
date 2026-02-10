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
      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
        {portfolio.map((item) => (
          <li key={item.id} className="list-none h-full">
            <Link href={`/portfolio/${item.slug}`}>
              <MagicCard className="rounded-md p-4">
                <div className="flex flex-col gap-4">
                  <DirectusImage
                    url={item.cover_image}
                    alt={item.title}
                    width={300}
                    height={300}
                    className="w-full object-cover"
                  />
                  <h3>{item.title}</h3>
                </div>
              </MagicCard>
            </Link>
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
}

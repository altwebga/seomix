import { Metadata } from "next";
import Link from "next/link";
import { DirectusImage } from "@/components/shared/directus-image";
import { PageHeading } from "@/components/shared/page-heading";
import { getContent } from "@/actions/get-content";
import {
  TronCard,
  TronCardContent,
  TronCardHeader,
  TronCardTitle,
  TronCardDescription,
} from "@/components/thegridcn";

export const metadata: Metadata = {
  title: "Портфолио проектов",
  description:
    "Примеры реализованных сайтов и digital-проектов нашей веб-студии.",
  openGraph: {
    title: "Портфолио проектов",
    description:
      "Примеры реализованных сайтов и digital-проектов нашей веб-студии.",
    images: [
      {
        url: "/img/og/portfolio.png",
        width: 1200,
        height: 630,
        alt: "Портфолио проектов",
      },
    ],
  },
};

export default async function PortfolioPage() {
  const projects = await getContent({ content_type: "project" });
  return (
    <div className="container mx-auto px-4 my-8">
      <PageHeading
        title="Портфолио"
        description="Некоторые наши проекты которые нам разрешено показывать условиями договора"
        hue={180}
        size={60}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 my-4">
        {projects.map((project) => (
          <Link key={project.id} href={`/portfolio/${project.slug}`}>
            <TronCard>
              <TronCardHeader>
                <TronCardTitle>{project.title}</TronCardTitle>
              </TronCardHeader>
              <TronCardContent>
                <DirectusImage
                  url={project.cover_image}
                  alt={project.title}
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </TronCardContent>
            </TronCard>
          </Link>
        ))}
      </div>
    </div>
  );
}

import { getContent } from "@/actions/get-content";
import { Heading } from "@/components/ui/heading";
import Link from "next/link";
import { SidebarContainer } from "@/components/containers/sidebar-conteiner";
import { MagicCard } from "@/components/ui/magic-card";
import { DirectusImage } from "@/components/shared/directus-image";

export default async function BlogPage() {
  const contents = await getContent({
    content_type: "article",
    fields: ["title", "short_description", "slug", "id", "seo", "cover_image"],
  });
  return (
    <SidebarContainer sidebar={<div>Sidebar</div>}>
      <Heading
        title="Блог"
        subtitle="Полезные статьи о SEO и маркетинге"
        level="h1"
      />
      <ul className="grid grid-cols-1 gap-4 my-8">
        {contents.map((content) => (
          <li key={content.id} className="list-none h-full">
            <Link href={`/blog/${content.slug}`}>
              <MagicCard className="rounded-md p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <DirectusImage
                    url={content.cover_image}
                    alt={content.title}
                    width={300}
                    height={300}
                  />
                  <div className="flex flex-col gap-2">
                    <h2>{content.title}</h2>
                    <p>{content.seo.meta_description}</p>
                  </div>
                </div>
              </MagicCard>
            </Link>
          </li>
        ))}
      </ul>
    </SidebarContainer>
  );
}

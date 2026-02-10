import { getContentItem } from "@/actions/get-content";
import { Markdown } from "@/components/shared/markdown";
import { SidebarContainer } from "@/components/containers/sidebar-conteiner";
import { TableOfContents } from "@/components/shared/table-of-contents";
import { DirectusImage } from "@/components/shared/directus-image";

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const content = await getContentItem({ slug });
  return (
    <SidebarContainer
      sidebar={<TableOfContents markdown={content.description} />}
    >
      <h1 className="text-5xl">{content.title}</h1>
      <DirectusImage
        url={content.cover_image || ""}
        alt={content.title}
        width={800}
        height={600}
        className="aspect-square w-2xl my-4"
      />
      <Markdown markdown={content.description} />
    </SidebarContainer>
  );
}

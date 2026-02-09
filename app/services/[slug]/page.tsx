import { Heading } from "@/components/ui/heading";
import { getContentItem } from "@/actions/get-content";
import { Markdown } from "@/components/shared/markdown";
import { SidebarContainer } from "@/components/containers/sidebar-conteiner";
import { RuTubeFrame } from "@/components/shared/rutube-frame";

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await getContentItem({
    slug,
    fields: ["id", "title", "slug", "description", "cover_image", "rutube_id"],
  });
  return (
    <SidebarContainer sidebar={<div>Sidebar</div>}>
      <div className="flex flex-col gap-4">
        <Heading title={content.title} level="h1" />
        <Markdown markdown={content.description} />
      </div>
    </SidebarContainer>
  );
}

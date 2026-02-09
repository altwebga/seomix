import { getContentItem } from "@/actions/get-content";
import { SidebarContainer } from "@/components/containers/sidebar-conteiner";
import { Markdown } from "@/components/shared/markdown";
import { RuTubeFrame } from "@/components/shared/rutube-frame";

export default async function PortfolioPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const portfolio = await getContentItem({
    slug,
    fields: ["description", "rutube_id", "title"],
  });
  return (
    <SidebarContainer sidebar={<div>Sidebar</div>}>
      <Markdown markdown={portfolio.description} />
      <RuTubeFrame videoId={portfolio.rutube_id} title={portfolio.title} />
    </SidebarContainer>
  );
}

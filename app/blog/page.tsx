import { getContent } from "@/actions/get-content";
import { Heading } from "@/components/ui/heading";
import Link from "next/link";
import { SidebarContainer } from "@/components/containers/sidebar-conteiner";

export default async function BlogPage() {
  const contents = await getContent({ content_type: "article" });
  return (
    <SidebarContainer sidebar={<div>Sidebar</div>}>
      <Heading
        title="Блог"
        subtitle="Полезные статьи о SEO и маркетинге"
        level="h1"
      />
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contents.map((content) => (
          <li key={content.id}>
            <Link href={`/blog/${content.slug}`}>{content.title}</Link>
          </li>
        ))}
      </ul>
    </SidebarContainer>
  );
}

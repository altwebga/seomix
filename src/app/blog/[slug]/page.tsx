import { getContentItem } from "@/actions/get-content";
import { DirectusImage } from "@/components/shared/directus-image";

export default async function BlogSinglePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articles = await getContentItem({
    slug,
    content_type: "article",
    fields: ["id", "title", "slug", "description", "cover_image"],
  });
  return (
    <div className="container mx-auto px-4 my-8">
      <h1>{articles.title}</h1>
      <DirectusImage url={articles.cover_image} />
      <p>{articles.description}</p>
    </div>
  );
}

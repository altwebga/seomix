import { getPost } from "@/actions/get-posts";
import { Markdown } from "@/components/markdown";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  return (
    <section className="container mx-auto px-4">
      <h1>{post.title}</h1>
      <Markdown markdown={String(post.content ?? "")} />
    </section>
  );
}

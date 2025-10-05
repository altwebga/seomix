import { getContentBySlug } from "@/actions/get-content";
import { Markdown } from "@/components/markdown";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { CallAction } from "@/components/call-actions";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const post = await getContentBySlug({ type: "post", slug });

  if (!post) {
    return <div>Пост не найден</div>;
  }

  return (
    <section className="container mx-auto p-4">
      <h1 className="pb-4">{post.title}</h1>
      <div className="flex flex-col md:flex-row gap-8 mt-4">
        <div className="md:w-3/4 md:border-r md:px-4">
          <Markdown markdown={String(post.description ?? "")} />
        </div>
        <div className="md:w-1/4 w-full lg:sticky lg:top-20 lg:self-start space-y-8">
          <Button asChild variant={"outline"}>
            <Link href={"/blog"}>
              <MoveLeft /> Назад к блогу
            </Link>
          </Button>
          <CallAction />
        </div>
      </div>
    </section>
  );
}

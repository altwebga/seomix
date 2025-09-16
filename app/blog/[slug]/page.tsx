import { getPost } from "@/actions/get-posts";
import { Markdown } from "@/components/markdown";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  return (
    <section className="container mx-auto p-4">
      <h1 className="pb-4">{post.title}</h1>
      <div className="flex flex-col md:flex-row gap-8 mt-4">
        <div className="md:w-3/4">
          <Markdown markdown={String(post.content ?? "")} />
        </div>
        <div className="md:w-1/4 w-full lg:sticky lg:top-20 lg:self-start md:border-l md:px-4 h-screen">
          <Button asChild variant={"outline"}>
            <Link href={"/blog"}>
              <MoveLeft /> Назад к блогу
            </Link>
          </Button>
          <p className="mt-4">Тут вставить баннер</p>
        </div>
      </div>
    </section>
  );
}

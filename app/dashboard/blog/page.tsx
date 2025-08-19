import { DataTable } from "@/components/data-table";
import { prisma } from "@/prisma";
import { PostType } from "@prisma/client";

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { type: PostType.POST },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1>Записи блога</h1>
      <DataTable posts={posts} />
    </div>
  );
}

import { DataTable } from "@/components/data-table";
import { prisma } from "@/prisma";
import { PostType } from "@prisma/client";

export default async function ServicesPage() {
  const posts = await prisma.post.findMany({
    where: { type: PostType.SERVICES },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1>Услуги</h1>
      <DataTable posts={posts} />
    </div>
  );
}

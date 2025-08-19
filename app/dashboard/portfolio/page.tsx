import { DataTable } from "@/components/data-table";
import { prisma } from "@/prisma";
import { PostType } from "@prisma/client";

export default async function PortfolioPage() {
  const posts = await prisma.post.findMany({
    where: { type: PostType.PORTFOLIO },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1>Портфолио</h1>
      <DataTable posts={posts} />
    </div>
  );
}

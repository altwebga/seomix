import Image from "next/image";
import placeholderImage from "@/public/images/placeholder_image.svg";
import { getPost } from "@/lib/api";
export async function PortfolioContent({ slug }: { slug: string }) {
  const post = await getPost(slug);

  if (!post || !post.title || !post.content) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <div className="flex gap-4 items-center">
        <Image
          src={post.acf?.logo || placeholderImage}
          width={80}
          height={80}
          alt={post.title.rendered}
          className="rounded-2xl"
        />
        <div>
          <h1>{post.title.rendered}</h1>
          <span className="text-gray-500">{post.acf?.businessCategory}</span>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </div>
  );
}

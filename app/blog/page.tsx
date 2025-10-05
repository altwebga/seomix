import { getContentLite } from "@/actions/get-content";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { getDirectusImage } from "@/lib/get-directus-image";
import { CallAction } from "@/components/call-actions";

export default async function BlogPage() {
  const { content: posts } = await getContentLite("post");
  return (
    <section className="container mx-auto px-4 py-8">
      <h1>Блог</h1>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Основной контент */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 lg:col-span-2 md:w-3/4">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="transition delay-10 duration-50 ease-linear hover:-translate-y-1 hover:scale-102"
            >
              <Link href={`blog/${post.slug}`}>
                <div className="flex flex-col md:flex-row gap-4 p-4 items-center">
                  <Image
                    src={getDirectusImage(post.cover_image?.id, {
                      width: 300,
                      height: 300,
                      fit: "cover",
                    })}
                    alt={post.cover_image?.title || "Изображение поста"}
                    width={300}
                    height={300}
                    priority={false}
                    className="aspect-square w-60 h-60 rounded-md"
                  />
                  <div className="w-full flex flex-col">
                    <h3>{post.title}</h3>
                    <p className="line-clamp-3">{post.seo.meta_description}</p>
                    <Button
                      className="flex gap-2 self-end cursor-pointer px-4"
                      variant={"link"}
                    >
                      Подробнее <ArrowUpRight />
                    </Button>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>

        {/* Баннер */}
        <div className="my-4 lg:sticky lg:top-20 lg:self-start md:w-1/4">
          <CallAction />
        </div>
      </div>
    </section>
  );
}

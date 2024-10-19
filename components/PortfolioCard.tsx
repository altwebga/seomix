import Image from "next/image";
import Link from "next/link";
import placeholderImage from "@/public/images/placeholder_image.svg";
import { getPosts } from "@/lib/api";
import { Post } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export async function PortfolioCard() {
  const cases = await getPosts(3, 99);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cases.map((post: Post) => (
        <Card key={post.id} className="shadow-2xl p-4">
          <Link href={`/portfolio/${post.slug}`} className="text-xl">
            <CardContent>
              <Image
                src={post.image_url || placeholderImage}
                alt={post.title.rendered}
                width={500}
                height={500}
              />
            </CardContent>
            <CardFooter>
              <h3>{post.title.rendered}</h3>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
}

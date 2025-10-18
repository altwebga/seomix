import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface BlogCardProps {
  slug: string;
  title: string;
  content: string;
  image: string;
}

const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

export function BlogCard({ slug, title, content, image }: BlogCardProps) {
  return (
    <Link href={slug}>
      <Card className="max-w-2xl">
        <div className="flex flex-col md:flex-row">
          <Image
            src={`${imageUrl}/${image}`}
            alt={title}
            width={300}
            height={300}
            priority={false}
            className="aspect-square object-cover p-2 max-w-80 rounded-b-md"
          />
          <div className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle>
                <h3>{title}</h3>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm line-clamp-3">{content}</p>
            </CardContent>
            <CardFooter className="flex justify-end">
              <p>Подробнее...</p>
            </CardFooter>
          </div>
        </div>
      </Card>
    </Link>
  );
}

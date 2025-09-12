import Image from "next/image";
import Link from "next/link";
import { Card } from "./ui/card";

type PostCardProps = {
  title: string;
  expect?: string;
  imageURL: string;
  imageAlt: string;
  slug: string;
};

export function PostCard({
  title,
  expect,
  imageURL,
  imageAlt,
  slug,
}: PostCardProps) {
  const src = (process.env.NEXT_PUBLIC_IMAGE_URL || "") + imageURL;

  return (
    <Link href={`/blog/${slug}`} aria-label={title}>
      <Card className="flex flex-col md:flex-row gap-4 justify-between md:items-center max-w-4xl px-4">
        <Image
          src={src}
          alt={imageAlt}
          width={120}
          height={120}
          className="aspect-square object-cover h-28 w-28 rounded-md"
        />
        <div>
          <h3>{title}</h3>
          <p className="text-sm">{expect}</p>
        </div>
      </Card>
    </Link>
  );
}

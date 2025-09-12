import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

type PostCardProps = {
  title: string;
  imageURL: string;
  imageAlt: string;
  slug: string;
};

export function PostCard({ title, imageURL, imageAlt, slug }: PostCardProps) {
  const src = process.env.NEXT_PUBLIC_IMAGE_URL + imageURL;

  return (
    <Link href={`/blog/${slug}`}>
      <Card className="relative overflow-hidden rounded-xl aspect-square">
        {/* Фоновая картинка */}
        <Image
          src={src}
          alt={imageAlt}
          fill
          sizes="(min-width:300px) 33vw, (min-width:300px) 50vw, 100vw"
          className="object-cover"
        />

        {/* Контент футера с размытием */}
        <CardFooter className="absolute bottom-0 left-0 right-0 p-4 bg-background/40 backdrop-blur-md">
          <h3 className="text-lg font-semibold">{title}</h3>
        </CardFooter>
      </Card>
    </Link>
  );
}

import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ServiceCardProps {
  slug: string;
  title: string;
  price?: string | null;
  imageId?: string | null;
  imageTitle?: string | null;
}

const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

export function ServiceCard({
  slug,
  title,
  price,
  imageId,
  imageTitle,
}: ServiceCardProps) {
  return (
    <Link href={slug}>
      <Card className="max-w-2xl relative">
        <p className="absolute top-2 right-2 z-10 text-foreground text-sm">
          {imageTitle}
        </p>
        <CardHeader className="space-y-2">
          {imageId ? (
            <Image
              src={`${imageUrl}/${imageId}`}
              alt={title}
              width={300}
              height={300}
              className="w-full object-cover rounded-md"
            />
          ) : null}
          <CardTitle>
            <h3>{title}</h3>
          </CardTitle>
        </CardHeader>
        {price ? (
          <CardContent>
            <p className="text-sm text-muted-foreground">{price}</p>
          </CardContent>
        ) : null}
      </Card>
    </Link>
  );
}

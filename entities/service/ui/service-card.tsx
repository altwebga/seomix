import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPublicEnv } from "@/shared/config/public-env";

interface ServiceCardProps {
  slug: string;
  title: string;
  shortContent?: string | null;
  price?: string | null;
  imageId?: string | null;
  imageTitle?: string | null;
}

const { NEXT_PUBLIC_IMAGE_URL } = getPublicEnv();

export function ServiceCard({
  slug,
  title,
  price,
  imageId,
  shortContent,
}: ServiceCardProps) {
  return (
    <Link href={slug}>
      <Card className="max-w-2xl relative p-0 hover:scale-102 transition duration-150 ease-in-out">
        {price ? (
          <p className="absolute top-2 right-2 z-10 text-sm text-green-500 px-4 py-2 backdrop-blur-sm rounded-md bg-background/50">
            {price}
          </p>
        ) : null}
        <CardHeader className="space-y-2">
          {imageId ? (
            <Image
              src={`${NEXT_PUBLIC_IMAGE_URL}/${imageId}`}
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
        {shortContent ? (
          <CardContent>
            <p className="text-sm text-muted-foreground">{shortContent}</p>
          </CardContent>
        ) : null}
      </Card>
    </Link>
  );
}

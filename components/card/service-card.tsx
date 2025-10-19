import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ServiceCardProps {
  slug: string;
  title: string;
  price?: string | null;
  imageId?: string | null;
}

const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

export function ServiceCard({ slug, title, price, imageId }: ServiceCardProps) {
  return (
    <Link href={slug}>
      <Card className="h-full">
        <CardHeader className="space-y-2">
          {imageId ? (
            <Image
              src={`${imageUrl}/${imageId}`}
              alt={title}
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-md"
            />
          ) : null}
          <CardTitle>
            <h3>{title}</h3>
          </CardTitle>
        </CardHeader>
        {price ? (
          <CardContent>
            <p className="text-sm text-muted-foreground">от {price}</p>
          </CardContent>
        ) : null}
      </Card>
    </Link>
  );
}

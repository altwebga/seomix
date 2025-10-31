import Image from "next/image";
import Link from "next/link";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectCardProps {
  slug: string;
  title: string;
  imageId: string;
}

const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

export function ProjectCard({ slug, title, imageId }: ProjectCardProps) {
  return (
    <Link href={slug}>
      <Card>
        <CardHeader>
          <Image
            src={`${imageUrl}/${imageId}`}
            alt={title}
            width={300}
            height={300}
            priority={true}
            className="object-fill rounded-md w-full h-full"
          />
          <CardTitle>
            <h3>{title}</h3>
          </CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}

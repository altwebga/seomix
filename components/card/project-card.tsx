import Image from "next/image";
import Link from "next/link";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getPublicEnv } from "@/shared/config/public-env";

interface ProjectCardProps {
  slug: string;
  title: string;
  imageId: string;
}

const { NEXT_PUBLIC_IMAGE_URL } = getPublicEnv();

export function ProjectCard({ slug, title, imageId }: ProjectCardProps) {
  return (
    <Link href={slug}>
      <Card>
        <CardHeader>
          <Image
            src={`${NEXT_PUBLIC_IMAGE_URL}/${imageId}`}
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

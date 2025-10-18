import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProjectCardProps {
  slug: string;
  title: string;
  releaseDate?: string;
  imageId?: string;
  clientTitle?: string;
  description?: string;
}

const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

function formatReleaseDate(releaseDate?: string) {
  if (!releaseDate) {
    return null;
  }

  try {
    const date = new Date(releaseDate);
    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return new Intl.DateTimeFormat("ru-RU", {
      year: "numeric",
      month: "long",
    }).format(date);
  } catch {
    return null;
  }
}

export function ProjectCard({
  slug,
  title,
  releaseDate,
  imageId,
  clientTitle,
  description,
}: ProjectCardProps) {
  const formattedDate = formatReleaseDate(releaseDate);
  const cardContent = (
    <Card className="max-w-3xl">
      <div className="flex flex-col md:flex-row">
        {imageId && imageUrl ? (
          <Image
            src={`${imageUrl}/${imageId}`}
            alt={title}
            width={300}
            height={300}
            priority={false}
            className="aspect-square object-cover p-2 max-w-80 rounded-b-md"
          />
        ) : null}
        <div className="flex flex-1 flex-col justify-between">
          <CardHeader>
            <CardTitle>
              <h3>{title}</h3>
            </CardTitle>
            {clientTitle ? (
              <CardDescription>Клиент: {clientTitle}</CardDescription>
            ) : null}
            {formattedDate ? (
              <CardDescription>Дата релиза: {formattedDate}</CardDescription>
            ) : null}
          </CardHeader>
          <CardContent>
            {description ? (
              <p className="text-sm line-clamp-3">{description}</p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Посмотреть детали проекта
              </p>
            )}
          </CardContent>
          <CardFooter className="flex justify-end">
            <p>Подробнее...</p>
          </CardFooter>
        </div>
      </div>
    </Card>
  );

  return <Link href={slug}>{cardContent}</Link>;
}

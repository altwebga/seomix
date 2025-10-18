import Image from "next/image";
import Link from "next/link";

import { getContentParams } from "@/actions/fetch-data";
import { GET_PROJECT } from "@/config/queries";
import { IProject } from "@/config/types";
import { Markdown } from "@/components/handlers/markdown";

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
      day: "numeric",
    }).format(date);
  } catch {
    return null;
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getContentParams<{ projects: IProject[] }>(GET_PROJECT, {
    slug,
  });

  if (!result || !result.projects || result.projects.length === 0) {
    return <p>Нет контента</p>;
  }

  const project = result.projects[0];
  const formattedDate = formatReleaseDate(project.release_date);

  return (
    <section className="container mx-auto space-y-6 p-4">
      <header className="space-y-2">
        <h1>{project.title}</h1>
        {formattedDate ? <p>Дата релиза: {formattedDate}</p> : null}
        {project.client?.title ? <p>Клиент: {project.client.title}</p> : null}
        {project.client?.direction ? (
          <p>Направление: {project.client.direction}</p>
        ) : null}
      </header>

      {project.cover_image?.id && imageUrl ? (
        <div className="w-full">
          <Image
            src={`${imageUrl}/${project.cover_image.id}`}
            alt={project.cover_image.title || project.title}
            width={1200}
            height={675}
            priority={false}
            className="h-auto w-full rounded-lg object-cover"
          />
        </div>
      ) : null}

      <div className="flex flex-wrap gap-4">
        {project.site ? (
          <Link
            href={project.site}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            Сайт проекта
          </Link>
        ) : null}
        {project.video_url ? (
          <Link
            href={project.video_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            Видео презентация
          </Link>
        ) : null}
      </div>

      {project.content ? <Markdown markdown={project.content} /> : null}
    </section>
  );
}

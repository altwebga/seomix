import type { Metadata } from "next";
import { Markdown } from "@/components/features/markdown";
import { ContainerFixed } from "@/components/layout/container-fixed";
import { RuTubeFrame } from "@/components/features/rutube-frame";
import { CallAction } from "@/components/widgets/call-action";
import { ClientCard } from "@/components/card/client-card";
import {
  getCustomerById,
  getProjectBySlug,
  getPublishedProjectsSlugs,
} from "@/actions/content";
import { BackButton } from "@/components/shared/back-button";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;

  const project = await getProjectBySlug(slug);

  const baseImageUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "";
  const seoTitle = project?.seo?.title || project?.title || undefined;
  const seoDescription = project?.seo?.meta_description || undefined;
  const ogImagePath =
    project?.seo?.og_image || project?.cover_image || undefined;
  const ogImageUrl =
    ogImagePath && baseImageUrl ? `${baseImageUrl}/${ogImagePath}` : undefined;

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      images: ogImageUrl ? [{ url: ogImageUrl }] : undefined,
      type: "article",
    },
    twitter: {
      card: ogImageUrl ? "summary_large_image" : "summary",
      title: seoTitle,
      description: seoDescription,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const projects = await getPublishedProjectsSlugs();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function PortfolioProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const client = project?.client ? await getCustomerById(project.client) : null;
  const baseImageUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "";
  const clientLogo = client?.cover_image
    ? typeof client.cover_image === "string"
      ? baseImageUrl
        ? `${baseImageUrl}/${client.cover_image}`
        : client.cover_image
      : client.cover_image.filename_disk
      ? baseImageUrl
        ? `${baseImageUrl}/${client.cover_image.filename_disk}`
        : client.cover_image.filename_disk
      : ""
    : "";

  return (
    <ContainerFixed
      main={
        <>
          {project?.content ? <Markdown markdown={project.content} /> : ""}
          {project?.rutube_id ? (
            <RuTubeFrame
              videoId={project.rutube_id}
              title={project?.title || ""}
            />
          ) : (
            ""
          )}
        </>
      }
      sidebar={
        <div className="md:max-w-sm space-y-8">
          {client ? (
            <ClientCard
              title={client.title}
              direction={client.content}
              logo={clientLogo}
            />
          ) : null}
          <div className="flex gap-2">
            <BackButton href="/portfolio" title="Назад к портфолио" />
            {project?.site_url ? (
              <Button variant={"secondary"} size={"lg"}>
                <a
                  href={project?.site_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Посмотреть сайт
                </a>
                <ExternalLink />
              </Button>
            ) : null}
          </div>
          <CallAction />
        </div>
      }
    />
  );
}

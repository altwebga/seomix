import { getContent } from "@/actions/fetch-data";
import { ProjectCard } from "@/components/card/project-card";
import { GET_PROJECTS } from "@/config/queries";
import { IProject } from "@/config/types";

interface GraphQLResponse {
  projects?: IProject[];
}

export default async function PortfolioPage() {
  const result = await getContent<GraphQLResponse>(GET_PROJECTS, {
    revalidate: 3600 * 24,
  });

  const projects = result?.projects ?? [];

  if (projects.length === 0) {
    return <p>проектов нет</p>;
  }

  return (
    <section className="container mx-auto p-4">
      <h1>Портфолио</h1>
      <div className="grid grid-cols-1 gap-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            slug={`/portfolio/${project.slug}`}
            title={project.title}
            releaseDate={project.release_date}
            imageId={project.cover_image?.id}
            clientTitle={project.client?.title}
            description={project.seo?.meta_description}
          />
        ))}
      </div>
    </section>
  );
}

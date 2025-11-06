import { ContainerFixed } from "@/components/layout/container-fixed";
import { ProjectCard } from "@/components/card/project-card";
import { getPublishedProjectsList } from "@/actions/content";

export default async function PortfolioPage() {
  const projects = await getPublishedProjectsList();

  return (
    <ContainerFixed
      main={
        <>
          <h1>Портфолио</h1>
          <p>Некоторые работы которые нам разрешено показывать договором.</p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 list-none px-0">
            {projects.map((project) => (
              <li key={project.id}>
                <ProjectCard
                  slug={`portfolio/${project.slug}` || ""}
                  title={project.title}
                  imageId={project.cover_image || ""}
                />
              </li>
            ))}
          </ul>
        </>
      }
      sidebar={
        <div>
          <p>Тут фиксировано</p>
        </div>
      }
    />
  );
}

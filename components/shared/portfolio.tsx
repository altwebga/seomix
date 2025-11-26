import { Badge } from "@/components/ui/badge";
import { ProjectCard } from "../card/project-card";
import { getPublishedProjectsList } from "@/actions/feth-data";
import { LinkButton } from "../layout/link-button";

export async function Portfolio() {
  const projects = await getPublishedProjectsList();

  return (
    <section id="portfolio" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4">Наши работы</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Последние проекты
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Реальные кейсы, которые принесли результаты нашим клиентам
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {projects.slice(0, 4).map((project) => (
            <ProjectCard
              key={project.id}
              slug={`portfolio/${project.slug}`}
              title={project.title}
              imageId={project.cover_image}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <LinkButton href="/portfolio" title="Все проекты" />
          <p className="text-sm text-muted-foreground mt-4">
            200+ успешных проектов за 5 лет работы
          </p>
        </div>
      </div>
    </section>
  );
}

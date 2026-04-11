import { getContentItem, getContent } from "@/actions/get-content";
import { GlowContainer, BreadcrumbNav } from "@/components/thegridcn";
import { Markdown } from "@/components/shared/markdown";
import Link from "next/link";
import { CTA } from "@/components/layout/cta";
import { DirectusImage } from "@/components/shared/directus-image";

export default async function ServicesSinglePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getContentItem({ slug, content_type: "service" });
  const similar_services = await getContent({
    content_type: "service",
    limit: 8,
  });
  return (
    <div className="container mx-auto px-4 my-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3">
          <BreadcrumbNav
            className="mb-8"
            items={[
              { label: "Главная", href: "/" },
              { label: "Услуги", href: "/services" },
              { label: service.title, active: true },
            ]}
          />
          <h1 className="text-2xl font-bold uppercase tracking-wider text-foreground md:text-3xl lg:text-4xl mb-8">
            {service.title}
          </h1>
          <Markdown markdown={service.description} />
          <CTA />
        </div>
        <aside className="w-full md:w-1/3">
          <GlowContainer className=" sticky top-40">
            {/* Related Articles (sidebar version) */}
            <div className="relative overflow-hidden rounded border border-primary/20 bg-card/80 p-4 backdrop-blur-sm">
              <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />
              <div className="relative">
                <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-foreground/50">
                  Другие услуги
                </div>
                <div className="space-y-3">
                  {similar_services
                    .filter((s) => s.slug !== slug)
                    .map((service) => (
                      <Link
                        key={service.title}
                        href={`/services/${service.slug}`}
                        className="group block border-b border-primary/10 pb-3 last:border-0 last:pb-0"
                      >
                        <div className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-foreground/70 transition-colors group-hover:text-primary">
                          {service.title}
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
              {/* Corner decorations */}
              <div className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-primary/30" />
              <div className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-primary/30" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/30" />
              <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/30" />
            </div>
            <DirectusImage
              url={service.cover_image}
              alt={service.title}
              width={600}
              height={600}
              className="w-full h-auto mt-4"
            />
          </GlowContainer>
        </aside>
      </div>
    </div>
  );
}

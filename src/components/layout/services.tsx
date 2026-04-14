import Link from "next/link";
import { TronCarousel } from "../thegridcn";
import { getContent } from "@/actions/get-content";
import {
  TronCard,
  TronCardHeader,
  TronCardTitle,
  TronCardContent,
  TronCardDescription,
} from "../thegridcn";
import { DirectusImage } from "../shared/directus-image";
import { Grid3D } from "../thegridcn";

function ServiceCard({ service }: { service: any }) {
  return (
    <Link href={`/services/${service.slug}`}>
      <TronCard className="cursor-pointer">
        <TronCardHeader>
          <TronCardTitle>{service.title}</TronCardTitle>
          <TronCardDescription className="min-h-14">
            {service.short_description}
          </TronCardDescription>
        </TronCardHeader>
        <TronCardContent>
          <DirectusImage
            url={service.cover_image}
            alt={service.title}
            width={600}
            height={600}
            className="w-2xl h-auto"
          />
        </TronCardContent>
      </TronCard>
    </Link>
  );
}

export async function Services() {
  const services = await getContent({ content_type: "service", limit: 8 });
  return (
    <section id="services" className="px-4 py-16 relative">
      <Grid3D className="absolute inset-0 z-0" />
      <div className="container mx-auto">
        <div className="mb-10 text-center">
          <p className="font-mono text-[10px] uppercase tracking-widest text-primary/60">
            SERVICES
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-wider text-foreground md:text-3xl max-w-3xl mx-auto">
            Полный спектр решений для быстрого и эффективного старта вашего
            бизнеса в интернете
          </h2>
          <div className="mx-auto mt-3 flex justify-center gap-1">
            <div className="h-px w-12 bg-primary/60" />
            <div className="h-px w-6 bg-primary/30" />
            <div className="h-px w-3 bg-primary/15" />
          </div>
        </div>

        <TronCarousel
          items={services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        />
      </div>
    </section>
  );
}

import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from "next/navigation";
import { Services } from "@/config/services";
import { ServiceItem } from "@/types";
import { Image } from "@nextui-org/image";
import { title } from "@/components/primitives";
import ContactModalForm from "@/components/ContactModalForm";  // Импортируем новый компонент

interface ServiceDetailProps {
  params: {
    slug: string;
  };
}

// Generate metadata for each portfolio item
export async function generateMetadata(
  { params }: ServiceDetailProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const item: ServiceItem | undefined = Services.find(
    (p) => p.slug === params.slug
  );

  if (!item) {
    return {
      title: 'Not Found',
      description: 'The portfolio item could not be found',
    };
  }
  return {
    title: item.title,
    description: item.description,
  };
}


const ServiceDetail = ({ params }: ServiceDetailProps) => {
  const item: ServiceItem | undefined = Services.find(
    (p) => p.slug === params.slug
  );

  if (!item) {
    notFound();
  }

  return (
    <div className="my-6">
      <h1 className={title({ size: "md" })}>{item.title}</h1>
      <div className="flex flex-col md:flex-row-reverse gap-4 py-6 justify-between items-center">
        <Image src={item.image ? item.image.src : item.image} width={400} isBlurred />
        <div className="max-w-2xl">
          <p className="py-6">{item.description}</p>
          {item.content.map((p, index) => (
            <p key={index} className="py-1">{p.paragraph}</p>
          ))}
          <ContactModalForm />  {/* Используем новый компонент */}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;

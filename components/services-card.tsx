import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import Link from "next/link";

type ServicesCardProps = {
  slug: string;
  title: string;
  image: string;
  excerpt: string;
  price: string;
};

export const ServicesCard = ({
  slug,
  title,
  image,
  excerpt,
  price,
}: ServicesCardProps) => {
  return (
    <Link href={`services/${slug}`}>
      <Card
        className="border-1 border-gray-500 hover:border-gray-300 transition-transform duration-300 transform hover:scale-105 peer"
        shadow="lg"
      >
        <CardBody>
          <div className="flex flex-col md:flex-row gap-8 items-center ">
            <div className="md:w-1/2">
              <Image
                isZoomed
                alt={title}
                className="h-56 w-full object-cover"
                height={300}
                shadow="md"
                src={image}
                width={300}
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-xl">{title}</h3>
              <div dangerouslySetInnerHTML={{ __html: excerpt }} />
              <p className="pt-4 text-green-600">{price}</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
};

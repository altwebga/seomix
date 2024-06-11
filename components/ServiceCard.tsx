import { FC } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { ServiceItem } from "@/types";
import { Link } from "@nextui-org/link";

const ServiceCard: FC<ServiceItem> = ({ id, image, title, price, description, slug }) => {
  return (
    <Link href={`/services/${slug}`}>
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[1024px]"
      shadow="sm"
      key={id}
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              isBlurred
              alt={title}
              className="object-cover"
              height={200}
              shadow="md"
              src={image ? image.src : image}
              width="100%"
            />
          </div>
          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-semibold text-foreground/90">
                  {title}
                </h3>
                <p className="text-small text-foreground/80">{price}</p>
                <h1 className="font-medium mt-2">{description}</h1>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
    </Link>
  );
};

export default ServiceCard;

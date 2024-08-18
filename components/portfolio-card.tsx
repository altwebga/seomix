import { Card, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import Link from "next/link";

type PortfolioCardProps = {
  slug: string;
  title: string;
  logo: string;
  image: string;
  businessCategory: string;
};

export const PortfolioCard = ({
  slug,
  title,
  logo,
  image,
  businessCategory,
}: PortfolioCardProps) => {
  return (
    <Link href={`portfolio/${slug}`}>
      <Card
        isFooterBlurred
        className="border-1 border-gray-500 hover:border-gray-300 transition-transform duration-300 transform hover:scale-105 peer"
        shadow="lg"
      >
        <Image
          removeWrapper
          alt={title}
          className="z-0 w-full h-full object-cover"
          src={image}
        />
        <CardFooter className="absolute bottom-0 z-10">
          <div className="flex flex-grow gap-2 items-center">
            <Image alt="Логотип" className="w-11 h-11" src={logo} />
            <div className="flex flex-col">
              <h3 className="text-white">{title}</h3>
              <div className="text-white">{businessCategory}</div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

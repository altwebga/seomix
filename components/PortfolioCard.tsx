import { Card, CardHeader, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import { Portfolio } from "@/config/portfolio";
import { PortfolioItem } from "@/types";

interface ServicesCardProps {
  showWorkId: number[]; // новый пропс для отображаемых ID
}

const PortfolioCard: React.FC<ServicesCardProps> = ({  showWorkId }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {Portfolio.filter(item => showWorkId.includes(item.id)).map((item: PortfolioItem) => (
        <Link href={`/portfolio/${item.slug}`} key={item.id} passHref>
          <div className="block">
            <Card
              isFooterBlurred
              className="w-full h-[300px] col-span-12 sm:col-span-7"
            >
              <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">
                  {item.release}
                </p>
              </CardHeader>
              <Image
                removeWrapper
                alt={item.title}
                className="z-0 w-full h-full object-cover"
                src={item.image? item.image.src: item.image}
              />
              <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                  <Image
                    alt="Логотип"
                    className="w-11 h-11 bg-black"
                    src={item.logo? item.logo.src: item.logo}
                  />
                  <div className="flex flex-col">
                    <p className="text-tiny text-white/60">{item.title}</p>
                    <p className="text-tiny text-white/60">
                      {item.description}
                    </p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PortfolioCard;

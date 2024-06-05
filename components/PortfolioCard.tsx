// components/PortfolioCard.tsx
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/divider";
import Link from "next/link";
import { Portfolio } from "@/config/portfolio";
import { PortfolioItem } from "@/types";

const PortfolioCard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {Portfolio.map((item: PortfolioItem) => (
        <Link href={`/portfolio/${item.id}`} key={item.id} passHref>
          <div className="block">
            <Card className="max-w-[400px] cursor-pointer">
              <CardHeader className="flex gap-3">
                <Image
                  alt={item.title}
                  height={40}
                  radius="sm"
                  src={item.logo.src}
                  width={40}
                />
                <div className="flex flex-col">
                  <p className="text-md">{item.title}</p>
                  <p className="text-small text-default-500">
                    {item.description}
                  </p>
                </div>
              </CardHeader>
              <Divider />
              <CardFooter>
                <p className="text-blue-500">{item.site}</p>
              </CardFooter>
            </Card>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PortfolioCard;

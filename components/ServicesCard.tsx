import React from "react";
import { Card, CardHeader, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Services } from "@/config/services";


interface ServicesCardProps {
  displayIds: number[]; // новый пропс для отображаемых ID
}

const ServicesCard: React.FC<ServicesCardProps> = ({ displayIds }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {Services.filter(item => displayIds.includes(item.id)).map(item => (
        <Card
          key={item.id}
          isFooterBlurred
          className="w-full h-[300px] col-span-1"
        >
          <Image
            removeWrapper
            alt={item.title}
            className="z-0 w-full h-full object-cover"
            src={item.image ? item.image.src : item.image}
          />
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
            <h3 className="text-white font-bold">{item.title}</h3>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ServicesCard;



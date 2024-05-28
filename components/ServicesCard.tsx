import { siteConfig } from "@/config/site";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { title } from "./primitives";


const ServicesCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {siteConfig.servicesItems.map((item, index) => (
        <Card key={index} className="h-[300px]" shadow="md">
          <CardHeader>
            <h3 className={title({ color: 'cyan', size: 'm' })}>{item.title}</h3>
          </CardHeader>
          <Divider/>
          <CardBody>
            <p className="text-xl">{item.description}</p>
          </CardBody>   
        </Card>
      ))}
    </div>
  );
};

export default ServicesCard;

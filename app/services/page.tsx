import { title, subtitle } from "@/components/primitives";
import { Services } from "@/config/services";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";

export default function ServicesPage() {
  return (
    <div className="mt-6">
      <h1 className={title()}>Мои услуги</h1>
      <p className={subtitle()}>Инструменты цифрового продвижения.</p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {Services.map((item) => (
          <Card className="max-w-[450px]" key={item.id}>
            <CardHeader className="flex gap-3">
              <Image
                alt={item.title}
                height={80}
                radius="sm"
                src={item.image ? item.image.src : item.image}
                width={80}
              />
              <div className="flex flex-col">
                <p className="text-md">{item.title}</p>
                <p className="text-small text-default-500">{item.price}</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>
               {item.description}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

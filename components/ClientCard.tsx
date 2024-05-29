import { Card, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Client} from '@/config/client'

const ClientCard = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
      {Client.slice(0, 8).map((client, index) => (
        <Card
          isFooterBlurred
          radius="lg"
          className="border-none flex flex-col justify-between items-center p-4"
          key={index}
        >
          <div className="flex-grow flex items-center justify-center">
            <Image
              alt={client.title}
              className="object-cover"
              height={80}
              width={80}
              src={client.logo ? client.logo.src : client.logo}
              radius='none'
            />
          </div>
          <CardFooter className="justify-center w-full py-2 mt-2">
            <a
              href={client.site}
              target="_blank"
              rel="noopener noreferrer"
              className="text-tiny text-center"
            >
              {client.title}
            </a>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ClientCard;


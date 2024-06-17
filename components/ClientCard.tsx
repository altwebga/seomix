import { Card, CardHeader } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Client } from '@/config/client';

const ClientCard = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3">
      {Client.slice(0, 6).map((client, index) => (
        <Card
          isFooterBlurred
          radius="lg"
          className="flex flex-col items-center justify-between border-none p-4"
          key={index}
        >
          <CardHeader className="flex gap-3">
            <Image
              alt={client.title}
              height={40}
              radius="none"
              src={client.logo ? client.logo.src : client.logo}
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-md">{client.title}</p>
              <p className="text-small text-default-500">
                {client.description}
              </p>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default ClientCard;

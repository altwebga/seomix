import { Card, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

import Parnas from "@/public/images/client_1.png";
import Kalina from "@/public/images/client_2.png";
import MCAltay from "@/public/images/client_3.png";
import GAZdorovie from "@/public/images/client_4.png";
import TransferAltay from "@/public/images/client_5.png";
import Inovamed from "@/public/images/client_6.png";
import Omma from "@/public/images/client_7.png";
import AltaiActive from "@/public/images/client_8.jpg";

const client = [
  { logo: Parnas, name: "Гостиница Парнас", url: "https://hotel-parnas.ru/" },
  { logo: Kalina, name: "Калина мебель", url: "https://mebel-kalina.ru/" },
  {
    logo: MCAltay,
    name: "Медицинский центр Алтай",
    url: "https://mc-altay.ru/",
  },
  {
    logo: GAZdorovie,
    name: "Гармония Здоровья",
    url: "https://ga-zdorovie.ru/",
  },
  {
    logo: TransferAltay,
    name: "Трансфер Алтай",
    url: "https://transfer-altay.ru/",
  },
  { logo: Inovamed, name: "ИнноваМед", url: "https://inovamed.ru/" },
  { logo: Omma, name: "ОММА", url: "https://omma.pro/" },
  {
    logo: AltaiActive,
    name: "Бюро путешествий Созвездие",
    url: "https://altaiactive.ru/",
  },
];

const ClientCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {client.map((client, index) => (
        <Card
          isFooterBlurred
          radius="lg"
          className="border-none flex flex-col justify-between items-center p-4"
          key={index}
        >
          <div className="flex-grow flex items-center justify-center">
            <Image
              alt={client.name}
              className="object-cover"
              height={150}
              width={150}
              src={client.logo ? client.logo.src : client.logo}
              radius='none'
            />
          </div>
          <CardFooter className="justify-center w-full py-2 mt-2">
            <a
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-tiny text-white/80"
            >
              {client.name}
            </a>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ClientCard;

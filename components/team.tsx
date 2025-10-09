import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import whatsapp from "@/public/images/whatsapp.min.svg";
import telegram from "@/public/images/telegram.min.svg";

interface ITeamProps {
  image: string;
  title: string;
  content: string;
  whatsappLink?: string;
  telegramLink?: string;
}

export function Team({
  image,
  title,
  content,
  whatsappLink,
  telegramLink,
}: ITeamProps) {
  return (
    <Card>
      <CardHeader>
        <Image
          src={image}
          alt={title}
          width={300}
          height={300}
          className="aspect-square object-cover rounded-md shadow-md"
        />
      </CardHeader>
      <CardContent>
        <h3>{title}</h3>
        <p>{content}</p>
      </CardContent>
      <CardFooter className="flex gap-3 justify-center">
        {whatsappLink && (
          <Link
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Image src={whatsapp} alt="WhatsApp" width={24} height={24} />
          </Link>
        )}
        {telegramLink && (
          <Link
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Image src={telegram} alt="Telegram" width={24} height={24} />
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}

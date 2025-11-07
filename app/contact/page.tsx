import { Container } from "@/components/layout/container";
import { socialLinks } from "@/config/social-links";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { CallAction } from "@/components/widgets/call-action";
import Image from "next/image";

export default function ContactPage() {
  return (
    <Container>
      <h1>Контакты</h1>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="md:w-1/2">
          <p className="py-4">
            Я не публикую номер телефона т.к. не хочу попасть в базу спам
            звонков. Вы можете легко получить его перейдя в любой из моих
            социальных аккаунтов.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {socialLinks.map((item) => (
              <Button
                key={item.url}
                variant={"secondary"}
                size={"lg"}
                className="min-w-40"
              >
                <Image src={item.icon} alt="иконка" width={24} height={24} />
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
                <ExternalLink />
              </Button>
            ))}
          </div>
          <CallAction className="mt-8" />
        </div>
        <div className="md:w-1/2 flex flex-col justify-center items-center gap-4">
          <Image
            src={"/img/qrcode.min.svg"}
            alt="qrcode"
            width={400}
            height={400}
          />
          <p>Отсканируйте qr-код что-бы добавить нас в контакты.</p>
        </div>
      </div>
    </Container>
  );
}

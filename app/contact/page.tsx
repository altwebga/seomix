import Image from "next/image";
import { SocialLinks } from "@/components/social-links";
import { CallAction } from "@/components/call-actions";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1>Контакты</h1>
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="space-y-8 md:w-1/2">
          <p>
            Я не публикую номер телефона т.к. не хочу попасть в базу спам
            звонков. Вы можете легко получить его перейдя в любой из моих
            социальных аккаунтов.
          </p>
          <SocialLinks />
          <CallAction />
        </div>
        <div className="md:w-1/2 flex flex-col items-center">
          <Image
            src={"/images/qrcode.min.svg"}
            alt="Отсканируйте QR-код"
            width={400}
            height={400}
          />
          <p className="mt-8">
            Отсканируйте QR-код что-бы добавить меня в контакты
          </p>
        </div>
      </div>
    </div>
  );
}

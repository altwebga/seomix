import { Image } from "@nextui-org/image";

import { ContactForm } from "@/components/contact-form";
import { SocialLink } from "@/components/social-links";
import QRCode from "@/public/images/qrcode.svg";
export default function ContactPage() {
  return (
    <div>
      <h1>Контакты</h1>
      <p className="max-w-2xl">
        Я не публикую номер телефона т.к. не хочу попасть в базу спам звонков.
        Вы можете легко получить его перейдя в любой из моих социальных
        аккаунтов.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="py-8">
          <SocialLink color="foreground" size="large" />
          <ContactForm />
        </div>
        <div className="flex flex-col justify-center items-center">
          <Image
            alt="my photo"
            className="w-auto h-auto"
            height={400}
            src={QRCode.src}
            width={400}
          />
          <p>Отсканируйте QR-код что бы добавить меня в контакты</p>
        </div>
      </div>
    </div>
  );
}

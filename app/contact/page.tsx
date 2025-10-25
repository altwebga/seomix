import { ContactForm } from "@/components/form/contact-form";
import { SocialIcons } from "@/components/layout/social-icons";
import ContactQrCode from "@/public/images/qrcode.min.svg";
import Image from "next/image";
import { SectionContainer } from "@/components/layout/section-container";

export default function ContactPage() {
  return (
    <SectionContainer>
      <h1>Контакты</h1>
      <p>
        Заявка на аудит, консультацию или проект. Подключение экспертов для
        решения задач бизнеса в цифровой среде.
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="space-y-8 md:w-1/2">
          <SocialIcons size="md" />
          <ContactForm trigger="Начнем проект?" />
        </div>
        <div className="md:w-1/2">
          <Image
            src={ContactQrCode.src}
            alt=""
            width={400}
            height={400}
            className="aspect-square object-contain"
            priority={false}
          />
        </div>
      </div>
    </SectionContainer>
  );
}

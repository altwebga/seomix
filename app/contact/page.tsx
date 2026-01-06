import { Container } from "@/components/container/container";
import { Quiz } from "@/components/form/quiz";
import { TextAnimate } from "@/components/ui/text-animate";
import { socialLinks } from "@/config/social-links";
import Image from "next/image";

const text = {
  title: "Контакты",
  subTitle:
    "Свяжитесь с нами — обсудим ваш проект и подберём оптимальное решение.",
};

export default function ContactPage() {
  return (
    <Container className="mt-20">
      <h1>Контакты</h1>
      <TextAnimate animation="blurIn" as="p">
        {text.subTitle}
      </TextAnimate>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w1/2">
          <div className="grid grid-cols-3 gap-8">
            {socialLinks.map((item) => (
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-70 transition hover:opacity-100"
              >
                <span className="flex items-center gap-2">
                  <Image
                    unoptimized
                    src={item.icon}
                    alt={item.title}
                    width={32}
                    height={32}
                  />
                  {item.title}
                </span>
              </a>
            ))}
          </div>
        </div>
        <div className="w-full md:w1/2">
          <Quiz />
        </div>
      </div>
    </Container>
  );
}

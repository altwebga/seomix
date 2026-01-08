import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/components/container/container";
import { TextAnimate } from "@/components/ui/text-animate";
import { socialLinks } from "@/config/social-links";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Свяжитесь с нами для обсуждения проекта и оценки стоимости.",
  openGraph: {
    title: "Контакты",
    description: "Свяжитесь с нами для обсуждения проекта и оценки стоимости.",
    images: [
      {
        url: "/img/og/contact.png",
        width: 1200,
        height: 630,
        alt: "Контакты",
      },
    ],
  },
};

const text = {
  title: "Контакты",
  subTitle:
    "Свяжитесь с нами — обсудим ваш проект и подберём оптимальное решение.",
};

export default function ContactPage() {
  return (
    <Container className="mt-20">
      <h1>{text.title}</h1>
      <TextAnimate animation="blurIn" as="p">
        {text.subTitle}
      </TextAnimate>
      <div className="flex flex-col md:flex-row gap-4 my-8">
        <div className="w-full md:w1/2 space-y-8">
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
          <h3></h3>
        </div>
      </div>
    </Container>
  );
}

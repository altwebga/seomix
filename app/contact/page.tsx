import { Container } from "@/components/layout/container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Свяжитесь с нами",
};

export default function ContactPage() {
  return (
    <Container>
      <h1>Контакты</h1>
      <div>
        <p>
          Здесь будет представлена контактная информация и форма обратной связи.
        </p>
      </div>
    </Container>
  );
}

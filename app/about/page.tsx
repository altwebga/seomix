import { Container } from "@/components/layout/container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "О нас",
  description: "Информация о нашей компании",
};

export default function AboutPage() {
  return (
    <Container>
      <h1>О нас</h1>
      <div>
        <p>
          Здесь будет представлена информация о нашей компании.
        </p>
      </div>
    </Container>
  );
}

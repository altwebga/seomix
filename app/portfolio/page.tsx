import { Container } from "@/components/layout/container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Портфолио",
  description: "Наши проекты и кейсы",
};

export default function PortfolioPage() {
  return (
    <Container>
      <h1>Портфолио</h1>
      <div>
        <p>
          Здесь будет представлено наше портфолио выполненных проектов.
        </p>
      </div>
    </Container>
  );
}

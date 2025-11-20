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
        <p>Некоторые работы которые нам резрешено показывать договором.</p>
      </div>
    </Container>
  );
}

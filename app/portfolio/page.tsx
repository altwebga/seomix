import { SectionContainer } from "@/components/containers/section-container";
import { Heading } from "@/components/ui/heading";

const text = {
  title: "Портфолио",
  subtitle: "Примеры наших работ",
};

export default function PortfolioPage() {
  return (
    <SectionContainer>
      <Heading title={text.title} subtitle={text.subtitle} level="h1" />
    </SectionContainer>
  );
}

import { SectionContainer } from "@/components/containers/section-container";
import { Heading } from "@/components/ui/heading";

const text = {
  title: "О нас",
  subtitle: "О нас",
};

export default function AboutPage() {
  return (
    <SectionContainer>
      <Heading title={text.title} subtitle={text.subtitle} level="h1" />
    </SectionContainer>
  );
}

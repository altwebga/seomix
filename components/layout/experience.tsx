import { SectionContainer } from "../containers/section-container";
import { Heading } from "../ui/heading";

const text = {
  title: "Мы уже работали с проектами из вашей сферы",
  subtitle:
    "Мы работали с проектами в туризме и гостиничном бизнесе, медицине и частных клиниках, торговле, строительстве и девелопменте, а также с образовательными платформами, корпоративными системами и цифровыми сервисами для бизнеса.",
};

export async function Experience() {
  return (
    <SectionContainer className="my-20">
      <Heading
        title={text.title}
        subtitle={text.subtitle}
        level="h2"
        className="md:ml-20 max-w-4xl"
      />
    </SectionContainer>
  );
}

import { Container } from "../container/container";
import {
  SectionHeading,
  SectionHeadingTitle,
  SectionHeadingBody,
  SectionHeadingContentType,
} from "../ui/section-heading";
import { Button } from "../ui/button";
import { ContactForm } from "../form/contact-form";

const text = {
  subTitle: "Наши преимущества",
  title: "Знаем что нужно делать без лишних вопросов и длительных переговоров.",
  description:
    "Мы общаемся простым и понятным языком — без лишних терминов. Подробно рассказываем обо всех этапах работы и держим в курсе процесса. Мы не требуем ТЗ или бриф: все необходимые вопросы задаём по телефону или на встрече. Тексты для сайта пишем самостоятельно — вам не нужно ничего готовить. Если собственных фотографий пока нет, мы подбираем подходящую замену.",
};

export function OurAvantage() {
  return (
    <div className="bg-[url(/img/fog.png)] bg-cover bg-center py-32">
      <Container>
        <div className="flex flex-col gap-4 md:ml-40">
          <SectionHeading alignment="left">
            <SectionHeadingContentType>
              {text.subTitle}
            </SectionHeadingContentType>
            <SectionHeadingTitle>{text.title}</SectionHeadingTitle>
            <SectionHeadingBody>{text.description}</SectionHeadingBody>
          </SectionHeading>
          <div className="flex flex-row gap-4 mt-8">
            <ContactForm />
            <Button
              size={"lg"}
              disabled
              variant={"destructive"}
              className="line-through"
            >
              Заполнить бриф
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

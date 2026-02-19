import { Heading } from "../ui/heading";
import { SectionContainer } from "../containers/section-container";
import { Button } from "../ui/button";

const text = {
  title: "Берём задачи на себя, без лишних вопросов и затянутых согласований.",
  description:
    "Прозрачно объясняем каждый этап работы и всегда держим вас в курсе процесса. Никаких сложных ТЗ и брифов — все ключевые вопросы выясняем в разговоре или на встрече. Контент для сайта создаём сами: от текстов до визуальных решений. Если у вас ещё нет фотографий, подберём качественные изображения, которые усилят впечатление от проекта.",
};

export function Advantage() {
  return (
    <SectionContainer className="my-20">
      <Heading
        title={text.title}
        subtitle={text.description}
        level="h2"
        className="max-w-4xl md:ml-20"
      />
      <div>
        <Button>Получить консультацию</Button>
        <Button variant={"destructive"} disabled={true} className="">
          Заполнить бриф
        </Button>
      </div>
    </SectionContainer>
  );
}

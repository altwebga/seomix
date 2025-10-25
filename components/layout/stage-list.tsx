import { getContent } from "@/actions/fetch-data";
import { GET_STAGE } from "@/config/queries";
import { IStageData, IStageItem } from "@/config/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Markdown } from "../handlers/markdown";
import { ContactForm } from "../form/contact-form";

export async function StageList() {
  const data = await getContent(GET_STAGE, {
    revalidate: 3600 * 24,
  });

  const stages: IStageItem[] = (data as IStageData)?.stage?.phase ?? [];

  return (
    <section className="bg-[url(/images/wave.min.svg)] bg-no-repeat bg-center bg-cover min-h-screen">
      <div className="container mx-auto p-4">
        <h2 className="md:text-5xl flex flex-col gap-2 uppercase justify-center py-8">
          Этапы разработки
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stages.map((stage, index) => (
            <Card key={index} className="relative overflow-hidden">
              <span className="absolute inset-0 flex items-center justify-center text-[200px] opacity-5 z-0">
                {stage.step}
              </span>

              <div className="relative z-10">
                <CardHeader>
                  <CardTitle>
                    <h3>{stage.title}</h3>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Markdown markdown={stage.content} />
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
        <div className="flex justify-center py-8">
          <ContactForm
            trigger="Отлично, давайте поработаем"
            className="h-14 bg-red-500"
          />
        </div>
      </div>
    </section>
  );
}

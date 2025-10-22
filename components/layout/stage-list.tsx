import { getContent } from "@/actions/fetch-data";
import { GET_STAGE } from "@/config/queries";
import { IStageData, IStageItem } from "@/config/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Markdown } from "../handlers/markdown";

export async function StageList() {
  const data = await getContent(GET_STAGE);

  const stages: IStageItem[] = (data as IStageData)?.stage?.phase ?? [];

  return (
    <section className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stages.map((stage, index) => (
          <Card key={index} className="relative">
            <CardHeader className="z-10">
              <CardTitle>
                <h3>{stage.title}</h3>
              </CardTitle>
            </CardHeader>
            <CardContent className="z-10">
              <Markdown markdown={stage.content} />
            </CardContent>
            <p className="absolute right-1/2 text-[300px] z-0 opacity-5">
              {stage.step}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}

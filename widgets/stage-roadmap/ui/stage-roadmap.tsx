import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactRequestDialog } from "@/features/contact-request/ui/contact-request-dialog";
import { getStages } from "@/entities/stage/api/get-stage";
import type { StagePhase } from "@/entities/stage/model/types";
import { Markdown } from "@/components/handlers/markdown";

function isStagePhaseArray(value: unknown): value is StagePhase[] {
  return Array.isArray(value);
}

export async function StageRoadmap() {
  const data = await getStages();
  const phases = isStagePhaseArray(data?.stage?.phase)
    ? data?.stage?.phase ?? []
    : [];

  if (phases.length === 0) {
    return null;
  }

  return (
    <section className="bg-[url(/images/wave.min.svg)] bg-no-repeat bg-center bg-cover min-h-screen">
      <div className="container mx-auto p-4">
        <h2 className="md:text-5xl flex flex-col gap-2 uppercase justify-center py-8">
          Этапы разработки
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {phases.map((stage) => (
            <Card key={stage.step} className="relative overflow-hidden">
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
          <ContactRequestDialog
            trigger="Отлично, давайте поработаем"
            className="h-14 bg-red-500"
          />
        </div>
      </div>
    </section>
  );
}

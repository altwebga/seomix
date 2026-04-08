import { BootSequence } from "../thegridcn";
import { Radar } from "../thegridcn";
import { CircuitBackground } from "../thegridcn";

export function Steps() {
  return (
    <section id="steps" className="px-4 py-16 relative">
      <CircuitBackground className="absolute inset-0 z-0" />
      <div className="container mx-auto">
        <div className="mb-10 text-center">
          <p className="font-mono text-[10px] uppercase tracking-widest text-primary/60">
            PROCESS
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-wider text-foreground md:text-3xl">
            Процесс работы
          </h2>
          <div className="mx-auto mt-3 flex justify-center gap-1">
            <div className="h-px w-12 bg-primary/60" />
            <div className="h-px w-6 bg-primary/30" />
            <div className="h-px w-3 bg-primary/15" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <div className="w-full md:max-w-2xl">
            <BootSequence
              title="Процесс работы"
              steps={[
                {
                  label: "Аналитика и стратегия",
                  duration: 1000,
                },
                {
                  label: "Дизайн",
                  duration: 1000,
                },
                {
                  label: "Разработка",
                  duration: 1000,
                },
                {
                  label: "Тестирование",
                  duration: 1000,
                },
                {
                  label: "Запуск",
                  duration: 1000,
                },
                {
                  label: "Поддержка",
                  duration: 1000,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

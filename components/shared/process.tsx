import { Badge } from "../ui/badge";

const process = [
  {
    step: "01",
    title: "Анализ",
    description: "Изучаем вашу нишу и конкурентов",
  },
  {
    step: "02",
    title: "Стратегия",
    description: "Разрабатываем план продвижения",
  },
  {
    step: "03",
    title: "Реализация",
    description: "Создаем и запускаем проект",
  },
  {
    step: "04",
    title: "Результат",
    description: "Достигаем поставленных целей",
  },
];

export function Process() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4">Как мы работаем</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Процесс работы
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Прозрачная и эффективная система от идеи до результата
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Connection line behind everything on desktop */}
          <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-linear-to-r from-blue-500 via-purple-500 to-purple-600 z-0"></div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            {process.map((item, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  {/* White circle background for the number box to cut the line */}
                  <div className="w-24 h-24 mx-auto mb-4 bg-background rounded-full flex items-center justify-center relative z-10">
                    <div className="w-20 h-20 bg-linear-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

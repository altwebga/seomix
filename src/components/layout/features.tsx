import { BentoGrid } from "../thegridcn";
import { Zap, Shield, Palette, Layers, Code } from "lucide-react";

const LANDING_FEATURES = [
  {
    title: "Запуск за 2–4 недели",
    description:
      "Спринтовый подход: каждую неделю показываем результат. Вы получаете готовый сайт в срок — без затяжных согласований и сюрпризов в финале.",
    icon: <Zap className="h-4 w-4" />,
    span: "2x1" as const,
    variant: "highlight" as const,
  },
  {
    title: "Дизайн под ваш бренд",
    description:
      "Никаких шаблонов — только уникальный интерфейс, созданный под вашу аудиторию и цели. Каждый экран проходит UX-проверку перед вёрсткой.",
    icon: <Palette className="h-4 w-4" />,
    span: "1x1" as const,
    variant: "default" as const,
  },
  {
    title: "Полный стек услуг",
    description:
      "Стратегия, UX, дизайн, фронтенд, бэкенд, DevOps — один подрядчик ведёт весь проект. Никакого аутсорса и потери контекста на стыках.",
    icon: <Layers className="h-4 w-4" />,
    span: "1x1" as const,
    variant: "default" as const,
  },
  {
    title: "Поддержка после запуска",
    description:
      "Мы не исчезаем после сдачи. SLA-договор, мониторинг, правки в течение 30 дней бесплатно — сайт работает стабильно с первого дня.",
    icon: <Shield className="h-4 w-4" />,
    span: "1x1" as const,
    variant: "default" as const,
  },
  {
    title: "Прозрачный процесс",
    description:
      "Фиксированная цена в договоре, ежедневные обновления в вашем мессенджере и общая доска задач — вы всегда знаете, на каком этапе проект.",
    icon: <Code className="h-4 w-4" />,
    span: "1x1" as const,
    variant: "default" as const,
  },
];

export function Features() {
  return (
    <section id="features" className="px-4 py-16">
      <div className="container mx-auto">
        <div className="mb-10 text-center">
          <p className="font-mono text-[10px] uppercase tracking-widest text-primary/60">
            FEATURES
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-wider text-foreground md:text-3xl max-w-3xl mx-auto">
            Берём задачи на себя, без лишних вопросов и затянутых согласований.
          </h2>
          <div className="mx-auto mt-3 flex justify-center gap-1">
            <div className="h-px w-12 bg-primary/60" />
            <div className="h-px w-6 bg-primary/30" />
            <div className="h-px w-3 bg-primary/15" />
          </div>
        </div>

        <BentoGrid items={LANDING_FEATURES} columns={3} />
      </div>
    </section>
  );
}

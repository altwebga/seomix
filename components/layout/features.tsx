"use client"

import { Divider } from "../thegridcn/divider"
import { FeatureCard } from "../thegridcn/feature-card"
import { LineChart, Zap, Rocket } from "lucide-react"

const item = [
  {
    title: "Дизайн, который продаёт",
    description:
      "Создаём интерфейсы, ориентированные на конверсию: UX-аналитика, прототипирование и визуал, который усиливает бизнес-результаты.",
    icon: LineChart,
  },
  {
    title: "Быстрая разработка",
    description:
      "Запускаем проекты в кратчайшие сроки благодаря отлаженным процессам, современному стеку и компонентному подходу.",
    icon: Zap,
  },
  {
    title: "Поддержка и рост",
    description:
      "Не просто сдаём проект, а развиваем его: аналитика, A/B тесты, оптимизация скорости и масштабирование.",
    icon: Rocket,
  },
] as const

export function Features() {
  return (
    <section className="my-20">
      <div className="container mx-auto px-4">
        <Divider label="Features" variant="default" />
        <div className="my-8 flex flex-col items-center gap-8 md:my-16 md:flex-row">
          <h2 className="section-title">
            Берём задачи на себя, без лишних вопросов и затянутых согласований.
          </h2>
          <p className="section-copy">
            Прозрачно объясняем каждый этап работы и всегда держим вас в курсе
            процесса. Никаких сложных ТЗ и брифов — все ключевые вопросы
            выясняем в разговоре или на встрече. Контент для сайта создаём сами:
            от текстов до визуальных решений. Если у вас ещё нет фотографий,
            подберём качественные изображения, которые усилят впечатление от
            проекта.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {item.map((i) => (
            <FeatureCard
              key={i.title}
              icon={i.icon}
              title={i.title}
              description={i.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

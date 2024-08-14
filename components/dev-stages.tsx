import { Card, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import Image from "next/image";

import AgreementImage from "@/public/images/agreement.svg";
import AnalyticsImage from "@/public/images/analytics.svg";
import DesigningImage from "@/public/images/designing.svg";
import DevelopImage from "@/public/images/develop.svg";
import DevopsImage from "@/public/images/devops.svg";
import TestingImage from "@/public/images/testing.svg";

const steps = [
  {
    number: "01",
    title: "Договор и ТЗ",
    description:
      "Составляем договор, который включает бюджет, сроки и условия. Делаем подробное описание требований и функционала веб-приложения в виде ТЗ.",
    image: AgreementImage,
  },
  {
    number: "02",
    title: "Анализ и планирование",
    description:
      "Изучаем требования, определяем цели и задачи, собираем и анализируем информацию. Создаем детальный план проекта.",
    image: AnalyticsImage,
  },
  {
    number: "03",
    title: "Проектирование",
    description:
      "Разрабатываем архитектуру приложения, выбираем технологии и инструменты. Создаем схему базы данных и проектируем пользовательский интерфейс (UI/UX).",
    image: DesigningImage,
  },
  {
    number: "04",
    title: "Разработка",
    description:
      "Пишем код для фронтенда и бэкенда. Интегрируем пользовательский интерфейс с серверной частью, настраиваем базу данных. Реализуем функциональность и обеспечиваем безопасность.",
    image: DevelopImage,
  },
  {
    number: "05",
    title: "Тестирование",
    description:
      "Проводим всестороннее тестирование, включая юнит-тесты, интеграционные и нагрузочные тесты. Обнаруживаем и исправляем ошибки.",
    image: TestingImage,
  },
  {
    number: "06",
    title: "Развертывание и поддержка",
    description:
      "Переносим приложение в рабочую среду, настраиваем серверы и инфраструктуру, разворачиваем базу данных. Мониторим работу, оперативно решаем проблемы, обновляем и улучшаем функциональность.",
    image: DevopsImage,
  },
];

export const DevStages = () => {
  return (
    <section className="container mx-auto max-w-7xl">
      <h2 className="text-center">Этапы разработки</h2>
      <p className="mb-8 text-center">Фиксированные сроки и сумма</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((step, index) => (
          <Card key={index} className="min-h-52" shadow="md">
            <CardBody>
              <div className="flex gap-4 items-center">
                <Image
                  alt={step.title}
                  className="w-24 h-24"
                  height={94}
                  src={step.image}
                  width={94}
                />
                <h3>{step.title}</h3>
              </div>
              <Divider className="my-2" />
              <div className="absolute inset-0 flex justify-center items-center text-9xl font-bold text-gray-600/10">
                {step.number}
              </div>
              <div className="relative z-10">
                <p>{step.description}</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
};

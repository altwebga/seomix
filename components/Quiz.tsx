"use client";
import React, { useState, ChangeEvent } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Card } from "@nextui-org/card";
import { Checkbox } from "@nextui-org/checkbox";
import { Services } from "@/config/services";
import { Link } from "@nextui-org/link";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

interface Question {
  question: string;
  key: string;
}

const Quiz: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>({
    site: [""], // Инициализируем с одним пустым полем
  });

  const questions: Question[] = [
    { question: "Какие услуги Вас интересуют?", key: "services" },
    { question: "Какие сайты вам нравятся?", key: "site" },
    { question: "Данные о компании", key: "company" },
    { question: "Ваши контактные данные", key: "contact" },
  ];

  const handleNext = () => setStep((prevStep) => prevStep + 1);
  const handlePrev = () => setStep((prevStep) => prevStep - 1);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleSiteChange = (index: number, value: string) => {
    const sites = answers.site ? [...(answers.site as string[])] : [];
    sites[index] = value;
    setAnswers({ ...answers, site: sites });
  };

  const addSiteField = () => {
    const sites = answers.site ? [...(answers.site as string[]), ""] : [""];
    setAnswers({ ...answers, site: sites });
  };

  const removeSiteField = (index: number) => {
    const sites = answers.site ? [...(answers.site as string[])] : [];
    sites.splice(index, 1);
    setAnswers({ ...answers, site: sites });
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    let selectedServices = answers.services
      ? [...(answers.services as string[])]
      : [];
    if (checked) {
      selectedServices.push(id);
    } else {
      selectedServices = selectedServices.filter(
        (serviceId) => serviceId !== id
      );
    }
    setAnswers({ ...answers, services: selectedServices });
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <>
            {" "}
            <h4 className="text-lg font-semibold mb-4">
              {questions[step].question}
            </h4>
            <div className="flex flex-col-reverse md:flex-row gap-6">
              <div className="md:w-2/3">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {Services.map((service) => (
                    <div key={service.id} className="mb-2">
                      <Checkbox
                        isSelected={
                          answers.services
                            ? (answers.services as string[]).includes(
                                service.id.toString()
                              )
                            : false
                        }
                        onChange={(e) =>
                          handleCheckboxChange(
                            service.id.toString(),
                            e.target.checked
                          )
                        }
                        size="md"
                        color="primary"
                      >
                        {service.title}
                      </Checkbox>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-4">
                  <Button color="primary" onPress={handleNext} endContent={<ArrowRightIcon className="w-4 h-4"/>}>
                    Дальше
                  </Button>
                </div>
              </div>
              <div className="md:w-1/3 border border-gray-500 p-4 ">
                <p>Тут описание</p>
                <Link isExternal href="/services">
                  У знать подробнее
                </Link>
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <>
            {" "}
            <h4 className="text-lg font-semibold mb-4">
              {questions[step].question}
            </h4>
            <div className="flex flex-col-reverse md:flex-row gap-6">
              <div className="md:w-1/2 flex flex-col justify-between">
              <div>
                {((answers.site as string[]) || []).map((site, index) => (
                  <div key={index} className="flex items-center mb-4">
                    <Input
                      variant="underlined"
                      isClearable
                      placeholder="Введите URL сайта"
                      value={site}
                      onChange={(e) => handleSiteChange(index, e.target.value)}
                      onClear={() => removeSiteField(index)}
                      className="mr-2"
                    />
                  </div>
                ))}
                <Button onPress={addSiteField} className="mb-4 w-52" color="success">
                  Добавить ещё
                </Button>
                </div>
                <div className="flex justify-between">
                  {step > 0 && (
                    <Button onPress={handlePrev} className="mr-2" startContent={<ArrowLeftIcon className="w-4 h-4"/>}>
                      Назад
                    </Button>
                  )}
                  <Button color="primary" onPress={handleNext} endContent={<ArrowRightIcon className="w-4 h-4"/>}>
                    {step === questions.length - 1
                      ? "Получить расчет"
                      : "Дальше"}
                  </Button>
                </div>
              </div>
              <ol className="list-decimal border border-gray-500 pl-8 py-2 md:w-1/2 space-y-4 font-extralight text-xs">
                <li>
                  Выделите адрес понравившегося сайта в адресной строке
                  браузера. Для этого:
                </li>
                <ul className="list-disc pl-4 space-y-2">
                  <li>Наведите курсор на адресную строку.</li>
                  <li>
                    Щелкните левой кнопкой мыши один раз, чтобы выделить весь
                    адрес (он должен подсветиться).
                  </li>
                </ul>
                <li>Скопируйте адрес:</li>
                <ul className="list-disc pl-4 space-y-2">
                  <li>
                    Нажмите комбинацию клавиш Ctrl + C (на Windows) или Cmd + C
                    (на Mac).
                  </li>
                  <li>
                    Либо щелкните правой кнопкой мыши по выделенному адресу и
                    выберите в контекстном меню пункт «Копировать».
                  </li>
                </ul>
                <li>Вставьте скопированный адрес в поле.</li>
              </ol>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h4 className="text-lg font-semibold mb-4">
              {questions[step].question}
            </h4>
            <Input
              variant="underlined"
              fullWidth
              isClearable
              name={questions[step].key}
              onChange={handleChange}
              value={(answers[questions[step].key] as string) || ""}
              className="mb-4"
            />
            <div className="flex justify-between">
              {step > 0 && (
                <Button onPress={handlePrev} className="mr-2" startContent={<ArrowLeftIcon className="w-4 h-4"/>}>
                  Назад
                </Button>
              )}
              <Button color="primary" onPress={handleNext} endContent={<ArrowRightIcon className="w-4 h-4"/>}>
                {step === questions.length - 1 ? "Получить расчет" : "Дальше"}
              </Button>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h4>{questions[step].question}</h4>
            <div className="flex flex-col md:flex-row gap-4 max-w-lg">
              <Input
                type="text"
                label="Ваше имя"
                variant="underlined"
                fullWidth
              />
              <Input
                type="text"
                label="Номер телефона"
                variant="underlined"
                fullWidth
              />
            </div>
            <Button color="primary" onPress={handleNext} endContent={<ArrowRightIcon className="w-4 h-4"/>}>
              Узнать стоимость
            </Button>
            <Button onPress={handlePrev} className="mr-2" startContent={<ArrowLeftIcon className="w-4 h-4"/>}>
              Назад
            </Button>
          </>
        );
      default:
        return (
          <>
            <h4 className="text-lg font-semibold">
              Спасибо за Ваши ответы, мы скоро свяжемся с вами.
            </h4>
            <Button onPress={handlePrev} className="mr-2" startContent={<ArrowLeftIcon className="w-4 h-4"/>}>
              Изменить ответы
            </Button>
          </>
        );
    }
  };

  return (
    <Card shadow="md" className="p-5 mx-auto my-10 min-h-72">
      {renderStepContent()}
    </Card>
  );
};

export default Quiz;

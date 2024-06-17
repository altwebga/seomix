'use client';
import React, { useState, ChangeEvent } from 'react';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Card } from '@nextui-org/card';
import { Checkbox } from '@nextui-org/checkbox';
import { RadioGroup, Radio } from '@nextui-org/radio';
import { Services } from '@/config/services';
import { Link } from '@nextui-org/link';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

interface Question {
  question: string;
  key: string;
}

const Quiz: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>({
    site: [''], // Инициализируем с одним пустым полем
  });

  const questions: Question[] = [
    { question: 'Какие услуги Вас интересуют?', key: 'services' },
    { question: 'Какие сайты вам нравятся?', key: 'site' },
    { question: 'Бюджет и сроки', key: 'time' },
    { question: 'Ваши контактные данные', key: 'contact' },
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
    const sites = answers.site ? [...(answers.site as string[]), ''] : [''];
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
        (serviceId) => serviceId !== id,
      );
    }
    setAnswers({ ...answers, services: selectedServices });
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <>
            {' '}
            <h4 className="mb-4 text-lg font-semibold">
              {questions[step].question}
            </h4>
            <div className="flex flex-col-reverse gap-6 md:flex-row">
              <div className="md:w-2/3">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {Services.map((service) => (
                    <div key={service.id} className="mb-2">
                      <Checkbox
                        isSelected={
                          answers.services
                            ? (answers.services as string[]).includes(
                                service.id.toString(),
                              )
                            : false
                        }
                        onChange={(e) =>
                          handleCheckboxChange(
                            service.id.toString(),
                            e.target.checked,
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
                <div className="mt-4 flex justify-end">
                  <Button
                    color="primary"
                    onPress={handleNext}
                    endContent={<ArrowRightIcon className="h-4 w-4" />}
                  >
                    Дальше
                  </Button>
                </div>
              </div>
              <div className="border border-gray-500 p-4 md:w-1/3">
                <p>
                  C Описанием каждой услуги вы можете ознакомиться на этой
                  странице:
                </p>
                <Link
                  isExternal
                  showAnchorIcon
                  href="/services"
                  className="pt-4"
                >
                  Описание услуг
                </Link>
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <>
            {' '}
            <h4 className="mb-4 text-lg font-semibold">
              {questions[step].question}
            </h4>
            <div className="flex flex-col-reverse gap-6 md:flex-row">
              <div className="flex flex-col justify-between md:w-1/2">
                <div>
                  {((answers.site as string[]) || []).map((site, index) => (
                    <div key={index} className="mb-4 flex items-center">
                      <Input
                        variant="underlined"
                        isClearable
                        placeholder="Введите URL сайта"
                        value={site}
                        onChange={(e) =>
                          handleSiteChange(index, e.target.value)
                        }
                        onClear={() => removeSiteField(index)}
                        className="mr-2"
                      />
                    </div>
                  ))}
                  <Button
                    onPress={addSiteField}
                    className="mb-4 w-52"
                    color="success"
                  >
                    Добавить ещё
                  </Button>
                </div>
                <div className="flex justify-between">
                  {step > 0 && (
                    <Button
                      onPress={handlePrev}
                      className="mr-2"
                      startContent={<ArrowLeftIcon className="h-4 w-4" />}
                    >
                      Назад
                    </Button>
                  )}
                  <Button
                    color="primary"
                    onPress={handleNext}
                    endContent={<ArrowRightIcon className="h-4 w-4" />}
                  >
                    {step === questions.length - 1
                      ? 'Получить расчет'
                      : 'Дальше'}
                  </Button>
                </div>
              </div>
              <ol className="list-decimal space-y-4 border border-gray-500 py-2 pl-8 text-xs font-extralight md:w-1/2">
                <li>
                  Выделите адрес понравившегося сайта в адресной строке
                  браузера. Для этого:
                </li>
                <ul className="list-disc space-y-2 pl-4">
                  <li>Наведите курсор на адресную строку.</li>
                  <li>
                    Щелкните левой кнопкой мыши один раз, чтобы выделить весь
                    адрес (он должен подсветиться).
                  </li>
                </ul>
                <li>Скопируйте адрес:</li>
                <ul className="list-disc space-y-2 pl-4">
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
            <h4 className="mb-4 text-lg font-semibold">
              {questions[step].question}
            </h4>
            <div className="flex">
              <div className="flex flex-col gap-8 md:flex-row">
                <RadioGroup label="Планируемый бюджет">
                  <Radio value="15000">до 15k руб.</Radio>
                  <Radio value="50000">от 15k до 50k руб.</Radio>
                  <Radio value="100000">от 50k до 100k руб.</Radio>
                  <Radio value="200000">от 100k до 200k руб.</Radio>
                  <Radio value=">200000">от 200k и выше.</Radio>
                </RadioGroup>
                <RadioGroup label="Планируемые сроки">
                  <Radio value="14">до 14 дней</Radio>
                  <Radio value="30">от 14 до 30 дней</Radio>
                  <Radio value="3 мес">от 1 до 3 мес</Radio>
                  <Radio value="6 мес">от 3 до 6 мес</Radio>
                  <Radio value=">6 мес">от 6 мес и больше</Radio>
                </RadioGroup>
              </div>
              <div className="flex justify-between">
                {step > 0 && (
                  <Button
                    onPress={handlePrev}
                    className="mr-2"
                    startContent={<ArrowLeftIcon className="h-4 w-4" />}
                  >
                    Назад
                  </Button>
                )}
                <Button
                  color="primary"
                  onPress={handleNext}
                  endContent={<ArrowRightIcon className="h-4 w-4" />}
                >
                  {step === questions.length - 1 ? 'Получить расчет' : 'Дальше'}
                </Button>
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h4>{questions[step].question}</h4>
            <div className="flex flex-col justify-between">
              <div className="flex max-w-lg flex-col gap-4 md:flex-row">
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
              <div className="flex flex-row justify-between">
                <Button
                  onPress={handlePrev}
                  className="mr-2"
                  startContent={<ArrowLeftIcon className="h-4 w-4" />}
                >
                  Назад
                </Button>
                <Button
                  color="primary"
                  onPress={handleNext}
                  endContent={<ArrowRightIcon className="h-4 w-4" />}
                >
                  Узнать стоимость
                </Button>
              </div>
            </div>
          </>
        );
      default:
        return (
          <>
            <h4 className="text-lg font-semibold">
              Спасибо за Ваши ответы, мы скоро свяжемся с вами.
            </h4>
            <Button
              onPress={handlePrev}
              className="mr-2"
              startContent={<ArrowLeftIcon className="h-4 w-4" />}
            >
              Изменить ответы
            </Button>
          </>
        );
    }
  };

  return (
    <Card shadow="md" className="mx-auto my-10 min-h-96 p-5">
      {renderStepContent()}
    </Card>
  );
};

export default Quiz;

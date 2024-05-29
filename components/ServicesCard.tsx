import React, { FC, SVGProps } from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Divider } from "@nextui-org/divider";
import { title } from "./primitives";

import {
  GlobeAltIcon,
  PhotoIcon,
  CreditCardIcon,
  DevicePhoneMobileIcon,
  PresentationChartLineIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

const servicesItems = [
  {
    title: "Разработка веб-сайтов",
    description:
      "Делаю индивидуальные, отзывчивые веб-сайты, которые отлично выглядят на всех устройствах, обеспечивая удобный пользовательский интерфейс и оптимизацию под поисковые системы.",
    icon: GlobeAltIcon,
  },
  {
    title: "Дизайн и брендинг",
    description:
      "Помогу разработать уникальный и запоминающийся бренд, включая логотипы, фирменный стиль и рекламные материалы.",
    icon: PhotoIcon,
  },
  {
    title: "Электронная коммерция",
    description:
      "Делаю интуитивно понятные и безопасные интернет-магазины, которые помогают увеличивать продажи и расширять рынок сбыта.",
    icon: CreditCardIcon,
  },
  {
    title: "Мобильная разработка",
    description:
      "Разрабатываю мобильные приложения для iOS и Android, обеспечивая высокое качество и функциональность для лучшего взаимодействия с вашей аудиторией.",
    icon: DevicePhoneMobileIcon,
  },
  {
    title: "SEO и продвижение сайтов",
    description:
      "Комплексные услуги по поисковой оптимизации и интернет-маркетингу для улучшения видимости вашего сайта и привлечения целевой аудитории.",
    icon: PresentationChartLineIcon,
  },
  {
    title: "Техническая поддержка и обслуживание",
    description:
      "Обеспечиваю надежную техническую поддержку и регулярное обновление вашего сайта для его бесперебойной работы.",
    icon: WrenchScrewdriverIcon,
  },
];

interface IconWrapperProps {
  icon: FC<SVGProps<SVGSVGElement>>;
}

const IconWrapper: FC<IconWrapperProps> = ({ icon: Icon }) => <Icon className="h-6 w-6 text-gray-500" />;

const ServicesCard: FC = () => {
  return (
    
      <Accordion>
        {servicesItems.map((item) => (
          <AccordionItem
            key={item.title}
            aria-label={item.title}
            indicator={<IconWrapper icon={item.icon} />}
            title={item.title}
          >
            {item.description}
          </AccordionItem>
        ))}
      </Accordion>
 
  );
};

export default ServicesCard;

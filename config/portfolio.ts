import KalinaMebelLogo from "@/public/images/logo/client_01.png";
import KalinaMebelImage from '@/public/images/portfolio/mebel-kalina.png';
import OmmaLogo from "@/public/images/logo/client_02.png";
import OmmaImage from '@/public/images/portfolio/omma.png';
import AltayLogo from "@/public/images/logo/client_03.png";
import AltayImage from '@/public/images/portfolio/mc-altay.png';
import MzaLogo from "@/public/images/logo/client_04.jpg";
import MzaImage from '@/public/images/portfolio/mz-altay.png';
import SibGuideLogo from "@/public/images/logo/client_05.png";
import SibGuideImage from '@/public/images/portfolio/sibguide.png';
import AltayTilLogo from "@/public/images/logo/client_06.png";
import AltayTilImage from '@/public/images/portfolio/altaitil.png';
import ParnasLogo from "@/public/images/logo/client_07.png";
import ParnasImage from '@/public/images/portfolio/hotel-parnas.png';
import InovaMedLogo from "@/public/images/logo/client_08.png";
import InovaMedImage from '@/public/images/portfolio/inovamed.png';
import ZdorovieLogo from "@/public/images/logo/client_09.png";
import ZdorovieImage from '@/public/images/portfolio/ga-zdorovie.png';
import NezabudkaLogo from "@/public/images/logo/client_10.png";
import NezabudkaImage from '@/public/images/portfolio/nezabudka04.png';
import TransferLogo from "@/public/images/logo/client_11.png";
import TransferImage from '@/public/images/portfolio/transfer-altay.png';
import CsvetaLogo from "@/public/images/logo/client_12.png";
import CsvetaImage from '@/public/images/portfolio/altaybaza.png';
import AltaiActiveLogo from "@/public/images/logo/client_13.png";
import AltaiActiveImage from '@/public/images/portfolio/altaiactive.png';
import UsadbaZLogo from "@/public/images/logo/client_14.png";
import UsadbaZImage from '@/public/images/portfolio/usadba-z.png';
import { PortfolioItem } from "@/types";

export const Portfolio: PortfolioItem[] = [
  {
    id: 1,
    title: "Калина Мебель",
    logo: KalinaMebelLogo,
    image: KalinaMebelImage,
    site: "https://mebel-kalina.ru/",
    description: "Мебельный салон",
    youtube: "twgCHCBvg7c",
    rutube: 'e26f69da957bc4247f2466d89593addb',
    content: [
      { paragraph: "Разработка интернет каталога для магазина «Калина» в Горно-Алтайске." }
    ],
    release: "05.05.2023",
  },
  {
    id: 2,
    title: "Окна ОММА",
    logo: OmmaLogo,
    image: OmmaImage,
    site: "https://omma.pro/",
    description: "Строительно монтажная фирма",
    youtube: "wHwvJVM8Oo8",
    rutube: '909a46eba44fc3679bb8956617d64a43',
    content: [
      { paragraph: "Разработка сайта для строительно-монтажной фирмы ОММА." },
      { paragraph: "В рамках проекта я также настроил интеграцию с VK, 2ГИС, Яндекс Бизнес в части автоматической передачи товаров и услуг." }
    ],
    release: "12.06.2019",
  },
  {
    id: 3,
    title: "СИБГИД",
    logo: SibGuideLogo,
    image: SibGuideImage,
    site: "https://sibguide.ru/",
    description: "Туристический инфоцентр",
    youtube: "N4yqm766JTA",
    rutube: '5ce65e5953defacb686a38931d3b2636',
    content: [
      { paragraph: "Разработка сервиса туристических объявлений СИБГИД." }
    ],
    release: "31.12.2022",
  },
  {
    id: 4,
    title: "Алтай Тиль",
    logo: AltayTilLogo,
    image: AltayTilImage,
    site: "https://altaitil.ru/",
    description: "Онлайн сервис изучения Алтайского языка",
    youtube: "LQjGKX7V3kE",
    rutube: 'aad69b16b50924269003046fda162df2',
    content: [
      { paragraph: "Разработка сайта онлайн сервиса изучения Алтайского языка." },
      { paragraph: "На сайте реализованы различные инструменты и ресурсы для самостоятельного изучения алтайского языка, включая Интерактивные уроки, которые помогут освоить основы языка и научиться читать, писать и говорить на алтайском языке." },
      { paragraph: "Тематические курсы, позволяющие углубиться в изучение определенных аспектов языка, таких как грамматика, лексика или произношение." },
      { paragraph: "Видеоуроки и аудиоматериалы, которые помогут лучше понять особенности алтайской речи и произношения." },
      { paragraph: "Тесты и задания для проверки и закрепления полученных знаний." }
    ],
    release: "22.06.2022",
  },
  {
    id: 5,
    title: "Парнас",
    logo: ParnasLogo,
    image: ParnasImage,
    site: "https://hotel-parnas.ru/",
    description: "Гостиница в Горно-Алтайске",
    youtube: "K3kWI0dE2Ec",
    rutube: 'b2d4703d93ec79a82168408f886e1a85',
    content: [
      { paragraph: "Разработка сайта гостиницы Парнас в Горно-Алтайске." },
      { paragraph: "В рамках проекта был интегрирован модуль бронирования Bnovo, который позволил гостям быстро и удобно бронировать номера на сайте." },
      { paragraph: "Сайт был разработан с использованием современных технологий и имеет удобный интерфейс для пользователей." },
      { paragraph: "Он предоставляет всю необходимую информацию о гостинице и ее услугах, а также позволяет гостям ознакомиться с фотографиями номеров и забронировать их онлайн." }
    ],
    release: "03.04.2022",
  },
  {
    id: 6,
    title: "Иннова Мед",
    logo: InovaMedLogo,
    image: InovaMedImage,
    site: "https://inovamed.ru/",
    description: "Многопрофильный медицинский центр",
    youtube: "HfTdVVUOAVw",
    rutube: '959c5d1edc78990d7b71b43ef8071bba',
    content: [
      { paragraph: "Разработка сайта для медицинской клиники ИнноваМед." },
      { paragraph: "Создание удобного и информативного сайта для медицинской клиники ИнноваМед, который поможет пациентам быстро найти необходимую информацию о предоставляемых услугах, специалистах и ценах." }
    ],
    release: "30.03.2021",
  },
  {
    id: 7,
    title: "Гармония здоровья",
    logo: ZdorovieLogo,
    image: ZdorovieImage,
    site: "https://ga-zdorovie.ru/",
    description: "Многопрофильный медицинский центр",
    youtube: "CfB6NwtaOhs",
    rutube: 'd6abfbbf7840f479f712ffe1bd777dcb',
    content: [
      { paragraph: "Разработка сайта для современного многопрофильного медицинского центра Гармония Здоровья в Горно-Алтайске." },
      { paragraph: "Сайт был создан с учетом всех требований заказчика и современных тенденций веб-дизайна." },
      { paragraph: "Основной задачей сайта является предоставление информации о медицинском центре, его услугах и специалистах." },
      { paragraph: "Для этого мы создали удобную навигацию и структурировали информацию на сайте." },
      { paragraph: "Также мы добавили интерактивные элементы, такие как форма обратной связи и онлайн-запись на прием к врачу." },
      { paragraph: "Дизайн сайта выполнен в светлых тонах, что создает атмосферу спокойствия и гармонии." },
      { paragraph: "Мы использовали качественные фотографии медицинского центра и его специалистов, чтобы посетители могли получить максимально полное представление о клинике." },
      { paragraph: "Также мы провели работу по оптимизации сайта для поисковых систем, что поможет привлечь больше потенциальных клиентов." },
      { paragraph: "Сайт полностью соответствует ожиданиям заказчика и помогает медицинскому центру «Гармония Здоровья» привлекать новых пациентов." }
    ],
    release: "03.03.2021",
  },
  {
    id: 8,
    title: "Незабудка",
    logo: NezabudkaLogo,
    image: NezabudkaImage,
    site: "https://nezabudka04.ru/",
    description: "База отдыха",
    youtube: "LxlRR9bfe90",
    rutube: '9d9df6b5f65c162dfee2a964c8d0e9da',
    content: [
      { paragraph: "Разработка сайта базы отдыха Незабудка." },
      { paragraph: "Удобный и интуитивно понятный интерфейс сайта, адаптированный под различные устройства." },
      { paragraph: "Быстрый и удобный поиск информации о номерах, услугах и ценах на базе отдыха." },
      { paragraph: "Возможность онлайн-бронирования номеров." },
      { paragraph: "Высокая скорость загрузки страниц сайта, что обеспечивает комфортное использование сайта для пользователей." }
    ],
    release: "26.03.2022",
  },
  {
    id: 9,
    title: "Алтай Трансфер",
    logo: TransferLogo,
    image: TransferImage,
    site: "https://transfer-altay.ru/",
    description: "Пассажирские перевозки",
    youtube: "LxlRR9bfe90",
    rutube: '8b057161d2d20e177a5ebb72ccd1f9ec',
    content: [
      { paragraph: "Разработка сайта для компании Трансфер Алтай." },
      { paragraph: "В рамках проекта я также разработал логотип и настроил рекламную кампанию в Яндекс Директ." }
    ],
    release: "23.01.2021",
  },
  {
    id: 10,
    title: "Царство Света",
    logo: CsvetaLogo,
    image: CsvetaImage,
    site: "https://altaybaza.su/",
    description: "База отдыха",
    youtube: "ri3evcjIJ98",
    rutube: '820c273468d6114297ef81a8d45a27d0',
    content: [
      { paragraph: "Разработка сайта турбазы Царство Света." },
      { paragraph: "В рамках проекта я также разработал фирменный стиль." }
    ],
    release: "25.02.2020",
  },
  {
    id: 11,
    title: "Бюро путешествий Созвездие",
    logo: AltaiActiveLogo,
    image: AltaiActiveImage,
    site: "https://altaiactive.ru/",
    description: "Организация активных туров",
    youtube: "immNv9oCegs",
    rutube: '0df4f2b20b46b3e6a24519ce293c98aa',
    content: [
      { paragraph: "Редизайн сайта для туристической фирмы Созвездие в Горном Алтае." },
      { paragraph: "На сайте реализован быстрый поиск экскурсий и туров по различным фильтрам, реализован личный кабинет туриста с возможностью добавлять туры и экскурсии в избранное." }
    ],
    release: "01.06.2023",
  },
  {
    id: 12,
    title: "Мать Земля Алтай",
    logo: MzaLogo,
    image: MzaImage,
    site: "",
    description: "Событие",
    youtube: "ak6qs4nMHVo",
    rutube: '5f285473f068c76d7d3d4d25bd8c5c3f',
    content: [
      { paragraph: "Разработка сайта гастрофестиваля Мать Земля Алтай 2019." },
      { paragraph: "Долгая, кропотливая работа: разработка концепции навигации по программе фестиваля, а затем публикация отчета с обработкой тысяч фотографий." }
    ],
    release: "12.04.2019",
  },
  {
    id: 13,
    title: "Алтай",
    logo: AltayLogo,
    image: AltayImage,
    site: "https://mc-altay.ru/",
    description: "Медицинский центр",
    youtube: "8KU5R0k6LBE",
    rutube: 'gZmfQUR0IrPjZFX-w7kqbA',
    content: [
      { paragraph: "Разработка сайта для медицинского центра «Алтай» в городе Барнаул была выполнена с учетом всех требований заказчика и пользователей." },
      { paragraph: "Сайт имеет удобный интерфейс и интуитивно понятную навигацию, что позволяет пациентам быстро находить необходимую информацию о медицинских услугах, врачах и ценах." },
      { paragraph: "Для удобства пациентов на сайте была реализована онлайн-запись на прием к врачу, а также возможность заказать обратный звонок от специалиста медицинского центра." }
    ],
    release: "28.12.2023",
  },
  {
    id: 14,
    title: "Усадьба Зыряновых",
    logo: UsadbaZLogo,
    image: UsadbaZImage,
    site: "https://usadba-z.ru/",
    description: "База отдыха в Горном Алтае",
    youtube: "CBeSUsyI90M",
    rutube: 'cf6caf5a72f77cca0e24e1d8b2fc22cc',
    content: [
      { paragraph: "Разработка сайта Усадьбы Зыряновых." },
      { paragraph: "В рамках проекта также проведена интеграция с Яндекс Бизнес, VK и 2ГИС для быстрой выгрузки номеров." }
    ],
    release: "04.06.2024",
  },
];

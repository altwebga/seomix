# Настройка автоматической генерации OG изображений

## Обзор

Система автоматической генерации Open Graph изображений для динамических страниц блога, услуг и портфолио.

## Структура файлов

```
components/
  └── og-image-generator.tsx    # Универсальный компонент для генерации OG изображений

lib/
  └── og-image-utils.ts         # Утилиты для получения данных контента

app/
  ├── blog/[slug]/
  │   └── opengraph-image.tsx   # Генератор OG изображений для статей
  ├── services/[slug]/
  │   └── opengraph-image.tsx   # Генератор OG изображений для услуг
  └── portfolio/[slug]/
      └── opengraph-image.tsx   # Генератор OG изображений для проектов
```

## Как это работает

### 1. Универсальный компонент генерации

`components/og-image-generator.tsx` содержит функцию `generateOGImage()`, которая:

- Создает изображение размером 1200x630 пикселей
- Использует фоновое изображение из `public/images/og_template.png`
- Отображает белый текст с тенями для лучшей читаемости
- Добавляет полупрозрачный overlay для улучшения читаемости
- Адаптивно изменяет размер шрифта в зависимости от длины заголовка

### 2. Утилиты для получения данных

`lib/og-image-utils.ts` содержит:

- Функцию `getContentForOG()` для получения SEO данных
- Поддержку всех типов контента: статьи, услуги, проекты
- Обработку ошибок и fallback значения

### 3. Генераторы для каждой страницы

Каждая динамическая страница имеет свой `opengraph-image.tsx` файл, который:

- Получает slug из параметров URL
- Загружает соответствующие данные контента
- Генерирует OG изображение с помощью универсального компонента
- Предоставляет fallback изображение при ошибках

## Настройка метаданных

В файлах страниц (`page.tsx`) метаданные обновлены для использования сгенерированных изображений:

```typescript
openGraph: {
  title: content.seo.title,
  description: content.seo.meta_description,
  images: [
    {
      url: `/route/${slug}/opengraph-image`,
      width: 1200,
      height: 630,
      alt: content.seo.title,
    },
  ],
}
```

## URL-адреса изображений

- Блог: `/blog/{slug}/opengraph-image`
- Услуги: `/services/{slug}/opengraph-image`
- Портфолио: `/portfolio/{slug}/opengraph-image`

## Кастомизация

### Изменение дизайна

Отредактируйте `components/og-image-generator.tsx`:

- Замените фоновое изображение в `backgroundImage: "url(/images/og_template.png)"`
- Настройте размеры шрифтов в `fontSize`
- Измените прозрачность overlay в `background: "rgba(0, 0, 0, 0.3)"`
- Добавьте логотип или другие элементы

### Добавление нового типа контента

1. Добавьте новый тип в `ContentType` в `lib/og-image-utils.ts`
2. Добавьте case в функцию `getContentForOG()`
3. Создайте `opengraph-image.tsx` в соответствующей папке
4. Обновите метаданные в `page.tsx`

## Настройка окружения

Для правильной работы фонового изображения добавьте в `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Для локальной разработки используется `http://localhost:3000` по умолчанию.

## Производительность

- Изображения кэшируются Next.js
- Данные кэшируются на 24 часа (`revalidate: 3600 * 24`)
- Fallback изображения предотвращают ошибки
- Обработка ошибок с подробным логированием

## Тестирование

Для тестирования откройте URL изображения напрямую:

```
http://localhost:3000/blog/your-article-slug/opengraph-image
```

Или используйте инструменты для проверки Open Graph:

- Facebook Sharing Debugger
- Twitter Card Validator
- LinkedIn Post Inspector

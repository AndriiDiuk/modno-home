import type { GlobalConfig } from "payload";

export const Home: GlobalConfig = {
  slug: "home",
  label: "Home",
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero Секция",
          fields: [
            {
              name: "heroSection",
              type: "group",
              label: "Hero",
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: "Заголовок 1",
                  defaultValue: "Модульные диваны",
                },
                {
                  name: "titleBold",
                  type: "text",
                  label: "Жирные слова в Заголовке 1 (через запятую)",
                  defaultValue: "Модульные диваны",
                },
                {
                  name: "title2",
                  type: "text",
                  label: "Заголовок 2",
                  defaultValue: "которые украсят ваш интерьер",
                },
                {
                  name: "title2Bold",
                  type: "text",
                  label: "Жирные слова в Заголовке 2 (через запятую)",
                },
                {
                  name: "description",
                  type: "textarea",
                  label: "Описание (выделение жирным через отдельное поле)",
                  defaultValue:
                    "Изготовим за 30 дней, любой размер и конфигурацию, подберем цвет, ткань и мягкость именно для Вас",
                },
                {
                  name: "descriptionBold",
                  type: "text",
                  label: "Жирные фразы в описании (через запятую)",
                  defaultValue: "Изготовим за 30 дней, именно для Вас",
                },
                {
                  name: "catalogButtonLabel",
                  type: "text",
                  label: "Текст кнопки каталога (верхний)",
                  defaultValue: "Скачивайте каталог диванов",
                },
                {
                  name: "catalogButtonSublabel",
                  type: "text",
                  label: "Текст кнопки каталога (нижний)",
                  defaultValue: "с ценами и размерами",
                },
                {
                  name: "showroomButtonLabel",
                  type: "text",
                  label: "Текст кнопки шоурума (верхний)",
                  defaultValue: "Запишитесь в шоурум",
                },
                {
                  name: "showroomButtonSublabel",
                  type: "text",
                  label: "Текст кнопки шоурума (нижний)",
                  defaultValue: "выбрать ткань, мягкость, модель",
                },
                {
                  name: "popularTitle",
                  type: "text",
                  label: "Заголовок популярных конфигураций",
                  defaultValue: "Популярные конфигурации",
                },
                {
                  name: "popularSubtitle",
                  type: "text",
                  label: "Подзаголовок популярных конфигураций",
                  defaultValue: "Прямые, угловые, большие, малые и т.д",
                },
                {
                  name: "popularImages",
                  type: "array",
                  label: "Фото слайдера конфигураций",
                  admin: {
                    description: "Загрузите фото для слайдера популярных конфигураций",
                  },
                  fields: [
                    {
                      name: "image",
                      type: "upload",
                      relationTo: "media",
                      required: true,
                      label: "Фото",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Секция диванов",
          fields: [
            {
              name: "sofasSection",
              type: "group",
              label: "Софы",
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: "Заголовок секции",
                  defaultValue: "Каталог диванов",
                },
                {
                  name: "subtitle",
                  type: "text",
                  label: "Подзаголовок секции",
                  defaultValue: "Которые украсят ваш интерьер",
                },
                {
                  name: "selectedSofas",
                  type: "relationship",
                  relationTo: "sofas",
                  hasMany: true,
                  label: "Выберите диваны для отображения",
                  admin: {
                    description:
                      "Перетаскивайте для изменения порядка отображения",
                  },
                },
              ],
            },
          ],
        },
        {
          label: "Секция видео",
          fields: [
            {
              name: "videoSection",
              type: "group",
              label: "Видео",
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: "Заголовок",
                  defaultValue: "Короткие видео",
                },
                {
                  name: "subtitle",
                  type: "text",
                  label: "Подзаголовок",
                  defaultValue: "В интерьере, на производстве, каркас и ткани",
                },
                {
                  name: "videos",
                  type: "array",
                  label: "Видео",
                  maxRows: 5,
                  admin: {
                    description: "До 5 видео для главной страницы",
                  },
                  fields: [
                    {
                      name: "title",
                      type: "text",
                      label: "Название",
                      required: true,
                    },
                    {
                      name: "overlayText",
                      type: "text",
                      label: "Текст на превью",
                    },
                    {
                      name: "views",
                      type: "number",
                      label: "Количество просмотров",
                      defaultValue: 0,
                    },
                    {
                      name: "videoUrl",
                      type: "text",
                      label: "Ссылка на видео",
                      required: true,
                      admin: {
                        description: "URL видео (например, с Supabase)",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Секция каталога",
          fields: [
            {
              name: "catalogSection",
              type: "group",
              label: "Каталог",
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: "Заголовок",
                  defaultValue: "Скачивайте каталог!",
                },
                {
                  name: "subtitle",
                  type: "text",
                  label: "Подзаголовок",
                  defaultValue: "Там больше вариантов и комплектаций.",
                },
                {
                  name: "buttonLabel",
                  type: "text",
                  label: "Текст кнопки",
                  defaultValue: "Скачать каталог",
                },
                {
                  name: "edition",
                  type: "text",
                  label: "Текст издания",
                  defaultValue: "Издание 2026 г.",
                },
              ],
            },
          ],
        },
        {
          label: "Секция тканей",
          fields: [
            {
              name: "fabricSection",
              type: "group",
              label: "Ткани",
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: "Заголовок",
                  defaultValue: "Большой выбор тканей",
                },
                {
                  name: "subtitle",
                  type: "text",
                  label: "Подзаголовок",
                  defaultValue: "Больше 100 конфигураций и цветов",
                },
              ],
            },
          ],
        },
        {
          label: "Секция отзывов",
          fields: [
            {
              name: "reviewSection",
              type: "group",
              label: "Отзывы",
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: "Заголовок",
                  defaultValue: "Отзывы",
                },
                {
                  name: "images",
                  type: "array",
                  label: "Фото отзывов",
                  admin: {
                    description: "Загрузите скриншоты отзывов для слайдера",
                  },
                  fields: [
                    {
                      name: "image",
                      type: "upload",
                      relationTo: "media",
                      required: true,
                      label: "Фото",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
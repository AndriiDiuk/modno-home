import type { CollectionConfig } from "payload";

export const Sofas: CollectionConfig = {
  slug: "sofas",
  labels: {
    singular: "Диван",
    plural: "Диваны",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "price", "isActive"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Название дивана",
      required: true,
      admin: {
        description: "Например: Easy, Monaco, Cloud",
      },
    },
    {
      name: "category",
      type: "text",
      label: "Категория",
      defaultValue: "Диван",
    },
    {
      name: "folderName",
      type: "text",
      label: "Название папки с фото",
      admin: {
        description:
          "Название папки в public/sofas/ (например: easy, monaco). Фото берутся автоматически из этой папки.",
      },
    },
    {
      name: "imageFilename",
      type: "select",
      label: "Изображение карточки (из папки images/cards/)",
      required: true,
      options: [
        { label: "bad.webp", value: "bad.webp" },
        { label: "bianco.webp", value: "bianco.webp" },
        { label: "cloud.webp", value: "cloud.webp" },
        { label: "easy.webp", value: "easy.webp" },
        { label: "minimalist.webp", value: "minimalist.webp" },
        { label: "monaco.webp", value: "monaco.webp" },
        { label: "moscow.webp", value: "moscow.webp" },
        { label: "new-york.webp", value: "new-york.webp" },
        { label: "yard.webp", value: "yard.webp" },
      ],
    },
    {
      name: "price",
      type: "number",
      label: "Цена (от)",
      required: true,
    },
    {
      name: "oldPrice",
      type: "number",
      label: "Старая цена",
    },
    {
      name: "isActive",
      type: "checkbox",
      label: "Активен (показывать на сайте)",
      defaultValue: true,
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero секция",
          fields: [
            {
              name: "hero",
              type: "group",
              label: "Hero",
              fields: [
                {
                  name: "topLine",
                  type: "text",
                  label: "Верхняя строка заголовка",
                  admin: {
                    description: 'Например: "Диван Easy"',
                  },
                },
                {
                  name: "topBold",
                  type: "text",
                  label: "Жирные слова в верхней строке (через запятую)",
                  admin: {
                    description: 'Например: "Easy"',
                  },
                },
                {
                  name: "bottomLine",
                  type: "text",
                  label: "Нижняя строка заголовка",
                  admin: {
                    description:
                      'Например: "амбассадор комфорта в лофт стиле"',
                  },
                },
                {
                  name: "bottomBold",
                  type: "text",
                  label: "Жирные слова в нижней строке (через запятую)",
                  admin: {
                    description: 'Например: "амбассадор"',
                  },
                },
                {
                  name: "description",
                  type: "textarea",
                  label: "Описание под заголовком",
                },
                {
                  name: "descriptionBold",
                  type: "text",
                  label: "Жирные фразы в описании (через запятую)",
                  admin: {
                    description:
                      'Например: "Доступен к заказу, именно для Вас"',
                  },
                },
                {
                  name: "bgColor",
                  type: "text",
                  label: "Цвет фона секции",
                  defaultValue: "#E9E9E7",
                },
              ],
            },
          ],
        },
        {
          label: "Showcase секция",
          fields: [
            {
              name: "showcase",
              type: "group",
              label: "Showcase",
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: "Заголовок",
                  admin: {
                    description: 'Например: "Угловой диван Easy"',
                  },
                },
                {
                  name: "description",
                  type: "textarea",
                  label: "Описание",
                },
              ],
            },
          ],
        },
        {
          label: "Комплектация",
          fields: [
            {
              name: "info",
              type: "group",
              label: "Информация о диване",
              fields: [
                {
                  name: "equipment",
                  type: "textarea",
                  label: "Комплектация",
                  admin: {
                    description:
                      'Например: "Оттоманка со спинкой и подлокотником, широкая сидушка..."',
                  },
                },
                {
                  name: "sizes",
                  type: "array",
                  label: "Варианты размеров",
                  fields: [
                    {
                      name: "label",
                      type: "text",
                      label: "Название",
                      required: true,
                    },
                    {
                      name: "value",
                      type: "text",
                      label: "Значение",
                      required: true,
                    },
                  ],
                },
                {
                  name: "materials",
                  type: "array",
                  label: "Материалы",
                  fields: [
                    {
                      name: "label",
                      type: "text",
                      label: "Название",
                      required: true,
                    },
                    {
                      name: "value",
                      type: "text",
                      label: "Значение",
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Конфигурации",
          fields: [
            {
              name: "configs",
              type: "array",
              label: "Конфигурации дивана",
              admin: {
                description: "Варианты конфигураций с ценами",
              },
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: "Название конфигурации",
                  required: true,
                },
                {
                  name: "description",
                  type: "textarea",
                  label: "Описание",
                },
                {
                  name: "price",
                  type: "number",
                  label: "Цена",
                  required: true,
                },
                {
                  name: "oldPrice",
                  type: "number",
                  label: "Старая цена",
                },
                {
                  name: "dimensions",
                  type: "text",
                  label: "Размер (ДxШxВ)",
                  admin: {
                    description: 'Например: "2000x1550x700"',
                  },
                },
              ],
            },
          ],
        },
        {
          label: "Видео",
          fields: [
            {
              name: "videos",
              type: "array",
              label: "Видео",
              admin: {
                description: "Видео для секции коротких видео",
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
  ],
};

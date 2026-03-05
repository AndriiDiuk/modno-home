import type { GlobalConfig } from "payload";

export const Home: GlobalConfig = {
  slug: "home",
  label: "Home",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "sofasSection",
      type: "group",
      label: "Секция диванов",
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
            description: "Перетаскивайте для изменения порядка отображения",
          },
        },
      ],
    },
    {
      name: "videoSection",
      type: "group",
      label: "Секция видео",
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
    {
      name: "catalogSection",
      type: "group",
      label: "Секция каталога",
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
};

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
  ],
};

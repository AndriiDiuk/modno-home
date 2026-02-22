import type { GlobalConfig } from "payload";

export const Settings: GlobalConfig = {
  slug: "settings",
  label: "Налаштування сайту",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "header",
      type: "group",
      label: "Кнопка в навігації (Header)",
      fields: [
        {
          name: "logoSubtext",
          type: "text",
          label: "Текст під логотипом",
          defaultValue: "фабрика современной мебели",
        },
        {
          name: "logoDescription",
          type: "textarea",
          label: "Текст збоку від логотипу",
          defaultValue:
            "Производство модульных диванов в Челябинске с доставкой по РФ",
        },
        {
          name: "workingHours",
          type: "textarea",
          label: "Години роботи / Адреса",
          defaultValue: "Шоурум в Челябинске с 9:00 до 18:00",
        },
        {
          name: "phone",
          type: "text",
          label: "Номер телефону",
          defaultValue: "+7 (992) 503-54-99",
        },
        {
          name: "socials",
          type: "group",
          label: "Соцмережі",
          fields: [
            {
              name: "telegram",
              type: "text",
              label: "Посилання на Telegram",
            },
            {
              name: "vk",
              type: "text",
              label: "Посилання на VK",
            },
          ],
        },
        {
          name: "stories",
          type: "array",
          label: "Stories (Круглі кнопки)",
          maxRows: 3,
          fields: [
            {
              name: "text",
              type: "text",
              label: "Текст кнопки",
            },
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              label: "Зображення",
            },
            {
              name: "link",
              type: "text",
              label: "Посилання",
            },
          ],
        },
      ],
    },
  ],
};

import type { GlobalConfig } from "payload";

export const Settings: GlobalConfig = {
  slug: "settings",
  label: "Настройки сайта",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "header",
      type: "group",
      label: "Шапка сайта (Header)",
      fields: [
        {
          name: "logoDescription",
          type: "textarea",
          label: "Текст справа від логотипу",
          defaultValue:
            "Производство модульных диванов в Челябинске с доставкой по РФ",
        },
        {
          name: "workingHours",
          type: "textarea",
          label: "Часы работы / Адрес",
          defaultValue: "Шоурум в Челябинске с 9:00 до 18:00",
        },
        {
          name: "phone",
          type: "text",
          label: "Номер телефона",
          defaultValue: "+7 (992) 503-54-99",
        },
        {
          name: "socials",
          type: "group",
          label: "Социальные сети",
          fields: [
            {
              name: "telegram",
              type: "text",
              label: "Ссылка на Telegram",
            },
            {
              name: "vk",
              type: "text",
              label: "Ссылка на VK",
            },
          ],
        },
      ],
    },
  ],
};

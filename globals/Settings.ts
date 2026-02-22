import type { GlobalConfig } from "payload";

export const Settings: GlobalConfig = {
  slug: "settings",
  label: "Настройки сайта",
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Шапка",
          fields: [
            {
              name: "header",
              type: "group",
              label: "Настройки шапки",
              fields: [
                {
                  name: "logoDescription",
                  type: "textarea",
                  label: "Текст справа от логотипа",
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
        },
        {
          label: "Подвал",
          fields: [
            {
              name: "footer",
              type: "group",
              label: "Настройки подвала",
              fields: [
                {
                  name: "copyright",
                  type: "text",
                  label: "Текст копирайта",
                  defaultValue: "© modno-home 2026",
                },
                {
                  name: "privacyPolicyText",
                  type: "text",
                  label: "Текст ссылки на политику",
                  defaultValue: "Политика конфиденциальности",
                },
                {
                  name: "privacyPolicyContent",
                  type: "richText",
                  label: "Содержание политики конфиденциальности",
                },
              ],
            },
          ],
        },
        {
          label: "SEO",
          fields: [
            {
              name: "seo",
              type: "group",
              label: "Глобальные SEO настройки",
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: "Заголовок сайта (Meta Title)",
                  defaultValue: "Modno Home",
                },
                {
                  name: "description",
                  type: "textarea",
                  label: "Описание сайта (Meta Description)",
                  defaultValue: "Modno Home - Luxury Interior Design",
                },
                {
                  name: "keywords",
                  type: "text",
                  label: "Ключевые слова (через запятую)",
                  admin: {
                    description:
                      "Пример: диваны, мебель, Челябинск, производство",
                  },
                },
                {
                  name: "scripts",
                  type: "group",
                  label: "Сторонние скрипты (Аналитика)",
                  fields: [
                    {
                      name: "googleAnalyticsId",
                      type: "text",
                      label: "Google Analytics ID (G-XXXXXXX)",
                      admin: {
                        description: "Только ID счетчика (например: G-1234567)",
                      },
                    },
                    {
                      name: "yandexMetrikaId",
                      type: "text",
                      label: "Yandex Metrika ID",
                      admin: {
                        description:
                          "Только номер счетчика (например: 12345678)",
                      },
                    },
                    {
                      name: "head",
                      type: "textarea",
                      label: "Произвольный код внутри <head>",
                      admin: {
                        description:
                          "Сюда вставляются прочие скрипты аналитики",
                      },
                    },
                    {
                      name: "body",
                      type: "textarea",
                      label: "Произвольный код в начале <body>",
                      admin: {
                        description:
                          "Сюда вставляються коды для GTM (noscript) и др.",
                      },
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

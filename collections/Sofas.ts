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
    },
    {
      name: "category",
      type: "text",
      label: "Категория",
      defaultValue: "Диван",
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
      name: "imageFilename",
      type: "select",
      label: "Изображение (из папки images/cards/)",
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
      name: "isActive",
      type: "checkbox",
      label: "Активен (показывать на сайте)",
      defaultValue: true,
    },
  ],
};

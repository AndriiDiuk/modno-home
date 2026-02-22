import type { GlobalConfig } from "payload";

export const Home: GlobalConfig = {
  slug: "home",
  label: "Home",
  access: {
    read: () => true,
  },
  fields: [],
};

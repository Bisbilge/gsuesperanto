import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["tr", "en", "fr", "eo"],
  defaultLocale: "tr",
})

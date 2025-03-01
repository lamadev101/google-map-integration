import { LocalePrefix, Pathnames } from "next-intl/routing";

export const locales = ["en", "he"];

export type Locales = typeof locales;

export const pathnames: Pathnames<Locales> = {
  "/": "/",
  "/google-map": "/google-map",
}

export const localePrefix: LocalePrefix<Locales> = "always"


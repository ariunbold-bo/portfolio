import "server-only";
import { Dictionary } from "../types";
import { DEFAULT_LOCALE, type Locale } from "../locales";

const dictionaries = {
  en: () => import("./en").then((module) => module.default),
  mn: () => import("./mn").then((module) => module.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  const loadDict = dictionaries[locale];
  if (!loadDict) {
    return dictionaries[DEFAULT_LOCALE]();
  }
  return loadDict();
};

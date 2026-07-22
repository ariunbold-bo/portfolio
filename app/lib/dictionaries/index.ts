import 'server-only';
import { Dictionary } from '../types';

const dictionaries = {
  en: () => import('./en').then((module) => module.default),
  mn: () => import('./mn').then((module) => module.default),
};

export const getDictionary = async (locale: 'en' | 'mn'): Promise<Dictionary> => {
  const loadDict = dictionaries[locale];
  if (!loadDict) {
    return dictionaries.en();
  }
  return loadDict();
};

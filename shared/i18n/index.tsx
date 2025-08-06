'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import en from './locales/en.json';
import pt from './locales/pt.json';

type Locale = 'en' | 'pt';
type Translations = typeof pt | typeof en;

const translationsMap: Record<Locale, Translations> = {
  en,
  pt
};

interface I18nContextProps {
  locale: Locale;
  t: (key: string) => string;
  setLocale: (locale: Locale) => void;
}

// Função auxiliar para buscar uma chave aninhada, ex: 'DASHBOARD_PAGE.TITLE'
const getNestedTranslation = (obj: any, key: string): string => {
  return key.split('.').reduce((acc, part) => {
    return acc && acc[part] !== undefined ? acc[part] : key;
  }, obj);
};

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>('pt');

  const t = (key: string) => {
    return getNestedTranslation(translationsMap[locale], key);
  };

  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n deve ser usado dentro de I18nProvider');
  }
  return context;
};

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations } from './translations';
import { parseRoute, buildUrl } from '../lib/routing';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.uk;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'uk';
  const { lang } = parseRoute(window.location.pathname, window.location.search);
  return lang;
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage());

  useEffect(() => {
    const handlePopState = () => {
      const { lang } = parseRoute(window.location.pathname, window.location.search);
      setLanguage(lang);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSetLanguage = (newLang: Language) => {
    setLanguage(newLang);
    if (typeof window !== 'undefined') {
      const { familyId } = parseRoute(window.location.pathname, window.location.search);
      const newPath = buildUrl(newLang, familyId);
      window.history.pushState({ lang: newLang, familyId }, '', newPath);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}

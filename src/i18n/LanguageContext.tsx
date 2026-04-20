'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Language } from '@/types';
import enMessages from './en.json';
import csMessages from './cs.json';

type Messages = typeof enMessages;

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  messages: Messages;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce((current: unknown, key) => {
    if (current && typeof current === 'object' && key in (current as Record<string, unknown>)) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export function LanguageProvider({
  children,
  defaultLanguage = 'en',
}: {
  children: React.ReactNode;
  defaultLanguage?: Language;
}) {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  const messagesMap: Record<Language, Messages> = {
    en: enMessages,
    cs: csMessages as unknown as Messages,
  };

  const messages = messagesMap[language];

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const value = getNestedValue(messages as unknown as Record<string, unknown>, key);
      if (typeof value !== 'string') return key;
      if (!params) return value;
      return Object.entries(params).reduce(
        (str, [k, v]) => str.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), String(v)),
        value
      );
    },
    [messages]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, messages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

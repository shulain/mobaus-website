/**
 * 国际化语言上下文
 * 根据浏览器语言自动选择，默认英语
 */

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Locale, Translations, translations } from './translations';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

/**
 * 检测浏览器语言
 */
function detectBrowserLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'en'; // SSR 默认英语
  }

  try {
    // 获取浏览器语言
    const browserLang = navigator.language || (navigator as unknown as { userLanguage?: string }).userLanguage || '';

    // 检查是否为中文
    if (browserLang.toLowerCase().startsWith('zh')) {
      return 'zh';
    }

    // 默认英语
    return 'en';
  } catch {
    return 'en';
  }
}

interface LocaleProviderProps {
  children: ReactNode;
  defaultLocale?: Locale;
}

/**
 * 语言提供者组件
 */
export function LocaleProvider({ children, defaultLocale }: LocaleProviderProps) {
  const [locale, setLocale] = useState<Locale>(defaultLocale || 'en');
  const [mounted, setMounted] = useState(false);

  // 客户端挂载后检测语言
  useEffect(() => {
    if (!defaultLocale) {
      const detectedLocale = detectBrowserLocale();
      setLocale(detectedLocale);
    }
    setMounted(true);
  }, [defaultLocale]);

  // 保存语言偏好到 localStorage
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem('locale', locale);
      } catch {
        // 忽略 localStorage 错误
      }
    }
  }, [locale, mounted]);

  // 从 localStorage 恢复语言偏好
  useEffect(() => {
    try {
      const savedLocale = localStorage.getItem('locale') as Locale | null;
      if (savedLocale && (savedLocale === 'zh' || savedLocale === 'en')) {
        setLocale(savedLocale);
      }
    } catch {
      // 忽略 localStorage 错误
    }
  }, []);

  const value: LocaleContextType = {
    locale,
    setLocale,
    t: translations[locale],
  };

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

/**
 * 使用语言上下文的 Hook
 */
export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}

export default LocaleProvider;

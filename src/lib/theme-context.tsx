/**
 * 主题上下文
 * 管理全局主题状态，支持四种视觉风格切换
 */

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeStyle, THEMES } from './constants';

interface ThemeContextType {
  /** 当前主题 */
  theme: ThemeStyle;
  /** 设置主题 */
  setTheme: (theme: ThemeStyle) => void;
  /** 主题配置 */
  themeConfig: typeof THEMES[ThemeStyle];
  /** 所有可用主题 */
  themes: typeof THEMES;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  /** 默认主题 */
  defaultTheme?: ThemeStyle;
}

/**
 * 主题提供者组件
 * 包裹应用根组件，提供主题切换功能
 */
export function ThemeProvider({ children, defaultTheme = 'cyberpunk' }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeStyle>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // 客户端挂载后从 localStorage 读取主题
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('mobaus-theme') as ThemeStyle;
    if (savedTheme && THEMES[savedTheme]) {
      setThemeState(savedTheme);
    }
  }, []);

  // 设置主题并保存到 localStorage
  const setTheme = (newTheme: ThemeStyle) => {
    setThemeState(newTheme);
    localStorage.setItem('mobaus-theme', newTheme);

    // 更新 CSS 变量
    const root = document.documentElement;
    const colors = THEMES[newTheme].colors;
    root.style.setProperty('--theme-primary', colors.primary);
    root.style.setProperty('--theme-secondary', colors.secondary);
    root.style.setProperty('--theme-accent', colors.accent);
    root.style.setProperty('--theme-background', colors.background);
    root.style.setProperty('--theme-foreground', colors.foreground);

    // 更新 data-theme 属性
    root.setAttribute('data-theme', newTheme);
  };

  // 初始化时设置 CSS 变量
  useEffect(() => {
    if (mounted) {
      setTheme(theme);
    }
  }, [mounted]);

  const value: ThemeContextType = {
    theme,
    setTheme,
    themeConfig: THEMES[theme],
    themes: THEMES,
  };

  // 避免服务端渲染不匹配
  if (!mounted) {
    return (
      <ThemeContext.Provider value={value}>
        <div style={{ visibility: 'hidden' }}>{children}</div>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * 使用主题的 Hook
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

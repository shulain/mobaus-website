/**
 * 语言切换组件
 * 提供中英文切换功能，支持主题适配
 */

'use client';

import { motion } from 'framer-motion';
import { Languages } from 'lucide-react';
import { useLocale } from '@/lib/i18n';
import { useTheme } from '@/lib/theme-context';
import { cn } from '@/lib/utils';

/**
 * 语言切换按钮组件
 * 点击切换中英文，显示当前语言标识
 */
export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const { theme } = useTheme();

  // 切换语言
  const toggleLocale = () => {
    setLocale(locale === 'zh' ? 'en' : 'zh');
  };

  // 获取按钮样式（根据主题）
  const getButtonStyles = () => {
    const baseStyles = 'flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-all duration-200 text-sm font-medium';

    if (theme === 'matrix') {
      return cn(
        baseStyles,
        'font-mono text-[var(--theme-primary)]/70 hover:text-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/10 border border-transparent hover:border-[var(--theme-primary)]/30'
      );
    }

    if (theme === 'cyberpunk') {
      return cn(
        baseStyles,
        'text-white/70 hover:text-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/10'
      );
    }

    return cn(
      baseStyles,
      'text-white/70 hover:text-white hover:bg-white/10'
    );
  };

  // 获取语言显示文本
  const getLocaleLabel = () => {
    if (theme === 'matrix') {
      return locale === 'zh' ? '[中]' : '[EN]';
    }
    return locale === 'zh' ? '中' : 'EN';
  };

  return (
    <motion.button
      onClick={toggleLocale}
      className={getButtonStyles()}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={locale === 'zh' ? 'Switch to English' : '切换到中文'}
      aria-label={locale === 'zh' ? 'Switch to English' : '切换到中文'}
    >
      <Languages size={18} />
      <span>{getLocaleLabel()}</span>
    </motion.button>
  );
}

export default LanguageSwitcher;

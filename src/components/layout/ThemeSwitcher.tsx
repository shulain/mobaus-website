/**
 * 主题切换器组件
 * 允许用户在四种视觉风格之间切换
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X, Check } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';
import { useLocale } from '@/lib/i18n';
import { ThemeStyle, THEMES } from '@/lib/constants';
import { cn } from '@/lib/utils';

/**
 * 主题切换器
 */
export function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();
  const { t, locale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const themeList = Object.entries(themes) as [ThemeStyle, typeof THEMES[ThemeStyle]][];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* 切换按钮 */}
      <motion.button
        className={cn(
          'w-14 h-14 rounded-full flex items-center justify-center',
          'shadow-lg transition-colors duration-300',
          theme === 'cyberpunk' && 'bg-[var(--theme-primary)] text-black neon-border',
          theme === 'aurora' && 'bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-secondary)] text-black',
          theme === 'immersive' && 'bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-secondary)] text-white',
          theme === 'matrix' && 'bg-black border-2 border-[var(--theme-primary)] text-[var(--theme-primary)]'
        )}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={t.themeSwitcher.ariaLabel}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="palette"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Palette size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* 主题选择面板 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn(
              'absolute bottom-20 right-0 w-72 p-4 rounded-2xl',
              theme === 'cyberpunk' && 'bg-black/90 border border-[var(--theme-primary)]/50',
              theme === 'aurora' && 'bg-[#0d0d1a]/95 backdrop-blur-xl border border-[var(--theme-primary)]/30',
              theme === 'immersive' && 'bg-black/80 backdrop-blur-xl border border-white/10',
              theme === 'matrix' && 'bg-black border border-[var(--theme-primary)]/50'
            )}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className={cn(
              'text-sm font-semibold mb-3',
              theme === 'matrix' ? 'text-[var(--theme-primary)] font-mono' : 'text-white'
            )}>
              {theme === 'matrix' ? `// ${t.themeSwitcher.title}` : t.themeSwitcher.title}
            </h3>

            <div className="space-y-2">
              {themeList.map(([key, config]) => (
                <motion.button
                  key={key}
                  className={cn(
                    'w-full p-3 rounded-xl flex items-center gap-3 transition-all duration-200',
                    theme === key
                      ? 'bg-white/10 border-2 border-[var(--theme-primary)]'
                      : 'bg-white/5 hover:bg-white/10 border-2 border-transparent'
                  )}
                  onClick={() => {
                    setTheme(key);
                    setIsOpen(false);
                  }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* 颜色预览 */}
                  <div className="flex gap-1">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: config.colors.primary }}
                    />
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: config.colors.secondary }}
                    />
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: config.colors.accent }}
                    />
                  </div>

                  {/* 主题信息 */}
                  <div className="flex-1 text-left">
                    <div className={cn(
                      'font-medium text-sm',
                      theme === 'matrix' ? 'text-[var(--theme-primary)] font-mono' : 'text-white'
                    )}>
                      {locale === 'zh' ? config.nameZh : config.name}
                    </div>
                    <div className={cn(
                      'text-xs',
                      theme === 'matrix' ? 'text-[var(--theme-primary)]/60 font-mono' : 'text-white/60'
                    )}>
                      {config.description}
                    </div>
                  </div>

                  {/* 选中标记 */}
                  {theme === key && (
                    <Check size={18} className="text-[var(--theme-primary)]" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ThemeSwitcher;

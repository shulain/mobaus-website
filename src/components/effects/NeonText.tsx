/**
 * 霓虹文字组件
 * 用于赛博朋克主题的发光文字效果
 */

'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/lib/theme-context';
import { cn } from '@/lib/utils';

interface NeonTextProps {
  children: React.ReactNode;
  className?: string;
  /** 颜色类型 */
  color?: 'primary' | 'secondary' | 'accent';
  /** 是否启用故障效果 */
  glitch?: boolean;
  /** 文字大小 */
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

/**
 * 霓虹文字
 */
export function NeonText({
  children,
  className,
  color = 'primary',
  glitch = false,
  size = 'lg',
}: NeonTextProps) {
  const { theme, themeConfig } = useTheme();

  const sizeMap = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-6xl',
    '2xl': 'text-8xl',
  };

  const colorValue = themeConfig.colors[color];

  // 赛博朋克主题的霓虹效果
  if (theme === 'cyberpunk') {
    return (
      <motion.span
        className={cn(
          'font-bold tracking-wider',
          sizeMap[size],
          glitch && 'glitch-text',
          className
        )}
        style={{
          color: colorValue,
          textShadow: `
            0 0 5px ${colorValue},
            0 0 10px ${colorValue},
            0 0 20px ${colorValue},
            0 0 40px ${colorValue}
          `,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.span>
    );
  }

  // 极光主题的渐变文字
  if (theme === 'aurora') {
    return (
      <motion.span
        className={cn(
          'font-bold aurora-glow',
          sizeMap[size],
          className
        )}
        style={{
          backgroundImage: `linear-gradient(135deg, ${themeConfig.colors.primary}, ${themeConfig.colors.secondary}, ${themeConfig.colors.accent})`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.span>
    );
  }

  // 黑客帝国主题的终端风格文字
  if (theme === 'matrix') {
    return (
      <motion.span
        className={cn(
          'font-mono font-bold matrix-glow',
          sizeMap[size],
          className
        )}
        style={{
          color: themeConfig.colors.primary,
          textShadow: `
            0 0 5px ${themeConfig.colors.primary},
            0 0 10px ${themeConfig.colors.primary},
            0 0 20px ${themeConfig.colors.primary}
          `,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.span>
    );
  }

  // 沉浸和玻璃主题的渐变发光文字
  return (
    <motion.span
      className={cn(
        'font-bold',
        sizeMap[size],
        className
      )}
      style={{
        backgroundImage: `linear-gradient(135deg, ${themeConfig.colors.primary}, ${themeConfig.colors.secondary})`,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
        filter: theme === 'immersive' ? `drop-shadow(0 0 20px ${themeConfig.colors.primary}50)` : undefined,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.span>
  );
}

export default NeonText;

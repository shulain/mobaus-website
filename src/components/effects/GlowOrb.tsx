/**
 * 发光球体组件
 * 用于极光和沉浸主题的装饰效果
 */

'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/lib/theme-context';
import { cn } from '@/lib/utils';

interface GlowOrbProps {
  className?: string;
  /** 球体大小 */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** 颜色类型 */
  color?: 'primary' | 'secondary' | 'accent';
  /** 动画延迟 */
  delay?: number;
}

/**
 * 发光球体
 */
export function GlowOrb({ className, size = 'md', color = 'primary', delay = 0 }: GlowOrbProps) {
  const { theme, themeConfig } = useTheme();

  // 只在极光和沉浸主题显示
  if (theme !== 'aurora' && theme !== 'immersive') return null;

  const sizeMap = {
    sm: 'w-32 h-32',
    md: 'w-64 h-64',
    lg: 'w-96 h-96',
    xl: 'w-[500px] h-[500px]',
  };

  const colorMap = {
    primary: themeConfig.colors.primary,
    secondary: themeConfig.colors.secondary,
    accent: themeConfig.colors.accent,
  };

  return (
    <motion.div
      className={cn(
        'absolute rounded-full pointer-events-none',
        sizeMap[size],
        className
      )}
      style={{
        background: `radial-gradient(circle, ${colorMap[color]}40 0%, transparent 70%)`,
        filter: 'blur(60px)',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

export default GlowOrb;

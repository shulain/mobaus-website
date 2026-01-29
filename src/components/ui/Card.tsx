/**
 * 卡片组件
 * 支持多种主题风格
 */

'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from '@/lib/theme-context';

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onDrag' | 'onDragEnd' | 'onDragStart'> {
  /** 是否启用悬停效果 */
  hover?: boolean;
  /** 是否启用发光效果 */
  glow?: boolean;
  /** 自定义动画延迟 */
  delay?: number;
}

/**
 * 获取卡片样式
 */
function getCardStyles(theme: string, hover: boolean, glow: boolean): string {
  const baseStyles = 'rounded-xl p-6 transition-all duration-300';

  if (theme === 'cyberpunk') {
    return cn(
      baseStyles,
      'bg-black/50 border border-[var(--theme-primary)]/30',
      hover && 'hover:border-[var(--theme-primary)] hover:shadow-[0_0_30px_var(--theme-primary)/20]',
      glow && 'shadow-[0_0_20px_var(--theme-primary)/10]'
    );
  }

  if (theme === 'aurora') {
    return cn(
      baseStyles,
      'bg-gradient-to-br from-[var(--theme-primary)]/10 to-[var(--theme-secondary)]/10 border border-[var(--theme-primary)]/20 backdrop-blur-sm',
      hover && 'hover:border-[var(--theme-primary)]/50 hover:shadow-[0_0_30px_var(--theme-primary)/20] hover:-translate-y-1',
      glow && 'shadow-[0_0_20px_var(--theme-primary)/15]'
    );
  }

  if (theme === 'immersive') {
    return cn(
      baseStyles,
      'bg-white/5 border border-white/10 backdrop-blur-sm',
      hover && 'hover:bg-white/10 hover:border-white/20',
      glow && 'shadow-[0_0_40px_var(--theme-primary)/20]'
    );
  }

  if (theme === 'matrix') {
    return cn(
      baseStyles,
      'bg-black/80 border border-[var(--theme-primary)]/30',
      hover && 'hover:border-[var(--theme-primary)] hover:shadow-[0_0_20px_var(--theme-primary)/30]',
      glow && 'shadow-[0_0_15px_var(--theme-primary)/20]'
    );
  }

  return baseStyles;
}

/**
 * 卡片组件
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = true, glow = false, delay = 0, children, ...props }, ref) => {
    const { theme } = useTheme();

    return (
      <motion.div
        ref={ref}
        className={cn(getCardStyles(theme, hover, glow), className)}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        {...(props as HTMLMotionProps<'div'>)}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

/**
 * 卡片标题
 */
export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-xl font-semibold mb-2', className)} {...props}>
      {children}
    </h3>
  );
}

/**
 * 卡片描述
 */
export function CardDescription({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  const { theme } = useTheme();
  const textColor = theme === 'matrix' ? 'text-[var(--theme-primary)]/70 font-mono' : 'text-white/70';

  return (
    <p className={cn('text-sm', textColor, className)} {...props}>
      {children}
    </p>
  );
}

/**
 * 卡片图标容器
 */
export function CardIcon({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const { theme } = useTheme();

  const iconStyles = theme === 'matrix'
    ? 'text-[var(--theme-primary)] matrix-glow'
    : 'text-[var(--theme-primary)]';

  return (
    <div className={cn('mb-4', iconStyles, className)} {...props}>
      {children}
    </div>
  );
}

export default Card;

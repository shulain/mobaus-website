/**
 * 按钮组件
 * 支持多种变体和主题适配
 */

'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from '@/lib/theme-context';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  /** 按钮变体 */
  variant?: ButtonVariant;
  /** 按钮大小 */
  size?: ButtonSize;
  /** 是否显示加载状态 */
  loading?: boolean;
  /** 图标（左侧） */
  icon?: React.ReactNode;
  /** 图标（右侧） */
  iconRight?: React.ReactNode;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 按钮类型 */
  type?: 'button' | 'submit' | 'reset';
  /** 点击事件 */
  onClick?: () => void;
}

/**
 * 获取按钮样式类名
 */
function getButtonStyles(
  variant: ButtonVariant,
  size: ButtonSize,
  theme: string,
  disabled?: boolean
): string {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // 尺寸样式
  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm rounded-md gap-1.5',
    md: 'px-5 py-2.5 text-base rounded-lg gap-2',
    lg: 'px-8 py-3.5 text-lg rounded-xl gap-2.5',
  };

  // 根据主题和变体获取样式
  const getVariantStyles = (): string => {
    if (theme === 'cyberpunk') {
      switch (variant) {
        case 'primary':
          return 'bg-[var(--theme-primary)] text-black hover:shadow-[0_0_20px_var(--theme-primary)] border border-[var(--theme-primary)]';
        case 'secondary':
          return 'bg-[var(--theme-secondary)] text-white hover:shadow-[0_0_20px_var(--theme-secondary)]';
        case 'outline':
          return 'border-2 border-[var(--theme-primary)] text-[var(--theme-primary)] hover:bg-[var(--theme-primary)] hover:text-black';
        case 'ghost':
          return 'text-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/10';
      }
    }

    if (theme === 'minimal') {
      switch (variant) {
        case 'primary':
          return 'bg-[var(--theme-primary)] text-white hover:bg-[var(--theme-primary)]/90 shadow-md hover:shadow-lg';
        case 'secondary':
          return 'bg-gray-100 text-gray-900 hover:bg-gray-200';
        case 'outline':
          return 'border border-gray-300 text-gray-700 hover:border-[var(--theme-primary)] hover:text-[var(--theme-primary)]';
        case 'ghost':
          return 'text-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/5';
      }
    }

    if (theme === 'immersive') {
      switch (variant) {
        case 'primary':
          return 'bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-secondary)] text-white hover:opacity-90 shadow-lg shadow-[var(--theme-primary)]/25';
        case 'secondary':
          return 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm';
        case 'outline':
          return 'border border-[var(--theme-primary)] text-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/10';
        case 'ghost':
          return 'text-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/10';
      }
    }

    if (theme === 'glass') {
      switch (variant) {
        case 'primary':
          return 'bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-secondary)] text-white hover:opacity-90';
        case 'secondary':
          return 'glass-card text-white hover:bg-white/20';
        case 'outline':
          return 'border border-white/30 text-white hover:bg-white/10 backdrop-blur-sm';
        case 'ghost':
          return 'text-white hover:bg-white/10';
      }
    }

    // 默认样式
    return 'bg-[var(--theme-primary)] text-white hover:opacity-90';
  };

  return cn(baseStyles, sizeStyles[size], getVariantStyles(), disabled && 'pointer-events-none');
}

/**
 * 按钮组件
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, icon, iconRight, children, disabled, type = 'button', onClick }, ref) => {
    const { theme } = useTheme();

    return (
      <motion.button
        ref={ref}
        type={type}
        className={cn(getButtonStyles(variant, size, theme, disabled), className)}
        disabled={disabled || loading}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        onClick={onClick}
      >
        {loading ? (
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <>
            {icon && <span className="flex-shrink-0">{icon}</span>}
            {children}
            {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;

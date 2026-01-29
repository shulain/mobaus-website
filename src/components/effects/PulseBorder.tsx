/**
 * 脉冲发光边框组件
 * 创建动态脉冲发光的边框效果
 */

'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/theme-context';
import { cn } from '@/lib/utils';

interface PulseBorderProps {
  children: ReactNode;
  className?: string;
  /** 是否启用动画 */
  animate?: boolean;
  /** 边框圆角 */
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

/**
 * 脉冲发光边框
 */
export function PulseBorder({
  children,
  className,
  animate = true,
  rounded = '2xl',
}: PulseBorderProps) {
  const { themeConfig } = useTheme();
  const { primary, secondary, accent } = themeConfig.colors;

  const roundedMap = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full',
  };

  return (
    <div className={cn('relative', className)}>
      {/* 动态渐变边框 */}
      <motion.div
        className={cn('absolute -inset-[1px]', roundedMap[rounded])}
        style={{
          backgroundImage: `linear-gradient(90deg, ${primary}, ${secondary}, ${accent}, ${primary})`,
          backgroundSize: '300% 100%',
        }}
        animate={animate ? {
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        } : undefined}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* 发光效果 */}
      <motion.div
        className={cn('absolute -inset-[2px] blur-md opacity-50', roundedMap[rounded])}
        style={{
          backgroundImage: `linear-gradient(90deg, ${primary}, ${secondary}, ${accent}, ${primary})`,
          backgroundSize: '300% 100%',
        }}
        animate={animate ? {
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        } : undefined}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* 内容容器 */}
      <div className={cn('relative bg-black', roundedMap[rounded])}>
        {children}
      </div>
    </div>
  );
}

export default PulseBorder;

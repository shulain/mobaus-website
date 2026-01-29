/**
 * 流动渐变背景组件
 * 创建动态流动的渐变背景效果
 */

'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/lib/theme-context';
import { cn } from '@/lib/utils';

interface GradientBackgroundProps {
  className?: string;
}

/**
 * 流动渐变背景
 */
export function GradientBackground({ className }: GradientBackgroundProps) {
  const { theme, themeConfig } = useTheme();

  const { primary, secondary, accent } = themeConfig.colors;

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      {/* 主背景 */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: themeConfig.colors.background }}
      />

      {/* 动态渐变球 1 */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-30"
        style={{
          background: `radial-gradient(circle, ${primary}40 0%, transparent 70%)`,
          filter: 'blur(80px)',
        }}
        animate={{
          x: ['-20%', '20%', '-20%'],
          y: ['-20%', '30%', '-20%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* 动态渐变球 2 */}
      <motion.div
        className="absolute right-0 w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background: `radial-gradient(circle, ${secondary}40 0%, transparent 70%)`,
          filter: 'blur(80px)',
        }}
        animate={{
          x: ['20%', '-20%', '20%'],
          y: ['30%', '-10%', '30%'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* 动态渐变球 3 */}
      <motion.div
        className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: `radial-gradient(circle, ${accent}40 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
        animate={{
          x: ['-10%', '10%', '-10%'],
          y: ['10%', '-20%', '10%'],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* 网格叠加 - 赛博朋克和黑客帝国主题 */}
      {(theme === 'cyberpunk' || theme === 'matrix') && (
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(${primary}20 1px, transparent 1px),
              linear-gradient(90deg, ${primary}20 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            backgroundPosition: '0 0',
            backgroundRepeat: 'repeat',
          }}
        />
      )}

      {/* 噪点纹理 */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 顶部渐变遮罩 */}
      <div
        className="absolute top-0 left-0 right-0 h-40"
        style={{
          backgroundImage: `linear-gradient(to bottom, ${themeConfig.colors.background}, transparent)`,
        }}
      />

      {/* 底部渐变遮罩 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{
          backgroundImage: `linear-gradient(to top, ${themeConfig.colors.background}, transparent)`,
        }}
      />
    </div>
  );
}

export default GradientBackground;

/**
 * 悬浮视差卡片组件
 * 鼠标移动时产生 3D 倾斜效果
 */

'use client';

import { useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/theme-context';
import { cn } from '@/lib/utils';

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  /** 倾斜强度 */
  intensity?: number;
  /** 是否启用发光边框 */
  glowBorder?: boolean;
}

/**
 * 悬浮视差卡片
 */
export function FloatingCard({
  children,
  className,
  intensity = 10,
  glowBorder = true,
}: FloatingCardProps) {
  const { theme, themeConfig } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // 计算旋转角度
    const rotateXValue = (mouseY / (rect.height / 2)) * -intensity;
    const rotateYValue = (mouseX / (rect.width / 2)) * intensity;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);

    // 计算光晕位置（百分比）
    const glowX = ((e.clientX - rect.left) / rect.width) * 100;
    const glowY = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPosition({ x: glowX, y: glowY });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlowPosition({ x: 50, y: 50 });
  };

  const { primary, secondary } = themeConfig.colors;

  // 根据主题获取卡片样式
  const getCardStyles = () => {
    if (theme === 'cyberpunk') {
      return 'bg-black/60 border border-[var(--theme-primary)]/40';
    }
    if (theme === 'aurora') {
      return 'bg-[#0d0d1a]/80 border border-[var(--theme-primary)]/30 backdrop-blur-xl';
    }
    if (theme === 'immersive') {
      return 'bg-black/40 border border-white/10 backdrop-blur-xl';
    }
    if (theme === 'matrix') {
      return 'bg-black/90 border border-[var(--theme-primary)]/50';
    }
    return 'bg-black/50 border border-white/20';
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'relative rounded-2xl overflow-hidden',
        getCardStyles(),
        className
      )}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 动态光晕效果 */}
      {glowBorder && (
        <div
          className="absolute inset-0 opacity-50 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${primary}30 0%, transparent 50%)`,
          }}
        />
      )}

      {/* 边框发光效果 */}
      {glowBorder && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${primary}20, transparent, ${secondary}20)`,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'xor',
            WebkitMaskComposite: 'xor',
            padding: '1px',
          }}
        />
      )}

      {/* 内容 */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export default FloatingCard;

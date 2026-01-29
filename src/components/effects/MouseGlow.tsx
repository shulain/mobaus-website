/**
 * 鼠标跟随光晕效果组件
 * 创建跟随鼠标移动的发光效果
 */

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/theme-context';

/**
 * 鼠标跟随光晕
 */
export function MouseGlow() {
  const { theme, themeConfig } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // 根据主题获取光晕颜色
  const getGlowColor = () => {
    return themeConfig.colors.primary;
  };

  return (
    <motion.div
      className="fixed pointer-events-none z-50 mix-blend-screen"
      animate={{
        x: mousePosition.x - 200,
        y: mousePosition.y - 200,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        type: 'spring',
        damping: 30,
        stiffness: 200,
        mass: 0.5,
      }}
    >
      <div
        className="w-[400px] h-[400px] rounded-full"
        style={{
          background: `radial-gradient(circle, ${getGlowColor()}20 0%, ${getGlowColor()}10 30%, transparent 70%)`,
          filter: 'blur(40px)',
        }}
      />
    </motion.div>
  );
}

export default MouseGlow;

/**
 * 打字机效果组件
 * 逐字显示文本，带闪烁光标
 */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/theme-context';
import { cn } from '@/lib/utils';

interface TypeWriterProps {
  /** 要显示的文本数组，会循环显示 */
  texts: string[];
  /** 打字速度（毫秒） */
  typeSpeed?: number;
  /** 删除速度（毫秒） */
  deleteSpeed?: number;
  /** 显示完成后等待时间（毫秒） */
  pauseTime?: number;
  /** 自定义类名 */
  className?: string;
  /** 是否循环 */
  loop?: boolean;
}

/**
 * 打字机效果
 */
export function TypeWriter({
  texts,
  typeSpeed = 100,
  deleteSpeed = 50,
  pauseTime = 2000,
  className,
  loop = true,
}: TypeWriterProps) {
  const { theme, themeConfig } = useTheme();
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(pauseTimeout);
    }

    if (isDeleting) {
      if (displayText === '') {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      } else {
        const deleteTimeout = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
        }, deleteSpeed);
        return () => clearTimeout(deleteTimeout);
      }
    } else {
      if (displayText === currentText) {
        if (loop || textIndex < texts.length - 1) {
          setIsPaused(true);
        }
      } else {
        const typeTimeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, typeSpeed);
        return () => clearTimeout(typeTimeout);
      }
    }
  }, [displayText, isDeleting, isPaused, textIndex, texts, typeSpeed, deleteSpeed, pauseTime, loop]);

  return (
    <span className={cn('inline-flex items-center', className)}>
      <span>{displayText}</span>
      <motion.span
        className="inline-block w-[3px] h-[1em] ml-1"
        style={{ backgroundColor: themeConfig.colors.primary }}
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </span>
  );
}

export default TypeWriter;

/**
 * 网格背景组件
 * 用于赛博朋克主题的透视网格效果
 */

'use client';

import { useTheme } from '@/lib/theme-context';
import { cn } from '@/lib/utils';

interface GridBackgroundProps {
  className?: string;
}

/**
 * 网格背景
 */
export function GridBackground({ className }: GridBackgroundProps) {
  const { theme } = useTheme();

  // 只在赛博朋克主题显示
  if (theme !== 'cyberpunk') return null;

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {/* 透视网格 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[50vh]"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, transparent 0%, var(--theme-background) 100%),
            linear-gradient(90deg, var(--theme-primary) 1px, transparent 1px),
            linear-gradient(0deg, var(--theme-primary) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 60px 60px, 60px 60px',
          backgroundRepeat: 'repeat',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'bottom center',
          opacity: 0.15,
        }}
      />

      {/* 水平扫描线 */}
      <div
        className="absolute inset-0 animate-scan"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, var(--theme-primary) 50%, transparent 100%)',
          height: '2px',
          opacity: 0.3,
          animation: 'scan 4s linear infinite',
        }}
      />

      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </div>
  );
}

export default GridBackground;

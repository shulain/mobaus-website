/**
 * 平台支持区块组件
 * 展示支持的操作系统平台
 */

'use client';

import { motion } from 'framer-motion';
import { Apple, Monitor, Terminal, Globe, Container } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';
import { cn } from '@/lib/utils';

// 平台数据
const platforms = [
  { name: 'macOS', icon: Apple, description: 'Apple Silicon & Intel' },
  { name: 'Windows', icon: Monitor, description: 'Windows 10+' },
  { name: 'Linux', icon: Terminal, description: 'Debian, Fedora, AppImage' },
  { name: 'Web', icon: Globe, description: '浏览器直接访问' },
  { name: 'Docker', icon: Container, description: '一键容器部署' },
];

/**
 * 平台支持区块
 */
export function Platforms() {
  const { theme } = useTheme();

  // 获取标题样式
  const getTitleStyles = () => {
    if (theme === 'matrix') {
      return 'text-[var(--theme-primary)] font-mono matrix-glow';
    }
    return 'text-white';
  };

  // 获取副标题样式
  const getSubtitleStyles = () => {
    if (theme === 'matrix') {
      return 'text-[var(--theme-primary)]/60 font-mono';
    }
    return 'text-white/60';
  };

  // 获取平台卡片样式
  const getPlatformCardStyles = () => {
    if (theme === 'cyberpunk') {
      return 'bg-black/30 border border-[var(--theme-primary)]/20 hover:border-[var(--theme-primary)] hover:shadow-[0_0_20px_var(--theme-primary)/20]';
    }
    if (theme === 'aurora') {
      return 'bg-gradient-to-br from-[var(--theme-primary)]/10 to-[var(--theme-secondary)]/10 border border-[var(--theme-primary)]/20 hover:border-[var(--theme-primary)]/50 hover:shadow-[0_0_30px_var(--theme-primary)/20] backdrop-blur-sm';
    }
    if (theme === 'immersive') {
      return 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[var(--theme-primary)]/50';
    }
    if (theme === 'matrix') {
      return 'bg-black/80 border border-[var(--theme-primary)]/30 hover:border-[var(--theme-primary)] hover:shadow-[0_0_20px_var(--theme-primary)/30]';
    }
    return '';
  };

  return (
    <section className="py-24 relative">
      <div className="container-custom">
        {/* 区块标题 */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={cn('text-4xl font-bold mb-4', getTitleStyles())}>
            全平台支持
          </h2>
          <p className={cn('text-lg max-w-2xl mx-auto', getSubtitleStyles())}>
            无论你使用什么设备，MobausStudio 都能完美运行
          </p>
        </motion.div>

        {/* 平台图标 */}
        <div className="flex flex-wrap justify-center gap-6">
          {platforms.map((platform, index) => {
            const IconComponent = platform.icon;

            return (
              <motion.div
                key={platform.name}
                className={cn(
                  'flex flex-col items-center p-6 rounded-2xl transition-all duration-300 min-w-[140px]',
                  getPlatformCardStyles()
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <IconComponent
                  size={40}
                  className="text-[var(--theme-primary)] mb-3"
                />
                <span className={cn(
                  'font-semibold mb-1',
                  theme === 'matrix' ? 'text-[var(--theme-primary)] font-mono' : 'text-white'
                )}>
                  {theme === 'matrix' ? `[${platform.name}]` : platform.name}
                </span>
                <span className={cn(
                  'text-xs text-center',
                  theme === 'matrix' ? 'text-[var(--theme-primary)]/50 font-mono' : 'text-white/50'
                )}>
                  {platform.description}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Platforms;

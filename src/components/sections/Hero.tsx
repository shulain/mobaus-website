/**
 * Hero 首屏区块组件 - 超炫版
 * 展示产品主标题、描述和行动按钮
 * 包含打字机效果、流动背景、悬浮卡片等特效
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Download, Sparkles, Zap, Shield, Globe } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';
import { useLocale } from '@/lib/i18n';
import { SITE_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { TypeWriter } from '@/components/effects/TypeWriter';
import { GradientBackground } from '@/components/effects/GradientBackground';
import { FloatingCard } from '@/components/effects/FloatingCard';
import { PulseBorder } from '@/components/effects/PulseBorder';
import { ParticleField } from '@/components/effects/ParticleField';

/**
 * Hero 首屏区块
 */
export function Hero() {
  const { theme, themeConfig } = useTheme();
  const { t } = useLocale();

  // 特性亮点（使用翻译）
  const highlights = [
    { icon: Zap, text: t.highlights.fastResponse },
    { icon: Shield, text: t.highlights.secure },
    { icon: Globe, text: t.highlights.crossPlatform },
    { icon: Sparkles, text: t.highlights.mcpExtension },
  ];

  // 获取主题相关样式
  const getTextGradient = () => {
    const { primary, secondary, accent } = themeConfig.colors;
    return `linear-gradient(135deg, ${primary}, ${secondary}, ${accent})`;
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
      {/* 流动渐变背景 */}
      <GradientBackground />

      {/* 3D 粒子效果 */}
      <ParticleField />

      {/* 内容 */}
      <div className="container-custom relative z-10 py-8 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto text-center">
          {/* 顶部标签 - 移到导航栏下方 */}
          <motion.div
            className="flex justify-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <PulseBorder rounded="full" animate={true}>
              <div className={cn(
                'px-8 py-2.5 flex items-center gap-3',
                theme === 'matrix' ? 'font-mono' : ''
              )}>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--theme-primary)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--theme-primary)]" />
                </span>
                <span className="text-base text-white/80">
                  {theme === 'matrix' ? `> ${t.common.newVersionReleased}` : `✨ ${t.common.newVersionReleased}`}
                </span>
              </div>
            </PulseBorder>
          </motion.div>

          {/* 主标题 */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1
              className={cn(
                'text-6xl md:text-8xl font-bold tracking-tight',
                theme === 'matrix' && 'font-mono'
              )}
              style={{
                backgroundImage: getTextGradient(),
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
              }}
            >
              {theme === 'matrix' ? `> ${SITE_CONFIG.name}` : SITE_CONFIG.name}
            </h1>
          </motion.div>

          {/* 打字机副标题 */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className={cn(
              'text-2xl md:text-4xl font-medium h-12',
              theme === 'matrix' ? 'font-mono text-[var(--theme-primary)]' : 'text-white/90'
            )}>
              <TypeWriter texts={t.hero.tagline} typeSpeed={80} pauseTime={2500} />
            </p>
          </motion.div>

          {/* 描述文字 */}
          <motion.p
            className={cn(
              'text-lg md:text-xl max-w-4xl mx-auto mb-12',
              theme === 'matrix' ? 'font-mono text-[var(--theme-primary)]/60' : 'text-white/60'
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t.hero.description}
          </motion.p>

          {/* 行动按钮 */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/download">
              <Button size="lg" icon={<Download size={20} />} className="min-w-[180px]">
                {theme === 'matrix' ? `[ ${t.common.download} ]` : t.common.download}
              </Button>
            </Link>
            <Link href="/features">
              <Button size="lg" variant="outline" iconRight={<ArrowRight size={20} />} className="min-w-[180px]">
                {theme === 'matrix' ? `[ ${t.common.learnMore} ]` : t.common.learnMore}
              </Button>
            </Link>
          </motion.div>

          {/* 特性亮点 */}
          <motion.div
            className="flex flex-wrap justify-center gap-5 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.text}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-full',
                  'bg-white/5 border border-white/10',
                  theme === 'matrix' && 'font-mono border-[var(--theme-primary)]/30'
                )}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, borderColor: themeConfig.colors.primary }}
              >
                <item.icon size={16} className="text-[var(--theme-primary)]" />
                <span className={cn(
                  'text-sm',
                  theme === 'matrix' ? 'text-[var(--theme-primary)]/80' : 'text-white/70'
                )}>
                  {item.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* 产品预览卡片 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <FloatingCard className="max-w-6xl mx-auto" intensity={5} glowBorder={true}>
              {/* 窗口标题栏 */}
              <div className={cn(
                'flex items-center gap-3 px-4 py-3 border-b',
                theme === 'matrix'
                  ? 'border-[var(--theme-primary)]/30 bg-black'
                  : 'border-white/10 bg-black/50'
              )}>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className={cn(
                  'text-sm',
                  theme === 'matrix' ? 'text-[var(--theme-primary)]/70 font-mono' : 'text-white/50'
                )}>
                  {theme === 'matrix' ? '> MobausStudio.exe --version' : 'MobausStudio'}
                </span>
              </div>

              {/* 模拟界面内容 */}
              <div className={cn(
                'aspect-video p-6',
                theme === 'matrix' ? 'bg-black' : 'bg-gradient-to-br from-black/80 to-black/40'
              )}>
                {/* 模拟聊天界面 */}
                <div className="h-full flex flex-col gap-4">
                  {/* AI 消息 */}
                  <motion.div
                    className={cn(
                      'max-w-[70%] p-4 rounded-2xl rounded-tl-sm',
                      theme === 'matrix'
                        ? 'bg-[var(--theme-primary)]/10 border border-[var(--theme-primary)]/30'
                        : 'bg-white/10'
                    )}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                  >
                    <p className={cn(
                      'text-sm',
                      theme === 'matrix' ? 'text-[var(--theme-primary)] font-mono' : 'text-white/80'
                    )}>
                      {theme === 'matrix'
                        ? `> ${t.chat.aiGreeting}`
                        : t.chat.aiGreeting
                      }
                    </p>
                  </motion.div>

                  {/* 用户消息 */}
                  <motion.div
                    className={cn(
                      'max-w-[70%] p-4 rounded-2xl rounded-tr-sm self-end',
                      'bg-[var(--theme-primary)]/20 border border-[var(--theme-primary)]/40'
                    )}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.6, duration: 0.5 }}
                  >
                    <p className={cn(
                      'text-sm',
                      theme === 'matrix' ? 'text-[var(--theme-primary)] font-mono' : 'text-white/90'
                    )}>
                      {t.chat.userMessage}
                    </p>
                  </motion.div>

                  {/* AI 回复中 */}
                  <motion.div
                    className={cn(
                      'max-w-[70%] p-4 rounded-2xl rounded-tl-sm',
                      theme === 'matrix'
                        ? 'bg-[var(--theme-primary)]/10 border border-[var(--theme-primary)]/30'
                        : 'bg-white/10'
                    )}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2, duration: 0.5 }}
                  >
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="flex gap-1"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <span className="w-2 h-2 rounded-full bg-[var(--theme-primary)]" />
                        <span className="w-2 h-2 rounded-full bg-[var(--theme-primary)]" />
                        <span className="w-2 h-2 rounded-full bg-[var(--theme-primary)]" />
                      </motion.div>
                      <span className={cn(
                        'text-sm',
                        theme === 'matrix' ? 'text-[var(--theme-primary)]/60 font-mono' : 'text-white/50'
                      )}>
                        {theme === 'matrix' ? `// ${t.chat.analyzing}` : t.chat.analyzing}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </FloatingCard>
          </motion.div>

          {/* 平台支持 */}
          <motion.p
            className={cn(
              'text-center mt-8 text-sm',
              theme === 'matrix' ? 'text-[var(--theme-primary)]/50 font-mono' : 'text-white/40'
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {theme === 'matrix'
              ? `// ${t.hero.platformSupport}`
              : t.hero.platformSupport
            }
          </motion.p>
        </div>
      </div>

      {/* 底部渐变过渡 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to top, ${themeConfig.colors.background}, transparent)`,
        }}
      />
    </section>
  );
}

export default Hero;

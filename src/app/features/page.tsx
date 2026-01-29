/**
 * 功能特性页面
 * 详细展示产品的各项功能
 */

'use client';

import { motion } from 'framer-motion';
import {
  Bot,
  Plug,
  Sparkles,
  Workflow,
  Monitor,
  RefreshCw,
  MessageSquare,
  Settings,
  Shield,
  Zap,
  Globe,
  Code,
} from 'lucide-react';
import { useTheme } from '@/lib/theme-context';
import { useLocale } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { Card, CardTitle, CardDescription, CardIcon } from '@/components/ui/Card';

// 功能图标映射
const featureIcons = {
  multiModel: Bot,
  mcp: Plug,
  skills: Sparkles,
  agent: Workflow,
  chat: MessageSquare,
  config: Settings,
  platform: Monitor,
  update: RefreshCw,
  security: Shield,
  performance: Zap,
  i18n: Globe,
  openSource: Code,
};

// 功能键列表
const featureKeys = [
  'multiModel',
  'mcp',
  'skills',
  'agent',
  'chat',
  'config',
  'platform',
  'update',
  'security',
  'performance',
  'i18n',
  'openSource',
] as const;

/**
 * 功能特性页面
 */
export default function FeaturesPage() {
  const { theme } = useTheme();
  const { t } = useLocale();

  // 获取标题样式
  const getTitleStyles = () => {
    if (theme === 'matrix') return 'text-[var(--theme-primary)] font-mono matrix-glow';
    return 'text-white';
  };

  // 获取副标题样式
  const getSubtitleStyles = () => {
    if (theme === 'matrix') return 'text-[var(--theme-primary)]/60 font-mono';
    return 'text-white/60';
  };

  // 获取高亮标签样式
  const getTagStyles = () => {
    if (theme === 'cyberpunk') {
      return 'bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] border border-[var(--theme-primary)]/30';
    }
    if (theme === 'aurora') {
      return 'bg-gradient-to-r from-[var(--theme-primary)]/20 to-[var(--theme-secondary)]/20 text-white border border-[var(--theme-primary)]/30';
    }
    if (theme === 'matrix') {
      return 'bg-black border border-[var(--theme-primary)]/50 text-[var(--theme-primary)] font-mono';
    }
    return 'bg-white/10 text-white/80';
  };

  return (
    <div className="min-h-screen pt-24 pb-16 relative">
      {/* 背景 */}
      <div
        className="fixed inset-0 -z-10"
        style={{ backgroundColor: 'var(--theme-background)' }}
      />

      <div className="container-custom">
        {/* 页面标题 */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={cn('text-5xl font-bold mb-4', getTitleStyles())}>
            {t.features.title}
          </h1>
          <p className={cn('text-lg max-w-2xl mx-auto', getSubtitleStyles())}>
            {t.features.subtitle}
          </p>
        </motion.div>

        {/* 功能卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureKeys.map((key, index) => {
            const IconComponent = featureIcons[key];
            const feature = t.features.items[key];

            return (
              <Card key={key} delay={index * 0.05}>
                <CardIcon>
                  <IconComponent size={32} />
                </CardIcon>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription className="mb-4">
                  {feature.description}
                </CardDescription>

                {/* 功能亮点标签 */}
                <div className="flex flex-wrap gap-2">
                  {feature.highlights.map((highlight: string) => (
                    <span
                      key={highlight}
                      className={cn(
                        'text-xs px-2 py-1 rounded-full',
                        getTagStyles()
                      )}
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

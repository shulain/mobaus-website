/**
 * 功能特性区块组件
 * 展示产品的核心功能
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
} from 'lucide-react';
import { useTheme } from '@/lib/theme-context';
import { FEATURES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Card, CardTitle, CardDescription, CardIcon } from '@/components/ui/Card';

// 图标映射
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Bot,
  Plug,
  Sparkles,
  Workflow,
  Monitor,
  RefreshCw,
};

/**
 * 功能特性区块
 */
export function Features() {
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
            强大功能
          </h2>
          <p className={cn('text-lg max-w-2xl mx-auto', getSubtitleStyles())}>
            MobausStudio 提供丰富的功能，让 AI 成为你的超级助手
          </p>
        </motion.div>

        {/* 功能卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => {
            const IconComponent = iconMap[feature.icon];

            return (
              <Card key={feature.title} delay={index * 0.1}>
                <CardIcon>
                  {IconComponent && <IconComponent size={32} />}
                </CardIcon>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;

/**
 * CTA 行动召唤区块组件
 * 引导用户下载或了解更多
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Download, ArrowRight } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';
import { useLocale } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

/**
 * CTA 区块
 */
export function CTA() {
  const { theme } = useTheme();
  const { t } = useLocale();

  // 获取背景样式
  const getBackgroundStyles = () => {
    if (theme === 'cyberpunk') {
      return 'bg-gradient-to-r from-[var(--theme-primary)]/10 via-[var(--theme-secondary)]/10 to-[var(--theme-primary)]/10 border-y border-[var(--theme-primary)]/30';
    }
    if (theme === 'aurora') {
      return 'bg-gradient-to-r from-[var(--theme-primary)]/15 via-[var(--theme-secondary)]/15 to-[var(--theme-accent)]/15 aurora-bg';
    }
    if (theme === 'immersive') {
      return 'bg-gradient-to-r from-[var(--theme-primary)]/20 via-[var(--theme-secondary)]/20 to-[var(--theme-primary)]/20';
    }
    if (theme === 'matrix') {
      return 'bg-black border-y border-[var(--theme-primary)]/50 matrix-scan';
    }
    return '';
  };

  // 获取标题样式
  const getTitleStyles = () => {
    if (theme === 'cyberpunk') {
      return 'text-[var(--theme-primary)]';
    }
    if (theme === 'matrix') {
      return 'text-[var(--theme-primary)] font-mono matrix-glow';
    }
    return 'text-white';
  };

  // 获取描述样式
  const getDescriptionStyles = () => {
    if (theme === 'matrix') {
      return 'text-[var(--theme-primary)]/70 font-mono';
    }
    if (theme === 'cyberpunk') {
      return 'text-white/70';
    }
    return 'text-white/70';
  };

  return (
    <section className={cn('py-24 relative', getBackgroundStyles())}>
      <div className="container-custom">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={cn('text-4xl md:text-5xl font-bold mb-6', getTitleStyles())}>
            {t.cta.title}
          </h2>
          <p className={cn('text-lg mb-10', getDescriptionStyles())}>
            {t.cta.description}
            <br />
            {t.cta.subDescription}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/download">
              <Button
                size="lg"
                variant="primary"
                icon={<Download size={20} />}
              >
                {theme === 'matrix' ? `[ ${t.cta.downloadButton} ]` : t.cta.downloadButton}
              </Button>
            </Link>
            <Link href="https://shulain.github.io/MobausStudio/" target="_blank">
              <Button
                size="lg"
                variant="outline"
                iconRight={<ArrowRight size={20} />}
              >
                {theme === 'matrix' ? `[ ${t.cta.docsButton} ]` : t.cta.docsButton}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTA;

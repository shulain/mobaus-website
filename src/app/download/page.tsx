/**
 * 下载页面
 * 提供各平台的下载链接
 */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Apple,
  Monitor,
  Terminal,
  Download,
  ExternalLink,
  Check,
  Globe,
  Container,
  Loader2,
} from 'lucide-react';
import { useTheme } from '@/lib/theme-context';
import { useLocale } from '@/lib/i18n';
import { PLATFORMS, DOWNLOAD_BASE_URL, SITE_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { detectOS, isAppleSilicon } from '@/lib/utils';
import { useLatestRelease } from '@/lib/hooks/useLatestRelease';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

// GitHub Release 页面 URL
const RELEASE_PAGE_URL = `${SITE_CONFIG.github}/releases/latest`;

// 图标映射
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Apple,
  Monitor,
  Terminal,
};

/**
 * 下载页面
 */
export default function DownloadPage() {
  const { theme } = useTheme();
  const { t } = useLocale();
  const [detectedOS, setDetectedOS] = useState<string>('unknown');
  const [isAppleM, setIsAppleM] = useState(false);
  const { release, loading, error } = useLatestRelease();

  // 当前版本（如果获取失败则为 null）
  const version = release?.version;
  const hasValidVersion = !error && version;

  // 检测操作系统
  useEffect(() => {
    setDetectedOS(detectOS());
    setIsAppleM(isAppleSilicon());
  }, []);

  // 获取推荐的下载链接
  const getRecommendedDownload = () => {
    // 如果没有有效版本，返回 release 页面
    if (!hasValidVersion) {
      return {
        label: detectedOS === 'macos' ? 'macOS' : detectedOS === 'windows' ? 'Windows' : detectedOS === 'linux' ? 'Linux' : t.common.allPlatforms,
        url: RELEASE_PAGE_URL,
        isReleasePage: true,
      };
    }

    if (detectedOS === 'macos') {
      const file = isAppleM
        ? `MobausStudio_${version}_aarch64.dmg`
        : `MobausStudio_${version}_x64.dmg`;
      return {
        label: isAppleM ? 'macOS (Apple Silicon)' : 'macOS (Intel)',
        url: `${DOWNLOAD_BASE_URL}/${file}`,
        isReleasePage: false,
      };
    }

    if (detectedOS === 'windows') {
      return {
        label: 'Windows',
        url: `${DOWNLOAD_BASE_URL}/MobausStudio_${version}_x64-setup.exe`,
        isReleasePage: false,
      };
    }

    if (detectedOS === 'linux') {
      return {
        label: 'Linux (AppImage)',
        url: `${DOWNLOAD_BASE_URL}/MobausStudio_${version}_amd64.AppImage`,
        isReleasePage: false,
      };
    }

    return {
      label: t.common.allPlatforms,
      url: RELEASE_PAGE_URL,
      isReleasePage: true,
    };
  };

  const recommended = getRecommendedDownload();

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
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={cn('text-5xl font-bold mb-4', getTitleStyles())}>
            {t.download.title}
          </h1>
          <p className={cn('text-lg max-w-2xl mx-auto', getSubtitleStyles())}>
            {t.download.subtitle}
          </p>
        </motion.div>

        {/* 推荐下载 */}
        {recommended && (
          <motion.div
            className="max-w-xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card glow className="text-center p-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Check size={20} className="text-green-500" />
                <span className={cn(
                  'text-sm',
                  theme === 'matrix' ? 'text-[var(--theme-primary)]/60 font-mono' : 'text-white/60'
                )}>
                  {theme === 'matrix' ? `// ${t.common.detectedSystem}` : t.common.detectedSystem}
                </span>
              </div>
              <h2 className={cn('text-2xl font-bold mb-6', getTitleStyles())}>
                {recommended.label}
              </h2>
              <Link
                href={recommended.url}
                target={recommended.isReleasePage ? '_blank' : undefined}
              >
                <Button size="lg" icon={recommended.isReleasePage ? <ExternalLink size={20} /> : <Download size={20} />}>
                  {loading
                    ? t.common.loading
                    : recommended.isReleasePage
                      ? t.common.goToDownloadPage
                      : `${t.common.download} v${version}`
                  }
                </Button>
              </Link>
            </Card>
          </motion.div>
        )}

        {/* 所有平台 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className={cn('text-2xl font-bold mb-8 text-center', getTitleStyles())}>
            {t.common.allPlatforms}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {PLATFORMS.map((platform, index) => {
              const IconComponent = iconMap[platform.icon];

              return (
                <Card key={platform.name} delay={index * 0.1}>
                  <div className="flex items-center gap-3 mb-4">
                    {IconComponent && (
                      <IconComponent size={28} className="text-[var(--theme-primary)]" />
                    )}
                    <h3 className={cn('text-xl font-semibold', getTitleStyles())}>
                      {platform.name}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {platform.variants.map((variant) => {
                      const file = hasValidVersion
                        ? variant.file.replace('{version}', version)
                        : variant.file;
                      const url = hasValidVersion
                        ? `${DOWNLOAD_BASE_URL}/${file}`
                        : RELEASE_PAGE_URL;

                      return (
                        <Link
                          key={variant.label}
                          href={url}
                          target={hasValidVersion ? undefined : '_blank'}
                          className={cn(
                            'flex items-center justify-between p-3 rounded-lg transition-colors',
                            theme === 'cyberpunk' && 'bg-black/30 hover:bg-[var(--theme-primary)]/10 border border-[var(--theme-primary)]/20',
                            theme === 'aurora' && 'bg-[var(--theme-primary)]/5 hover:bg-[var(--theme-primary)]/10 border border-[var(--theme-primary)]/20',
                            theme === 'immersive' && 'bg-white/5 hover:bg-white/10',
                            theme === 'matrix' && 'bg-black/50 hover:bg-[var(--theme-primary)]/10 border border-[var(--theme-primary)]/30'
                          )}
                        >
                          <span className={cn(
                            'text-sm',
                            theme === 'matrix' ? 'text-[var(--theme-primary)]/80 font-mono' : 'text-white/80'
                          )}>
                            {theme === 'matrix' ? `> ${variant.label}` : variant.label}
                          </span>
                          <Download size={16} className="text-[var(--theme-primary)]" />
                        </Link>
                      );
                    })}
                  </div>
                </Card>
              );
            })}
          </div>
        </motion.div>

        {/* 其他部署方式 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className={cn('text-2xl font-bold mb-8 text-center', getTitleStyles())}>
            {t.common.otherDeployments}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Docker */}
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <Container size={28} className="text-[var(--theme-primary)]" />
                <h3 className={cn('text-xl font-semibold', getTitleStyles())}>
                  {t.download.docker.title}
                </h3>
              </div>
              <p className={cn('text-sm mb-4', getSubtitleStyles())}>
                {t.download.docker.description}
              </p>
              <div className={cn(
                'p-3 rounded-lg font-mono text-sm mb-4',
                'bg-black/50 text-green-400 border border-[var(--theme-primary)]/30'
              )}>
                {theme === 'matrix' ? '> ' : ''}docker run -d -p 8080:80 ghcr.io/shulain/mobausstudio:latest
              </div>
              <Link
                href="https://shulain.github.io/MobausStudio/zh/deployment/docker.html"
                target="_blank"
                className="inline-flex items-center gap-1 text-[var(--theme-primary)] text-sm hover:underline"
              >
                {t.common.viewDocs} <ExternalLink size={14} />
              </Link>
            </Card>

            {/* Web 版本 */}
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <Globe size={28} className="text-[var(--theme-primary)]" />
                <h3 className={cn('text-xl font-semibold', getTitleStyles())}>
                  {t.download.web.title}
                </h3>
              </div>
              <p className={cn('text-sm mb-4', getSubtitleStyles())}>
                {t.download.web.description}
              </p>
              <Link href={`${DOWNLOAD_BASE_URL}/MobausStudio-web.zip`}>
                <Button variant="outline" size="sm" icon={<Download size={16} />}>
                  {t.download.web.button}
                </Button>
              </Link>
            </Card>
          </div>
        </motion.div>

        {/* 系统要求 */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className={cn('text-lg font-semibold mb-4', getTitleStyles())}>
            {t.common.systemRequirements}
          </h3>
          <div className={cn('text-sm space-y-1', getSubtitleStyles())}>
            <p>{t.download.requirements.macos}</p>
            <p>{t.download.requirements.windows}</p>
            <p>{t.download.requirements.linux}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

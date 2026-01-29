/**
 * 页脚组件
 */

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';
import { useLocale } from '@/lib/i18n';
import { SITE_CONFIG, NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

/**
 * 页脚组件
 */
export function Footer() {
  const { theme } = useTheme();
  const { t, locale } = useLocale();

  // 根据语言获取导航标签
  const getNavLabel = (link: typeof NAV_LINKS[0]) => {
    return locale === 'zh' ? link.label : link.labelEn;
  };

  const getFooterStyles = () => {
    if (theme === 'cyberpunk') {
      return 'bg-black/50 border-t border-[var(--theme-primary)]/30';
    }
    if (theme === 'aurora') {
      return 'bg-[#0d0d1a]/50 border-t border-[var(--theme-primary)]/20';
    }
    if (theme === 'immersive') {
      return 'bg-black/30 backdrop-blur-sm';
    }
    if (theme === 'matrix') {
      return 'bg-black border-t border-[var(--theme-primary)]/30';
    }
    return '';
  };

  const getTextStyles = () => {
    if (theme === 'matrix') {
      return 'text-[var(--theme-primary)]/60 font-mono';
    }
    return 'text-white/60';
  };

  const getLinkStyles = () => {
    if (theme === 'matrix') {
      return 'text-[var(--theme-primary)]/60 hover:text-[var(--theme-primary)] font-mono';
    }
    return 'text-white/60 hover:text-[var(--theme-primary)]';
  };

  return (
    <footer className={cn('py-12', getFooterStyles())}>
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo 和描述 */}
          <div className="md:col-span-2">
            <motion.div
              className={cn(
                'text-2xl font-bold mb-4',
                theme === 'cyberpunk' ? 'text-[var(--theme-primary)]' :
                theme === 'matrix' ? 'text-[var(--theme-primary)] font-mono' :
                'text-white'
              )}
              whileHover={{ scale: 1.02 }}
            >
              {theme === 'matrix' ? `> ${SITE_CONFIG.name}` : SITE_CONFIG.name}
            </motion.div>
            <p className={cn('text-sm max-w-md', getTextStyles())}>
              {t.footer.description}
            </p>
          </div>

          {/* 快速链接 */}
          <div>
            <h4 className={cn(
              'font-semibold mb-4 text-white',
              theme === 'matrix' && 'font-mono text-[var(--theme-primary)]'
            )}>
              {theme === 'matrix' ? `// ${t.footer.quickLinks}` : t.footer.quickLinks}
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn('text-sm transition-colors', getLinkStyles())}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                  >
                    {theme === 'matrix' ? `> ${getNavLabel(link)}` : getNavLabel(link)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 资源 */}
          <div>
            <h4 className={cn(
              'font-semibold mb-4 text-white',
              theme === 'matrix' && 'font-mono text-[var(--theme-primary)]'
            )}>
              {theme === 'matrix' ? `// ${t.footer.resources}` : t.footer.resources}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href={SITE_CONFIG.github}
                  className={cn('text-sm transition-colors', getLinkStyles())}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {theme === 'matrix' ? '> GitHub' : 'GitHub'}
                </Link>
              </li>
              <li>
                <Link
                  href={`${SITE_CONFIG.github}/releases`}
                  className={cn('text-sm transition-colors', getLinkStyles())}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {theme === 'matrix' ? `> ${t.footer.changelog}` : t.footer.changelog}
                </Link>
              </li>
              <li>
                <Link
                  href={`${SITE_CONFIG.github}/issues`}
                  className={cn('text-sm transition-colors', getLinkStyles())}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {theme === 'matrix' ? `> ${t.footer.feedback}` : t.footer.feedback}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className={cn('text-sm flex items-center gap-1', getTextStyles())}>
            © {new Date().getFullYear()} {SITE_CONFIG.name}. {t.footer.madeWith}
            <Heart size={14} className="text-red-500 fill-red-500" />
          </p>
          <p className={cn('text-sm', getTextStyles())}>
            MIT License
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

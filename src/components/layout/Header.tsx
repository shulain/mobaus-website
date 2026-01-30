/**
 * 页头导航组件
 * 包含 Logo、导航链接和主题切换
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ExternalLink, Github, Sparkles } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';
import { useLocale } from '@/lib/i18n';
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { LanguageSwitcher } from './LanguageSwitcher';

/**
 * 酷炫 Logo 组件
 */
function Logo() {
  const { theme, themeConfig } = useTheme();
  const { primary, secondary, accent } = themeConfig.colors;
  const router = useRouter();

  // 点击 Logo 跳转首页并滚动到顶部
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Matrix 主题特殊处理
  if (theme === 'matrix') {
    return (
      <a href="/" onClick={handleClick} className="group relative cursor-pointer">
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          {/* 终端光标 */}
          <motion.span
            className="text-[var(--theme-primary)] font-mono text-xl"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {'>'}_
          </motion.span>
          <span className="font-mono font-bold text-xl text-[var(--theme-primary)] tracking-wider">
            {SITE_CONFIG.name}
          </span>
        </motion.div>
      </a>
    );
  }

  return (
    <a href="/" onClick={handleClick} className="group relative cursor-pointer">
      <motion.div
        className="flex items-center gap-2"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 400 }}
      >
        {/* Logo 图标 */}
        <motion.div
          className="relative w-8 h-8 flex items-center justify-center"
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.5 }}
        >
          {/* 外圈光环 */}
          <motion.div
            className="absolute inset-0 rounded-lg"
            style={{
              backgroundImage: `linear-gradient(135deg, ${primary}, ${secondary}, ${accent})`,
              opacity: 0.8,
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          {/* 内部图标 */}
          <div className="relative z-10 w-6 h-6 bg-black rounded-md flex items-center justify-center">
            <Sparkles size={14} className="text-[var(--theme-primary)]" />
          </div>
        </motion.div>

        {/* Logo 文字 */}
        <div className="relative">
          <motion.span
            className="font-bold text-xl tracking-tight"
            style={{
              backgroundImage: `linear-gradient(135deg, ${primary}, ${secondary})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {SITE_CONFIG.name}
          </motion.span>
          {/* 悬停时的下划线动画 */}
          <motion.div
            className="absolute -bottom-1 left-0 h-0.5 rounded-full"
            style={{
              backgroundImage: `linear-gradient(90deg, ${primary}, ${secondary}, ${accent})`,
            }}
            initial={{ width: 0 }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

      {/* 悬停光晕效果 */}
      <motion.div
        className="absolute -inset-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
        style={{
          backgroundImage: `radial-gradient(circle, ${primary}20 0%, transparent 70%)`,
        }}
      />
    </a>
  );
}

/**
 * 页头组件
 */
export function Header() {
  const { theme } = useTheme();
  const { locale, t } = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 根据语言获取导航标签
  const getNavLabel = (link: typeof NAV_LINKS[0]) => {
    return locale === 'zh' ? link.label : link.labelEn;
  };

  // 监听滚动
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 获取导航栏样式
  const getHeaderStyles = () => {
    const baseStyles = 'fixed top-0 left-0 right-0 z-40 transition-all duration-300';

    if (isScrolled) {
      if (theme === 'cyberpunk') {
        return cn(baseStyles, 'bg-black/80 backdrop-blur-md border-b border-[var(--theme-primary)]/30');
      }
      if (theme === 'aurora') {
        return cn(baseStyles, 'bg-[#0d0d1a]/80 backdrop-blur-md border-b border-[var(--theme-primary)]/20');
      }
      if (theme === 'immersive') {
        return cn(baseStyles, 'bg-black/60 backdrop-blur-xl');
      }
      if (theme === 'matrix') {
        return cn(baseStyles, 'bg-black/90 backdrop-blur-md border-b border-[var(--theme-primary)]/30');
      }
    }

    return baseStyles;
  };

  // 获取链接样式
  const getLinkStyles = (isActive: boolean = false) => {
    const baseStyles = 'text-sm font-medium transition-colors duration-200 flex items-center gap-1';

    if (theme === 'cyberpunk') {
      return cn(
        baseStyles,
        isActive ? 'text-[var(--theme-primary)]' : 'text-white/70 hover:text-[var(--theme-primary)]'
      );
    }
    if (theme === 'matrix') {
      return cn(
        baseStyles,
        'font-mono',
        isActive ? 'text-[var(--theme-primary)]' : 'text-[var(--theme-primary)]/70 hover:text-[var(--theme-primary)]'
      );
    }
    return cn(
      baseStyles,
      isActive ? 'text-[var(--theme-primary)]' : 'text-white/70 hover:text-white'
    );
  };

  return (
    <header className={getHeaderStyles()}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* 桌面端导航 */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={getLinkStyles()}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
              >
                {theme === 'matrix' ? `[${getNavLabel(link)}]` : getNavLabel(link)}
                {link.external && <ExternalLink size={14} />}
              </Link>
            ))}
          </nav>

          {/* 右侧按钮 */}
          <div className="hidden md:flex items-center gap-4">
            {/* 语言切换 */}
            <LanguageSwitcher />
            <Link
              href={SITE_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              className={getLinkStyles()}
            >
              <Github size={20} />
            </Link>
            <Link href="/download">
              <Button size="sm">
                {theme === 'matrix' ? `[ ${t.common.download} ]` : t.common.download}
              </Button>
            </Link>
          </div>

          {/* 移动端菜单按钮 */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors text-white hover:bg-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={t.common.menu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 移动端菜单 */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={cn(
              'md:hidden absolute top-16 left-0 right-0 p-4',
              theme === 'cyberpunk' && 'bg-black/95 border-b border-[var(--theme-primary)]/30',
              theme === 'aurora' && 'bg-[#0d0d1a]/95 backdrop-blur-xl',
              theme === 'immersive' && 'bg-black/95 backdrop-blur-xl',
              theme === 'matrix' && 'bg-black border-b border-[var(--theme-primary)]/30'
            )}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(getLinkStyles(), 'py-2')}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {theme === 'matrix' ? `[${getNavLabel(link)}]` : getNavLabel(link)}
                  {link.external && <ExternalLink size={14} />}
                </Link>
              ))}
              {/* 移动端语言切换 */}
              <div className="py-2">
                <LanguageSwitcher />
              </div>
              <Link href="/download" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full">
                  {theme === 'matrix' ? `[ ${t.common.download} ]` : t.common.download}
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;

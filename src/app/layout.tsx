/**
 * 根布局组件
 * 包含全局样式、主题提供者和通用布局元素
 */

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/theme-context';
import { LocaleProvider } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ThemeSwitcher } from '@/components/layout/ThemeSwitcher';
import { ClientLayout } from '@/components/layout/ClientLayout';
import { SITE_CONFIG } from '@/lib/constants';

// 字体配置
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// SEO 元数据
export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  keywords: ['AI', 'Chat Assistant', 'MCP', 'Claude', 'OpenAI', 'Cross-Platform', 'Desktop App'],
  authors: [{ name: 'MobausStudio Team' }],
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
  },
};

/**
 * 根布局
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LocaleProvider>
          <ThemeProvider defaultTheme="cyberpunk">
            <ClientLayout>
              {/* 页头导航 */}
              <Header />

              {/* 主内容区 */}
              <main className="min-h-screen">
                {children}
              </main>

              {/* 页脚 */}
              <Footer />

              {/* 主题切换器 */}
              <ThemeSwitcher />
            </ClientLayout>
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}

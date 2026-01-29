/**
 * 客户端布局包装组件
 * 包含需要客户端渲染的全局效果
 */

'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { MouseGlow } from '@/components/effects/MouseGlow';

interface ClientLayoutProps {
  children: ReactNode;
}

/**
 * 客户端布局
 */
export function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();

  // 页面切换时滚动到顶部
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <>
      {/* 鼠标跟随光晕效果 */}
      <MouseGlow />
      {children}
    </>
  );
}

export default ClientLayout;

/**
 * 首页
 * 展示产品介绍、功能特性和下载入口
 */

'use client';

import dynamic from 'next/dynamic';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Platforms } from '@/components/sections/Platforms';
import { CTA } from '@/components/sections/CTA';

// 动态导入 3D 粒子效果（避免 SSR 问题）
const ParticleField = dynamic(
  () => import('@/components/effects/ParticleField'),
  { ssr: false }
);

/**
 * 首页组件
 */
export default function HomePage() {
  return (
    <div className="relative">
      {/* 3D 粒子背景 */}
      <ParticleField className="fixed inset-0 z-0" />

      {/* 页面内容 */}
      <div className="relative z-10">
        {/* 首屏 Hero */}
        <Hero />

        {/* 功能特性 */}
        <Features />

        {/* 平台支持 */}
        <Platforms />

        {/* 行动召唤 */}
        <CTA />
      </div>
    </div>
  );
}

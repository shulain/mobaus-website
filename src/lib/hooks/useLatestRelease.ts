/**
 * 获取 GitHub 最新 Release 版本的 Hook
 * 从 GitHub API 获取最新版本信息
 */

'use client';

import { useState, useEffect } from 'react';
import { SITE_CONFIG } from '@/lib/constants';

interface ReleaseInfo {
  version: string;
  tagName: string;
  publishedAt: string;
  htmlUrl: string;
}

/**
 * 获取最新 Release 信息
 */
export function useLatestRelease() {
  const [release, setRelease] = useState<ReleaseInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestRelease = async () => {
      try {
        // 从 GitHub API 获取最新 release
        const response = await fetch(
          'https://api.github.com/repos/shulain/MobausStudio/releases/latest',
          {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
            },
            // 缓存 5 分钟
            next: { revalidate: 300 },
          }
        );

        if (!response.ok) {
          throw new Error('获取版本信息失败');
        }

        const data = await response.json();

        // 解析版本号（去掉 v 前缀）
        const version = data.tag_name?.replace(/^v/, '') || SITE_CONFIG.version;

        setRelease({
          version,
          tagName: data.tag_name,
          publishedAt: data.published_at,
          htmlUrl: data.html_url,
        });
      } catch (err) {
        // 如果获取失败，使用配置中的默认版本
        console.warn('获取 GitHub Release 失败，使用默认版本:', err);
        setError(err instanceof Error ? err.message : '未知错误');
        setRelease({
          version: SITE_CONFIG.version,
          tagName: `v${SITE_CONFIG.version}`,
          publishedAt: '',
          htmlUrl: `${SITE_CONFIG.github}/releases/latest`,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLatestRelease();
  }, []);

  return { release, loading, error };
}

export default useLatestRelease;

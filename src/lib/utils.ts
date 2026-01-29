/**
 * 工具函数文件
 * 包含通用的辅助函数
 */

import { type ClassValue, clsx } from 'clsx';

/**
 * 合并 CSS 类名
 * 使用 clsx 处理条件类名
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * 检测用户操作系统
 * 用于自动推荐下载版本
 */
export function detectOS(): 'macos' | 'windows' | 'linux' | 'unknown' {
  if (typeof window === 'undefined') return 'unknown';

  const userAgent = window.navigator.userAgent.toLowerCase();
  const platform = window.navigator.platform.toLowerCase();

  if (platform.includes('mac') || userAgent.includes('mac')) {
    return 'macos';
  }
  if (platform.includes('win') || userAgent.includes('win')) {
    return 'windows';
  }
  if (platform.includes('linux') || userAgent.includes('linux')) {
    return 'linux';
  }

  return 'unknown';
}

/**
 * 检测是否为 Apple Silicon
 */
export function isAppleSilicon(): boolean {
  if (typeof window === 'undefined') return false;

  // 通过 WebGL 渲染器信息检测
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        return renderer.includes('Apple M');
      }
    }
  } catch {
    // 忽略错误
  }

  return false;
}

/**
 * 格式化文件大小
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * 延迟函数
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 随机范围数值
 */
export function randomRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * 线性插值
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

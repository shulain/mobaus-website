import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 静态导出配置（用于 Docker 和 GitHub Pages）
  output: "export",

  // 图片优化配置（静态导出不支持默认的图片优化）
  images: {
    unoptimized: true,
  },

  // 禁用严格模式下的双重渲染（生产环境）
  reactStrictMode: true,

  // 尾部斜杠配置
  trailingSlash: true,
};

export default nextConfig;

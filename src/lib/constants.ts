/**
 * 常量配置文件
 * 包含网站的核心配置信息、主题定义、导航链接等
 */

// 网站基本信息
export const SITE_CONFIG = {
  name: 'Mobaus Studio',
  title: 'Mobaus Studio - AI 对话的未来形态',
  description: '一款跨平台的 AI 对话助手，支持多种 AI 模型和 MCP 扩展。',
  url: 'https://mobaus.com',
  github: 'https://github.com/shulain/MobausStudio',
  version: '0.3.0',
};

// 主题类型定义
export type ThemeStyle = 'cyberpunk' | 'aurora' | 'immersive' | 'matrix';

// 主题配置
export const THEMES: Record<ThemeStyle, {
  name: string;
  nameZh: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
  };
}> = {
  cyberpunk: {
    name: 'Cyberpunk',
    nameZh: '赛博朋克',
    description: '霓虹灯、暗色调、故障艺术',
    colors: {
      primary: '#00fff5',
      secondary: '#ff00ff',
      accent: '#ffff00',
      background: '#0a0a0f',
      foreground: '#ffffff',
    },
  },
  aurora: {
    name: 'Aurora',
    nameZh: '极光幻境',
    description: '流动极光、梦幻渐变、光晕脉动',
    colors: {
      primary: '#00ff87',
      secondary: '#60efff',
      accent: '#ff00e5',
      background: '#0d0d1a',
      foreground: '#ffffff',
    },
  },
  immersive: {
    name: 'Immersive',
    nameZh: '3D 沉浸',
    description: '星空粒子、3D 效果、科幻感',
    colors: {
      primary: '#8b5cf6',
      secondary: '#06b6d4',
      accent: '#f59e0b',
      background: '#030014',
      foreground: '#ffffff',
    },
  },
  matrix: {
    name: 'Matrix',
    nameZh: '黑客帝国',
    description: '数字雨、终端风格、代码美学',
    colors: {
      primary: '#00ff00',
      secondary: '#00cc00',
      accent: '#33ff33',
      background: '#000000',
      foreground: '#00ff00',
    },
  },
};

// 导航链接
export const NAV_LINKS = [
  { href: '/', label: '首页', labelEn: 'Home' },
  { href: '/features', label: '功能', labelEn: 'Features' },
  { href: '/download', label: '下载', labelEn: 'Download' },
  { href: 'https://shulain.github.io/MobausStudio/', label: '文档', labelEn: 'Docs', external: true },
];

// 产品特性
export const FEATURES = [
  {
    icon: 'Bot',
    title: '多模型支持',
    titleEn: 'Multi-Model Support',
    description: '支持 OpenAI、Anthropic Claude 等主流 AI 模型，自由切换',
    descriptionEn: 'Support OpenAI, Anthropic Claude and other mainstream AI models, switch freely',
  },
  {
    icon: 'Plug',
    title: 'MCP 扩展',
    titleEn: 'MCP Extension',
    description: '通过 MCP 协议连接外部工具和服务，无限扩展能力',
    descriptionEn: 'Connect external tools and services via MCP protocol, unlimited expansion',
  },
  {
    icon: 'Sparkles',
    title: '技能系统',
    titleEn: 'Skills System',
    description: '预设提示词模板，快速完成特定任务',
    descriptionEn: 'Preset prompt templates for quick task completion',
  },
  {
    icon: 'Workflow',
    title: '智能体',
    titleEn: 'Agents',
    description: '创建专属 AI 助手，配置特定行为和能力',
    descriptionEn: 'Create your own AI assistant with specific behaviors and capabilities',
  },
  {
    icon: 'Monitor',
    title: '跨平台',
    titleEn: 'Cross-Platform',
    description: '支持 macOS、Windows、Linux 桌面应用和 Web 版本',
    descriptionEn: 'Support macOS, Windows, Linux desktop apps and Web version',
  },
  {
    icon: 'RefreshCw',
    title: '自动更新',
    titleEn: 'Auto Update',
    description: '桌面应用内置自动更新，始终保持最新版本',
    descriptionEn: 'Built-in auto-update for desktop apps, always stay up-to-date',
  },
];

// 平台下载信息
export const PLATFORMS = [
  {
    name: 'macOS',
    icon: 'Apple',
    variants: [
      { label: 'Apple Silicon', file: 'MobausStudio_{version}_aarch64.dmg' },
      { label: 'Intel', file: 'MobausStudio_{version}_x64.dmg' },
    ],
  },
  {
    name: 'Windows',
    icon: 'Monitor',
    variants: [
      { label: 'Installer', file: 'MobausStudio_{version}_x64-setup.exe' },
      { label: 'MSI', file: 'MobausStudio_{version}_x64.msi' },
    ],
  },
  {
    name: 'Linux',
    icon: 'Terminal',
    variants: [
      { label: 'Debian/Ubuntu', file: 'MobausStudio_{version}_amd64.deb' },
      { label: 'Fedora/RHEL', file: 'MobausStudio_{version}_amd64.rpm' },
      { label: 'AppImage', file: 'MobausStudio_{version}_amd64.AppImage' },
    ],
  },
];

// GitHub Release 下载基础 URL
export const DOWNLOAD_BASE_URL = 'https://github.com/shulain/MobausStudio/releases/latest/download';

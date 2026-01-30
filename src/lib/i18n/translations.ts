/**
 * 国际化翻译配置
 * 支持中文和英文，根据浏览器语言自动选择
 */

export type Locale = 'zh' | 'en';

// 翻译内容类型
export interface Translations {
  // 通用
  common: {
    download: string;
    learnMore: string;
    features: string;
    docs: string;
    home: string;
    allPlatforms: string;
    loading: string;
    goToDownloadPage: string;
    newVersionReleased: string;
    detectedSystem: string;
    systemRequirements: string;
    otherDeployments: string;
    viewDocs: string;
    menu: string;
  };
  // 首页
  hero: {
    tagline: string[];
    description: string;
    platformSupport: string;
  };
  // 特性亮点
  highlights: {
    fastResponse: string;
    secure: string;
    crossPlatform: string;
    mcpExtension: string;
  };
  // 功能页
  features: {
    title: string;
    subtitle: string;
    items: {
      multiModel: { title: string; description: string; highlights: string[] };
      mcp: { title: string; description: string; highlights: string[] };
      skills: { title: string; description: string; highlights: string[] };
      agent: { title: string; description: string; highlights: string[] };
      chat: { title: string; description: string; highlights: string[] };
      config: { title: string; description: string; highlights: string[] };
      platform: { title: string; description: string; highlights: string[] };
      update: { title: string; description: string; highlights: string[] };
      security: { title: string; description: string; highlights: string[] };
      performance: { title: string; description: string; highlights: string[] };
      i18n: { title: string; description: string; highlights: string[] };
      openSource: { title: string; description: string; highlights: string[] };
    };
  };
  // 下载页
  download: {
    title: string;
    subtitle: string;
    docker: {
      title: string;
      description: string;
    };
    web: {
      title: string;
      description: string;
      button: string;
    };
    requirements: {
      macos: string;
      windows: string;
      linux: string;
    };
  };
  // 模拟对话
  chat: {
    aiGreeting: string;
    userMessage: string;
    analyzing: string;
  };
  // 页脚
  footer: {
    quickLinks: string;
    resources: string;
    changelog: string;
    feedback: string;
    madeWith: string;
    description: string;
  };
  // CTA 区块
  cta: {
    title: string;
    description: string;
    subDescription: string;
    downloadButton: string;
    docsButton: string;
  };
  // 平台支持
  platforms: {
    title: string;
    subtitle: string;
    web: string;
    docker: string;
  };
  // 主题切换
  themeSwitcher: {
    title: string;
    ariaLabel: string;
  };
}

// 中文翻译
export const zhTranslations: Translations = {
  common: {
    download: '下载',
    learnMore: '了解更多',
    features: '功能',
    docs: '文档',
    home: '首页',
    allPlatforms: '所有平台',
    loading: '加载中...',
    goToDownloadPage: '前往下载页面',
    newVersionReleased: '新版本已发布',
    detectedSystem: '检测到你的系统',
    systemRequirements: '系统要求',
    otherDeployments: '其他部署方式',
    viewDocs: '查看文档',
    menu: '菜单',
  },
  hero: {
    tagline: [
      'AI 对话的未来形态',
      '你的超级智能助手',
      '多模型，无限可能',
      '让创意自由流动',
    ],
    description: '一款跨平台的 AI 对话助手，支持 GPT-5、Claude、Gemini 等多种模型，通过 MCP 协议连接无限工具，让 AI 成为你的超级助手。',
    platformSupport: '支持 macOS · Windows · Linux · Web · Docker',
  },
  highlights: {
    fastResponse: '极速响应',
    secure: '安全可控',
    crossPlatform: '全平台支持',
    mcpExtension: 'MCP 扩展',
  },
  features: {
    title: '强大功能',
    subtitle: 'Mobaus Studio 提供丰富的功能，让 AI 成为你的超级助手',
    items: {
      multiModel: {
        title: '多模型支持',
        description: '支持 OpenAI GPT-5、Claude 4、Gemini 等主流 AI 模型，一键切换，灵活选择最适合的模型。',
        highlights: ['GPT-5 / GPT-4o', 'Claude 4 Sonnet', 'Gemini Pro', '自定义 API'],
      },
      mcp: {
        title: 'MCP 扩展协议',
        description: '通过 Model Context Protocol 连接外部工具和服务，让 AI 能够读写文件、查询数据库、操作 GitHub 等。',
        highlights: ['文件系统访问', '数据库查询', 'GitHub 操作', '自定义工具'],
      },
      skills: {
        title: '技能系统',
        description: '预设提示词模板，快速完成特定任务。支持自定义技能，打造专属工作流。',
        highlights: ['代码审查', '文档翻译', '内容创作', '自定义技能'],
      },
      agent: {
        title: '智能体 (Agent)',
        description: '创建专属 AI 助手，配置特定的行为和能力。支持权限控制、上下文管理等高级功能。',
        highlights: ['自定义人设', '权限控制', '上下文管理', 'MCP 工具绑定'],
      },
      chat: {
        title: '对话管理',
        description: '支持多会话管理、历史记录、对话导出等功能。所有数据本地存储，保护隐私。',
        highlights: ['多会话切换', '历史记录', '对话导出', '本地存储'],
      },
      config: {
        title: '灵活配置',
        description: '丰富的配置选项，包括模型参数、界面主题、快捷键等，打造个性化体验。',
        highlights: ['模型参数调节', '界面主题', '快捷键自定义', '代理设置'],
      },
      platform: {
        title: '跨平台支持',
        description: '原生桌面应用支持 macOS、Windows、Linux，同时提供 Web 版本和 Docker 部署。',
        highlights: ['macOS 原生', 'Windows 原生', 'Linux 支持', 'Web/Docker'],
      },
      update: {
        title: '自动更新',
        description: '桌面应用内置自动更新功能，始终保持最新版本，第一时间体验新功能。',
        highlights: ['后台检查更新', '增量更新', '一键安装', '更新日志'],
      },
      security: {
        title: '安全可控',
        description: '所有数据本地存储，API Key 加密保存。支持沙箱模式，确保操作安全。',
        highlights: ['本地数据存储', 'API Key 加密', '沙箱模式', '权限控制'],
      },
      performance: {
        title: '高性能',
        description: '基于 Tauri 构建，启动快速，内存占用低。流式响应，实时显示 AI 回复。',
        highlights: ['快速启动', '低内存占用', '流式响应', '原生性能'],
      },
      i18n: {
        title: '国际化',
        description: '支持中文和英文界面，自动检测系统语言。文档完善，上手简单。',
        highlights: ['中文界面', '英文界面', '完善文档', '社区支持'],
      },
      openSource: {
        title: '开源免费',
        description: 'MIT 开源协议，完全免费使用。代码透明，欢迎贡献。',
        highlights: ['MIT 协议', '完全免费', '代码透明', '欢迎贡献'],
      },
    },
  },
  download: {
    title: '下载 Mobaus Studio',
    subtitle: '选择适合你操作系统的版本，开始体验 AI 对话的未来形态',
    docker: {
      title: 'Docker',
      description: '使用 Docker 一键部署，适合服务器环境',
    },
    web: {
      title: 'Web 版本',
      description: '下载静态文件包，使用任意 HTTP 服务器托管',
      button: '下载 Web 版本',
    },
    requirements: {
      macos: 'macOS 10.15 (Catalina) 或更高版本',
      windows: 'Windows 10 (1803) 或更高版本',
      linux: 'Linux: glibc 2.31+ (Ubuntu 20.04+)',
    },
  },
  chat: {
    aiGreeting: '你好！我是 Mobaus Studio，你的 AI 助手。有什么我可以帮助你的吗？',
    userMessage: '帮我分析一下这个项目的代码结构',
    analyzing: '正在分析...',
  },
  footer: {
    quickLinks: '快速链接',
    resources: '资源',
    changelog: '更新日志',
    feedback: '问题反馈',
    madeWith: 'Made with',
    description: '一款跨平台的 AI 对话助手，支持多种 AI 模型和 MCP 扩展。',
  },
  cta: {
    title: '准备好开始了吗？',
    description: '立即下载 Mobaus Studio，体验 AI 对话的未来形态。',
    subDescription: '完全免费，开源可自托管。',
    downloadButton: '免费下载',
    docsButton: '查看文档',
  },
  platforms: {
    title: '全平台支持',
    subtitle: '无论你使用什么设备，Mobaus Studio 都能完美运行',
    web: '浏览器直接访问',
    docker: '一键容器部署',
  },
  themeSwitcher: {
    title: '选择主题风格',
    ariaLabel: '切换主题',
  },
};

// 英文翻译
export const enTranslations: Translations = {
  common: {
    download: 'Download',
    learnMore: 'Learn More',
    features: 'Features',
    docs: 'Docs',
    home: 'Home',
    allPlatforms: 'All Platforms',
    loading: 'Loading...',
    goToDownloadPage: 'Go to Download Page',
    newVersionReleased: 'New Version Released',
    detectedSystem: 'Detected your system',
    systemRequirements: 'System Requirements',
    otherDeployments: 'Other Deployments',
    viewDocs: 'View Docs',
    menu: 'Menu',
  },
  hero: {
    tagline: [
      'The Future of AI Conversation',
      'Your Super Intelligent Assistant',
      'Multi-Model, Infinite Possibilities',
      'Let Creativity Flow Freely',
    ],
    description: 'A cross-platform AI chat assistant supporting GPT-5, Claude, Gemini and more. Connect unlimited tools via MCP protocol, making AI your super assistant.',
    platformSupport: 'Supports macOS · Windows · Linux · Web · Docker',
  },
  highlights: {
    fastResponse: 'Fast Response',
    secure: 'Secure & Safe',
    crossPlatform: 'Cross-Platform',
    mcpExtension: 'MCP Extension',
  },
  features: {
    title: 'Powerful Features',
    subtitle: 'Mobaus Studio provides rich features to make AI your super assistant',
    items: {
      multiModel: {
        title: 'Multi-Model Support',
        description: 'Support OpenAI GPT-5, Claude 4, Gemini and other mainstream AI models. Switch with one click, flexibly choose the most suitable model.',
        highlights: ['GPT-5 / GPT-4o', 'Claude 4 Sonnet', 'Gemini Pro', 'Custom API'],
      },
      mcp: {
        title: 'MCP Extension Protocol',
        description: 'Connect external tools and services through Model Context Protocol. Enable AI to read/write files, query databases, operate GitHub, etc.',
        highlights: ['File System Access', 'Database Query', 'GitHub Operations', 'Custom Tools'],
      },
      skills: {
        title: 'Skills System',
        description: 'Preset prompt templates for quick task completion. Support custom skills to build your own workflow.',
        highlights: ['Code Review', 'Doc Translation', 'Content Creation', 'Custom Skills'],
      },
      agent: {
        title: 'Agent',
        description: 'Create your own AI assistant with specific behaviors and capabilities. Support permission control, context management and more.',
        highlights: ['Custom Persona', 'Permission Control', 'Context Management', 'MCP Tool Binding'],
      },
      chat: {
        title: 'Chat Management',
        description: 'Support multi-session management, history records, conversation export. All data stored locally to protect privacy.',
        highlights: ['Multi-Session', 'History Records', 'Export Chats', 'Local Storage'],
      },
      config: {
        title: 'Flexible Configuration',
        description: 'Rich configuration options including model parameters, UI themes, shortcuts, etc. Create personalized experience.',
        highlights: ['Model Parameters', 'UI Themes', 'Custom Shortcuts', 'Proxy Settings'],
      },
      platform: {
        title: 'Cross-Platform',
        description: 'Native desktop apps for macOS, Windows, Linux. Also provides Web version and Docker deployment.',
        highlights: ['macOS Native', 'Windows Native', 'Linux Support', 'Web/Docker'],
      },
      update: {
        title: 'Auto Update',
        description: 'Built-in auto-update for desktop apps. Always stay up-to-date and experience new features first.',
        highlights: ['Background Check', 'Incremental Update', 'One-Click Install', 'Changelog'],
      },
      security: {
        title: 'Secure & Safe',
        description: 'All data stored locally, API Keys encrypted. Support sandbox mode to ensure safe operations.',
        highlights: ['Local Storage', 'API Key Encryption', 'Sandbox Mode', 'Permission Control'],
      },
      performance: {
        title: 'High Performance',
        description: 'Built with Tauri, fast startup, low memory usage. Streaming response, real-time AI replies.',
        highlights: ['Fast Startup', 'Low Memory', 'Streaming Response', 'Native Performance'],
      },
      i18n: {
        title: 'Internationalization',
        description: 'Support Chinese and English interface, auto-detect system language. Complete documentation, easy to get started.',
        highlights: ['Chinese UI', 'English UI', 'Complete Docs', 'Community Support'],
      },
      openSource: {
        title: 'Open Source & Free',
        description: 'MIT open source license, completely free to use. Transparent code, contributions welcome.',
        highlights: ['MIT License', 'Completely Free', 'Transparent Code', 'Contributions Welcome'],
      },
    },
  },
  download: {
    title: 'Download Mobaus Studio',
    subtitle: 'Choose the version for your operating system and start experiencing the future of AI conversation',
    docker: {
      title: 'Docker',
      description: 'One-click deployment with Docker, suitable for server environments',
    },
    web: {
      title: 'Web Version',
      description: 'Download static files and host with any HTTP server',
      button: 'Download Web Version',
    },
    requirements: {
      macos: 'macOS 10.15 (Catalina) or later',
      windows: 'Windows 10 (1803) or later',
      linux: 'Linux: glibc 2.31+ (Ubuntu 20.04+)',
    },
  },
  chat: {
    aiGreeting: "Hello! I'm Mobaus Studio, your AI assistant. How can I help you?",
    userMessage: 'Help me analyze the code structure of this project',
    analyzing: 'Analyzing...',
  },
  footer: {
    quickLinks: 'Quick Links',
    resources: 'Resources',
    changelog: 'Changelog',
    feedback: 'Feedback',
    madeWith: 'Made with',
    description: 'A cross-platform AI chat assistant supporting multiple AI models and MCP extensions.',
  },
  cta: {
    title: 'Ready to Get Started?',
    description: 'Download Mobaus Studio now and experience the future of AI conversation.',
    subDescription: 'Completely free, open source and self-hostable.',
    downloadButton: 'Free Download',
    docsButton: 'View Docs',
  },
  platforms: {
    title: 'Cross-Platform Support',
    subtitle: 'No matter what device you use, Mobaus Studio runs perfectly',
    web: 'Access via Browser',
    docker: 'One-Click Container Deploy',
  },
  themeSwitcher: {
    title: 'Select Theme Style',
    ariaLabel: 'Toggle Theme',
  },
};

// 翻译映射
export const translations: Record<Locale, Translations> = {
  zh: zhTranslations,
  en: enTranslations,
};

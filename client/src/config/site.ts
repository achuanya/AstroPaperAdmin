/**
 * 站点基本配置
 */
export const SITE_CONFIG = {
  title: "lhasa's Blog",
  description: "分享技术、骑行、生活的个人博客",
  author: "lhasa",
  email: "your-email@example.com",
  url: "https://your-blog-url.com",
  favicon: "/favicon.ico",
  logo: "/logo.png",
} as const

export type SiteConfig = typeof SITE_CONFIG
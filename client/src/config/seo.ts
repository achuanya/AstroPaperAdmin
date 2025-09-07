/**
 * SEO和社交媒体配置
 */
export const SEO_CONFIG = {
  // SEO配置
  seo: {
    defaultImage: "/og-image.png",
    twitterCard: "summary_large_image" as const,
    keywords: ["博客", "技术", "骑行", "生活", "前端", "React", "TypeScript"],
  },

  // 社交媒体链接
  social: {
    github: "https://github.com/yourusername",
    twitter: "https://twitter.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    email: "mailto:your-email@example.com",
  },

  // RSS配置
  rss: {
    title: "lhasa's Blog RSS Feed",
    description: "最新的技术、骑行、生活文章",
    language: "zh-CN",
    copyright: "Copyright © 2024 lhasa",
  },
} as const

export type SeoConfig = typeof SEO_CONFIG
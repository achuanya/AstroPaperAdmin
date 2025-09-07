/**
 * 功能特性配置
 */
export const FEATURES_CONFIG = {
  // 功能开关
  switches: {
    yearProgress: true,
    darkMode: false,
    rss: true,
    sitemap: true,
    analytics: false,
    comments: true,
    search: true,
  },

  // 分页配置
  pagination: {
    postsPerPage: 10,
    showPageNumbers: true,
    showPrevNext: true,
  },

  // 搜索配置
  search: {
    enabled: true,
    provider: "local" as const, // 可选: local, algolia
    placeholder: "搜索文章...",
  },

  // 评论系统配置
  comments: {
    enabled: true,
    provider: "giscus" as const, // 可选: giscus, disqus, utterances
    config: {
      // Giscus配置
      repo: "your-username/your-repo",
      repoId: "your-repo-id",
      category: "General",
      categoryId: "your-category-id",
    },
  },
} as const

export type FeaturesConfig = typeof FEATURES_CONFIG
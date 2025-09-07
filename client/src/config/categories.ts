/**
 * 文章分类配置
 */
export const CATEGORIES_CONFIG = {
  technology: {
    name: "技术",
    description: "前端、后端、数据库等技术相关文章",
    color: "#3b82f6",
    icon: "💻",
  },
  sports: {
    name: "骑行",
    description: "骑行攻略、装备推荐、路线分享",
    color: "#10b981",
    icon: "🚴‍♂️",
  },
  life: {
    name: "生活",
    description: "生活感悟、随笔、日常分享",
    color: "#f59e0b",
    icon: "🌱",
  },
  draft: {
    name: "草稿",
    description: "未发布的草稿文章",
    color: "#6b7280",
    icon: "📝",
  },
} as const

export type CategoryKey = keyof typeof CATEGORIES_CONFIG
export type CategoryConfig = typeof CATEGORIES_CONFIG[CategoryKey]

export const getCategoryConfig = (key: CategoryKey) => {
  return CATEGORIES_CONFIG[key]
}

export const getAllCategories = () => {
  return CATEGORIES_CONFIG
}
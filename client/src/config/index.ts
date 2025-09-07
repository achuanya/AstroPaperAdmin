/**
 * 配置文件统一入口
 */
export * from './site'
export * from './navigation'
export * from './categories'
export * from './features'
export * from './seo'
export * from './analytics'

// 重新导出colors配置
export * from '../lib/colors'

// 创建一个统一的配置对象（可选）
import { SITE_CONFIG } from './site'
import { NAVIGATION_CONFIG } from './navigation'
import { CATEGORIES_CONFIG } from './categories'
import { FEATURES_CONFIG } from './features'
import { SEO_CONFIG } from './seo'
import { ANALYTICS_CONFIG } from './analytics'

export const CONFIG = {
  site: SITE_CONFIG,
  navigation: NAVIGATION_CONFIG,
  categories: CATEGORIES_CONFIG,
  features: FEATURES_CONFIG,
  seo: SEO_CONFIG,
  analytics: ANALYTICS_CONFIG,
} as const

export type AppConfig = typeof CONFIG
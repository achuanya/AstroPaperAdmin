/**
 * 分析工具配置
 */
export const ANALYTICS_CONFIG = {
  google: {
    enabled: false,
    measurementId: "G-XXXXXXXXXX",
  },
  baidu: {
    enabled: false,
    siteId: "your-baidu-site-id",
  },
} as const

export type AnalyticsConfig = typeof ANALYTICS_CONFIG
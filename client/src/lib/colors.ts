/**
 * 全局颜色管理
 * 集中管理项目中使用的所有颜色变量
 */

// 主题色彩
export const colors = {
  // 主要颜色
  primary: {
    blue: 'rgb(125, 185, 222)',
    lightBlue: '#7db9de',
  },
  
  // 背景色
  background: {
    white: '#ffffff',
    gray: '#e7e7eb',
  },
  
  // 文本色
  text: {
    primary: '#000000',
    secondary: '#666666',
    muted: '#888888',
  },
  
  // 状态色
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  
  // 边框色
  border: {
    light: '#e5e7eb',
    medium: '#d1d5db',
    dark: '#9ca3af',
  },
} as const

// 导出类型定义
export type Colors = typeof colors
export type ColorKeys = keyof Colors

// 辅助函数：获取颜色值
export const getColor = (category: ColorKeys, shade: string): string => {
  const colorCategory = colors[category] as Record<string, string>
  return colorCategory[shade] || '#000000'
}

// 常用颜色快捷方式
export const themeColors = {
  progressFill: colors.primary.blue,
  progressBackground: colors.background.gray,
  pageBackground: colors.primary.lightBlue,
  cardBackground: colors.background.white,
} as const
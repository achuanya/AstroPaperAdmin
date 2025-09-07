/**
 * 导航配置
 */
export const NAVIGATION_CONFIG = [
  { title: "全部", href: "/", active: true },
  { title: "骑行", href: "/cycling" },
  { title: "生活", href: "/life" },
  { title: "技术", href: "/tech" },
  { title: "链接", href: "/links" },
  { title: "关于", href: "/about" },
  { title: "标签", href: "/tags" },
  { title: "归档", href: "/archive" },
  { title: "搜索", href: "/search" },
] as const

export type NavigationItem = typeof NAVIGATION_CONFIG[0]

export const getNavigationItems = () => {
  return NAVIGATION_CONFIG
}
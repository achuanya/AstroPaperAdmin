/**
 * 分页配置
 * 集中管理分页相关的配置项
 */

export const paginationConfig = {
  // 每页显示的文章数量
  itemsPerPage: 8,
  
  // 分页器显示的页码按钮数量（不包括省略号）
  maxVisiblePages: 5,
  
  // 是否显示首页和末页按钮
  showFirstLast: true,
  
  // 是否显示上一页和下一页按钮
  showPrevNext: true,
  
  // 分页器的尺寸
  size: 'default' as const,
} as const

// 导出类型定义
export type PaginationConfig = typeof paginationConfig

// 分页相关的工具类型
export interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  startIndex: number
  endIndex: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

// 分页组件的 props 类型
export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}
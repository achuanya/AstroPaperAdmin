import { paginationConfig, type PaginationInfo } from '@/config/pagination'

/**
 * 计算分页信息
 * @param totalItems 总项目数
 * @param currentPage 当前页码（从1开始）
 * @param itemsPerPage 每页项目数（可选，默认使用配置）
 * @returns 分页信息对象
 */
export function calculatePagination(
  totalItems: number,
  currentPage: number,
  itemsPerPage: number = paginationConfig.itemsPerPage
): PaginationInfo {
  // 确保当前页码至少为1
  const page = Math.max(1, currentPage)
  
  // 计算总页数
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage))
  
  // 确保当前页码不超过总页数
  const validCurrentPage = Math.min(page, totalPages)
  
  // 计算起始和结束索引
  const startIndex = (validCurrentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
  
  return {
    currentPage: validCurrentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    startIndex,
    endIndex,
    hasNextPage: validCurrentPage < totalPages,
    hasPrevPage: validCurrentPage > 1,
  }
}

/**
 * 获取当前页的数据
 * @param data 原始数据数组
 * @param currentPage 当前页码
 * @param itemsPerPage 每页项目数
 * @returns 当前页的数据
 */
export function getPaginatedData<T>(
  data: T[],
  currentPage: number,
  itemsPerPage: number = paginationConfig.itemsPerPage
): T[] {
  const { startIndex, endIndex } = calculatePagination(data.length, currentPage, itemsPerPage)
  return data.slice(startIndex, endIndex)
}

/**
 * 生成页码数组（用于渲染分页按钮）
 * @param currentPage 当前页码
 * @param totalPages 总页数
 * @param maxVisible 最大可见页码数
 * @returns 页码数组，包含数字和省略号标识
 */
export function generatePageNumbers(
  currentPage: number,
  totalPages: number,
  maxVisible: number = paginationConfig.maxVisiblePages
): (number | 'ellipsis')[] {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const pages: (number | 'ellipsis')[] = []
  const halfVisible = Math.floor(maxVisible / 2)

  // 总是显示第一页
  pages.push(1)

  let start = Math.max(2, currentPage - halfVisible)
  let end = Math.min(totalPages - 1, currentPage + halfVisible)

  // 调整范围以确保显示足够的页码
  if (end - start + 1 < maxVisible - 2) {
    if (start === 2) {
      end = Math.min(totalPages - 1, start + maxVisible - 3)
    } else {
      start = Math.max(2, end - maxVisible + 3)
    }
  }

  // 添加左侧省略号
  if (start > 2) {
    pages.push('ellipsis')
  }

  // 添加中间页码
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  // 添加右侧省略号
  if (end < totalPages - 1) {
    pages.push('ellipsis')
  }

  // 总是显示最后一页（如果总页数大于1）
  if (totalPages > 1) {
    pages.push(totalPages)
  }

  return pages
}
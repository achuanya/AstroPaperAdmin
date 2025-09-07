import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { generatePageNumbers } from '@/lib/pagination'
import { paginationConfig } from '@/config/pagination'
import type { PaginationProps } from '@/config/pagination'

export function CustomPagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  // 如果只有一页或没有页面，不显示分页器
  if (totalPages <= 1) {
    return null
  }

  const pageNumbers = generatePageNumbers(
    currentPage,
    totalPages,
    paginationConfig.maxVisiblePages
  )

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page)
    }
  }

  return (
    <Pagination className={className}>
      <PaginationContent>
        {/* 上一页按钮 */}
        {paginationConfig.showPrevNext && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              className={currentPage <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>
        )}

        {/* 页码按钮 */}
        {pageNumbers.map((pageNum, index) => (
          <PaginationItem key={index}>
            {pageNum === 'ellipsis' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={() => handlePageChange(pageNum)}
                isActive={pageNum === currentPage}
                className="cursor-pointer"
              >
                {pageNum}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* 下一页按钮 */}
        {paginationConfig.showPrevNext && (
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}
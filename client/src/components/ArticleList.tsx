import React from 'react'

interface Article {
  id: string
  title: string
  publishTime: string
  commentCount: number
  coverImage?: string
  draft: boolean
  featured: boolean
  category: string
  pubDatetime: string
  slug: string
  ogImage: string
  tags: string[]
  description: string
}

interface ArticleItemProps {
  article: Article
}

function ArticleItem({ article }: ArticleItemProps) {
  const defaultAvatar = 'https://cn.cravatar.com/avatar/'
  
  return (
    <div className="flex items-center h-[50px] w-full">
      {/* 左侧封面图片 */}
      <div className="flex-shrink-0 w-[50px] h-[50px] mr-3">
        <img 
          src={article.coverImage || defaultAvatar}
          alt={article.title}
          className="w-full h-full object-cover rounded"
        />
      </div>
      
      {/* 中间内容区域 */}
      <div className="flex-1 flex flex-col justify-center">
        {/* 标题 */}
        <h2 className="text-[14px] text-black font-normal leading-tight mb-1">
          {article.title}
        </h2>
        {/* 发布时间 */}
        <time className="text-[13px] text-[#969696] leading-tight">
          {article.pubDatetime}
        </time>
      </div>
      
      {/* 右侧评论数 */}
      <div className="flex-shrink-0 ml-3">
        <div className="bg-gray-200 rounded-full px-2 py-1 w-[30px] h-[16px] flex items-center justify-center">
          <span className="text-[13px] text-gray-600 leading-none">
            {article.commentCount}
          </span>
        </div>
      </div>
    </div>
  )
}

interface ArticleListProps {
  articles: Article[]
}

export function ArticleList({ articles }: ArticleListProps) {
  return (
    <div className="space-y-5">
      {articles.map((article) => (
        <ArticleItem key={article.slug} article={article} />
      ))}
    </div>
  )
}

// 导出类型供其他组件使用
export type { Article, ArticleListProps }
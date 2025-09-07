import { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { YearProgress } from "@/components/YearProgress"
import { Navigation } from "@/components/Navigation"
import { MainContent } from "@/components/MainContent"
import { ArticleList, type Article } from "@/components/ArticleList"
import { Header } from "@/components/Header"
import { MainLayout } from "@/components/MainLayout"
import { PageContainer } from "./components/PageContainer"
import { CustomPagination } from "@/components/ui/custom-pagination"
import { getPaginatedData, calculatePagination } from "@/lib/pagination"

function App() {
  // 当前页码状态
  const [currentPage, setCurrentPage] = useState(1)

  // 示例文章数据
  const articles: Article[] = [
    // 技术类文章 (technology)
    {
      draft: false,
      featured: true,
      category: 'technology',
      pubDatetime: '2024-12-15T10:30+08:00',
      title: 'React Hooks 深度解析与最佳实践',
      slug: 'react-hooks-deep-dive',
      ogImage: 'https://cos.lhasa.icu/ArticlePictures/react-hooks-deep-dive/react-hooks-deep-dive.png',
      tags: ['React', 'JavaScript', '前端开发'],
      description: '深入探讨React Hooks的工作原理和实际应用场景...'
    },
    {
      draft: false,
      featured: false,
      category: 'technology',
      pubDatetime: '2024-11-20T14:20+08:00',
      title: 'TypeScript 5.0 新特性全面解读',
      slug: 'typescript-5-new-features',
      ogImage: 'https://cos.lhasa.icu/ArticlePictures/typescript-5-new-features/typescript-5-new-features.png',
      tags: ['TypeScript', '编程语言', '前端'],
      description: 'TypeScript 5.0带来了许多令人兴奋的新特性...'
    },
    {
      draft: false,
      featured: true,
      category: 'technology',
      pubDatetime: '2024-10-08T09:15+08:00',
      title: 'Node.js 性能优化实战指南',
      slug: 'nodejs-performance-optimization',
      ogImage: 'https://cos.lhasa.icu/ArticlePictures/nodejs-performance-optimization/nodejs-performance-optimization.png',
      tags: ['Node.js', '性能优化', '后端开发'],
      description: '从内存管理到异步处理，全面提升Node.js应用性能...'
    },
    {
      draft: false,
      featured: false,
      category: 'technology',
      pubDatetime: '2024-09-12T16:45+08:00',
      title: 'Docker 容器化部署最佳实践',
      slug: 'docker-deployment-best-practices',
      ogImage: 'https://cos.lhasa.icu/ArticlePictures/docker-deployment-best-practices/docker-deployment-best-practices.png',
      tags: ['Docker', 'DevOps', '部署'],
      description: '掌握Docker容器化部署的核心技巧和注意事项...'
    },
    {
      draft: false,
      featured: false,
      category: 'technology',
      pubDatetime: '2023-08-25T11:30+08:00',
      title: 'Vue 3 Composition API 实战教程',
      slug: 'vue3-composition-api-tutorial',
      ogImage: 'https://cos.lhasa.icu/ArticlePictures/vue3-composition-api-tutorial/vue3-composition-api-tutorial.png',
      tags: ['Vue.js', 'Composition API', '前端框架'],
      description: '从基础到进阶，全面掌握Vue 3 Composition API...'
    },
    {
      draft: false,
      featured: false,
      category: 'technology',
      pubDatetime: '2022-12-03T13:20+08:00',
      title: 'GraphQL 与 REST API 的选择与实践',
      slug: 'graphql-vs-rest-api',
      ogImage: 'https://cos.lhasa.icu/ArticlePictures/graphql-vs-rest-api/graphql-vs-rest-api.png',
      tags: ['GraphQL', 'REST', 'API设计'],
      description: '深入对比GraphQL和REST API的优缺点及应用场景...'
    },
    {
      draft: false,
      featured: false,
      category: 'technology',
      pubDatetime: '2021-07-18T15:10+08:00',
      title: 'Webpack 5 模块联邦实战应用',
      slug: 'webpack5-module-federation',
      ogImage: 'https://cos.lhasa.icu/ArticlePictures/webpack5-module-federation/webpack5-module-federation.png',
      tags: ['Webpack', '模块联邦', '微前端'],
      description: '探索Webpack 5模块联邦在微前端架构中的应用...'
    },
    {
      draft: false,
      featured: false,
      category: 'technology',
      pubDatetime: '2020-05-14T10:25+08:00',
      title: 'MongoDB 数据库设计与优化策略',
      slug: 'mongodb-design-optimization',
      ogImage: 'https://cos.lhasa.icu/ArticlePictures/mongodb-design-optimization/mongodb-design-optimization.png',
      tags: ['MongoDB', '数据库', '性能优化'],
      description: 'MongoDB数据库设计原则和性能优化实践经验分享...'
    },

    // 骑行类文章 (sports)
    {
      draft: false,
      featured: true,
      category: 'sports',
      pubDatetime: '2024-08-15T08:30+08:00',
      title: '川藏线骑行攻略：从成都到拉萨的完整指南',
      slug: 'sichuan-tibet-cycling-guide',
      ogImage: 'https://cos.lhasa.icu/ArticlePictures/sichuan-tibet-cycling-guide/sichuan-tibet-cycling-guide.png',
      tags: ['骑行', '川藏线', '旅行攻略'],
      description: '详细的川藏线骑行路线规划、装备准备和注意事项...'
    },
    {
      draft: false,
      featured: false,
      category: 'sports',
      pubDatetime: '2024-06-22T14:15+08:00',
      title: '山地自行车选购指南：新手到进阶',
      slug: 'mountain-bike-buying-guide',
      ogImage: 'https://cos.lhasa.icu/ArticlePictures/mountain-bike-buying-guide/mountain-bike-buying-guide.png',
      tags: ['山地车', '装备选购', '骑行入门'],
      description: '从入门到专业，全面的山地自行车选购建议...'
    },
    {
      draft: false,
      featured: false,
      category: 'sports',
      pubDatetime: '2024-04-10T16:40+08:00',
      title: '环青海湖骑行日记：高原上的挑战与美景',
      slug: 'qinghai-lake-cycling-diary',
      ogImage: 'https://cos.lhasa.icu/ArticlePictures/qinghai-lake-cycling-diary/qinghai-lake-cycling-diary.png',
      tags: ['环湖骑行', '青海湖', '高原骑行'],
      description: '记录环青海湖骑行的美好时光和挑战经历...'
    },
    {
      draft: false,
      featured: false,
      category: 'sports',
      pubDatetime: '2023-11-28T12:20+08:00',
      title: '城市通勤骑行装备推荐与安全指南',
      slug: 'urban-commuting-cycling-guide',
      ogImage: 'https://cos.lhasa.icu/ArticlePictures/urban-commuting-cycling-guide/urban-commuting-cycling-guide.png',
      tags: ['通勤骑行', '城市骑行', '安全装备'],
      description: '城市通勤骑行的装备选择和安全注意事项...'
    },
    {
      draft: false,
      featured: true,
      category: 'sports',
      pubDatetime: '2023-07-05T09:45+08:00',
      title: '新疆独库公路骑行记：天山深处的壮美之旅',
      slug: 'xinjiang-duku-highway-cycling',
      ogImage: 'https://cos.lhasa.icu/ArticlePictures/xinjiang-duku-highway-cycling/xinjiang-duku-highway-cycling.png',
      tags: ['独库公路', '新疆骑行', '长途骑行'],
      description: '穿越天山的独库公路骑行体验和沿途风光记录...'
    },
    {
      draft: false,
      featured: false,
      category: 'sports',
      pubDatetime: '2022-09-16T07:30+08:00',
      title: '骑行训练计划：从零基础到百公里挑战',
      slug: 'cycling-training-plan-100km',
      ogImage: 'https://cos.lhasa.icu/ArticlePictures/cycling-training-plan-100km/cycling-training-plan-100km.png',
      tags: ['骑行训练', '体能提升', '长距离骑行'],
      description: '系统的骑行训练计划，帮助你完成百公里挑战...'
    },
    {
      draft: false,
      featured: false,
      category: 'sports',
      pubDatetime: '2021-03-20T11:15+08:00',
      title: '台湾环岛骑行攻略：宝岛风光无限好',
      slug: 'taiwan-island-cycling-guide',
      ogImage: 'https://cos.lhasa.icu/ArticlePictures/taiwan-island-cycling-guide/taiwan-island-cycling-guide.png',
      tags: ['台湾环岛', '环岛骑行', '台湾旅行'],
      description: '台湾环岛骑行的路线规划和美食美景推荐...'
    },
    {
      draft: false,
      featured: false,
      category: 'sports',
      pubDatetime: '2019-12-08T13:50+08:00',
      title: '冬季骑行指南：寒冷天气下的骑行技巧',
      slug: 'winter-cycling-guide',
      ogImage: 'https://cos.lhasa.icu/ArticlePictures/winter-cycling-guide/winter-cycling-guide.png',
      tags: ['冬季骑行', '保暖装备', '骑行技巧'],
      description: '冬季骑行的保暖技巧和安全注意事项...'
    },

    // 生活类文章 (life)
    {
      draft: false,
      featured: false,
      category: 'life',
      pubDatetime: '2024-08-30T17:05+08:00',
      title: '何为享受：在忙碌生活中寻找内心的宁静',
      slug: 'what-is-enjoyment',
      ogImage: 'https://cos.lhasa.icu/ArticlePictures/what-is-enjoyment/what-is-enjoyment.png',
      tags: ['随笔', '生活感悟', '内心成长'],
      description: '在初入职场时，我们总是被各种事务缠身...'
    },
    {
      draft: false,
      featured: true,
      category: 'life',
      pubDatetime: '2024-07-12T10:20+08:00',
      title: '咖啡文化探索：从豆子到杯中的艺术',
      slug: 'coffee-culture-exploration',
      ogImage: 'https://cos.lhasa.icu/ArticlePictures/coffee-culture-exploration/coffee-culture-exploration.png',
      tags: ['咖啡', '生活方式', '文化'],
      description: '探索咖啡从种植到冲泡的完整过程和文化内涵...'
    },
    {
      draft: false,
      featured: false,
      category: 'life',
      pubDatetime: '2024-05-18T15:30+08:00',
      title: '极简生活的艺术：少即是多的生活哲学',
      slug: 'minimalist-living-art',
      ogImage: 'https://cos.lhasa.icu/ArticlePictures/minimalist-living-art/minimalist-living-art.png',
      tags: ['极简主义', '生活方式', '断舍离'],
      description: '探讨极简生活的理念和实践方法...'
    },
    {
      draft: false,
      featured: false,
      category: 'life',
      pubDatetime: '2024-03-25T14:45+08:00',
      title: '城市漫步：发现身边被忽略的美好',
      slug: 'urban-walking-discovery',
      ogImage: 'https://cos.lhasa.icu/ArticlePictures/urban-walking-discovery/urban-walking-discovery.png',
      tags: ['城市探索', '慢生活', '观察'],
      description: '在熟悉的城市中发现新的风景和故事...'
    },
    {
      draft: false,
      featured: false,
      category: 'life',
      pubDatetime: '2023-12-14T09:10+08:00',
      title: '阅读的力量：书籍如何改变我们的人生',
      slug: 'power-of-reading',
      ogImage: 'https://cos.lhasa.icu/ArticlePictures/power-of-reading/power-of-reading.png',
      tags: ['阅读', '成长', '知识'],
      description: '分享阅读带来的思维转变和人生感悟...'
    },
    {
      draft: false,
      featured: false,
      category: 'life',
      pubDatetime: '2023-09-07T16:25+08:00',
      title: '家庭园艺日记：在阳台上种出小森林',
      slug: 'balcony-gardening-diary',
      ogImage: 'https://cos.lhasa.icu/ArticlePictures/balcony-gardening-diary/balcony-gardening-diary.png',
      tags: ['园艺', '植物', '生活情趣'],
      description: '记录在小小阳台上打造绿色空间的过程...'
    },
    {
      draft: false,
      featured: false,
      category: 'life',
      pubDatetime: '2023-04-22T12:40+08:00',
      title: '料理人生：厨房里的哲学与艺术',
      slug: 'cooking-philosophy-art',
      ogImage: 'https://cos.lhasa.icu/ArticlePictures/cooking-philosophy-art/cooking-philosophy-art.png',
      tags: ['烹饪', '美食', '生活艺术'],
      description: '从烹饪中体悟生活的美好和人生的道理...'
    },
    {
      draft: false,
      featured: true,
      category: 'life',
      pubDatetime: '2022-06-11T08:15+08:00',
      title: '时间管理的智慧：如何过好每一天',
      slug: 'time-management-wisdom',
      ogImage: 'https://cos.lhasa.icu/ArticlePictures/time-management-wisdom/time-management-wisdom.png',
      tags: ['时间管理', '效率', '生活规划'],
      description: '分享有效的时间管理方法和生活规划技巧...'
    },

    // 草稿类文章 (draft)
    {
      draft: true,
      featured: false,
      category: 'draft',
      pubDatetime: '2024-12-01T10:00+08:00',
      title: '人工智能的未来展望（草稿）',
      slug: 'ai-future-prospects-draft',
      ogImage: 'https://cos.lhasa.icu/ArticlePictures/ai-future-prospects-draft/ai-future-prospects-draft.png',
      tags: ['人工智能', '未来科技', '草稿'],
      description: '探讨人工智能技术的发展趋势和未来可能性...'
    },
    {
      draft: true,
      featured: false,
      category: 'draft',
      pubDatetime: '2024-11-15T14:30+08:00',
      title: '西藏自驾游计划（草稿）',
      slug: 'tibet-road-trip-plan-draft',
      ogImage: 'https://cos.lhasa.icu/ArticlePictures/tibet-road-trip-plan-draft/tibet-road-trip-plan-draft.png',
      tags: ['西藏', '自驾游', '旅行计划', '草稿'],
      description: '计划中的西藏自驾游路线和准备事项...'
    },
    {
      draft: true,
      featured: false,
      category: 'draft',
      pubDatetime: '2024-10-20T16:45+08:00',
      title: '摄影技巧分享（草稿）',
      slug: 'photography-tips-draft',
      ogImage: 'https://cos.lhasa.icu/ArticlePictures/photography-tips-draft/photography-tips-draft.png',
      tags: ['摄影', '技巧分享', '草稿'],
      description: '分享一些实用的摄影技巧和心得体会...'
    },
    {
      draft: true,
      featured: false,
      category: 'draft',
      pubDatetime: '2024-09-28T11:20+08:00',
      title: '健康饮食指南（草稿）',
      slug: 'healthy-diet-guide-draft',
      ogImage: 'https://cos.lhasa.icu/ArticlePictures/healthy-diet-guide-draft/healthy-diet-guide-draft.png',
      tags: ['健康', '饮食', '营养', '草稿'],
      description: '关于健康饮食的一些建议和营养搭配方案...'
    },
    {
      draft: true,
      featured: false,
      category: 'draft',
      pubDatetime: '2024-08-05T13:15+08:00',
      title: '学习方法论探讨（草稿）',
      slug: 'learning-methodology-draft',
      ogImage: 'https://cos.lhasa.icu/ArticlePictures/learning-methodology-draft/learning-methodology-draft.png',
      tags: ['学习方法', '效率提升', '草稿'],
      description: '探讨有效的学习方法和知识获取策略...'
    },
    {
      draft: true,
      featured: false,
      category: 'draft',
      pubDatetime: '2024-07-18T15:50+08:00',
      title: '音乐与情感的关系（草稿）',
      slug: 'music-emotion-relationship-draft',
      ogImage: 'https://cos.lhasa.icu/ArticlePictures/music-emotion-relationship-draft/music-emotion-relationship-draft.png',
      tags: ['音乐', '情感', '艺术', '草稿'],
      description: '探索音乐如何影响我们的情感和心理状态...'
    },
    {
      draft: true,
      featured: false,
      category: 'draft',
      pubDatetime: '2024-06-30T09:40+08:00',
      title: '环保生活实践（草稿）',
      slug: 'eco-friendly-living-draft',
      ogImage: 'https://cos.lhasa.icu/ArticlePictures/eco-friendly-living-draft/eco-friendly-living-draft.png',
      tags: ['环保', '可持续发展', '绿色生活', '草稿'],
      description: '分享一些简单易行的环保生活实践方法...'
    },
    {
      draft: true,
      featured: false,
      category: 'draft',
      pubDatetime: '2024-05-12T14:25+08:00',
      title: '职场沟通技巧（草稿）',
      slug: 'workplace-communication-draft',
      ogImage: 'https://cos.lhasa.icu/ArticlePictures/workplace-communication-draft/workplace-communication-draft.png',
      tags: ['职场', '沟通技巧', '人际关系', '草稿'],
      description: '提升职场沟通效果的实用技巧和方法...'
    }
  ]

  // 计算分页信息和当前页数据
  const paginationInfo = useMemo(() => {
    return calculatePagination(articles.length, currentPage)
  }, [articles.length, currentPage])

  const currentPageArticles = useMemo(() => {
    return getPaginatedData(articles, currentPage)
  }, [articles, currentPage])

  // 处理页码变化
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <PageContainer>
      <MainLayout>
        <Header>
          <h1 className="mb-5">lhasa's Blog</h1>
          <YearProgress />
          <Navigation />
        </Header>
        <MainContent>
          {/* 文章列表 */}
          <ArticleList articles={currentPageArticles} showPaginationInfo={false} />
          
          {/* 分页组件 */}
          <div className="mt-8">
            <CustomPagination
              currentPage={paginationInfo.currentPage}
              totalPages={paginationInfo.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </MainContent>
      </MainLayout>
    </PageContainer>
  )
}
 
export default App
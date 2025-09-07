import { useEffect, useState } from "react"
import { themeColors } from "@/lib/colors"

export function YearProgress() {
  const [yearProgress, setYearProgress] = useState(0)

  useEffect(() => {
    const calculateYearProgress = () => {
      const now = new Date()
      const startOfYear = new Date(now.getFullYear(), 0, 1)
      const endOfYear = new Date(now.getFullYear() + 1, 0, 1)
      
      const totalDays = (endOfYear.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)
      const daysPassed = (now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)
      
      const progress = Math.round((daysPassed / totalDays) * 100)
      setYearProgress(progress)
    }

    calculateYearProgress()
    // 每天更新一次
    const interval = setInterval(calculateYearProgress, 24 * 60 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div 
      className="relative group mb-5"
      style={{
        '--progress-bg': themeColors.progressBackground,
        '--progress-fill': themeColors.progressFill
      } as React.CSSProperties}
    >
      <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-[var(--progress-bg)]">
        <div 
          className="h-full transition-all bg-[var(--progress-fill)]" 
          style={{ width: `${yearProgress}%` }}
        />
      </div>
      <span 
        className="absolute top-1/2 left-0 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none text-[var(--progress-fill)] translate-x-2 -translate-y-1/2"
        style={{ left: `${yearProgress}%` }}
      >
        {yearProgress}%
      </span>
    </div>
  )
}
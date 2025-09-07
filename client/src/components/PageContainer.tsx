import { type ReactNode } from "react"
import { themeColors } from "@/lib/colors"

interface PageContainerProps {
  children: ReactNode
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: themeColors.pageBackground }}>
      <div className="flex justify-center py-8">
        {children}
      </div>
    </div>
  )
}
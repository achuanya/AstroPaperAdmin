import { type ReactNode } from "react"
import { themeColors } from "@/lib/colors"

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className="w-full max-w-[768px] shadow-lg py-12 px-16" style={{ backgroundColor: themeColors.cardBackground }}>
      {children}
    </main>
  )
}
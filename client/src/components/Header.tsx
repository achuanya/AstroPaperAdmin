import { type ReactNode } from "react"

interface HeaderProps {
  children: ReactNode
}

export function Header({ children }: HeaderProps) {
  return (
    <header>
      {children}
    </header>
  )
}
import React from "react"

const navItems = [
  { title: "全部", href: "/" },
  { title: "骑行", href: "/cycling" },
  { title: "生活", href: "/life" },
  { title: "技术", href: "/tech" },
  { title: "链接", href: "/links" },
  { title: "关于", href: "/about" },
  { title: "标签", href: "/tags" },
  { title: "归档", href: "/archive" },
  { title: "搜索", href: "/search" },
]

export function Navigation() {
  return (
    <nav className="flex justify-start w-full mb-5">
      <div className="flex gap-4">
        {navItems.map((item) => (
          <a
            key={item.title}
            href={item.href}
            className="text-sm font-medium text-foreground no-underline"
          >
            {item.title}
          </a>
        ))}
      </div>
    </nav>
  )
}
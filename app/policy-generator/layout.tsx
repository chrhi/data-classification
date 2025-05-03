import type React from "react"
export default function PolicyGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="flex-1 overflow-auto">{children}</div>
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  BarChart3,
  ClipboardList,
  FileText,
  Settings,
  Shield,
  Users,
  Menu,
  Home,
  BookOpen,
  AlertCircle,
  ChevronDown,
} from "lucide-react"

interface SideMenuProps {
  className?: string
}

export function SideMenu({ className }: SideMenuProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [policiesOpen, setPoliciesOpen] = useState(true)
  const [assessmentsOpen, setAssessmentsOpen] = useState(true)

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Assessments",
      icon: ClipboardList,
      href: "#",
      active: pathname === "/assessments" || pathname === "/assessments/new",
      isDropdown: true,
      isOpen: assessmentsOpen,
      toggle: () => setAssessmentsOpen(!assessmentsOpen),
      children: [
        {
          label: "All Assessments",
          href: "/assessments",
          active: pathname === "/assessments",
        },
        {
          label: "New Assessment",
          href: "/assessments/new",
          active: pathname === "/assessments/new",
        },
        {
          label: "Templates",
          href: "/assessments/templates",
          active: pathname === "/assessments/templates",
        },
      ],
    },
    {
      label: "Policies",
      icon: FileText,
      href: "#",
      active: pathname === "/policies" || pathname === "/policies/templates",
      isDropdown: true,
      isOpen: policiesOpen,
      toggle: () => setPoliciesOpen(!policiesOpen),
      children: [
        {
          label: "My Policies",
          href: "/policies",
          active: pathname === "/policies",
        },
        {
          label: "Templates",
          href: "/policies/templates",
          active: pathname === "/policies/templates",
        },
        {
          label: "Policy Builder",
          href: "/policies/builder",
          active: pathname === "/policies/builder",
        },
      ],
    },
    {
      label: "Compliance",
      icon: Shield,
      href: "/compliance",
      active: pathname === "/compliance",
    },
    {
      label: "Reports",
      icon: BarChart3,
      href: "/reports",
      active: pathname === "/reports",
    },
    {
      label: "Users & Teams",
      icon: Users,
      href: "/users",
      active: pathname === "/users",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
      active: pathname === "/settings",
    },
  ]

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <MobileNav routes={routes} setOpen={setOpen} />
        </SheetContent>
      </Sheet>
      <div className={cn("hidden border-r bg-background md:block", className)}>
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center border-b px-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Shield className="h-6 w-6" />
              <span>DataClassify</span>
            </Link>
          </div>
          <ScrollArea className="flex-1 py-2">
            <nav className="grid gap-1 px-2">
              {routes.map((route, i) =>
                route.isDropdown ? (
                  <div key={i} className="space-y-1">
                    <Button
                      variant={route.active ? "secondary" : "ghost"}
                      className="w-full justify-between"
                      onClick={route.toggle}
                    >
                      <div className="flex items-center">
                        <route.icon className="mr-2 h-4 w-4" />
                        {route.label}
                      </div>
                      <ChevronDown className={cn("h-4 w-4 transition-transform", route.isOpen ? "rotate-180" : "")} />
                    </Button>
                    {route.isOpen && (
                      <div className="ml-6 space-y-1">
                        {route.children.map((child, j) => (
                          <Button
                            key={j}
                            variant={child.active ? "secondary" : "ghost"}
                            className="w-full justify-start"
                            asChild
                          >
                            <Link href={child.href}>{child.label}</Link>
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Button
                    key={i}
                    variant={route.active ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href={route.href}>
                      <route.icon className="mr-2 h-4 w-4" />
                      {route.label}
                    </Link>
                  </Button>
                ),
              )}
            </nav>
          </ScrollArea>
          <div className="border-t p-4">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary/10 p-1">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div className="grid gap-0.5 text-sm">
                <p className="font-medium">Need help?</p>
                <p className="text-muted-foreground">Check our documentation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function MobileNav({ routes, setOpen }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold" onClick={() => setOpen(false)}>
          <Shield className="h-6 w-6" />
          <span>DataClassify</span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <nav className="grid gap-1 p-2">
          {routes.map((route, i) =>
            route.isDropdown ? (
              <div key={i} className="space-y-1">
                <Button
                  variant={route.active ? "secondary" : "ghost"}
                  className="w-full justify-between"
                  onClick={route.toggle}
                >
                  <div className="flex items-center">
                    <route.icon className="mr-2 h-4 w-4" />
                    {route.label}
                  </div>
                  <ChevronDown className={cn("h-4 w-4 transition-transform", route.isOpen ? "rotate-180" : "")} />
                </Button>
                {route.isOpen && (
                  <div className="ml-6 space-y-1">
                    {route.children.map((child, j) => (
                      <Button
                        key={j}
                        variant={child.active ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        asChild
                        onClick={() => setOpen(false)}
                      >
                        <Link href={child.href}>{child.label}</Link>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Button
                key={i}
                variant={route.active ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
                onClick={() => setOpen(false)}
              >
                <Link href={route.href}>
                  <route.icon className="mr-2 h-4 w-4" />
                  {route.label}
                </Link>
              </Button>
            ),
          )}
        </nav>
      </ScrollArea>
      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-primary/10 p-1">
            <AlertCircle className="h-5 w-5 text-primary" />
          </div>
          <div className="grid gap-0.5 text-sm">
            <p className="font-medium">Need help?</p>
            <p className="text-muted-foreground">Check our documentation</p>
          </div>
        </div>
      </div>
    </div>
  )
}

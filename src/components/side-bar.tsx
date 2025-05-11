"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, FileText, FolderKanban, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/", icon: <Home className="w-5 h-5" /> },
    {
      name: "Policies",
      path: "/policies",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      name: "Projects",
      path: "/projects",
      icon: <FolderKanban className="w-5 h-5" />,
    },
    { name: "Account", path: "/account", icon: <User className="w-5 h-5" /> },
  ];

  return (
    <aside className="fixed h-full w-[250px] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-sm">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-800">
        <span className="text-2xl font-bold text-blue-600 font-poppins">
          Logo
        </span>
      </div>

      {/* Navigation */}
      <nav className="px-4 py-6">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={cn(
                    "flex items-center h-12 px-4 rounded-lg font-poppins font-medium text-gray-700 dark:text-gray-300",
                    "hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200",
                    isActive &&
                      "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  )}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-5 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Account Section */}
      <div className="absolute bottom-0 w-full px-4 py-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3 px-4">
          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </div>
          <div className="font-poppins">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              User Name
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              user@example.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart4,
  FileText,
  FolderKanban,
  ArrowUpRight,
  Calendar,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function OverviewPage() {
  // Sample data for area chart
  const chartData = [
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 5000 },
    { name: "Apr", value: 2780 },
    { name: "May", value: 1890 },
    { name: "Jun", value: 2390 },
    { name: "Jul", value: 3490 },
  ];

  // Sample data for recent projects
  const recentProjects = [
    {
      id: 1,
      name: "Data Classification Framework",
      status: "In Progress",
      date: "May 10, 2025",
      progress: 75,
    },
    {
      id: 2,
      name: "Security Audit",
      status: "Completed",
      date: "May 5, 2025",
      progress: 100,
    },
    {
      id: 3,
      name: "Policy Review",
      status: "Pending",
      date: "May 15, 2025",
      progress: 0,
    },
    {
      id: 4,
      name: "Compliance Check",
      status: "In Progress",
      date: "May 8, 2025",
      progress: 45,
    },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Overview
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Dashboard summary and key metrics
          </p>
        </div>
        <Button className="mt-4 md:mt-0" size="sm">
          <BarChart4 className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Projects
              </p>
              <div className="flex items-baseline">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  12
                </h3>
                <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span className="text-xs">24%</span>
                </Badge>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                4 active, 8 completed
              </p>
            </div>
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <FolderKanban className="h-6 w-6 text-blue-600 dark:text-blue-300" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Policies
              </p>
              <div className="flex items-baseline">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  26
                </h3>
                <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span className="text-xs">8%</span>
                </Badge>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                18 active, 8 in review
              </p>
            </div>
            <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
              <FileText className="h-6 w-6 text-purple-600 dark:text-purple-300" />
            </div>
          </CardContent>
        </Card>

        <Card className="sm:col-span-2 lg:col-span-1">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Next Deadline
              </p>
              <div className="flex items-baseline">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  May 15
                </h3>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Policy Review due in 4 days
              </p>
            </div>
            <div className="h-12 w-12 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
              <Calendar className="h-6 w-6 text-amber-600 dark:text-amber-300" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Area Chart */}
        <Card className="w-full overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Project Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="px-2 pb-2">
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    fill="#93c5fd"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Projects */}
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              Recent Projects
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-blue-600 dark:text-blue-400"
            >
              View all
            </Button>
          </CardHeader>
          <CardContent className="px-0">
            <ScrollArea className="h-64 sm:h-80">
              {recentProjects.map((project, index) => (
                <div key={project.id}>
                  <div className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <div className="flex flex-col">
                      <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">
                        {project.name}
                      </h4>
                      <div className="flex items-center mt-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {project.date}
                        </p>
                        <Badge
                          variant="outline"
                          className={`ml-2 ${
                            project.status === "Completed"
                              ? "border-green-500 text-green-600 dark:text-green-400"
                              : project.status === "In Progress"
                              ? "border-blue-500 text-blue-600 dark:text-blue-400"
                              : "border-amber-500 text-amber-600 dark:text-amber-400"
                          }`}
                        >
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          project.status === "Completed"
                            ? "bg-green-500"
                            : project.status === "In Progress"
                            ? "bg-blue-500"
                            : "bg-amber-500"
                        }`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  {index < recentProjects.length - 1 && <Separator />}
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

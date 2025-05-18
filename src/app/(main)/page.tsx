"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  Users,
  CheckCircle,
  Archive,
  Clock,
  BarChart2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AnalyticsPage() {
  // Sample data for project status distribution
  const projectStatusData = [
    { name: "Active", value: 32, color: "#10b981" },
    { name: "Completed", value: 18, color: "#047857" },
    { name: "Archived", value: 7, color: "#d1fae5" },
  ];

  // Sample data for project creation over time
  const projectCreationData = [
    { month: "Jan", count: 5 },
    { month: "Feb", count: 7 },
    { month: "Mar", count: 10 },
    { month: "Apr", count: 8 },
    { month: "May", count: 12 },
  ];

  // Sample data for user activity
  const userActivityData = [
    { month: "Jan", newUsers: 8, activeUsers: 12 },
    { month: "Feb", newUsers: 5, activeUsers: 15 },
    { month: "Mar", newUsers: 7, activeUsers: 20 },
    { month: "Apr", newUsers: 10, activeUsers: 25 },
    { month: "May", newUsers: 12, activeUsers: 30 },
  ];

  // Sample data for recent active users
  const recentActiveUsers = [
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex@example.com",
      projects: 5,
      lastActive: "Today, 10:30 AM",
      profileImage: null,
    },
    {
      id: "2",
      name: "Sarah Williams",
      email: "sarah@example.com",
      projects: 8,
      lastActive: "Today, 09:15 AM",
      profileImage: null,
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael@example.com",
      projects: 3,
      lastActive: "Yesterday, 4:45 PM",
      profileImage: null,
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@example.com",
      projects: 6,
      lastActive: "Yesterday, 2:30 PM",
      profileImage: null,
    },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Analytics Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Monitor project activity and user engagement
          </p>
        </div>
        <Button
          className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700"
          size="sm"
        >
          <BarChart2 className="mr-2 h-4 w-4" />
          Export Analytics
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="border-l-4 border-green-500">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Projects
              </p>
              <div className="flex items-baseline">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  57
                </h3>
              </div>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                +12% from last month
              </p>
            </div>
            <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <Activity className="h-6 w-6 text-green-600 dark:text-green-300" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-green-500">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Active Users
              </p>
              <div className="flex items-baseline">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  124
                </h3>
              </div>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                +18% from last month
              </p>
            </div>
            <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-green-600 dark:text-green-300" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-green-500">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Completed Projects
              </p>
              <div className="flex items-baseline">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  18
                </h3>
              </div>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                +5 in last month
              </p>
            </div>
            <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-300" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-green-500">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Archived Projects
              </p>
              <div className="flex items-baseline">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  7
                </h3>
              </div>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                +2 in last month
              </p>
            </div>
            <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <Archive className="h-6 w-6 text-green-600 dark:text-green-300" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Project Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Project Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={projectStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {projectStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [value, name]}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      borderColor: "#d1d5db",
                      borderRadius: "0.375rem",
                      boxShadow:
                        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Project Creation Over Time */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Project Creation Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={projectCreationData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      borderColor: "#d1d5db",
                      borderRadius: "0.375rem",
                      boxShadow:
                        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#10b981"
                    fill="#d1fae5"
                    name="Projects"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Activity and Recent Active Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-900 dark:text-gray-100">
              User Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={userActivityData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      borderColor: "#d1d5db",
                      borderRadius: "0.375rem",
                      boxShadow:
                        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="newUsers" name="New Users" fill="#10b981" />
                  <Bar
                    dataKey="activeUsers"
                    name="Active Users"
                    fill="#059669"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Active Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Recent Active Users
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="text-xs text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700 dark:text-green-400 dark:border-green-800 dark:hover:bg-green-900"
            >
              View all
            </Button>
          </CardHeader>
          <CardContent className="px-0">
            <ScrollArea className="h-64 sm:h-72">
              {recentActiveUsers.map((user, index) => (
                <div key={user.id}>
                  <div className="flex items-center justify-between px-6 py-3 hover:bg-green-50 dark:hover:bg-green-900/20">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-green-200 dark:bg-green-800 flex items-center justify-center text-green-700 dark:text-green-300 mr-3">
                        {user.profileImage ? (
                          <img
                            src={user.profileImage}
                            alt={user.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <span className="font-medium">
                            {user.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">
                          {user.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        {user.projects} Projects
                      </Badge>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                        <Clock className="h-3 w-3 mr-1" /> {user.lastActive}
                      </p>
                    </div>
                  </div>
                  {index < recentActiveUsers.length - 1 && <Separator />}
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

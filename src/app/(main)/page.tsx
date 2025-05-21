"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  ActivitySquare,
  Users,
  FileText,
  TrendingUp,
  MoreHorizontal,
  Calendar,
} from "lucide-react";

// Mock data for the dashboard
const policyData = [
  { month: "Jan", policies: 12 },
  { month: "Feb", policies: 19 },
  { month: "Mar", policies: 15 },
  { month: "Apr", policies: 28 },
  { month: "May", policies: 24 },
  { month: "Jun", policies: 32 },
];

const organizationsData = [
  {
    id: 1,
    name: "Sonatrach",
    status: "Active",
    date: "12 May 2025",
    logo: "🏢",
  },
  {
    id: 2,
    name: "First Step Solutions",
    status: "Pending",
    date: "10 May 2025",
    logo: "🚀",
  },
  {
    id: 3,
    name: "Algiers Tech",
    status: "Active",
    date: "5 May 2025",
    logo: "💻",
  },
  {
    id: 4,
    name: "Oran Medical Group",
    status: "Inactive",
    date: "30 Apr 2025",
    logo: "🏥",
  },
  {
    id: 5,
    name: "Constantine Energy",
    status: "Active",
    date: "28 Apr 2025",
    logo: "⚡",
  },
];

export default function Dashboard() {
  const totalPolicies = policyData.reduce(
    (sum, item) => sum + item.policies,
    0
  );
  const activeOrgs = organizationsData.filter(
    (org) => org.status === "Active"
  ).length;
  const pendingOrgs = organizationsData.filter(
    (org) => org.status === "Pending"
  ).length;

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome to your dashboard
            </h2>
            <p className="text-gray-500 mt-1">
              Here&apos;s what&apos;s happening with your policies today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Today: May 21, 2025</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Policies
                </p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {totalPolicies}
                </h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-md">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Active Organizations
                </p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {activeOrgs}
                </h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-md">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Pending Organizations
                </p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {pendingOrgs}
                </h3>
              </div>
              <div className="bg-amber-100 p-3 rounded-md">
                <ActivitySquare className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Compliance Rate
                </p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">94%</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-md">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm h-96">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800">
                Generated Policies
              </h3>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={policyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "6px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar dataKey="policies" fill="#792a9f" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Organizations */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm h-96">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800">
                Recent Organizations
              </h3>
              <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                View All
              </button>
            </div>
            <div className="overflow-y-auto max-h-[300px] pr-2">
              {organizationsData.map((org) => (
                <div
                  key={org.id}
                  className="border border-gray-200 rounded-lg p-4 mb-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">{org.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`inline-block w-2 h-2 rounded-full ${
                            org.status === "Active"
                              ? "bg-green-500"
                              : org.status === "Pending"
                              ? "bg-amber-500"
                              : "bg-gray-400"
                          }`}
                        />
                        <span className="text-xs text-gray-500">
                          {org.status} • Added {org.date}
                        </span>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

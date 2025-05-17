"use client";

import { useQuery } from "@tanstack/react-query";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { getAllProjectsAction } from "@/actions/project";
import { Loader2, RefreshCw } from "lucide-react";
import CreateProject from "@/components/modals/create-project";
import { useState } from "react";
import { toast } from "react-hot-toast";
// import {type Project } from "@/types/index"

interface PageViewProjectsProps {
  userId: string; // You'll need to pass the current user's ID
}

export default function PageViewProjects({ userId }: PageViewProjectsProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  // React Query to fetch projects
  const {
    data: projectsResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["projects", userId],
    queryFn: async () => {
      const result = await getAllProjectsAction(userId);
      if (!result.success) {
        throw new Error(result.error || "Failed to fetch projects");
      }
      return result.data;
    },
    enabled: !!userId, // Only run query if userId is provided
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  });

  // Handle manual refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
      toast.success("Projects refreshed successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to refresh projects");
    } finally {
      setIsRefreshing(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full min-h-screen h-fit flex flex-col p-8">
        <div className="w-full h-[100px] flex items-center justify-between">
          <h2 className="font-bold text-2xl">Projects</h2>
        </div>
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="w-full min-h-screen h-fit flex flex-col p-8">
        <div className="w-full h-[100px] flex items-center justify-between">
          <h2 className="font-bold text-2xl">Projects</h2>
        </div>
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4 max-w-md text-center">
            <div className="text-red-500">
              <svg
                className="h-12 w-12 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.924-.833-2.464 0l-5.898 12.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Failed to load projects</h3>
            <p className="text-muted-foreground">
              {error instanceof Error
                ? error.message
                : "An unexpected error occurred"}
            </p>
            <Button onClick={handleRefresh} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Success state with data
  const projects = projectsResponse || [];

  return (
    <div className="w-full min-h-screen h-fit flex flex-col p-8">
      <div className="w-full h-[100px] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="font-bold text-2xl">Projects</h2>
          <span className="text-sm text-muted-foreground">
            ({projects.length} {projects.length === 1 ? "project" : "projects"})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="gap-2"
          >
            <RefreshCw
              className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <CreateProject userId={userId} />
        </div>
      </div>

      {/* Empty state */}
      {projects.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4 max-w-md text-center">
            <div className="text-muted-foreground">
              <svg
                className="h-16 w-16 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">No projects yet</h3>
            <p className="text-muted-foreground">
              Get started by creating your first project. Organize your work and
              track your progress.
            </p>
            <CreateProject
              userId={userId}
              triggerText="Create your first project"
            />
          </div>
        </div>
      ) : (
        /* Data table */
        <DataTable columns={columns} data={projects} />
      )}
    </div>
  );
}

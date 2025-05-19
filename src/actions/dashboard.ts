"use server";

import { db } from "@/lib/db";
import { getCurrentUserAction } from "@/actions/user";

// Get user's basic statistics
export async function getUserAnalytics() {
  try {
    const { success, user, error } = await getCurrentUserAction();

    if (!success || !user) {
      throw new Error(error || "Authentication failed");
    }

    // Get user's organizations with step completion status
    const organizations = await db.organization.findMany({
      where: { ownerId: user.id },
      include: {
        firstStep: true,
        secondStep: true,
        thirdStep: true,
        fourthStep: true,
      },
    });

    // Calculate completion statistics
    const totalOrganizations = organizations.length;
    const completedSteps = organizations.reduce((acc, org) => {
      let stepsCompleted = 0;
      if (org.firstStep) stepsCompleted++;
      if (org.secondStep) stepsCompleted++;
      if (org.thirdStep) stepsCompleted++;
      if (org.fourthStep) stepsCompleted++;
      return acc + stepsCompleted;
    }, 0);

    const totalPossibleSteps = totalOrganizations * 4;
    const completionRate =
      totalPossibleSteps > 0 ? (completedSteps / totalPossibleSteps) * 100 : 0;

    // Status breakdown
    const statusBreakdown = organizations.reduce((acc, org) => {
      acc[org.status] = (acc[org.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      success: true,
      data: {
        totalOrganizations,
        completedSteps,
        totalPossibleSteps,
        completionRate: Math.round(completionRate),
        statusBreakdown,
        recentOrganizations: organizations
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 5)
          .map((org) => ({
            id: org.id,
            title: org.title,
            status: org.status,
            createdAt: org.createdAt,
            stepsCompleted: [
              org.firstStep,
              org.secondStep,
              org.thirdStep,
              org.fourthStep,
            ].filter(Boolean).length,
          })),
      },
      error: null,
    };
  } catch (error) {
    console.error("Error fetching user analytics:", error);
    return {
      success: false,
      data: null,
      error:
        error instanceof Error ? error.message : "Failed to fetch analytics",
    };
  }
}

// Get organization progress over time (last 30 days)
export async function getOrganizationProgress() {
  try {
    const { success, user, error } = await getCurrentUserAction();

    if (!success || !user) {
      throw new Error(error || "Authentication failed");
    }

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const organizations = await db.organization.findMany({
      where: {
        ownerId: user.id,
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      orderBy: { createdAt: "asc" },
    });

    // Group by day
    const dailyProgress = organizations.reduce((acc, org) => {
      const day = org.createdAt.toISOString().split("T")[0];
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      success: true,
      data: Object.entries(dailyProgress).map(([date, count]) => ({
        date,
        count,
      })),
      error: null,
    };
  } catch (error) {
    console.error("Error fetching organization progress:", error);
    return {
      success: false,
      data: null,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch organization progress",
    };
  }
}

// Get step completion statistics
export async function getStepCompletionStats() {
  try {
    const { success, user, error } = await getCurrentUserAction();

    if (!success || !user) {
      throw new Error(error || "Authentication failed");
    }

    const organizations = await db.organization.findMany({
      where: { ownerId: user.id },
      include: {
        firstStep: true,
        secondStep: true,
        thirdStep: true,
        fourthStep: true,
      },
    });

    const stepStats = {
      firstStep: 0,
      secondStep: 0,
      thirdStep: 0,
      fourthStep: 0,
    };

    organizations.forEach((org) => {
      if (org.firstStep) stepStats.firstStep++;
      if (org.secondStep) stepStats.secondStep++;
      if (org.thirdStep) stepStats.thirdStep++;
      if (org.fourthStep) stepStats.fourthStep++;
    });

    const total = organizations.length;

    return {
      success: true,
      data: {
        steps: [
          {
            name: "Step 1",
            completed: stepStats.firstStep,
            percentage:
              total > 0 ? Math.round((stepStats.firstStep / total) * 100) : 0,
          },
          {
            name: "Step 2",
            completed: stepStats.secondStep,
            percentage:
              total > 0 ? Math.round((stepStats.secondStep / total) * 100) : 0,
          },
          {
            name: "Step 3",
            completed: stepStats.thirdStep,
            percentage:
              total > 0 ? Math.round((stepStats.thirdStep / total) * 100) : 0,
          },
          {
            name: "Step 4",
            completed: stepStats.fourthStep,
            percentage:
              total > 0 ? Math.round((stepStats.fourthStep / total) * 100) : 0,
          },
        ],
        totalOrganizations: total,
      },
      error: null,
    };
  } catch (error) {
    console.error("Error fetching step completion stats:", error);
    return {
      success: false,
      data: null,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch step completion stats",
    };
  }
}

// Get monthly organization creation trend (last 6 months)
export async function getMonthlyCreationTrend() {
  try {
    const { success, user, error } = await getCurrentUserAction();

    if (!success || !user) {
      throw new Error(error || "Authentication failed");
    }

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const organizations = await db.organization.findMany({
      where: {
        ownerId: user.id,
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
      orderBy: { createdAt: "asc" },
    });

    // Group by month
    const monthlyData = organizations.reduce((acc, org) => {
      const month = org.createdAt.toISOString().substring(0, 7); // YYYY-MM
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Fill in missing months with 0
    const result = [];
    const currentDate = new Date(sixMonthsAgo);
    while (currentDate <= new Date()) {
      const monthKey = currentDate.toISOString().substring(0, 7);
      result.push({
        month: monthKey,
        count: monthlyData[monthKey] || 0,
        monthName: currentDate.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        }),
      });
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return {
      success: true,
      data: result,
      error: null,
    };
  } catch (error) {
    console.error("Error fetching monthly creation trend:", error);
    return {
      success: false,
      data: null,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch monthly creation trend",
    };
  }
}

// Get organization completion rate details
export async function getOrganizationCompletionDetails() {
  try {
    const { success, user, error } = await getCurrentUserAction();

    if (!success || !user) {
      throw new Error(error || "Authentication failed");
    }

    const organizations = await db.organization.findMany({
      where: { ownerId: user.id },
      include: {
        firstStep: true,
        secondStep: true,
        thirdStep: true,
        fourthStep: true,
      },
      orderBy: { updatedAt: "desc" },
    });

    const completionDetails = organizations.map((org) => {
      const stepsCompleted = [
        org.firstStep,
        org.secondStep,
        org.thirdStep,
        org.fourthStep,
      ].filter(Boolean).length;

      return {
        id: org.id,
        title: org.title,
        status: org.status,
        stepsCompleted,
        completionPercentage: Math.round((stepsCompleted / 4) * 100),
        createdAt: org.createdAt,
        updatedAt: org.updatedAt,
        isComplete: stepsCompleted === 4,
      };
    });

    const fullyCompleted = completionDetails.filter(
      (org) => org.isComplete
    ).length;
    const partiallyCompleted = completionDetails.filter(
      (org) => org.stepsCompleted > 0 && !org.isComplete
    ).length;
    const notStarted = completionDetails.filter(
      (org) => org.stepsCompleted === 0
    ).length;

    return {
      success: true,
      data: {
        organizations: completionDetails,
        summary: {
          fullyCompleted,
          partiallyCompleted,
          notStarted,
          total: organizations.length,
        },
      },
      error: null,
    };
  } catch (error) {
    console.error("Error fetching organization completion details:", error);
    return {
      success: false,
      data: null,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch organization completion details",
    };
  }
}

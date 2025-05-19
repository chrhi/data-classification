// import { Suspense } from "react";
// import {
//   getUserAnalytics,
//   getOrganizationProgress,
//   getStepCompletionStats,
//   getMonthlyCreationTrend,
//   getOrganizationCompletionDetails,
// } from "@/actions/dashboard"; // Adjust import path as needed
// import AnalyticsDashboard from "@/components/AnalyticsDashboard"; // Client component
// import AnalyticsSkeletonLoader from "@/components/skeleton-loader";

// // Server component that fetches all analytics data
// async function AnalyticsData() {
//   try {
//     // Fetch all analytics data in parallel
//     const [
//       userAnalytics,
//       organizationProgress,
//       stepCompletionStats,
//       monthlyTrend,
//       completionDetails,
//     ] = await Promise.all([
//       getUserAnalytics(),
//       getOrganizationProgress(),
//       getStepCompletionStats(),
//       getMonthlyCreationTrend(),
//       getOrganizationCompletionDetails(),
//     ]);

//     // Check if any of the requests failed
//     const hasErrors = [
//       userAnalytics,
//       organizationProgress,
//       stepCompletionStats,
//       monthlyTrend,
//       completionDetails,
//     ].some((result) => !result.success);

//     if (hasErrors) {
//       // Handle authentication errors or other failures
//       const errorMessage =
//         [
//           userAnalytics,
//           organizationProgress,
//           stepCompletionStats,
//           monthlyTrend,
//           completionDetails,
//         ].find((result) => !result.success)?.error ||
//         "Failed to fetch analytics data";

//       return (
//         <div className="flex items-center justify-center min-h-96">
//           <div className="text-center">
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">
//               Unable to Load Analytics
//             </h2>
//             <p className="text-gray-600 mb-4">{errorMessage}</p>
//             <button
//               onClick={() => window.location.reload()}
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       );
//     }

//     // Pass successful data to client component
//     const analyticsData = {
//       userAnalytics: userAnalytics.data,
//       organizationProgress: organizationProgress.data,
//       stepCompletionStats: stepCompletionStats.data,
//       monthlyTrend: monthlyTrend.data,
//       completionDetails: completionDetails.data,
//     };

//     return (
//       <AnalyticsDashboard
//         //@ts-expect-error this is not a type
//         data={analyticsData}
//       />
//     );
//   } catch (error) {
//     console.error("Error in AnalyticsData component:", error);
//     return (
//       <div className="flex items-center justify-center min-h-96">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">
//             Something went wrong
//           </h2>
//           <p className="text-gray-600 mb-4">
//             We encountered an error while loading your analytics data.
//           </p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Refresh Page
//           </button>
//         </div>
//       </div>
//     );
//   }
// }

// export default async function Page() {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">
//           Analytics Dashboard
//         </h1>
//         <p className="text-gray-600">
//           Track your organization progress and completion statistics
//         </p>
//       </div>

//       <Suspense fallback={<AnalyticsSkeletonLoader />}>
//         <AnalyticsData />
//       </Suspense>
//     </div>
//   );
// }

// interface pageProps {}

export default function page() {
  return (
    <div>
      <h2>i had an issues on this component i will fix it </h2>
    </div>
  );
}

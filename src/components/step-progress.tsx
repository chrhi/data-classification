"use client";

// import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: 1,
    name: "Organization",
    description: "Understand organization & stakeholders",
    path: "step1",
  },
  {
    id: 2,
    name: "Data Landscape",
    description: "Identify data types and sensitivity",
    path: "step2",
  },
  {
    id: 3,
    name: "Classification",
    description: "Define classification levels",
    path: "step3",
  },
  {
    id: 4,
    name: "Access Controls",
    description: "Set security measures",
    path: "step4",
  },
];

export function ProgressSteps({ projectId }: { projectId: string }) {
  console.log(projectId);
  const pathname = usePathname();
  const currentStep =
    steps.find((step) => pathname.includes(step.path))?.id || 1;
  const totalSteps = steps.length;

  return (
    <div className="relative py-8 px-4 bg-white mt-8 mb-2 rounded-xl shadow-sm border border-purple-100 mx-6">
      {/* Progress Line with animated gradient */}
      <div className="absolute top-[3.25rem] left-0 w-full h-2 bg-gray-200 rounded-full mx-auto px-8">
        <div
          className="h-full bg-gradient-to-r from-purple-400 via-violet-500 to-fuchsia-500 rounded-full shadow-lg transition-all duration-500 ease-out"
          style={{
            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
          }}
        >
          <div className="absolute right-0 -top-1 w-4 h-4 rounded-full bg-white shadow-md border-2 border-violet-500 transition-all duration-500"></div>
        </div>
      </div>

      {/* Step Circles */}
      <div className="flex justify-between relative z-10 px-6">
        {steps.map((step) => (
          <div
            key={step.id}
            // href={`/projects/${projectId}/${step.path}`}
            className="flex flex-col items-center group"
          >
            <div
              className={cn(
                "flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 transform",
                currentStep === step.id
                  ? "border-[#792a9f] bg-[#792a9f] text-white scale-110 shadow-lg"
                  : currentStep > step.id
                  ? "border-violet-500 bg-violet-500 text-white shadow-md"
                  : "border-gray-300 bg-white text-gray-500 shadow-sm"
              )}
            >
              {currentStep > step.id ? (
                <CheckCircle className="h-6 w-6" />
              ) : (
                <span className="text-base font-bold">{step.id}</span>
              )}
            </div>
            <span
              className={cn(
                "mt-3 text-sm font-semibold transition-all duration-300",
                currentStep === step.id
                  ? "text-[#792a9f] scale-105"
                  : "text-gray-600"
              )}
            >
              {step.name}
            </span>
            <span
              className={cn(
                "text-xs max-w-[120px] text-center transition-all duration-300",
                currentStep === step.id ? "text-[#792a9f]" : "text-gray-500",
                "hidden md:block mt-1"
              )}
            >
              {step.description}
            </span>
            {/* Step connecting line animation */}
            <div
              className={cn(
                "absolute h-0.5 top-6 -z-10 transition-all duration-300",
                step.id < totalSteps ? "block" : "hidden",
                step.id < currentStep ? "bg-violet-500" : "bg-gray-200"
              )}
              style={{
                width: "calc(100% - 120px)",
                left: step.id === 1 ? "60px" : "auto",
                right: step.id === totalSteps ? "60px" : "auto",
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

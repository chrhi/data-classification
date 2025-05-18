/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormSchema } from "@/types/form-types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ChevronLeft, ChevronRight, FileText, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Step1Context } from "./steps/step1-context";
import { Step2Inventory } from "./steps/step2-inventory";
import { Step3Classification } from "./steps/step3-classification";
import { Step4Generate } from "./steps/step4-generate";
import { cn } from "@/lib/utils";

export function PolicyGenerator() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const form = useForm<FormSchema>({
    // We'll need to fix the resolver implementation
    defaultValues: {
      objective: "",
      stakeholders: [],
      businessProcesses: [],
      dataTypes: [],
      departments: [],
      hasDataInventory: null,
      dataInventoryLink: "",
      needsGuidance: null,
      dataValueAssessment: [],
      businessImpacts: {},
      sensitivityLevels: [],
      customClassification: {
        public: {
          name: "Public",
          description: "Information that can be freely shared with the public",
          examples: "Marketing materials, public website content",
        },
        internal: {
          name: "Internal",
          description: "Information for internal use only",
          examples: "Internal announcements, non-sensitive procedures",
        },
        confidential: {
          name: "Confidential",
          description: "Sensitive information with restricted access",
          examples: "HR records, financial data, customer information",
        },
        restricted: {
          name: "Restricted",
          description:
            "Highly sensitive information with strict access controls",
          examples: "Trade secrets, security infrastructure details",
        },
      },
      organizationName: "",
      version: "1.0",
      approvalRoles: [],
    },
  });

  const stepFields = [
    [
      "objective",
      "stakeholders",
      "businessProcesses",
      "dataTypes",
      "departments",
    ],
    ["hasDataInventory", "dataInventoryLink", "needsGuidance"],
    [
      "dataValueAssessment",
      "businessImpacts",
      "sensitivityLevels",
      "customClassification",
    ],
    ["organizationName", "version", "approvalRoles"],
  ];

  const steps = [
    {
      id: 1,
      name: "Context",
      description: "Define your policy context and objectives",
      component: <Step1Context form={form} />,
      title: "Define Context and Objectives",
    },
    {
      id: 2,
      name: "Inventory",
      description: "Document your data assets",
      component: <Step2Inventory form={form} />,
      title: "Data Inventory & Discovery",
    },
    {
      id: 3,
      name: "Classification",
      description: "Set up your classification system",
      component: <Step3Classification form={form} />,
      title: "Classification Criteria",
    },
    {
      id: 4,
      name: "Generate",
      description: "Create your finalized policy",
      component: <Step4Generate form={form} />,
      title: "Generate Policy",
    },
  ];

  async function onNext() {
    const fields = stepFields[currentStep - 1];
    // Handle validation
    const isValid = await form.trigger(fields as any);

    if (isValid && currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  }

  function onPrevious() {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  }

  function onSubmit(values: FormSchema) {
    console.log("Form Submission:", JSON.stringify(values, null, 2));
    // Here you would typically send the data to your backend
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-center">
          Data Classification Policy Generator
        </h1>
        <p className="text-center text-muted-foreground">
          Create a comprehensive data classification policy in 4 simple steps
        </p>
      </div>

      {/* Enhanced Progress Steps */}
      <div className="relative py-8 px-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-sm border border-green-100">
        {/* Progress Line with animated gradient */}
        <div className="absolute top-[3.25rem] left-0 w-full h-2 bg-gray-200 rounded-full mx-auto px-8">
          <div
            className="h-full bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 rounded-full shadow-lg transition-all duration-500 ease-out"
            style={{
              width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
            }}
          >
            <div className="absolute right-0 -top-1 w-4 h-4 rounded-full bg-white shadow-md border-2 border-emerald-500 transition-all duration-500"></div>
          </div>
        </div>

        {/* Step Circles */}
        <div className="flex justify-between relative z-10 px-6">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center group">
              <div
                className={cn(
                  "flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 transform",
                  currentStep === step.id
                    ? "border-green-600 bg-green-600 text-white scale-110 shadow-lg"
                    : currentStep > step.id
                    ? "border-green-500 bg-green-500 text-white shadow-md"
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
                    ? "text-green-700 scale-105"
                    : "text-gray-600"
                )}
              >
                {step.name}
              </span>
              <span
                className={cn(
                  "text-xs max-w-[120px] text-center transition-all duration-300",
                  currentStep === step.id ? "text-green-600" : "text-gray-500",
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
                  step.id < currentStep ? "bg-green-500" : "bg-gray-200"
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="shadow-md">
            <CardHeader className="bg-slate-50 border-b">
              <CardTitle>{steps[currentStep - 1].title}</CardTitle>
              <CardDescription>
                {steps[currentStep - 1].description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {steps[currentStep - 1].component}
            </CardContent>
            <CardFooter className="flex justify-between border-t p-6 bg-gradient-to-r from-slate-50 to-green-50">
              <Button
                type="button"
                variant="outline"
                onClick={onPrevious}
                disabled={currentStep === 1}
                className={cn(
                  "gap-2 p-6 text-base font-medium transition-all duration-300 border-2",
                  currentStep === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-green-50 hover:border-green-200"
                )}
              >
                <ChevronLeft className="h-5 w-5" />
                Previous Step
              </Button>

              {currentStep === totalSteps ? (
                <Button
                  type="submit"
                  className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white p-6 text-base font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Generate Policy
                  <FileText className="h-5 w-5 ml-1" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={onNext}
                  className="gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white p-6 text-base font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Next Step
                  <ChevronRight className="h-5 w-5 ml-1" />
                </Button>
              )}
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}

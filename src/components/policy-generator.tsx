"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema, formSchema } from "@/types/form-types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Step1Context } from "./steps/step1-context";
import { Step2Inventory } from "./steps/step2-inventory";
import { Step3Classification } from "./steps/step3-classification";
import { Step4Generate } from "./steps/step4-generate";

export function PolicyGenerator() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const form = useForm<FormSchema>({
    //@ts-expect-error this is a type erorr
    resolver: zodResolver(formSchema),
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

  async function onNext() {
    const fields = stepFields[currentStep - 1];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Form {...form}>
        <form
          //@ts-expect-error this is a type eror
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="space-y-4">
            <Progress value={(currentStep / totalSteps) * 100} />
            <div className="flex justify-between text-sm text-muted-foreground">
              <div>Context</div>
              <div>Inventory</div>
              <div>Classification</div>
              <div>Generate</div>
            </div>
          </div>

          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Step 1: Define Context and Objectives</CardTitle>
              </CardHeader>
              <CardContent>
                <Step1Context form={form} />
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Step 2: Data Inventory & Discovery</CardTitle>
              </CardHeader>
              <CardContent>
                <Step2Inventory form={form} />
              </CardContent>
            </Card>
          )}

          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Step 3: Classification Criteria</CardTitle>
              </CardHeader>
              <CardContent>
                <Step3Classification form={form} />
              </CardContent>
            </Card>
          )}

          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>Step 4: Generate Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <Step4Generate form={form} />
              </CardContent>
            </Card>
          )}

          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={onPrevious}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            {currentStep === totalSteps ? (
              <Button type="submit">
                Generate Policy
                <FileText className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="button" onClick={onNext}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </CardFooter>
        </form>
      </Form>
    </div>
  );
}

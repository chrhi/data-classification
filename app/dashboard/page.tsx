"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, CheckCircle2, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const [selectedStep, setSelectedStep] = useState(1)

  // Process steps data
  const processSteps = [
    {
      id: 1,
      title: "Define Context and Objectives",
      description: "Understand the policy purpose, stakeholders, and data landscape",
      progress: 75,
      questions: [
        "Q1.1 – What is the primary objective of implementing a Data Classification Policy?",
        "Q1.2 – Who are the stakeholders involved in data governance and classification?",
        "Q1.3 – Describe the business processes that rely on data handling or storage.",
        "Q1.4 – What types of data are relevant across your environment?",
        "Q1.5 – List departments or units that handle sensitive or regulated data.",
      ],
    },
    {
      id: 2,
      title: "Data Inventory & Discovery",
      description: "Determine whether a data inventory exists and provide guidance if not",
      progress: 50,
      questions: [
        "Q2.1 – Does your organization currently maintain a Data Inventory?",
        "Q2.2 – Upload your latest Data Inventory or provide a link.",
        "Q2.3 – Would you like to see guidance on how to create a Data Inventory?",
      ],
    },
    {
      id: 3,
      title: "Define Classification Criteria and Categories",
      description: "Evaluate data value, sensitivity, and business impact to define classification levels",
      progress: 30,
      questions: [
        "Q3.1 – How is the value of data assessed in your organization?",
        "Q3.2 – What are the business impacts of unauthorized data exposure or misuse?",
        "Q3.3 – What sensitivity levels are used to define access restrictions?",
        "Q3.4 – Optional: Define your own classification criteria or adjust descriptions",
      ],
    },
    {
      id: 4,
      title: "Generate Policy",
      description: "Review all inputs and automatically generate a tailored Data Classification Policy",
      progress: 0,
      questions: [
        "Review all inputs from Steps 1–3 displayed in a policy preview.",
        "Organization name, versioning, approval roles.",
        "Download Formats: PDF, DOCX, JSON (for integration).",
        "Signature Fields: For CISO / DPO / Data Governance Team.",
      ],
    },
  ]

  return (
    <div className="p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Data Classification Policy Process</h1>
            <p className="text-muted-foreground">
              Track your progress through the four essential steps to create a customized Data Classification Policy
            </p>
          </div>
          <Link href="/policy-generator">
            <Button>
              Continue Process
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Process Steps Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          {processSteps.map((step) => (
            <Card
              key={step.id}
              className={`cursor-pointer transition-all ${selectedStep === step.id ? "ring-2 ring-primary" : "hover:bg-muted/50"}`}
              onClick={() => setSelectedStep(step.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full 
                      ${
                        step.progress === 100 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step.progress === 100 ? <CheckCircle2 className="h-5 w-5" /> : step.id}
                    </div>
                    <CardTitle className="text-base">{step.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Completion</span>
                    <span className="font-medium">{step.progress}%</span>
                  </div>
                  <Progress value={step.progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Step Details */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">
                  Step {selectedStep}: {processSteps[selectedStep - 1].title}
                </CardTitle>
                <CardDescription>{processSteps[selectedStep - 1].description}</CardDescription>
              </div>
              <div className="text-2xl font-bold">{processSteps[selectedStep - 1].progress}%</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h3 className="font-medium">Questions in this step:</h3>
              <ul className="space-y-3">
                {processSteps[selectedStep - 1].questions.map((question, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0
                      ${
                        index < processSteps[selectedStep - 1].progress / 25
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {index < processSteps[selectedStep - 1].progress / 25 ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : (
                        <span className="text-xs">{index + 1}</span>
                      )}
                    </div>
                    <span>{question}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Overall Progress */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Overall Policy Development Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Step 1 to Step 4</span>
                <span className="text-sm font-medium">
                  {Math.round(processSteps.reduce((acc, step) => acc + step.progress, 0) / processSteps.length)}%
                </span>
              </div>
              <Progress
                value={processSteps.reduce((acc, step) => acc + step.progress, 0) / processSteps.length}
                className="h-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Define Context</span>
                <span>Data Inventory</span>
                <span>Classification</span>
                <span>Generate</span>
              </div>
            </div>
            <div className="mt-6">
              <Link href="/policy-generator">
                <Button className="w-full">
                  Continue Policy Development
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

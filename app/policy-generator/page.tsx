"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  CheckCircle2,
  ChevronRight,
  FileText,
  Download,
  Upload,
  LinkIcon,
  Info,
  FileDown,
  FileJson,
  FileTextIcon,
} from "lucide-react"

export default function PolicyGenerator() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Define Context and Objectives
    objective: "",
    stakeholders: [] as string[],
    businessProcesses: [] as string[],
    customBusinessProcesses: [] as string[],
    dataTypes: [] as string[],
    departments: [] as string[],

    // Step 2: Data Inventory & Discovery
    hasDataInventory: null as boolean | null,
    dataInventoryLink: "",
    needsGuidance: null as boolean | null,

    // Step 3: Define Classification Criteria and Categories
    dataValueAssessment: [] as string[],
    businessImpacts: {} as Record<string, string>,
    sensitivityLevels: [] as string[],
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
        description: "Highly sensitive information with strict access controls",
        examples: "Trade secrets, security infrastructure details",
      },
    },

    // Step 4: Generate Policy
    organizationName: "",
    version: "1.0",
    approvalRoles: [] as string[],
  })

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const businessProcessOptions = [
    "Customer onboarding",
    "Transaction processing",
    "Legal review",
    "Product development",
    "Marketing campaigns",
    "HR management",
    "Financial reporting",
    "Supply chain management",
    "Customer support",
    "Research and development",
  ]

  const dataTypeOptions = [
    "PII (Personally Identifiable Information)",
    "PHI (Protected Health Information)",
    "Financial data",
    "Contracts",
    "Source code",
    "Emails",
    "System logs",
    "Customer data",
    "Employee data",
    "Intellectual property",
  ]

  const departmentOptions = [
    "Executive",
    "Finance",
    "Human Resources",
    "Information Technology",
    "Legal",
    "Marketing",
    "Operations",
    "Research & Development",
    "Sales",
    "Customer Support",
  ]

  const dataValueOptions = [
    "Revenue impact",
    "Regulatory risk",
    "Reputational damage",
    "Operational dependency",
    "Competitive advantage",
    "Customer trust",
    "Legal liability",
    "Business continuity",
  ]

  const businessImpactOptions = [
    "Financial penalties",
    "Legal action",
    "Service outage",
    "Loss of customers",
    "Reputational damage",
    "Competitive disadvantage",
    "Regulatory sanctions",
    "Operational disruption",
  ]

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    setFormData((prev) => {
      const updatedField = checked ? [...prev[field], value] : prev[field].filter((item) => item !== value)

      return { ...prev, [field]: updatedField }
    })
  }

  const handleCustomBusinessProcess = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
      setFormData({
        ...formData,
        customBusinessProcesses: [...formData.customBusinessProcesses, e.currentTarget.value.trim()],
      })
      e.currentTarget.value = ""
    }
  }

  const removeCustomBusinessProcess = (process: string) => {
    setFormData({
      ...formData,
      customBusinessProcesses: formData.customBusinessProcesses.filter((p) => p !== process),
    })
  }

  const handleBusinessImpactChange = (impact: string, value: string) => {
    setFormData({
      ...formData,
      businessImpacts: {
        ...formData.businessImpacts,
        [impact]: value,
      },
    })
  }

  const handleGeneratePolicy = () => {
    // In a real application, this would generate the policy document
    alert("Policy generated successfully! Ready for download.")
  }

  const renderStepIndicator = () => {
    return (
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 
                ${
                  currentStep >= step
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted border-muted-foreground/20"
                }`}
            >
              {currentStep > step ? <CheckCircle2 className="h-5 w-5" /> : <span>{step}</span>}
            </div>
          ))}
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <div>Context</div>
          <div>Inventory</div>
          <div>Classification</div>
          <div>Generate</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Data Classification Policy Generator</h1>
          <p className="text-muted-foreground mt-2">
            Create a customized and auditable Data Classification Policy in four simple steps
          </p>
        </div>

        {renderStepIndicator()}

        <Card>
          <CardHeader>
            {currentStep === 1 && (
              <>
                <CardTitle>Step 1: Define Context and Objectives</CardTitle>
                <CardDescription>Understand the policy purpose, stakeholders, and data landscape</CardDescription>
              </>
            )}

            {currentStep === 2 && (
              <>
                <CardTitle>Step 2: Data Inventory & Discovery</CardTitle>
                <CardDescription>Determine whether a data inventory exists and provide guidance if not</CardDescription>
              </>
            )}

            {currentStep === 3 && (
              <>
                <CardTitle>Step 3: Define Classification Criteria and Categories</CardTitle>
                <CardDescription>
                  Evaluate data value, sensitivity, and business impact to define classification levels
                </CardDescription>
              </>
            )}

            {currentStep === 4 && (
              <>
                <CardTitle>Step 4: Generate Policy</CardTitle>
                <CardDescription>Review all inputs and generate a tailored Data Classification Policy</CardDescription>
              </>
            )}
          </CardHeader>

          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="objective">
                    Q1.1 – What is the primary objective of implementing a Data Classification Policy?
                  </Label>
                  <Textarea
                    id="objective"
                    placeholder="Enter mission statement or goals..."
                    value={formData.objective}
                    onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Q1.2 – Who are the stakeholders involved in data governance and classification?</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {[
                      "CISO",
                      "DPO",
                      "IT Manager",
                      "Compliance Officer",
                      "Legal Counsel",
                      "Business Unit Owners",
                      "Data Stewards",
                      "Executive Sponsor",
                    ].map((stakeholder) => (
                      <div key={stakeholder} className="flex items-center space-x-2">
                        <Checkbox
                          id={`stakeholder-${stakeholder}`}
                          checked={formData.stakeholders.includes(stakeholder)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("stakeholders", stakeholder, checked as boolean)
                          }
                        />
                        <Label htmlFor={`stakeholder-${stakeholder}`}>{stakeholder}</Label>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2">
                    <Label htmlFor="stakeholder-email">Optional: Add stakeholder email</Label>
                    <Input id="stakeholder-email" placeholder="name@example.com" className="mt-1" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Q1.3 – Describe the business processes that rely on data handling or storage.</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {[
                      "Customer onboarding",
                      "Transaction processing",
                      "Legal review",
                      "Product development",
                      "Marketing campaigns",
                      "HR management",
                      "Financial reporting",
                      "Supply chain management",
                    ].map((process) => (
                      <div key={process} className="flex items-center space-x-2">
                        <Checkbox
                          id={`process-${process}`}
                          checked={formData.businessProcesses.includes(process)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("businessProcesses", process, checked as boolean)
                          }
                        />
                        <Label htmlFor={`process-${process}`}>{process}</Label>
                      </div>
                    ))}
                  </div>
                  <Textarea placeholder="Add additional business processes..." className="mt-2" />
                </div>

                <div className="space-y-2">
                  <Label>Q1.4 – What types of data are relevant across your environment?</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {[
                      "PII",
                      "Financial data",
                      "Contracts",
                      "Source Code",
                      "Emails",
                      "Logs",
                      "Customer data",
                      "Employee data",
                    ].map((dataType) => (
                      <div key={dataType} className="flex items-center space-x-2">
                        <Checkbox
                          id={`dataType-${dataType}`}
                          checked={formData.dataTypes.includes(dataType)}
                          onCheckedChange={(checked) => handleCheckboxChange("dataTypes", dataType, checked as boolean)}
                        />
                        <Label htmlFor={`dataType-${dataType}`}>{dataType}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Q1.5 – List departments or units that handle sensitive or regulated data.</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {[
                      "Executive",
                      "Finance",
                      "Human Resources",
                      "Information Technology",
                      "Legal",
                      "Marketing",
                      "Operations",
                      "Research & Development",
                    ].map((department) => (
                      <div key={department} className="flex items-center space-x-2">
                        <Checkbox
                          id={`department-${department}`}
                          checked={formData.departments.includes(department)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("departments", department, checked as boolean)
                          }
                        />
                        <Label htmlFor={`department-${department}`}>{department}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>Q2.1 – Does your organization currently maintain a Data Inventory?</Label>
                  <RadioGroup
                    value={formData.hasDataInventory === null ? undefined : formData.hasDataInventory.toString()}
                    onValueChange={(value) => setFormData({ ...formData, hasDataInventory: value === "true" })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="inventory-yes" />
                      <Label htmlFor="inventory-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="inventory-no" />
                      <Label htmlFor="inventory-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.hasDataInventory === true && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="inventory-link">
                        Q2.2 – Upload your latest Data Inventory or provide a link.
                      </Label>
                      <div className="grid gap-4">
                        <div className="border rounded-md p-4 flex flex-col items-center justify-center gap-2">
                          <Upload className="h-8 w-8 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Drag and drop your file here, or click to browse
                          </p>
                          <Button variant="outline" size="sm">
                            Select File
                          </Button>
                        </div>

                        <div className="flex items-center gap-2">
                          <LinkIcon className="h-4 w-4 text-muted-foreground" />
                          <Input
                            id="inventory-link"
                            placeholder="Or provide a link to your Data Inventory..."
                            value={formData.dataInventoryLink}
                            onChange={(e) => setFormData({ ...formData, dataInventoryLink: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {formData.hasDataInventory === false && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Q2.3 – Would you like to see guidance on how to create a Data Inventory?</Label>
                      <RadioGroup
                        value={formData.needsGuidance === null ? undefined : formData.needsGuidance.toString()}
                        onValueChange={(value) => setFormData({ ...formData, needsGuidance: value === "true" })}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="guidance-yes" />
                          <Label htmlFor="guidance-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="guidance-no" />
                          <Label htmlFor="guidance-no">No</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {formData.needsGuidance === true && (
                      <Card className="bg-muted/50">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Info className="h-5 w-5" />
                            Data Inventory Creation Guide
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <h4 className="font-medium">Step 1: Identify Data Owners</h4>
                            <p className="text-sm text-muted-foreground">
                              Identify key stakeholders from each department who are responsible for data assets.
                            </p>
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-medium">Step 2: Collect Data Asset Information</h4>
                            <p className="text-sm text-muted-foreground">
                              For each data asset, document: name, description, format, location, owner, sensitivity
                              level, retention period, and access controls.
                            </p>
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-medium">Step 3: Use Data Discovery Tools</h4>
                            <p className="text-sm text-muted-foreground">
                              Consider using automated data discovery tools to scan your environment for sensitive data.
                            </p>
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-medium">Step 4: Document Data Flows</h4>
                            <p className="text-sm text-muted-foreground">
                              Map how data moves through your organization, including inputs, processing, storage, and
                              outputs.
                            </p>
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-medium">Step 5: Maintain and Update</h4>
                            <p className="text-sm text-muted-foreground">
                              Establish a process for regularly reviewing and updating the inventory.
                            </p>
                          </div>

                          <div className="mt-4 flex gap-2">
                            <Button variant="outline" size="sm" className="flex items-center gap-2">
                              <Download className="h-4 w-4" />
                              Download Template
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Q3.1 – How is the value of data assessed in your organization?</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {[
                      "Revenue impact",
                      "Regulatory risk",
                      "Reputational damage",
                      "Operational dependency",
                      "Competitive advantage",
                      "Customer trust",
                      "Legal liability",
                    ].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`value-${option}`}
                          checked={formData.dataValueAssessment.includes(option)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("dataValueAssessment", option, checked as boolean)
                          }
                        />
                        <Label htmlFor={`value-${option}`}>{option}</Label>
                      </div>
                    ))}
                  </div>
                  <Textarea placeholder="Add other data value assessment methods..." className="mt-2" />
                </div>

                <div className="space-y-2">
                  <Label>Q3.2 – What are the business impacts of unauthorized data exposure or misuse?</Label>
                  <div className="space-y-4 mt-2">
                    {[
                      "Financial penalties",
                      "Legal action",
                      "Service outage",
                      "Loss of customers",
                      "Reputational damage",
                      "Competitive disadvantage",
                      "Regulatory sanctions",
                    ].map((impact) => (
                      <div key={impact} className="space-y-1">
                        <Label htmlFor={`impact-${impact}`}>{impact}</Label>
                        <Select
                          value={formData.businessImpacts[impact] || ""}
                          onValueChange={(value) => handleBusinessImpactChange(impact, value)}
                        >
                          <SelectTrigger id={`impact-${impact}`}>
                            <SelectValue placeholder="Select impact level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="moderate">Moderate</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="critical">Critical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Q3.3 – What sensitivity levels are used to define access restrictions?</Label>
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    {["Public", "Internal", "Confidential", "Restricted"].map((level) => (
                      <div key={level} className="flex items-center space-x-2">
                        <Checkbox
                          id={`level-${level}`}
                          checked={formData.sensitivityLevels.includes(level)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("sensitivityLevels", level, checked as boolean)
                          }
                        />
                        <Label htmlFor={`level-${level}`} className="flex-1">
                          <div className="font-medium">{level}</div>
                          <div className="text-sm text-muted-foreground">
                            {level === "Public" && "Information that can be freely shared with the public"}
                            {level === "Internal" && "Information for internal use only"}
                            {level === "Confidential" && "Sensitive information with restricted access"}
                            {level === "Restricted" && "Highly sensitive information with strict access controls"}
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Q3.4 – Optional: Define your own classification criteria or adjust descriptions</Label>

                  <Tabs defaultValue="public" className="mt-2">
                    <TabsList className="grid grid-cols-4">
                      <TabsTrigger value="public">Public</TabsTrigger>
                      <TabsTrigger value="internal">Internal</TabsTrigger>
                      <TabsTrigger value="confidential">Confidential</TabsTrigger>
                      <TabsTrigger value="restricted">Restricted</TabsTrigger>
                    </TabsList>

                    {["public", "internal", "confidential", "restricted"].map((level) => (
                      <TabsContent key={level} value={level} className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor={`${level}-name`}>Classification Name</Label>
                          <Input
                            id={`${level}-name`}
                            value={formData.customClassification[level].name}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                customClassification: {
                                  ...formData.customClassification,
                                  [level]: {
                                    ...formData.customClassification[level],
                                    name: e.target.value,
                                  },
                                },
                              })
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`${level}-description`}>Description</Label>
                          <Textarea
                            id={`${level}-description`}
                            value={formData.customClassification[level].description}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                customClassification: {
                                  ...formData.customClassification,
                                  [level]: {
                                    ...formData.customClassification[level],
                                    description: e.target.value,
                                  },
                                },
                              })
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`${level}-examples`}>Examples</Label>
                          <Textarea
                            id={`${level}-examples`}
                            value={formData.customClassification[level].examples}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                customClassification: {
                                  ...formData.customClassification,
                                  [level]: {
                                    ...formData.customClassification[level],
                                    examples: e.target.value,
                                  },
                                },
                              })
                            }
                            placeholder="Enter examples of this classification level..."
                          />
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="organization-name">Organization Name</Label>
                    <Input
                      id="organization-name"
                      placeholder="Enter your organization name"
                      value={formData.organizationName}
                      onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="version">Policy Version</Label>
                    <Input
                      id="version"
                      placeholder="1.0"
                      value={formData.version}
                      onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Approval Roles</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {["CISO", "DPO", "Data Governance Team", "Legal Counsel", "Compliance Officer", "CEO"].map(
                        (role) => (
                          <div key={role} className="flex items-center space-x-2">
                            <Checkbox
                              id={`approval-${role}`}
                              checked={formData.approvalRoles.includes(role)}
                              onCheckedChange={(checked) =>
                                handleCheckboxChange("approvalRoles", role, checked as boolean)
                              }
                            />
                            <Label htmlFor={`approval-${role}`}>{role}</Label>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Policy Preview</h3>

                  <Card className="bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">
                        {formData.organizationName || "[Organization Name]"} Data Classification Policy
                      </CardTitle>
                      <CardDescription>
                        Version {formData.version} | Generated on {new Date().toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[300px] pr-4">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium">1. Purpose and Scope</h4>
                            <p className="text-sm mt-1">
                              {formData.objective || "[Policy objective will appear here]"}
                            </p>
                          </div>

                          <div>
                            <h4 className="font-medium">2. Stakeholders</h4>
                            <ul className="list-disc list-inside text-sm mt-1">
                              {formData.stakeholders.length > 0 ? (
                                formData.stakeholders.map((stakeholder) => <li key={stakeholder}>{stakeholder}</li>)
                              ) : (
                                <li>[Stakeholders will appear here]</li>
                              )}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-medium">3. Data Types</h4>
                            <ul className="list-disc list-inside text-sm mt-1">
                              {formData.dataTypes.length > 0 ? (
                                formData.dataTypes.map((dataType) => <li key={dataType}>{dataType}</li>)
                              ) : (
                                <li>[Data types will appear here]</li>
                              )}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-medium">4. Classification Levels</h4>
                            <div className="space-y-2 text-sm mt-1">
                              {formData.sensitivityLevels.length > 0 ? (
                                formData.sensitivityLevels.map((level) => (
                                  <div key={level} className="space-y-1">
                                    <h5 className="font-medium">
                                      {formData.customClassification[level.toLowerCase()].name}
                                    </h5>
                                    <p>{formData.customClassification[level.toLowerCase()].description}</p>
                                    <p className="italic">
                                      Examples: {formData.customClassification[level.toLowerCase()].examples}
                                    </p>
                                  </div>
                                ))
                              ) : (
                                <p>[Classification levels will appear here]</p>
                              )}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium">5. Business Impact Assessment</h4>
                            <div className="space-y-1 text-sm mt-1">
                              {Object.keys(formData.businessImpacts).length > 0 ? (
                                Object.entries(formData.businessImpacts).map(([impact, level]) => (
                                  <p key={impact}>
                                    <span className="font-medium">{impact}:</span>{" "}
                                    {level.charAt(0).toUpperCase() + level.slice(1)} impact
                                  </p>
                                ))
                              ) : (
                                <p>[Business impacts will appear here]</p>
                              )}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium">6. Approval</h4>
                            <div className="space-y-1 text-sm mt-1">
                              {formData.approvalRoles.length > 0 ? (
                                formData.approvalRoles.map((role) => (
                                  <div key={role} className="flex items-center gap-4 border-b pb-2">
                                    <span className="font-medium">{role}:</span>
                                    <span className="italic text-muted-foreground">Signature required</span>
                                  </div>
                                ))
                              ) : (
                                <p>[Approval roles will appear here]</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-medium">Download Options</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="outline" className="flex items-center gap-2">
                      <FileTextIcon className="h-4 w-4" />
                      Download as PDF
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <FileDown className="h-4 w-4" />
                      Download as DOCX
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <FileJson className="h-4 w-4" />
                      Download as JSON
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button onClick={handleNext}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleGeneratePolicy}>
                Generate Policy
                <FileText className="ml-2 h-4 w-4" />
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"

export default function DataClassificationForm() {
  const [currentSection, setCurrentSection] = useState(1)
  const [formData, setFormData] = useState({
    // Section 1: Organizational Context
    businessFunctions: "",
    criticalAssets: [] as string[],
    regulations: [] as string[],

    // Section 2: Data Inventory & Usage
    dataTypes: [] as string[],
    dataStorage: [] as string[],
    dataAccess: {} as Record<string, string>,

    // Section 3: Sensitivity & Criticality
    sensitiveDataIdentification: "",
    existingClassification: { exists: false, description: "" },
    dataProtection: [] as string[],

    // Section 4: Governance & Policy
    currentPolicy: { exists: false, link: "" },
    classificationCommunication: [] as string[],
    classificationOwner: "",

    // Section 5: Roles & Responsibilities
    dataOwners: {} as Record<string, string>,
    governanceCommittee: { exists: false, description: "" },
    responsibilitiesDefined: "",

    // Section 6: Tools & Automation
    classificationTools: { exists: false, tools: [] as string[] },
    classificationProcess: "",
    complianceAudit: "",

    // Section 7: Challenges & Expectations
    challenges: [] as string[],
    expectedOutcomes: "",
    upcomingAudits: { exists: false, description: "" },
  })

  const totalSections = 7
  const progress = (currentSection / totalSections) * 100

  const handleNext = () => {
    if (currentSection < totalSections) {
      setCurrentSection(currentSection + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePrevious = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = () => {
    // Calculate maturity score and generate policy
    const score = calculateMaturityScore(formData)
    alert(`Form submitted! Maturity Score: ${score}%`)
    console.log("Form data:", formData)
    // Here you would typically send the data to your backend
  }

  const calculateMaturityScore = (data: any) => {
    let score = 0

    // Policy existence = +15%
    if (data.currentPolicy.exists) score += 15

    // Use of tools = +10%
    if (data.classificationTools.exists && data.classificationTools.tools.length > 0) score += 10

    // Defined roles = +10%
    if (data.responsibilitiesDefined === "yes") score += 10
    else if (data.responsibilitiesDefined === "partially") score += 5

    // Awareness of classification = +5%
    if (data.classificationCommunication.length > 0) score += 5

    // Tool-based protection = +10%
    if (
      data.dataProtection.includes("Encryption") ||
      data.dataProtection.includes("Access controls") ||
      data.dataProtection.includes("DLP")
    )
      score += 10

    // Additional scoring based on other sections
    if (data.sensitiveDataIdentification === "full_dlp") score += 15
    else if (data.sensitiveDataIdentification === "basic_automated") score += 10
    else if (data.sensitiveDataIdentification === "manual") score += 5

    if (data.governanceCommittee.exists) score += 10

    if (data.classificationProcess === "automated") score += 15
    else if (data.classificationProcess === "hybrid") score += 10

    return Math.min(score, 100)
  }

  const handleCheckboxChange = (section: string, value: string, checked: boolean) => {
    setFormData((prev) => {
      const updatedSection = checked ? [...prev[section], value] : prev[section].filter((item) => item !== value)

      return { ...prev, [section]: updatedSection }
    })
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Data Classification Policy Assessment</CardTitle>
          <CardDescription>
            Purpose: Collect foundational input to generate a custom Data Classification Policy and assign a maturity
            evaluation score.
          </CardDescription>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              Section {currentSection} of {totalSections}
            </p>
          </div>
        </CardHeader>

        <CardContent>
          {currentSection === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">🔧 Section 1: Organizational Context</h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="businessFunctions">
                    Q1.1 – Describe the main business functions of your organization.
                  </Label>
                  <Textarea
                    id="businessFunctions"
                    placeholder="Describe your organization's main business functions..."
                    className="mt-1"
                    value={formData.businessFunctions}
                    onChange={(e) => setFormData({ ...formData, businessFunctions: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Q1.2 – List your organization's most critical assets (data-related).</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {[
                      "Client data",
                      "Financial records",
                      "Transaction logs",
                      "Legal documents",
                      "Intellectual property",
                      "Employee data",
                      "Customer PII",
                      "Business strategy",
                    ].map((asset) => (
                      <div key={asset} className="flex items-center space-x-2">
                        <Checkbox
                          id={`asset-${asset}`}
                          checked={formData.criticalAssets.includes(asset)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("criticalAssets", asset, checked as boolean)
                          }
                        />
                        <Label htmlFor={`asset-${asset}`}>{asset}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>
                    Q1.3 – Select all applicable regulations or compliance frameworks your organization follows:
                  </Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {["GDPR", "PCI-DSS", "HIPAA", "SOX", "GLBA", "Basel III", "ISO 27001", "NIST", "CCPA", "LGPD"].map(
                      (regulation) => (
                        <div key={regulation} className="flex items-center space-x-2">
                          <Checkbox
                            id={`regulation-${regulation}`}
                            checked={formData.regulations.includes(regulation)}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange("regulations", regulation, checked as boolean)
                            }
                          />
                          <Label htmlFor={`regulation-${regulation}`}>{regulation}</Label>
                        </div>
                      ),
                    )}
                  </div>
                  <div className="mt-2">
                    <Label htmlFor="otherRegulation">Other (specify):</Label>
                    <Input id="otherRegulation" placeholder="Other regulations..." className="mt-1" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentSection === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">🗃️ Section 2: Data Inventory & Usage</h2>

              <div className="space-y-4">
                <div>
                  <Label>Q2.1 – What types of data does your organization handle?</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {[
                      "PII",
                      "PHI",
                      "Financial records",
                      "Intellectual property",
                      "Contracts",
                      "Emails",
                      "Customer data",
                      "Employee data",
                      "Marketing data",
                      "Research data",
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

                <div>
                  <Label>Q2.2 – Where is data primarily stored?</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {[
                      "On-prem servers",
                      "Cloud (AWS)",
                      "Cloud (Azure)",
                      "Cloud (GCP)",
                      "Hybrid",
                      "Endpoints/Devices",
                      "SaaS applications",
                      "Databases",
                    ].map((storage) => (
                      <div key={storage} className="flex items-center space-x-2">
                        <Checkbox
                          id={`storage-${storage}`}
                          checked={formData.dataStorage.includes(storage)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("dataStorage", storage, checked as boolean)
                          }
                        />
                        <Label htmlFor={`storage-${storage}`}>{storage}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Q2.3 – Who accesses sensitive data and for what purposes?</Label>
                  <div className="space-y-3 mt-2">
                    {["Executives", "IT Staff", "HR", "Finance", "Sales", "Customer Support"].map((role) => (
                      <div key={role} className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Checkbox id={`role-${role}`} />
                          <Label htmlFor={`role-${role}`}>{role}</Label>
                        </div>
                        <Input
                          placeholder={`Purpose for ${role}...`}
                          className="ml-6 w-[calc(100%-1.5rem)]"
                          onChange={(e) => {
                            const newDataAccess = { ...formData.dataAccess }
                            newDataAccess[role] = e.target.value
                            setFormData({ ...formData, dataAccess: newDataAccess })
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentSection === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">🔒 Section 3: Sensitivity & Criticality</h2>

              <div className="space-y-4">
                <div>
                  <Label>Q3.1 – How do you currently identify or label sensitive data?</Label>
                  <RadioGroup
                    className="mt-2"
                    value={formData.sensitiveDataIdentification}
                    onValueChange={(value) => setFormData({ ...formData, sensitiveDataIdentification: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no_method" id="no_method" />
                      <Label htmlFor="no_method">No current method</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="manual" id="manual" />
                      <Label htmlFor="manual">Manual (spreadsheet, file tags)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="basic_automated" id="basic_automated" />
                      <Label htmlFor="basic_automated">Basic automated rules</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="full_dlp" id="full_dlp" />
                      <Label htmlFor="full_dlp">Full DLP/classification tools</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Q3.2 – Is there an existing classification scheme?</Label>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        id="classification_yes"
                        checked={formData.existingClassification.exists}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            existingClassification: {
                              ...formData.existingClassification,
                              exists: true,
                            },
                          })
                        }
                      />
                      <Label htmlFor="classification_yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        id="classification_no"
                        checked={!formData.existingClassification.exists}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            existingClassification: {
                              ...formData.existingClassification,
                              exists: false,
                            },
                          })
                        }
                      />
                      <Label htmlFor="classification_no">No</Label>
                    </div>
                  </div>
                  {formData.existingClassification.exists && (
                    <Textarea
                      placeholder="Describe your existing classification scheme..."
                      className="mt-2"
                      value={formData.existingClassification.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          existingClassification: {
                            ...formData.existingClassification,
                            description: e.target.value,
                          },
                        })
                      }
                    />
                  )}
                </div>

                <div>
                  <Label>Q3.3 – How is sensitive data protected?</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {[
                      "Encryption",
                      "Access controls",
                      "Data masking",
                      "DLP",
                      "Audit logging",
                      "Tokenization",
                      "None",
                    ].map((protection) => (
                      <div key={protection} className="flex items-center space-x-2">
                        <Checkbox
                          id={`protection-${protection}`}
                          checked={formData.dataProtection.includes(protection)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("dataProtection", protection, checked as boolean)
                          }
                        />
                        <Label htmlFor={`protection-${protection}`}>{protection}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentSection === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">🧾 Section 4: Governance & Policy</h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Q4.1 – Is there a current Data Classification Policy in place?</Label>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        id="policy_yes"
                        checked={formData.currentPolicy.exists}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            currentPolicy: {
                              ...formData.currentPolicy,
                              exists: true,
                            },
                          })
                        }
                      />
                      <Label htmlFor="policy_yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        id="policy_no"
                        checked={!formData.currentPolicy.exists}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            currentPolicy: {
                              ...formData.currentPolicy,
                              exists: false,
                            },
                          })
                        }
                      />
                      <Label htmlFor="policy_no">No</Label>
                    </div>
                  </div>
                  {formData.currentPolicy.exists && (
                    <div className="mt-2">
                      <Label htmlFor="policyLink">Upload or provide link:</Label>
                      <Input
                        id="policyLink"
                        placeholder="Link to policy document..."
                        className="mt-1"
                        value={formData.currentPolicy.link}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            currentPolicy: {
                              ...formData.currentPolicy,
                              link: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  )}
                </div>

                <div>
                  <Label>Q4.2 – How is the classification communicated internally?</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {[
                      "Training",
                      "Employee handbook",
                      "Intranet/Wiki",
                      "Team meetings",
                      "Email communications",
                      "Not communicated",
                    ].map((communication) => (
                      <div key={communication} className="flex items-center space-x-2">
                        <Checkbox
                          id={`communication-${communication}`}
                          checked={formData.classificationCommunication.includes(communication)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("classificationCommunication", communication, checked as boolean)
                          }
                        />
                        <Label htmlFor={`communication-${communication}`}>{communication}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="classificationOwner">Q4.3 – Who approves or owns classification decisions?</Label>
                  <Select
                    value={formData.classificationOwner}
                    onValueChange={(value) => setFormData({ ...formData, classificationOwner: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ciso">CISO</SelectItem>
                      <SelectItem value="cio">CIO</SelectItem>
                      <SelectItem value="dpo">DPO/Privacy Officer</SelectItem>
                      <SelectItem value="department_heads">Department Heads</SelectItem>
                      <SelectItem value="data_governance">Data Governance Committee</SelectItem>
                      <SelectItem value="it_security">IT Security Team</SelectItem>
                      <SelectItem value="compliance">Compliance Team</SelectItem>
                      <SelectItem value="not_defined">Not Defined</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {currentSection === 5 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">🧑‍💼 Section 5: Roles & Responsibilities</h2>

              <div className="space-y-4">
                <div>
                  <Label>Q5.1 – Who are the primary data owners in your organization?</Label>
                  <div className="space-y-3 mt-2">
                    {["Finance data", "Customer data", "HR data", "Product data", "Marketing data"].map(
                      (dataCategory) => (
                        <div key={dataCategory} className="flex items-center space-x-2">
                          <Label className="w-1/3">{dataCategory}:</Label>
                          <Input
                            placeholder={`Owner of ${dataCategory}...`}
                            className="w-2/3"
                            onChange={(e) => {
                              const newDataOwners = { ...formData.dataOwners }
                              newDataOwners[dataCategory] = e.target.value
                              setFormData({ ...formData, dataOwners: newDataOwners })
                            }}
                          />
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Q5.2 – Is there a Data Governance body or committee?</Label>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        id="committee_yes"
                        checked={formData.governanceCommittee.exists}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            governanceCommittee: {
                              ...formData.governanceCommittee,
                              exists: true,
                            },
                          })
                        }
                      />
                      <Label htmlFor="committee_yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        id="committee_no"
                        checked={!formData.governanceCommittee.exists}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            governanceCommittee: {
                              ...formData.governanceCommittee,
                              exists: false,
                            },
                          })
                        }
                      />
                      <Label htmlFor="committee_no">No</Label>
                    </div>
                  </div>
                  {formData.governanceCommittee.exists && (
                    <Textarea
                      placeholder="Describe the governance committee structure..."
                      className="mt-2"
                      value={formData.governanceCommittee.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          governanceCommittee: {
                            ...formData.governanceCommittee,
                            description: e.target.value,
                          },
                        })
                      }
                    />
                  )}
                </div>

                <div>
                  <Label>Q5.3 – Are responsibilities defined for creators, users, custodians, and auditors?</Label>
                  <RadioGroup
                    className="mt-2"
                    value={formData.responsibilitiesDefined}
                    onValueChange={(value) => setFormData({ ...formData, responsibilitiesDefined: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="resp_yes" />
                      <Label htmlFor="resp_yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="partially" id="resp_partially" />
                      <Label htmlFor="resp_partially">Partially</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="resp_no" />
                      <Label htmlFor="resp_no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {currentSection === 6 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">⚙️ Section 6: Tools & Automation</h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Q6.1 – Are any tools used for data classification or discovery?</Label>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        id="tools_yes"
                        checked={formData.classificationTools.exists}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            classificationTools: {
                              ...formData.classificationTools,
                              exists: true,
                            },
                          })
                        }
                      />
                      <Label htmlFor="tools_yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        id="tools_no"
                        checked={!formData.classificationTools.exists}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            classificationTools: {
                              ...formData.classificationTools,
                              exists: false,
                            },
                          })
                        }
                      />
                      <Label htmlFor="tools_no">No</Label>
                    </div>
                  </div>
                  {formData.classificationTools.exists && (
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {[
                        "Microsoft Purview",
                        "Varonis",
                        "Symantec DLP",
                        "Digital Guardian",
                        "BigID",
                        "Spirion",
                        "AWS Macie",
                        "Azure Information Protection",
                      ].map((tool) => (
                        <div key={tool} className="flex items-center space-x-2">
                          <Checkbox
                            id={`tool-${tool}`}
                            checked={formData.classificationTools.tools.includes(tool)}
                            onCheckedChange={(checked) => {
                              const updatedTools = checked
                                ? [...formData.classificationTools.tools, tool]
                                : formData.classificationTools.tools.filter((item) => item !== tool)

                              setFormData({
                                ...formData,
                                classificationTools: {
                                  ...formData.classificationTools,
                                  tools: updatedTools,
                                },
                              })
                            }}
                          />
                          <Label htmlFor={`tool-${tool}`}>{tool}</Label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <Label>Q6.2 – How is the classification process carried out today?</Label>
                  <RadioGroup
                    className="mt-2"
                    value={formData.classificationProcess}
                    onValueChange={(value) => setFormData({ ...formData, classificationProcess: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="manual" id="process_manual" />
                      <Label htmlFor="process_manual">Manual</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="automated" id="process_automated" />
                      <Label htmlFor="process_automated">Automated</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hybrid" id="process_hybrid" />
                      <Label htmlFor="process_hybrid">Hybrid</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="not_implemented" id="process_not_implemented" />
                      <Label htmlFor="process_not_implemented">Not yet implemented</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="complianceAudit">Q6.3 – How is compliance with classification audited?</Label>
                  <Textarea
                    id="complianceAudit"
                    placeholder="Describe your audit process..."
                    className="mt-1"
                    value={formData.complianceAudit}
                    onChange={(e) => setFormData({ ...formData, complianceAudit: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {currentSection === 7 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">🚧 Section 7: Challenges & Expectations</h2>

              <div className="space-y-4">
                <div>
                  <Label>Q7.1 – What major challenges do you face in classifying data?</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {[
                      "Lack of resources",
                      "Technical complexity",
                      "User resistance",
                      "Legacy systems",
                      "Volume of data",
                      "Inconsistent processes",
                      "Lack of expertise",
                      "Regulatory complexity",
                    ].map((challenge) => (
                      <div key={challenge} className="flex items-center space-x-2">
                        <Checkbox
                          id={`challenge-${challenge}`}
                          checked={formData.challenges.includes(challenge)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("challenges", challenge, checked as boolean)
                          }
                        />
                        <Label htmlFor={`challenge-${challenge}`}>{challenge}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="expectedOutcomes">
                    Q7.2 – What improvements or outcomes do you expect from this classification policy?
                  </Label>
                  <Textarea
                    id="expectedOutcomes"
                    placeholder="Describe your expected outcomes..."
                    className="mt-1"
                    value={formData.expectedOutcomes}
                    onChange={(e) => setFormData({ ...formData, expectedOutcomes: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Q7.3 – Are any audits, regulatory inspections, or internal deadlines coming up?</Label>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        id="audits_yes"
                        checked={formData.upcomingAudits.exists}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            upcomingAudits: {
                              ...formData.upcomingAudits,
                              exists: true,
                            },
                          })
                        }
                      />
                      <Label htmlFor="audits_yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        id="audits_no"
                        checked={!formData.upcomingAudits.exists}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            upcomingAudits: {
                              ...formData.upcomingAudits,
                              exists: false,
                            },
                          })
                        }
                      />
                      <Label htmlFor="audits_no">No</Label>
                    </div>
                  </div>
                  {formData.upcomingAudits.exists && (
                    <div className="space-y-2 mt-2">
                      <Label htmlFor="auditDescription">Describe upcoming audits or deadlines:</Label>
                      <Textarea
                        id="auditDescription"
                        placeholder="Describe upcoming audits or deadlines..."
                        value={formData.upcomingAudits.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            upcomingAudits: {
                              ...formData.upcomingAudits,
                              description: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentSection === 1}>
            Previous
          </Button>

          {currentSection < totalSections ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleSubmit}>Generate Policy</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

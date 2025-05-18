"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Step1Props {}

export default function Step1({}: Step1Props) {
  const [formData, setFormData] = useState({
    primaryObjectives: [],
    primaryObjectivesOther: [],
    organizationSize: "",
    stakeholders: [],
    stakeholdersOther: [],
    regulations: [],
    regulationsOther: [],
  });

  const primaryObjectiveOptions = [
    "Enhance data security by identifying and protecting sensitive information.",
    "Ensure compliance with legal and regulatory requirements.",
    "Improve data handling by defining access and usage guidelines.",
    "Mitigate risks of data breaches or unauthorized access.",
    "Streamline data management and resource allocation.",
  ];

  const stakeholderOptions = [
    "Data Owners",
    "Data Stewards",
    "IT / Security Teams",
    "Compliance / Legal Teams",
    "Executive Management",
    "Business Units",
  ];

  const regulationOptions = [
    "GDPR",
    "Algerian Law 18.07",
    "PCI DSS",
    "ISO/IEC 27001",
    "Basel III",
  ];

  const handleObjectiveChange = (
    objective: string,
    checked: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      primaryObjectives: checked
        ? [...prev.primaryObjectives, objective]
        : prev.primaryObjectives.filter((item) => item !== objective),
    }));
  };

  const handleStakeholderChange = (
    stakeholder: string,
    checked: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      stakeholders: checked
        ? [...prev.stakeholders, stakeholder]
        : prev.stakeholders.filter((item) => item !== stakeholder),
    }));
  };

  const handleRegulationChange = (
    regulation: string,
    checked: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      regulations: checked
        ? [...prev.regulations, regulation]
        : prev.regulations.filter((item) => item !== regulation),
    }));
  };

  // Functions for handling multiple "Other" items
  const addOtherItem = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      [category]: [...prev[category], ""],
    }));
  };

  const updateOtherItem = (category: string, index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [category]: prev[category].map((item: any, i: any) =>
        i === index ? value : item
      ),
    }));
  };

  const removeOtherItem = (category: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [category]: prev[category].filter((_: any, i: any) => i !== index),
    }));
  };

  const handleSubmit = () => {
    const results = {
      step: 1,
      title: "Understand Organization & Stakeholders",
      data: {
        primaryObjectives: {
          selected: formData.primaryObjectives,
          other: formData.primaryObjectivesOther.filter(
            (item) => item.trim() !== ""
          ),
        },
        organizationSize: formData.organizationSize,
        stakeholders: {
          selected: formData.stakeholders,
          other: formData.stakeholdersOther.filter(
            (item) => item.trim() !== ""
          ),
        },
        regulations: {
          selected: formData.regulations,
          other: formData.regulationsOther.filter((item) => item.trim() !== ""),
        },
      },
      timestamp: new Date().toISOString(),
    };

    console.log("Step 1 Results:", JSON.stringify(results, null, 2));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <style jsx>{`
        .primary-color {
          color: #792a9f;
        }
        .primary-bg {
          background-color: #792a9f;
        }
        .primary-border {
          border-color: #792a9f;
        }
        .hover-primary:hover {
          background-color: #792a9f;
          color: white;
        }
      `}</style>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl primary-color">
            Step 1: Understand Organization & Stakeholders
          </CardTitle>
          <CardDescription>
            This step helps us understand your organization's objectives and
            stakeholder structure for implementing a Data Classification Policy.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Question 1.1 - Primary Objectives */}
          <div className="space-y-4">
            <div>
              <Label className="text-lg font-semibold primary-color">
                1.1 What is the primary objective of implementing a Data
                Classification Policy?
              </Label>
              <p className="text-sm text-gray-600 mt-1">
                Select all that apply
              </p>
            </div>
            <div className="space-y-3">
              {primaryObjectiveOptions.map((objective, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Checkbox
                    id={`objective-${index}`}
                    checked={formData.primaryObjectives.includes(objective)}
                    onCheckedChange={(checked) =>
                      handleObjectiveChange(objective, checked)
                    }
                    className="mt-1 primary-border"
                  />
                  <Label
                    htmlFor={`objective-${index}`}
                    className="text-sm leading-relaxed cursor-pointer"
                  >
                    {objective}
                  </Label>
                </div>
              ))}

              {/* Multiple Other Options */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Other objectives:</Label>
                {formData.primaryObjectivesOther.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      placeholder="Please specify..."
                      value={item}
                      onChange={(e) =>
                        updateOtherItem(
                          "primaryObjectivesOther",
                          index,
                          e.target.value
                        )
                      }
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        removeOtherItem("primaryObjectivesOther", index)
                      }
                      className="hover-primary"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addOtherItem("primaryObjectivesOther")}
                  className="hover-primary"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Other Objective
                </Button>
              </div>
            </div>
          </div>

          {/* Question 1.2 - Organization Size */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold primary-color">
              1.2 How large is your organization in terms of data volume?
            </Label>
            <RadioGroup
              value={formData.organizationSize}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, organizationSize: value }))
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="small"
                  id="size-small"
                  className="primary-border"
                />
                <Label htmlFor="size-small">Small (&lt;100GB)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="medium"
                  id="size-medium"
                  className="primary-border"
                />
                <Label htmlFor="size-medium">Medium (100GB-1TB)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="large"
                  id="size-large"
                  className="primary-border"
                />
                <Label htmlFor="size-large">Large (&gt;1TB)</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Question 1.3 - Stakeholders */}
          <div className="space-y-4">
            <div>
              <Label className="text-lg font-semibold primary-color">
                1.3 Who are the stakeholders involved in data governance and
                classification?
              </Label>
              <p className="text-sm text-gray-600 mt-1">
                Select all that apply
              </p>
            </div>
            <div className="space-y-3">
              {stakeholderOptions.map((stakeholder, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Checkbox
                    id={`stakeholder-${index}`}
                    checked={formData.stakeholders.includes(stakeholder)}
                    onCheckedChange={(checked) =>
                      handleStakeholderChange(stakeholder, checked)
                    }
                    className="primary-border"
                  />
                  <Label
                    htmlFor={`stakeholder-${index}`}
                    className="text-sm cursor-pointer"
                  >
                    {stakeholder}
                  </Label>
                </div>
              ))}

              {/* Multiple Other Options */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Other stakeholders:
                </Label>
                {formData.stakeholdersOther.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      placeholder="Please specify..."
                      value={item}
                      onChange={(e) =>
                        updateOtherItem(
                          "stakeholdersOther",
                          index,
                          e.target.value
                        )
                      }
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        removeOtherItem("stakeholdersOther", index)
                      }
                      className="hover-primary"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addOtherItem("stakeholdersOther")}
                  className="hover-primary"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Other Stakeholder
                </Button>
              </div>
            </div>
          </div>

          {/* Question 1.4 - Regulations */}
          <div className="space-y-4">
            <div>
              <Label className="text-lg font-semibold primary-color">
                1.4 Are there any laws or regulations that apply to your data?
              </Label>
              <p className="text-sm text-gray-600 mt-1">
                Select all that apply
              </p>
            </div>
            <div className="space-y-3">
              {regulationOptions.map((regulation, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Checkbox
                    id={`regulation-${index}`}
                    checked={formData.regulations.includes(regulation)}
                    onCheckedChange={(checked) =>
                      handleRegulationChange(regulation, checked)
                    }
                    className="primary-border"
                  />
                  <Label
                    htmlFor={`regulation-${index}`}
                    className="text-sm cursor-pointer"
                  >
                    {regulation}
                  </Label>
                </div>
              ))}

              {/* Multiple Other Options */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Other regulations:
                </Label>
                {formData.regulationsOther.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      placeholder="Please specify..."
                      value={item}
                      onChange={(e) =>
                        updateOtherItem(
                          "regulationsOther",
                          index,
                          e.target.value
                        )
                      }
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeOtherItem("regulationsOther", index)}
                      className="hover-primary"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addOtherItem("regulationsOther")}
                  className="hover-primary"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Other Regulation
                </Button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <Button
              onClick={handleSubmit}
              className="w-full md:w-auto primary-bg hover:opacity-90"
              size="lg"
            >
              Submit Step 1 & View JSON Results
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

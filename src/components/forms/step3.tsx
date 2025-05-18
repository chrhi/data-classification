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
import { Button } from "@/components/ui/button";
import { Plus, X, Info } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea";

interface Step3Props {}

export default function Step3({}: Step3Props) {
  // Default classification levels
  const defaultLevels = [
    { name: "Public", selected: true },
    { name: "Internal", selected: true },
    { name: "Confidential", selected: true },
    { name: "Restricted", selected: true },
  ];

  // State for classification levels and custom levels
  const [classificationLevels, setClassificationLevels] =
    useState(defaultLevels);
  const [customLevels, setCustomLevels] = useState([]);

  // State for the definitions of each level
  const [levelDefinitions, setLevelDefinitions] = useState({
    Public: "",
    Internal: "",
    Confidential: "",
    Restricted: "",
  });

  // State for data categories and their classifications
  const [dataCategories, setDataCategories] = useState([
    {
      name: "Personal Data",
      description: "Data that can identify an individual",
      examples: "Names, addresses, email addresses, phone numbers",
      classification: "Confidential",
      note: "",
    },
    {
      name: "Financial Data",
      description: "Data related to financial transactions or accounts",
      examples: "Credit card numbers, account balances, transactions",
      classification: "Restricted",
      note: "",
    },
    {
      name: "Business Data",
      description: "Data related to operations and business functions",
      examples: "Schedules, non-sensitive internal documents, general policies",
      classification: "Internal",
      note: "",
    },
    {
      name: "Marketing Data",
      description: "Data used for marketing purposes",
      examples: "Public marketing materials, brochures, website content",
      classification: "Public",
      note: "",
    },
  ]);

  // Handle custom level changes
  const addCustomLevel = () => {
    setCustomLevels([...customLevels, ""]);
  };

  const updateCustomLevel = (index, value) => {
    const updated = [...customLevels];
    updated[index] = value;
    setCustomLevels(updated);

    // Update level definitions if needed
    if (value && !levelDefinitions[value]) {
      setLevelDefinitions({
        ...levelDefinitions,
        [value]: "",
      });
    }
  };

  const removeCustomLevel = (index) => {
    const levelToRemove = customLevels[index];
    const updatedCustomLevels = customLevels.filter((_, i) => i !== index);
    setCustomLevels(updatedCustomLevels);

    // Remove from level definitions
    if (levelToRemove) {
      const { [levelToRemove]: _, ...updatedDefinitions } = levelDefinitions;
      setLevelDefinitions(updatedDefinitions);

      // Also update any data categories using this level
      setDataCategories(
        dataCategories.map((category) => {
          if (category.classification === levelToRemove) {
            return { ...category, classification: "" };
          }
          return category;
        })
      );
    }
  };

  // Handle default level selection toggle
  const toggleDefaultLevel = (index) => {
    const updated = [...classificationLevels];
    updated[index].selected = !updated[index].selected;
    setClassificationLevels(updated);
  };

  // Handle level definitions
  const updateLevelDefinition = (level, definition) => {
    setLevelDefinitions({
      ...levelDefinitions,
      [level]: definition,
    });
  };

  // Handle data categories
  const addDataCategory = () => {
    setDataCategories([
      ...dataCategories,
      {
        name: "",
        description: "",
        examples: "",
        classification: "",
        note: "",
      },
    ]);
  };

  const updateDataCategory = (index, field, value) => {
    const updated = [...dataCategories];
    updated[index][field] = value;
    setDataCategories(updated);
  };

  const removeDataCategory = (index) => {
    setDataCategories(dataCategories.filter((_, i) => i !== index));
  };

  // Get all active classification levels
  const getAllLevels = () => {
    const defaultSelected = classificationLevels
      .filter((level) => level.selected)
      .map((level) => level.name);

    const validCustomLevels = customLevels.filter(
      (level) => level.trim() !== ""
    );

    return [...defaultSelected, ...validCustomLevels];
  };

  const handleSubmit = () => {
    const allLevels = getAllLevels();

    const results = {
      step: 3,
      title: "Classification Levels and Categories",
      data: {
        classificationLevels: {
          defaultLevels: classificationLevels
            .filter((level) => level.selected)
            .map((level) => level.name),
          customLevels: customLevels.filter((level) => level.trim() !== ""),
          definitions: Object.fromEntries(
            Object.entries(levelDefinitions).filter(([key]) =>
              allLevels.includes(key)
            )
          ),
        },
        dataCategories: dataCategories.filter(
          (category) => category.name.trim() !== ""
        ),
      },
      timestamp: new Date().toISOString(),
    };

    console.log("Step 3 Results:", JSON.stringify(results, null, 2));
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
            Step 3: Define Classification Levels and Categories
          </CardTitle>
          <CardDescription>
            Define the data classification levels used in your organization and
            assign them to your data categories.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Question 3.1 - Classification Levels */}
          <div className="space-y-4">
            <div>
              <Label className="text-lg font-semibold primary-color">
                3.1 What classification levels does your organization use to
                categorize data?
              </Label>
              <p className="text-sm text-gray-600 mt-1">
                Select the levels that apply to your organization or add custom
                ones.
              </p>
            </div>

            {/* Standard classification levels */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Standard levels:</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {classificationLevels.map((level, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Checkbox
                      id={`level-${index}`}
                      checked={level.selected}
                      onCheckedChange={() => toggleDefaultLevel(index)}
                      className="primary-border"
                    />
                    <Label
                      htmlFor={`level-${index}`}
                      className="text-sm cursor-pointer"
                    >
                      {level.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Classification Levels */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Custom classification levels:
              </Label>
              {customLevels.map((level, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    placeholder="e.g., Highly Sensitive"
                    value={level}
                    onChange={(e) => updateCustomLevel(index, e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeCustomLevel(index)}
                    className="hover-primary"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={addCustomLevel}
                className="hover-primary"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Custom Level
              </Button>
            </div>

            {/* Classification Level Definitions */}
            <div className="pt-6 space-y-4">
              <Label className="text-lg font-semibold primary-color">
                3.2 Define your classification levels
              </Label>
              <p className="text-sm text-gray-600 mt-1">
                Please provide a definition for each classification level your
                organization uses.
              </p>

              <div className="space-y-4">
                {getAllLevels().map((level, index) => (
                  <div key={index} className="space-y-2">
                    <Label htmlFor={`def-${level}`} className="font-medium">
                      {level}
                    </Label>
                    <Textarea
                      id={`def-${level}`}
                      placeholder={`Define the ${level} classification level...`}
                      value={levelDefinitions[level] || ""}
                      onChange={(e) =>
                        updateLevelDefinition(level, e.target.value)
                      }
                      className="min-h-20"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Data Categories and Classification Assignment */}
          <div className="pt-6 space-y-4">
            <div>
              <Label className="text-lg font-semibold primary-color">
                3.3 Data Categories and Classification Assignment
              </Label>
              <p className="text-sm text-gray-600 mt-1">
                Define your data categories and assign appropriate
                classification levels to each.
              </p>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Category</TableHead>
                  <TableHead className="w-[200px]">Description</TableHead>
                  <TableHead className="w-[200px]">Examples</TableHead>
                  <TableHead className="w-[120px]">Classification</TableHead>
                  <TableHead className="w-[100px]">Notes</TableHead>
                  <TableHead className="w-[60px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataCategories.map((category, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Input
                        placeholder="Category name"
                        value={category.name}
                        onChange={(e) =>
                          updateDataCategory(index, "name", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="Brief description"
                        value={category.description}
                        onChange={(e) =>
                          updateDataCategory(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="Example data types"
                        value={category.examples}
                        onChange={(e) =>
                          updateDataCategory(index, "examples", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={category.classification}
                        onValueChange={(value) =>
                          updateDataCategory(index, "classification", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {getAllLevels().map((level, i) => (
                            <SelectItem key={i} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const note = prompt(
                                  "Add a note for this category:",
                                  category.note
                                );
                                if (note !== null) {
                                  updateDataCategory(index, "note", note);
                                }
                              }}
                            >
                              <Info className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {category.note ? category.note : "Add a note"}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeDataCategory(index)}
                        className="hover-primary"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Button
              variant="outline"
              size="sm"
              onClick={addDataCategory}
              className="hover-primary"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Data Category
            </Button>

            {/* Classification Level Guide */}
            <div className="mt-8 p-4 bg-gray-50 rounded-md">
              <h4 className="font-semibold primary-color mb-2">
                Classification Level Guidelines
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                Recommended classification assignment based on standard norms:
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>
                  <span className="font-medium">Public:</span> None/Low
                  sensitivity, None/Low impact, No regulations.
                </li>
                <li>
                  <span className="font-medium">Internal:</span> Low/Medium
                  sensitivity, Low/Medium impact, minimal/no regulations.
                </li>
                <li>
                  <span className="font-medium">Confidential:</span> Medium/High
                  sensitivity, Medium/High impact, regulatory protection.
                </li>
                <li>
                  <span className="font-medium">Restricted:</span> High
                  sensitivity, High impact, critical regulations or
                  business-critical (e.g., trade secrets).
                </li>
              </ul>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <Button
              onClick={handleSubmit}
              className="w-full md:w-auto primary-bg hover:opacity-90"
              size="lg"
            >
              Submit Step 3 & View JSON Results
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

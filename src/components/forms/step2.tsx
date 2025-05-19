/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
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
import { ChevronDown, ChevronUp, Plus, X, Loader2 } from "lucide-react";
import { updateSecondStepByOrganizationId } from "@/actions/steps";
import { useRouter } from "next/navigation";

// Import Step 1 types if in separate file
export type Step1Data = {
  data: {
    primaryObjectives: { selected: string[]; other: string[] };
    organizationSize: string;
    stakeholders: { selected: string[]; other: string[] };
    regulations: { selected: string[]; other: string[] };
  };
};

export type Step1Result = {
  step: 1;
  title: string;
  data: Step1Data;
  timestamp: string;
};

export type DataTypeDetail = {
  sensitivity: string;
  businessImpact: string;
  hasRegulatory: string;
  regulations: string[];
  storage: string[];
  storageOther: string[];
};

export type Step2Data = {
  hasInventory: string;
  selectedDataTypes: string[];
  customDataTypes: string[];
  dataTypeDetails: Record<string, DataTypeDetail>;
};

export type Step2Result = {
  step: 2;
  title: string;
  data: Step2Data;
  timestamp: string;
};

type MainResult = {
  step1?: Step1Result;
  step2?: Step2Result;
};

interface Step2Props {
  initialData?: MainResult | null;
  organizationId: string;
}

export default function Step2({ initialData, organizationId }: Step2Props) {
  const router = useRouter();
  const [formData, setFormData] = useState(() => {
    const initialStep2 = initialData?.step2?.data;

    return {
      hasInventory: initialStep2?.hasInventory || "",
      selectedDataTypes: initialStep2?.selectedDataTypes || [],
      dataTypesOther: initialStep2?.customDataTypes || [],
      dataTypeDetails: initialStep2?.dataTypeDetails || {},
    };
  });

  const [expandedDataTypes, setExpandedDataTypes] = useState<
    Record<string, boolean>
  >({});

  // React Query mutation for updating step 2
  const updateSecondStepMutation = useMutation({
    mutationFn: async ({
      organizationId,
      data,
    }: {
      organizationId: string;
      data: any;
    }) => {
      const res = await updateSecondStepByOrganizationId(organizationId, data);

      console.log(res);
    },
    onSuccess: (data) => {
      router.push(`/projects/${organizationId}/step3`);
      toast.success("Step 2 data saved successfully!");
      console.log("Step 2 saved successfully:", data);
    },
    onError: (error) => {
      toast.error(`Failed to save step 2: ${error.message}`);
      console.error("Error saving step 2:", error);
    },
  });

  // Get regulations from Step 1 data
  const step1Regulations = [
    ...(initialData?.step1?.data.data.regulations.selected || []),
    ...(initialData?.step1?.data.data.regulations.other || []),
  ];

  const dataTypeOptions = [
    "Données personnelles",
    "Données d'identification",
    "Données de contact",
    "Données financières",
    "Données transactionnelles",
    "Préférences & interactions",
    "Comptes bancaires",
    "Crédits & prêts",
    "Cartes bancaires",
    "Assurances",
    "Placements / investissements",
    "Ressources humaines",
    "Structure organisationnelle",
    "Comptabilité interne",
    "Données fournisseurs / partenaires",
    "Scoring et notation de crédit",
    "Alertes AML / LCB-FT",
    "Sanctions & listes noires",
    "Audit & conformité",
    "Logs d'activité",
    "Données d'accès / authentification",
    "Paramétrages systèmes",
    "Données fiscales",
    "Données de conservation légale",
    "Campagnes marketing",
    "Segments clients",
    "Satisfaction & enquêtes",
  ];

  const sensitivityOptions = [
    { value: "none", label: "None" },
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const businessImpactOptions = [
    { value: "none", label: "None" },
    { value: "low", label: "Low (minor inconvenience)" },
    {
      value: "medium",
      label: "Medium (moderate financial or operational impact)",
    },
    {
      value: "high",
      label: "High (major financial, reputational, or legal consequences)",
    },
  ];

  const storageOptions = ["Local files", "Shared drive", "External database"];

  const handleDataTypeChange = (dataType: string, checked: boolean) => {
    setFormData((prev) => {
      const newSelectedDataTypes = checked
        ? [...prev.selectedDataTypes, dataType]
        : prev.selectedDataTypes.filter((item) => item !== dataType);

      const newDataTypeDetails = { ...prev.dataTypeDetails };
      if (checked) {
        newDataTypeDetails[dataType] = {
          sensitivity: "",
          businessImpact: "",
          hasRegulatory: "",
          regulations: [],
          storage: [],
          storageOther: [],
          ...initialData?.step2?.data.dataTypeDetails?.[dataType],
        };
      } else {
        delete newDataTypeDetails[dataType];
      }

      return {
        ...prev,
        selectedDataTypes: newSelectedDataTypes,
        dataTypeDetails: newDataTypeDetails,
      };
    });
  };

  const updateDataTypeDetail = (
    dataType: string,
    field: keyof DataTypeDetail,
    value: string | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      dataTypeDetails: {
        ...prev.dataTypeDetails,
        [dataType]: {
          ...prev.dataTypeDetails[dataType],
          [field]: value,
        },
      },
    }));
  };

  const addRegulation = (dataType: string) => {
    const current = formData.dataTypeDetails[dataType]?.regulations || [];
    updateDataTypeDetail(dataType, "regulations", [...current, ""]);
  };

  const updateRegulation = (dataType: string, index: number, value: string) => {
    const current = formData.dataTypeDetails[dataType]?.regulations || [];
    const updated = current.map((item, i) => (i === index ? value : item));
    updateDataTypeDetail(dataType, "regulations", updated);
  };

  const removeRegulation = (dataType: string, index: number) => {
    const current = formData.dataTypeDetails[dataType]?.regulations || [];
    const updated = current.filter((_, i) => i !== index);
    updateDataTypeDetail(dataType, "regulations", updated);
  };

  const handleStorageChange = (
    dataType: string,
    option: string,
    checked: boolean
  ) => {
    const current = formData.dataTypeDetails[dataType]?.storage || [];
    const updated = checked
      ? [...current, option]
      : current.filter((item) => item !== option);
    updateDataTypeDetail(dataType, "storage", updated);
  };

  const addStorageOther = (dataType: string) => {
    const current = formData.dataTypeDetails[dataType]?.storageOther || [];
    updateDataTypeDetail(dataType, "storageOther", [...current, ""]);
  };

  const updateStorageOther = (
    dataType: string,
    index: number,
    value: string
  ) => {
    const current = formData.dataTypeDetails[dataType]?.storageOther || [];
    const updated = current.map((item, i) => (i === index ? value : item));
    updateDataTypeDetail(dataType, "storageOther", updated);
  };

  const removeStorageOther = (dataType: string, index: number) => {
    const current = formData.dataTypeDetails[dataType]?.storageOther || [];
    const updated = current.filter((_, i) => i !== index);
    updateDataTypeDetail(dataType, "storageOther", updated);
  };

  const addOtherDataType = () => {
    setFormData((prev) => ({
      ...prev,
      dataTypesOther: [...prev.dataTypesOther, ""],
    }));
  };

  const updateOtherDataType = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      dataTypesOther: prev.dataTypesOther.map((item, i) =>
        i === index ? value : item
      ),
    }));
  };

  const removeOtherDataType = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      dataTypesOther: prev.dataTypesOther.filter((_, i) => i !== index),
      selectedDataTypes: prev.selectedDataTypes.filter(
        (item) => item !== prev.dataTypesOther[index]
      ),
    }));
  };

  const toggleExpanded = (dataType: string) => {
    setExpandedDataTypes((prev) => ({
      ...prev,
      [dataType]: !prev[dataType],
    }));
  };

  const handleSubmit = async () => {
    // Validate form data
    if (!formData.hasInventory) {
      toast.error("Please answer whether you have an up-to-date inventory");
      return;
    }

    if (
      formData.hasInventory === "no" &&
      formData.selectedDataTypes.length === 0
    ) {
      toast.error("Please select at least one data type");
      return;
    }

    // Create the results object
    const results: Step2Result = {
      step: 2,
      title: "Data Landscape",
      data: {
        hasInventory: formData.hasInventory,
        selectedDataTypes: formData.selectedDataTypes,
        customDataTypes: formData.dataTypesOther.filter(
          (item) => item.trim() !== ""
        ),
        dataTypeDetails: Object.fromEntries(
          Object.entries(formData.dataTypeDetails).map(([key, value]) => [
            key,
            {
              ...value,
              regulations: value.regulations.filter((reg) => reg.trim() !== ""),
              storageOther: value.storageOther.filter(
                (storage) => storage.trim() !== ""
              ),
            },
          ])
        ),
      },
      timestamp: new Date().toISOString(),
    };

    // Save to database using React Query mutation
    try {
      await updateSecondStepMutation.mutateAsync({
        organizationId,
        data: results,
      });

      // Also log for debugging
      console.log("Step 2 Results:", JSON.stringify(results, null, 2));
    } catch (error) {
      // Error is already handled in the mutation's onError callback
      console.error("Submission failed:", error);
    }
  };

  return (
    <div className="w-full mx-auto p-6 space-y-6">
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
        .expanded-section {
          border-left: 3px solid #792a9f;
        }
      `}</style>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl primary-color">
            Step 2: Data Landscape
          </CardTitle>
          <CardDescription>
            This step helps us understand your current data inventory and assess
            different data types within your organization.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Question 2.1 - Data Inventory */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold primary-color">
              2.1 Do you have an up-to-date inventory?
            </Label>
            <RadioGroup
              value={formData.hasInventory}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, hasInventory: value }))
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="yes"
                  id="inventory-yes"
                  className="primary-border"
                />
                <Label htmlFor="inventory-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="no"
                  id="inventory-no"
                  className="primary-border"
                />
                <Label htmlFor="inventory-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Question 2.2 - Data Types */}
          {formData.hasInventory === "no" && (
            <div className="space-y-4">
              <div>
                <Label className="text-lg font-semibold primary-color">
                  2.2 Select the data types present in your organization:
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  Select all that apply. You&apos;ll be able to provide details
                  for each selected type.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {dataTypeOptions.map((dataType, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Checkbox
                      id={`datatype-${index}`}
                      checked={formData.selectedDataTypes.includes(dataType)}
                      onCheckedChange={(checked) =>
                        handleDataTypeChange(dataType, !!checked)
                      }
                      className="primary-border"
                    />
                    <Label
                      htmlFor={`datatype-${index}`}
                      className="text-sm cursor-pointer"
                    >
                      {dataType}
                    </Label>
                  </div>
                ))}
              </div>

              {/* Custom Data Types */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Custom data types:
                </Label>
                {formData.dataTypesOther.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.selectedDataTypes.includes(item)}
                      onCheckedChange={(checked) => {
                        if (item.trim()) {
                          handleDataTypeChange(item, !!checked);
                        }
                      }}
                      className="primary-border"
                    />
                    <Input
                      placeholder="Please specify..."
                      value={item}
                      onChange={(e) =>
                        updateOtherDataType(index, e.target.value)
                      }
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeOtherDataType(index)}
                      className="hover-primary"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addOtherDataType}
                  className="hover-primary"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Custom Data Type
                </Button>
              </div>
            </div>
          )}

          {/* Data Type Details */}
          {formData.hasInventory === "no" &&
            formData.selectedDataTypes.length > 0 && (
              <div className="space-y-6">
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold primary-color mb-4">
                    Data Type Assessment
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Please provide details for each selected data type. Click on
                    each data type to expand the form.
                  </p>
                </div>

                {formData.selectedDataTypes.map((dataType) => (
                  <Card
                    key={dataType}
                    className={`${
                      expandedDataTypes[dataType] ? "expanded-section" : ""
                    }`}
                  >
                    <CardHeader
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleExpanded(dataType)}
                    >
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base primary-color">
                          {dataType}
                        </CardTitle>
                        {expandedDataTypes[dataType] ? (
                          <ChevronUp className="h-5 w-5 primary-color" />
                        ) : (
                          <ChevronDown className="h-5 w-5 primary-color" />
                        )}
                      </div>
                    </CardHeader>

                    {expandedDataTypes[dataType] && (
                      <CardContent className="space-y-6">
                        {/* Sensitivity */}
                        <div className="space-y-3">
                          <Label className="font-medium">
                            2.3 How sensitive is the {dataType}?
                          </Label>
                          <RadioGroup
                            value={
                              formData.dataTypeDetails[dataType]?.sensitivity ||
                              ""
                            }
                            onValueChange={(value) =>
                              updateDataTypeDetail(
                                dataType,
                                "sensitivity",
                                value
                              )
                            }
                          >
                            {sensitivityOptions.map((option) => (
                              <div
                                key={option.value}
                                className="flex items-center space-x-2"
                              >
                                <RadioGroupItem
                                  value={option.value}
                                  id={`${dataType}-sensitivity-${option.value}`}
                                  className="primary-border"
                                />
                                <Label
                                  htmlFor={`${dataType}-sensitivity-${option.value}`}
                                >
                                  {option.label}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>

                        {/* Business Impact */}
                        <div className="space-y-3">
                          <Label className="font-medium">
                            2.4 Business impact assessment
                          </Label>
                          <RadioGroup
                            value={
                              formData.dataTypeDetails[dataType]
                                ?.businessImpact || ""
                            }
                            onValueChange={(value) =>
                              updateDataTypeDetail(
                                dataType,
                                "businessImpact",
                                value
                              )
                            }
                          >
                            {businessImpactOptions.map((option) => (
                              <div
                                key={option.value}
                                className="flex items-center space-x-2"
                              >
                                <RadioGroupItem
                                  value={option.value}
                                  id={`${dataType}-impact-${option.value}`}
                                  className="primary-border"
                                />
                                <Label
                                  htmlFor={`${dataType}-impact-${option.value}`}
                                >
                                  {option.label}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>

                        {/* Regulatory Protection */}
                        <div className="space-y-3">
                          <Label className="font-medium">
                            2.5 Regulatory Protection
                          </Label>
                          <RadioGroup
                            value={
                              formData.dataTypeDetails[dataType]
                                ?.hasRegulatory || ""
                            }
                            onValueChange={(value) =>
                              updateDataTypeDetail(
                                dataType,
                                "hasRegulatory",
                                value
                              )
                            }
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="yes"
                                id={`${dataType}-regulatory-yes`}
                                className="primary-border"
                              />
                              <Label htmlFor={`${dataType}-regulatory-yes`}>
                                Yes
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="no"
                                id={`${dataType}-regulatory-no`}
                                className="primary-border"
                              />
                              <Label htmlFor={`${dataType}-regulatory-no`}>
                                No
                              </Label>
                            </div>
                          </RadioGroup>

                          {formData.dataTypeDetails[dataType]?.hasRegulatory ===
                            "yes" && (
                            <div className="space-y-2 ml-6">
                              <Label className="text-sm font-medium">
                                Applicable Regulations
                              </Label>
                              {step1Regulations.map((regulation, index) => (
                                <div
                                  key={index}
                                  className="flex items-center space-x-2"
                                >
                                  <Checkbox
                                    id={`${dataType}-regulation-${index}`}
                                    checked={formData.dataTypeDetails[
                                      dataType
                                    ]?.regulations.includes(regulation)}
                                    onCheckedChange={(checked) => {
                                      const current =
                                        formData.dataTypeDetails[dataType]
                                          ?.regulations || [];
                                      const updated = checked
                                        ? [...current, regulation]
                                        : current.filter(
                                            (r) => r !== regulation
                                          );
                                      updateDataTypeDetail(
                                        dataType,
                                        "regulations",
                                        updated
                                      );
                                    }}
                                    className="primary-border"
                                  />
                                  <Label
                                    htmlFor={`${dataType}-regulation-${index}`}
                                    className="text-sm cursor-pointer"
                                  >
                                    {regulation}
                                  </Label>
                                </div>
                              ))}
                              {formData.dataTypeDetails[dataType]?.regulations
                                .filter((r) => !step1Regulations.includes(r))
                                .map((regulation, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center space-x-2"
                                  >
                                    <Input
                                      placeholder="Custom regulation..."
                                      value={regulation}
                                      onChange={(e) =>
                                        updateRegulation(
                                          dataType,
                                          index + step1Regulations.length,
                                          e.target.value
                                        )
                                      }
                                      className="flex-1"
                                    />
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        removeRegulation(
                                          dataType,
                                          index + step1Regulations.length
                                        )
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
                                onClick={() => addRegulation(dataType)}
                                className="hover-primary"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Custom Regulation
                              </Button>
                            </div>
                          )}
                        </div>

                        {/* Storage Location */}
                        <div className="space-y-3">
                          <Label className="font-medium">
                            2.6 Storage Locations
                          </Label>
                          <div className="space-y-2">
                            {storageOptions.map((option, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-3"
                              >
                                <Checkbox
                                  id={`${dataType}-storage-${index}`}
                                  checked={
                                    formData.dataTypeDetails[
                                      dataType
                                    ]?.storage.includes(option) || false
                                  }
                                  onCheckedChange={(checked) =>
                                    handleStorageChange(
                                      dataType,
                                      option,
                                      !!checked
                                    )
                                  }
                                  className="primary-border"
                                />
                                <Label
                                  htmlFor={`${dataType}-storage-${index}`}
                                  className="text-sm cursor-pointer"
                                >
                                  {option}
                                </Label>
                              </div>
                            ))}

                            <div className="space-y-2">
                              <Label className="text-sm font-medium">
                                Other Storage Locations
                              </Label>
                              {formData.dataTypeDetails[
                                dataType
                              ]?.storageOther?.map((item, index) => (
                                <div
                                  key={index}
                                  className="flex items-center space-x-2"
                                >
                                  <Input
                                    placeholder="Specify storage..."
                                    value={item}
                                    onChange={(e) =>
                                      updateStorageOther(
                                        dataType,
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
                                      removeStorageOther(dataType, index)
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
                                onClick={() => addStorageOther(dataType)}
                                className="hover-primary"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Other Storage
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            )}

          {/* Submit Button */}
          <div className="pt-6 w-full flex items-center justify-end  gap-x-4">
            <Button
              onClick={() => router.push(`/projects/${organizationId}/step1`)}
              variant={"outline"}
            >
              previous
            </Button>
            <Button
              onClick={handleSubmit}
              className="w-full md:w-auto primary-bg hover:opacity-90"
              disabled={updateSecondStepMutation.isPending}
            >
              {updateSecondStepMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "save & go next"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

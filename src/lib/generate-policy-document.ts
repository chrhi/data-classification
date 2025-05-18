// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
} from "docx";

export interface PolicyData {
  objective: string;
  stakeholders: string[];
  businessProcesses: string[];
  dataTypes: string[];
  departments: string[];
  hasDataInventory: boolean | null;
  dataInventoryLink: string;
  needsGuidance: boolean | null;
  dataValueAssessment: string[];
  businessImpacts: Record<string, string>;
  sensitivityLevels: string[];
  customClassification: {
    [key: string]: {
      name: string;
      description: string;
      examples: string;
    };
  };
  organizationName: string;
  version: string;
  approvalRoles: string[];
}

export async function generatePolicyDocument(
  policyData: PolicyData
): Promise<Blob> {
  // Helper function to create section headers

  const createSectionHeader = (
    text: string,
    //@ts-expect-error this is a type error
    level: HeadingLevel = HeadingLevel.HEADING_1
  ) => {
    return new Paragraph({
      text,
      heading: level,
      spacing: { before: 400, after: 200 },
    });
  };

  // Helper function to create bullet points
  const createBulletPoint = (text: string) => {
    return new Paragraph({
      text,
      bullet: { level: 0 },
      spacing: { before: 100, after: 100 },
    });
  };

  // Helper function to create normal text
  const createNormalText = (text: string) => {
    return new Paragraph({
      children: [new TextRun(text)],
      spacing: { before: 100, after: 100 },
    });
  };

  // Helper function to format impact level with color
  const getImpactFormatting = (level: string) => {
    let color = "#000000";
    switch (level.toLowerCase()) {
      case "critical":
        color = "#DC2626"; // Red
        break;
      case "high":
        color = "#EA580C"; // Orange
        break;
      case "moderate":
        color = "#CA8A04"; // Yellow
        break;
      case "low":
        color = "#16A34A"; // Green
        break;
    }
    return { color, bold: true };
  };

  // Create the document structure
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Title Page
          new Paragraph({
            children: [
              new TextRun({
                text: "DATA CLASSIFICATION POLICY",
                bold: true,
                size: 48,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 400, after: 400 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: policyData.organizationName || "Organization Name",
                size: 32,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 200 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: `Version ${policyData.version}`,
                italics: true,
                size: 24,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 800 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: `Generated on: ${new Date().toLocaleDateString()}`,
                size: 20,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 400 },
          }),

          // Page break
          new Paragraph({
            children: [new TextRun("")],
            pageBreakBefore: true,
          }),

          // 1. Executive Summary
          createSectionHeader("1. Executive Summary", HeadingLevel.HEADING_1),
          createNormalText(
            "This Data Classification Policy establishes a framework for classifying, handling, and protecting data assets within the organization. The policy ensures appropriate security measures are applied based on data sensitivity and business value."
          ),

          // 2. Policy Objective
          createSectionHeader("2. Policy Objective", HeadingLevel.HEADING_1),
          createNormalText(
            policyData.objective ||
              "Define comprehensive data classification standards to protect organizational data assets."
          ),

          // 3. Scope and Stakeholders
          createSectionHeader(
            "3. Scope and Stakeholders",
            HeadingLevel.HEADING_1
          ),
          createSectionHeader("3.1 Stakeholders", HeadingLevel.HEADING_2),
          createNormalText(
            "This policy applies to the following stakeholders:"
          ),
          ...policyData.stakeholders.map((stakeholder) =>
            createBulletPoint(stakeholder)
          ),

          createSectionHeader("3.2 Departments", HeadingLevel.HEADING_2),
          createNormalText(
            "The following departments are covered under this policy:"
          ),
          ...policyData.departments.map((dept) => createBulletPoint(dept)),

          createSectionHeader("3.3 Business Processes", HeadingLevel.HEADING_2),
          createNormalText(
            "This policy governs data handling in these business processes:"
          ),
          ...policyData.businessProcesses.map((process) =>
            createBulletPoint(process)
          ),

          // 4. Data Classification Framework
          createSectionHeader(
            "4. Data Classification Framework",
            HeadingLevel.HEADING_1
          ),
          createNormalText(
            "The organization uses the following data classification levels:"
          ),

          // Classification table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              // Header row
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Classification Level",
                            bold: true,
                          }),
                        ],
                      }),
                    ],
                    width: { size: 25, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "Description", bold: true }),
                        ],
                      }),
                    ],
                    width: { size: 40, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "Examples", bold: true }),
                        ],
                      }),
                    ],
                    width: { size: 35, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
              // Data rows
              ...Object.entries(policyData.customClassification).map(
                ([key, classification]) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: classification.name,
                                bold: true,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [new TextRun(classification.description)],
                          }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [new TextRun(classification.examples)],
                          }),
                        ],
                      }),
                    ],
                  })
              ),
            ],
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1 },
              bottom: { style: BorderStyle.SINGLE, size: 1 },
              left: { style: BorderStyle.SINGLE, size: 1 },
              right: { style: BorderStyle.SINGLE, size: 1 },
              insideHorizontal: { style: BorderStyle.SINGLE, size: 1 },
              insideVertical: { style: BorderStyle.SINGLE, size: 1 },
            },
          }),

          // 5. Data Inventory Management
          createSectionHeader(
            "5. Data Inventory Management",
            HeadingLevel.HEADING_1
          ),
          createNormalText(
            `Data Inventory Status: ${
              policyData.hasDataInventory ? "Available" : "Not Available"
            }`
          ),

          ...(policyData.hasDataInventory && policyData.dataInventoryLink
            ? [
                createNormalText(
                  `Data Inventory Reference: ${policyData.dataInventoryLink}`
                ),
              ]
            : []),

          // 6. Data Value Assessment
          createSectionHeader(
            "6. Data Value Assessment",
            HeadingLevel.HEADING_1
          ),
          createNormalText(
            "The following criteria are used to assess data value:"
          ),
          ...policyData.dataValueAssessment.map((criteria) =>
            createBulletPoint(criteria)
          ),

          // 7. Business Impact Analysis
          createSectionHeader(
            "7. Business Impact Analysis",
            HeadingLevel.HEADING_1
          ),
          createNormalText(
            "The potential business impacts and their severity levels are assessed as follows:"
          ),

          // Business impacts table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "Impact Type", bold: true }),
                        ],
                      }),
                    ],
                    width: { size: 70, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "Severity Level", bold: true }),
                        ],
                      }),
                    ],
                    width: { size: 30, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
              ...Object.entries(policyData.businessImpacts).map(
                ([impact, level]) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({ children: [new TextRun(impact)] }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: level.toUpperCase(),
                                ...getImpactFormatting(level),
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  })
              ),
            ],
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1 },
              bottom: { style: BorderStyle.SINGLE, size: 1 },
              left: { style: BorderStyle.SINGLE, size: 1 },
              right: { style: BorderStyle.SINGLE, size: 1 },
              insideHorizontal: { style: BorderStyle.SINGLE, size: 1 },
              insideVertical: { style: BorderStyle.SINGLE, size: 1 },
            },
          }),

          // 8. Implementation Guidelines
          createSectionHeader(
            "8. Implementation Guidelines",
            HeadingLevel.HEADING_1
          ),
          createNormalText(
            "All data must be classified according to this framework and handled accordingly. Regular reviews should be conducted to ensure compliance and update classifications as needed."
          ),

          // 9. Compliance and Governance
          createSectionHeader(
            "9. Compliance and Governance",
            HeadingLevel.HEADING_1
          ),
          createNormalText(
            "This policy is approved and maintained by the following roles:"
          ),
          ...policyData.approvalRoles.map((role) => createBulletPoint(role)),

          // 10. Document Control
          createSectionHeader("10. Document Control", HeadingLevel.HEADING_1),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "Version", bold: true }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [new TextRun(policyData.version)],
                      }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "Creation Date", bold: true }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun(new Date().toLocaleDateString()),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "Organization", bold: true }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [new TextRun(policyData.organizationName)],
                      }),
                    ],
                  }),
                ],
              }),
            ],
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1 },
              bottom: { style: BorderStyle.SINGLE, size: 1 },
              left: { style: BorderStyle.SINGLE, size: 1 },
              right: { style: BorderStyle.SINGLE, size: 1 },
              insideHorizontal: { style: BorderStyle.SINGLE, size: 1 },
              insideVertical: { style: BorderStyle.SINGLE, size: 1 },
            },
          }),
        ],
      },
    ],
  });

  // Generate the document buffer
  const buffer = await Packer.toBuffer(doc);
  //@ts-expect-error this is a used
  return new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
}

// Helper function to trigger download in browser
export function downloadPolicyDocument(
  blob: Blob,
  organizationName: string,
  version: string
) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const filename = `${organizationName.replace(
    /\s+/g,
    "_"
  )}_Data_Classification_Policy_v${version}.docx`;

  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Usage example function
export async function generateAndDownloadPolicy(policyData: PolicyData) {
  try {
    const blob = await generatePolicyDocument(policyData);
    downloadPolicyDocument(
      blob,
      policyData.organizationName,
      policyData.version
    );
    return { success: true };
  } catch (error) {
    console.error("Error generating policy document:", error);
    return { success: false, error };
  }
}

// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { ChevronLeft, ChevronRight, FileText, LinkIcon } from "lucide-react";
// import { useState } from "react";

// const formSchema = z.object({
//   // Step 1
//   objective: z.string().min(10, "Objective must be at least 10 characters"),
//   stakeholders: z.array(z.string()).min(1, "Select at least one stakeholder"),
//   businessProcesses: z
//     .array(z.string())
//     .min(1, "Select at least one business process"),
//   dataTypes: z.array(z.string()).min(1, "Select at least one data type"),
//   departments: z.array(z.string()).min(1, "Select at least one department"),

//   // Step 2
//   hasDataInventory: z.boolean().nullable(),
//   dataInventoryLink: z.string().optional(),
//   needsGuidance: z.boolean().nullable(),

//   // Step 3
//   dataValueAssessment: z
//     .array(z.string())
//     .min(1, "Select at least one assessment method"),
//   businessImpacts: z.record(z.string()),
//   sensitivityLevels: z
//     .array(z.string())
//     .min(1, "Select at least one sensitivity level"),
//   customClassification: z.object({
//     public: z.object({
//       name: z.string(),
//       description: z.string(),
//       examples: z.string(),
//     }),
//     internal: z.object({
//       name: z.string(),
//       description: z.string(),
//       examples: z.string(),
//     }),
//     confidential: z.object({
//       name: z.string(),
//       description: z.string(),
//       examples: z.string(),
//     }),
//     restricted: z.object({
//       name: z.string(),
//       description: z.string(),
//       examples: z.string(),
//     }),
//   }),

//   // Step 4
//   organizationName: z.string().min(1, "Organization name is required"),
//   version: z.string().default("1.0"),
//   approvalRoles: z
//     .array(z.string())
//     .min(1, "Select at least one approval role"),
// });

// const stakeholderOptions = [
//   "CISO",
//   "DPO",
//   "IT Manager",
//   "Compliance Officer",
//   "Legal Counsel",
//   "Business Unit Owners",
//   "Data Stewards",
//   "Executive Sponsor",
// ];
// const businessProcessOptions = [
//   "Customer onboarding",
//   "Transaction processing",
//   "Legal review",
//   "Product development",
//   "Marketing campaigns",
//   "HR management",
//   "Financial reporting",
//   "Supply chain management",
// ];
// const dataTypeOptions = [
//   "PII (Personally Identifiable Information)",
//   "PHI (Protected Health Information)",
//   "Financial data",
//   "Contracts",
//   "Source code",
//   "Emails",
//   "System logs",
//   "Customer data",
// ];
// const departmentOptions = [
//   "Executive",
//   "Finance",
//   "Human Resources",
//   "Information Technology",
//   "Legal",
//   "Marketing",
//   "Operations",
//   "Research & Development",
// ];
// const dataValueOptions = [
//   "Revenue impact",
//   "Regulatory risk",
//   "Reputational damage",
//   "Operational dependency",
//   "Competitive advantage",
//   "Customer trust",
//   "Legal liability",
//   "Business continuity",
// ];
// const businessImpactOptions = [
//   "Financial penalties",
//   "Legal action",
//   "Service outage",
//   "Loss of customers",
//   "Reputational damage",
//   "Competitive disadvantage",
//   "Regulatory sanctions",
//   "Operational disruption",
// ];
// const sensitivityLevels = ["Public", "Internal", "Confidential", "Restricted"];
// const approvalRoles = [
//   "CISO",
//   "DPO",
//   "Data Governance Team",
//   "Legal Counsel",
//   "Compliance Officer",
//   "CEO",
// ];

// export function PolicyGenerator() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const totalSteps = 4;

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       objective: "",
//       stakeholders: [],
//       businessProcesses: [],
//       dataTypes: [],
//       departments: [],
//       hasDataInventory: null,
//       dataInventoryLink: "",
//       needsGuidance: null,
//       dataValueAssessment: [],
//       businessImpacts: {},
//       sensitivityLevels: [],
//       customClassification: {
//         public: {
//           name: "Public",
//           description: "Information that can be freely shared with the public",
//           examples: "Marketing materials, public website content",
//         },
//         internal: {
//           name: "Internal",
//           description: "Information for internal use only",
//           examples: "Internal announcements, non-sensitive procedures",
//         },
//         confidential: {
//           name: "Confidential",
//           description: "Sensitive information with restricted access",
//           examples: "HR records, financial data, customer information",
//         },
//         restricted: {
//           name: "Restricted",
//           description:
//             "Highly sensitive information with strict access controls",
//           examples: "Trade secrets, security infrastructure details",
//         },
//       },
//       organizationName: "",
//       version: "1.0",
//       approvalRoles: [],
//     },
//   });

//   const stepFields = [
//     [
//       "objective",
//       "stakeholders",
//       "businessProcesses",
//       "dataTypes",
//       "departments",
//     ],
//     ["hasDataInventory", "dataInventoryLink", "needsGuidance"],
//     [
//       "dataValueAssessment",
//       "businessImpacts",
//       "sensitivityLevels",
//       "customClassification",
//     ],
//     ["organizationName", "version", "approvalRoles"],
//   ];

//   async function onNext() {
//     const fields = stepFields[currentStep - 1];
//     const isValid = await form.trigger(fields as any);

//     if (isValid && currentStep < totalSteps) {
//       setCurrentStep((prev) => prev + 1);
//     }
//   }

//   function onPrevious() {
//     if (currentStep > 1) setCurrentStep((prev) => prev - 1);
//   }

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     console.log("Form Submission:", JSON.stringify(values, null, 2));
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//           <div className="space-y-4">
//             <Progress value={(currentStep / totalSteps) * 100} />
//             <div className="flex justify-between text-sm text-muted-foreground">
//               <div>Context</div>
//               <div>Inventory</div>
//               <div>Classification</div>
//               <div>Generate</div>
//             </div>
//           </div>

//           {/* Step 1 */}
//           {currentStep === 1 && (
//             <Card>
//               <CardHeader>
//                 <CardTitle>Step 1: Define Context and Objectives</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <FormField
//                   control={form.control}
//                   name="objective"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Policy Objective</FormLabel>
//                       <FormControl>
//                         <Textarea
//                           {...field}
//                           placeholder="Enter mission statement or goals..."
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="stakeholders"
//                   render={() => (
//                     <FormItem>
//                       <FormLabel>Stakeholders</FormLabel>
//                       <div className="grid grid-cols-2 gap-2">
//                         {stakeholderOptions.map((option) => (
//                           <FormField
//                             key={option}
//                             control={form.control}
//                             name="stakeholders"
//                             render={({ field }) => (
//                               <FormItem className="flex items-center space-x-2">
//                                 <FormControl>
//                                   <Checkbox
//                                     checked={field.value?.includes(option)}
//                                     onCheckedChange={(checked) => {
//                                       return checked
//                                         ? field.onChange([
//                                             ...field.value,
//                                             option,
//                                           ])
//                                         : field.onChange(
//                                             field.value.filter(
//                                               (v) => v !== option
//                                             )
//                                           );
//                                     }}
//                                   />
//                                 </FormControl>
//                                 <FormLabel className="font-normal">
//                                   {option}
//                                 </FormLabel>
//                               </FormItem>
//                             )}
//                           />
//                         ))}
//                       </div>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="businessProcesses"
//                   render={() => (
//                     <FormItem>
//                       <FormLabel>Business Processes</FormLabel>
//                       <div className="grid grid-cols-2 gap-2">
//                         {businessProcessOptions.map((option) => (
//                           <FormField
//                             key={option}
//                             control={form.control}
//                             name="businessProcesses"
//                             render={({ field }) => (
//                               <FormItem className="flex items-center space-x-2">
//                                 <FormControl>
//                                   <Checkbox
//                                     checked={field.value?.includes(option)}
//                                     onCheckedChange={(checked) => {
//                                       return checked
//                                         ? field.onChange([
//                                             ...field.value,
//                                             option,
//                                           ])
//                                         : field.onChange(
//                                             field.value.filter(
//                                               (v) => v !== option
//                                             )
//                                           );
//                                     }}
//                                   />
//                                 </FormControl>
//                                 <FormLabel className="font-normal">
//                                   {option}
//                                 </FormLabel>
//                               </FormItem>
//                             )}
//                           />
//                         ))}
//                       </div>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="dataTypes"
//                   render={() => (
//                     <FormItem>
//                       <FormLabel>Data Types</FormLabel>
//                       <div className="grid grid-cols-2 gap-2">
//                         {dataTypeOptions.map((option) => (
//                           <FormField
//                             key={option}
//                             control={form.control}
//                             name="dataTypes"
//                             render={({ field }) => (
//                               <FormItem className="flex items-center space-x-2">
//                                 <FormControl>
//                                   <Checkbox
//                                     checked={field.value?.includes(option)}
//                                     onCheckedChange={(checked) => {
//                                       return checked
//                                         ? field.onChange([
//                                             ...field.value,
//                                             option,
//                                           ])
//                                         : field.onChange(
//                                             field.value.filter(
//                                               (v) => v !== option
//                                             )
//                                           );
//                                     }}
//                                   />
//                                 </FormControl>
//                                 <FormLabel className="font-normal">
//                                   {option}
//                                 </FormLabel>
//                               </FormItem>
//                             )}
//                           />
//                         ))}
//                       </div>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="departments"
//                   render={() => (
//                     <FormItem>
//                       <FormLabel>Departments</FormLabel>
//                       <div className="grid grid-cols-2 gap-2">
//                         {departmentOptions.map((option) => (
//                           <FormField
//                             key={option}
//                             control={form.control}
//                             name="departments"
//                             render={({ field }) => (
//                               <FormItem className="flex items-center space-x-2">
//                                 <FormControl>
//                                   <Checkbox
//                                     checked={field.value?.includes(option)}
//                                     onCheckedChange={(checked) => {
//                                       return checked
//                                         ? field.onChange([
//                                             ...field.value,
//                                             option,
//                                           ])
//                                         : field.onChange(
//                                             field.value.filter(
//                                               (v) => v !== option
//                                             )
//                                           );
//                                     }}
//                                   />
//                                 </FormControl>
//                                 <FormLabel className="font-normal">
//                                   {option}
//                                 </FormLabel>
//                               </FormItem>
//                             )}
//                           />
//                         ))}
//                       </div>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </CardContent>
//             </Card>
//           )}

//           {/* Step 2 */}
//           {currentStep === 2 && (
//             <Card>
//               <CardHeader>
//                 <CardTitle>Step 2: Data Inventory & Discovery</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <FormField
//                   control={form.control}
//                   name="hasDataInventory"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Data Inventory Exists?</FormLabel>
//                       <FormControl>
//                         <RadioGroup
//                           onValueChange={(value) =>
//                             field.onChange(value === "true")
//                           }
//                           value={
//                             field.value === null
//                               ? undefined
//                               : field.value.toString()
//                           }
//                           className="flex space-x-4"
//                         >
//                           <FormItem className="flex items-center space-x-2">
//                             <FormControl>
//                               <RadioGroupItem value="true" />
//                             </FormControl>
//                             <FormLabel>Yes</FormLabel>
//                           </FormItem>
//                           <FormItem className="flex items-center space-x-2">
//                             <FormControl>
//                               <RadioGroupItem value="false" />
//                             </FormControl>
//                             <FormLabel>No</FormLabel>
//                           </FormItem>
//                         </RadioGroup>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {form.watch("hasDataInventory") && (
//                   <FormField
//                     control={form.control}
//                     name="dataInventoryLink"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Data Inventory Link</FormLabel>
//                         <FormControl>
//                           <div className="flex items-center gap-2">
//                             <LinkIcon className="h-4 w-4 text-muted-foreground" />
//                             <Input
//                               {...field}
//                               placeholder="Enter inventory link..."
//                             />
//                           </div>
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 )}

//                 {form.watch("hasDataInventory") === false && (
//                   <FormField
//                     control={form.control}
//                     name="needsGuidance"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Need Guidance?</FormLabel>
//                         <FormControl>
//                           <RadioGroup
//                             onValueChange={(value) =>
//                               field.onChange(value === "true")
//                             }
//                             value={
//                               field.value === null
//                                 ? undefined
//                                 : field.value.toString()
//                             }
//                             className="flex space-x-4"
//                           >
//                             <FormItem className="flex items-center space-x-2">
//                               <FormControl>
//                                 <RadioGroupItem value="true" />
//                               </FormControl>
//                               <FormLabel>Yes</FormLabel>
//                             </FormItem>
//                             <FormItem className="flex items-center space-x-2">
//                               <FormControl>
//                                 <RadioGroupItem value="false" />
//                               </FormControl>
//                               <FormLabel>No</FormLabel>
//                             </FormItem>
//                           </RadioGroup>
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 )}
//               </CardContent>
//             </Card>
//           )}

//           {/* Step 3 */}
//           {currentStep === 3 && (
//             <Card>
//               <CardHeader>
//                 <CardTitle>Step 3: Classification Criteria</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <FormField
//                   control={form.control}
//                   name="dataValueAssessment"
//                   render={() => (
//                     <FormItem>
//                       <FormLabel>Data Value Assessment</FormLabel>
//                       <div className="grid grid-cols-2 gap-2">
//                         {dataValueOptions.map((option) => (
//                           <FormField
//                             key={option}
//                             control={form.control}
//                             name="dataValueAssessment"
//                             render={({ field }) => (
//                               <FormItem className="flex items-center space-x-2">
//                                 <FormControl>
//                                   <Checkbox
//                                     checked={field.value?.includes(option)}
//                                     onCheckedChange={(checked) => {
//                                       return checked
//                                         ? field.onChange([
//                                             ...field.value,
//                                             option,
//                                           ])
//                                         : field.onChange(
//                                             field.value.filter(
//                                               (v) => v !== option
//                                             )
//                                           );
//                                     }}
//                                   />
//                                 </FormControl>
//                                 <FormLabel className="font-normal">
//                                   {option}
//                                 </FormLabel>
//                               </FormItem>
//                             )}
//                           />
//                         ))}
//                       </div>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="businessImpacts"
//                   render={() => (
//                     <FormItem>
//                       <FormLabel>Business Impacts</FormLabel>
//                       <div className="space-y-4">
//                         {businessImpactOptions.map((impact) => (
//                           <FormField
//                             key={impact}
//                             control={form.control}
//                             name={`businessImpacts.${impact}`}
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>{impact}</FormLabel>
//                                 <Select
//                                   onValueChange={field.onChange}
//                                   value={field.value}
//                                 >
//                                   <FormControl>
//                                     <SelectTrigger>
//                                       <SelectValue placeholder="Select impact level" />
//                                     </SelectTrigger>
//                                   </FormControl>
//                                   <SelectContent>
//                                     <SelectItem value="low">Low</SelectItem>
//                                     <SelectItem value="moderate">
//                                       Moderate
//                                     </SelectItem>
//                                     <SelectItem value="high">High</SelectItem>
//                                     <SelectItem value="critical">
//                                       Critical
//                                     </SelectItem>
//                                   </SelectContent>
//                                 </Select>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
//                         ))}
//                       </div>
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="sensitivityLevels"
//                   render={() => (
//                     <FormItem>
//                       <FormLabel>Sensitivity Levels</FormLabel>
//                       <div className="grid grid-cols-1 gap-2">
//                         {sensitivityLevels.map((level) => (
//                           <FormField
//                             key={level}
//                             control={form.control}
//                             name="sensitivityLevels"
//                             render={({ field }) => (
//                               <FormItem className="flex items-start space-x-3 space-y-0 p-4 border rounded-md">
//                                 <FormControl>
//                                   <Checkbox
//                                     checked={field.value?.includes(level)}
//                                     onCheckedChange={(checked) => {
//                                       return checked
//                                         ? field.onChange([
//                                             ...field.value,
//                                             level,
//                                           ])
//                                         : field.onChange(
//                                             field.value.filter(
//                                               (v) => v !== level
//                                             )
//                                           );
//                                     }}
//                                   />
//                                 </FormControl>
//                                 <div className="space-y-1">
//                                   <FormLabel>{level}</FormLabel>
//                                   <FormDescription>
//                                     {
//                                       form.watch("customClassification")[
//                                         level.toLowerCase()
//                                       ].description
//                                     }
//                                   </FormDescription>
//                                 </div>
//                               </FormItem>
//                             )}
//                           />
//                         ))}
//                       </div>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="customClassification"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Custom Classification</FormLabel>
//                       <Tabs defaultValue="public">
//                         <TabsList className="grid grid-cols-4">
//                           {sensitivityLevels.map((level) => (
//                             <TabsTrigger
//                               key={level}
//                               value={level.toLowerCase()}
//                             >
//                               {level}
//                             </TabsTrigger>
//                           ))}
//                         </TabsList>
//                         {sensitivityLevels.map((level) => (
//                           <TabsContent
//                             key={level}
//                             value={level.toLowerCase()}
//                             className="space-y-4 pt-4"
//                           >
//                             <FormItem>
//                               <FormLabel>Name</FormLabel>
//                               <FormControl>
//                                 <Input
//                                   value={field.value[level.toLowerCase()].name}
//                                   onChange={(e) =>
//                                     field.onChange({
//                                       ...field.value,
//                                       [level.toLowerCase()]: {
//                                         ...field.value[level.toLowerCase()],
//                                         name: e.target.value,
//                                       },
//                                     })
//                                   }
//                                 />
//                               </FormControl>
//                             </FormItem>
//                             <FormItem>
//                               <FormLabel>Description</FormLabel>
//                               <FormControl>
//                                 <Textarea
//                                   value={
//                                     field.value[level.toLowerCase()].description
//                                   }
//                                   onChange={(e) =>
//                                     field.onChange({
//                                       ...field.value,
//                                       [level.toLowerCase()]: {
//                                         ...field.value[level.toLowerCase()],
//                                         description: e.target.value,
//                                       },
//                                     })
//                                   }
//                                 />
//                               </FormControl>
//                             </FormItem>
//                             <FormItem>
//                               <FormLabel>Examples</FormLabel>
//                               <FormControl>
//                                 <Textarea
//                                   value={
//                                     field.value[level.toLowerCase()].examples
//                                   }
//                                   onChange={(e) =>
//                                     field.onChange({
//                                       ...field.value,
//                                       [level.toLowerCase()]: {
//                                         ...field.value[level.toLowerCase()],
//                                         examples: e.target.value,
//                                       },
//                                     })
//                                   }
//                                 />
//                               </FormControl>
//                             </FormItem>
//                           </TabsContent>
//                         ))}
//                       </Tabs>
//                     </FormItem>
//                   )}
//                 />
//               </CardContent>
//             </Card>
//           )}

//           {/* Step 4 */}
//           {currentStep === 4 && (
//             <Card>
//               <CardHeader>
//                 <CardTitle>Step 4: Generate Policy</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <FormField
//                   control={form.control}
//                   name="organizationName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Organization Name</FormLabel>
//                       <FormControl>
//                         <Input {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="version"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Policy Version</FormLabel>
//                       <FormControl>
//                         <Input {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="approvalRoles"
//                   render={() => (
//                     <FormItem>
//                       <FormLabel>Approval Roles</FormLabel>
//                       <div className="grid grid-cols-2 gap-2">
//                         {approvalRoles.map((option) => (
//                           <FormField
//                             key={option}
//                             control={form.control}
//                             name="approvalRoles"
//                             render={({ field }) => (
//                               <FormItem className="flex items-center space-x-2">
//                                 <FormControl>
//                                   <Checkbox
//                                     checked={field.value?.includes(option)}
//                                     onCheckedChange={(checked) => {
//                                       return checked
//                                         ? field.onChange([
//                                             ...field.value,
//                                             option,
//                                           ])
//                                         : field.onChange(
//                                             field.value.filter(
//                                               (v) => v !== option
//                                             )
//                                           );
//                                     }}
//                                   />
//                                 </FormControl>
//                                 <FormLabel className="font-normal">
//                                   {option}
//                                 </FormLabel>
//                               </FormItem>
//                             )}
//                           />
//                         ))}
//                       </div>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <div className="space-y-4">
//                   <h3 className="text-lg font-medium">Policy Preview</h3>
//                   <Card className="bg-muted/50">
//                     <CardHeader>
//                       <CardTitle>
//                         {form.watch("organizationName") || "Organization"} Data
//                         Classification Policy
//                       </CardTitle>
//                       <div className="text-sm text-muted-foreground">
//                         Version {form.watch("version")} - Generated on{" "}
//                         {new Date().toLocaleDateString()}
//                       </div>
//                     </CardHeader>
//                     <CardContent>
//                       <ScrollArea className="h-64 pr-4">
//                         <pre className="text-sm">
//                           {JSON.stringify(form.watch(), null, 2)}
//                         </pre>
//                       </ScrollArea>
//                     </CardContent>
//                   </Card>
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           <CardFooter className="flex justify-between">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={onPrevious}
//               disabled={currentStep === 1}
//             >
//               <ChevronLeft className="mr-2 h-4 w-4" />
//               Previous
//             </Button>

//             {currentStep === totalSteps ? (
//               <Button type="submit">
//                 Generate Policy
//                 <FileText className="ml-2 h-4 w-4" />
//               </Button>
//             ) : (
//               <Button type="button" onClick={onNext}>
//                 Next
//                 <ChevronRight className="ml-2 h-4 w-4" />
//               </Button>
//             )}
//           </CardFooter>
//         </form>
//       </Form>
//     </div>
//   );
// }

import { ScrollArea } from "@/components/ui/scroll-area";

import { approvalRoles } from "@/lib/constants";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { CheckboxGroup } from "../ui/checkbox-group";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Step4Generate({ form }: { form: any }) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="organizationName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Organization Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="version"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Policy Version</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <CheckboxGroup
        //@ts-expect-error this is a form type error
        form={form}
        name="approvalRoles"
        label="Approval Roles"
        options={approvalRoles}
      />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Policy Preview</h3>
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle>
              {form.watch("organizationName") || "Organization"} Data
              Classification Policy
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              Version {form.watch("version")} - Generated on{" "}
              {new Date().toLocaleDateString()}
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64 pr-4">
              <pre className="text-sm">
                {JSON.stringify(form.watch(), null, 2)}
              </pre>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  stakeholderOptions,
  businessProcessOptions,
  dataTypeOptions,
  departmentOptions,
} from "@/lib/constants";

export function Step1Context({ form }: { form: any }) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="objective"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Policy Objective</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Enter mission statement or goals..."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <CheckboxGroup
        form={form}
        name="stakeholders"
        label="Stakeholders"
        options={stakeholderOptions}
      />

      <CheckboxGroup
        form={form}
        name="businessProcesses"
        label="Business Processes"
        options={businessProcessOptions}
      />

      <CheckboxGroup
        form={form}
        name="dataTypes"
        label="Data Types"
        options={dataTypeOptions}
      />

      <CheckboxGroup
        form={form}
        name="departments"
        label="Departments"
        options={departmentOptions}
      />
    </div>
  );
}

function CheckboxGroup({ form, name, label, options }: any) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="grid grid-cols-2 gap-2">
            {options.map((option: string) => (
              <FormField
                key={option}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(option)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, option])
                            : field.onChange(
                                field.value.filter((v: string) => v !== option)
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">{option}</FormLabel>
                  </FormItem>
                )}
              />
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

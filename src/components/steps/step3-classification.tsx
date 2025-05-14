/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  dataValueOptions,
  businessImpactOptions,
  sensitivityLevels,
} from "@/lib/constants";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CheckboxGroup } from "../ui/checkbox-group";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export function Step3Classification({ form }: { form: any }) {
  return (
    <div className="space-y-6">
      <CheckboxGroup
        //@ts-expect-error this is a type
        form={form}
        name="dataValueAssessment"
        label="Data Value Assessment"
        options={dataValueOptions}
      />

      <FormField
        control={form.control}
        name="businessImpacts"
        render={() => (
          <FormItem>
            <FormLabel>Business Impacts</FormLabel>
            <div className="space-y-4">
              {businessImpactOptions.map((impact) => (
                <FormField
                  key={impact}
                  control={form.control}
                  name={`businessImpacts.${impact}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{impact}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select impact level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="sensitivityLevels"
        render={() => (
          <FormItem>
            <FormLabel>Sensitivity Levels</FormLabel>
            <div className="grid grid-cols-1 gap-2">
              {sensitivityLevels.map((level) => (
                <FormField
                  key={level}
                  control={form.control}
                  name="sensitivityLevels"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3 space-y-0 p-4 border rounded-md">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(level)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, level])
                              : field.onChange(
                                  field.value.filter((v: string) => v !== level)
                                );
                          }}
                        />
                      </FormControl>
                      <div className="space-y-1">
                        <FormLabel>{level}</FormLabel>
                        <FormDescription>
                          {
                            form.watch("customClassification")[
                              level.toLowerCase()
                            ].description
                          }
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="customClassification"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Custom Classification</FormLabel>
            <Tabs defaultValue="public">
              <TabsList className="grid grid-cols-4">
                {sensitivityLevels.map((level) => (
                  <TabsTrigger key={level} value={level.toLowerCase()}>
                    {level}
                  </TabsTrigger>
                ))}
              </TabsList>
              {sensitivityLevels.map((level) => (
                <TabsContent
                  key={level}
                  value={level.toLowerCase()}
                  className="space-y-4 pt-4"
                >
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        value={field.value[level.toLowerCase()].name}
                        onChange={(e) =>
                          field.onChange({
                            ...field.value,
                            [level.toLowerCase()]: {
                              ...field.value[level.toLowerCase()],
                              name: e.target.value,
                            },
                          })
                        }
                      />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        value={field.value[level.toLowerCase()].description}
                        onChange={(e) =>
                          field.onChange({
                            ...field.value,
                            [level.toLowerCase()]: {
                              ...field.value[level.toLowerCase()],
                              description: e.target.value,
                            },
                          })
                        }
                      />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel>Examples</FormLabel>
                    <FormControl>
                      <Textarea
                        value={field.value[level.toLowerCase()].examples}
                        onChange={(e) =>
                          field.onChange({
                            ...field.value,
                            [level.toLowerCase()]: {
                              ...field.value[level.toLowerCase()],
                              examples: e.target.value,
                            },
                          })
                        }
                      />
                    </FormControl>
                  </FormItem>
                </TabsContent>
              ))}
            </Tabs>
          </FormItem>
        )}
      />
    </div>
  );
}

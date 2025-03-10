'use client';

import { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Trash2, Plus, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

// Define the Zod schema for validation
const fieldParamSchema = z.object({
  field_display_name: z.string().min(1, 'Display name is required'),
  field_name: z.string().min(1, 'Field name is required'),
  variable_name: z.string().min(1, 'Variable name is required'),
  field_type: z.enum(['string', 'number', 'boolean', 'date']),
  is_searchable: z.boolean().default(false),
  is_filterable: z.boolean().default(false),
});

const entityFieldMappingSchema = z.object({
  entity: z.string().min(1, 'Entity name is required'),
  params: z
    .array(fieldParamSchema)
    .min(1, 'At least one field parameter is required'),
});

// TypeScript types derived from Zod schema
type FieldParam = z.infer<typeof fieldParamSchema>;
type EntityFieldMapping = z.infer<typeof entityFieldMappingSchema>;

export default function EntityFieldMappingForm() {
  const [jsonOutput, setJsonOutput] = useState<string>('');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EntityFieldMapping>({
    resolver: zodResolver(entityFieldMappingSchema),
    defaultValues: {
      entity: '',
      params: [
        {
          field_display_name: '',
          field_name: '',
          variable_name: '',
          field_type: 'string',
          is_searchable: false,
          is_filterable: false,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'params',
  });

  const onSubmit = async (data: EntityFieldMapping) => {
    try {
      // Display the JSON data
      setJsonOutput(JSON.stringify(data, null, 2));

      // In a real application, you'd send this to your backend
      // const response = await fetch('/api/entity-field-mapping', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // })

      //   toast({
      //     title: 'Form submitted',
      //     description: 'The data has been successfully generated.',
      //   });
    } catch (error) {
      //   toast({
      //     title: 'Error',
      //     description: 'Failed to submit the form. Please try again.',
      //     variant: 'destructive',
      //   });
    }
  };

  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <Card>
        <CardHeader>
          <CardTitle>Entity Field Mapping</CardTitle>
          <CardDescription>
            Define entity field mappings with custom parameters.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="entity">Entity Name</Label>
              <Input
                id="entity"
                placeholder="Enter entity name"
                {...register('entity')}
              />
              {errors.entity && (
                <p className="text-sm text-red-500">{errors.entity.message}</p>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Field Parameters</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    append({
                      field_display_name: '',
                      field_name: '',
                      variable_name: '',
                      field_type: 'string',
                      is_searchable: false,
                      is_filterable: false,
                    })
                  }
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Field
                </Button>
              </div>

              {errors.params && !Array.isArray(errors.params) && (
                <p className="text-sm text-red-500">{errors.params.message}</p>
              )}

              {fields.map((field, index) => (
                <Card key={field.id} className="p-4 border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Field #{index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                      disabled={fields.length === 1}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`params.${index}.field_display_name`}>
                        Display Name
                      </Label>
                      <Input
                        id={`params.${index}.field_display_name`}
                        placeholder="User Display Name"
                        {...register(`params.${index}.field_display_name`)}
                      />
                      {errors.params?.[index]?.field_display_name && (
                        <p className="text-sm text-red-500">
                          {errors.params[index]?.field_display_name?.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`params.${index}.field_name`}>
                        Field Name
                      </Label>
                      <Input
                        id={`params.${index}.field_name`}
                        placeholder="user_name"
                        {...register(`params.${index}.field_name`)}
                      />
                      {errors.params?.[index]?.field_name && (
                        <p className="text-sm text-red-500">
                          {errors.params[index]?.field_name?.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`params.${index}.variable_name`}>
                        Variable Name
                      </Label>
                      <Input
                        id={`params.${index}.variable_name`}
                        placeholder="userName"
                        {...register(`params.${index}.variable_name`)}
                      />
                      {errors.params?.[index]?.variable_name && (
                        <p className="text-sm text-red-500">
                          {errors.params[index]?.variable_name?.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`params.${index}.field_type`}>
                        Field Type
                      </Label>
                      <Controller
                        control={control}
                        name={`params.${index}.field_type`}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select field type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="string">String</SelectItem>
                              <SelectItem value="number">Number</SelectItem>
                              <SelectItem value="boolean">Boolean</SelectItem>
                              <SelectItem value="date">Date</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.params?.[index]?.field_type && (
                        <p className="text-sm text-red-500">
                          {errors.params[index]?.field_type?.message}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Controller
                        control={control}
                        name={`params.${index}.is_searchable`}
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            id={`params.${index}.is_searchable`}
                          />
                        )}
                      />
                      <Label htmlFor={`params.${index}.is_searchable`}>
                        Searchable
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Controller
                        control={control}
                        name={`params.${index}.is_filterable`}
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            id={`params.${index}.is_filterable`}
                          />
                        )}
                      />
                      <Label htmlFor={`params.${index}.is_filterable`}>
                        Filterable
                      </Label>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {jsonOutput && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Generated JSON:</h3>
                <div className="bg-gray-100 p-4 rounded-md">
                  <pre className="whitespace-pre-wrap text-sm">
                    {jsonOutput}
                  </pre>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter>
            <Button type="submit" disabled={isSubmitting} className="ml-auto">
              {isSubmitting ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-2">&#8212;</span> Processing
                </span>
              ) : (
                <span className="flex items-center">
                  <Send className="h-4 w-4 mr-2" /> Submit
                </span>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

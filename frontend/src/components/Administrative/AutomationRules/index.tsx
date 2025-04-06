'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertCircle,
  ArrowDown,
  Loader2,
  PlusCircle,
  Trash2,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Controller,
  useFieldArray,
  useForm,
  type SubmitHandler,
} from 'react-hook-form';

import {
  createAutomationRule,
  fetchAutomationMetadata,
} from '@/services/automationApi';
import type {
  AutomationEventPayload,
  AutomationEventResponse,
  Condition,
  FieldParam,
  LogicalOperator,
  Operator,
} from '@/types/automationRule';
import { convertToMVEL, getVariableName } from '@/utils/mvel';
import { automationConditionOperators } from './utils';
import { toast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Update the form input type to match our schema
interface AutomationRuleFormInput {
  name: string;
  isActive: boolean;
  event: string;
  conditions: Condition[];
  logicalOperator: LogicalOperator;
  action: string;
  actionConfig: Record<string, any>;
}
const defaultForm = {
  name: 'Automation Rule', // Default name, won't be shown in UI
  isActive: true,
  event: '',
  conditions: [{ id: '1', entity: '', attribute: '', operator: '', value: '' }],
  logicalOperator: 'AND',
  action: '',
  actionConfig: {},
};
export default function AutomationRulesForm() {
  // Update state type to match DataSchema
  const [metadata, setMetadata] = useState<AutomationEventResponse | null>(
    null,
  );

  // Loading state
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [mvelExpression, setMvelExpression] = useState<string>('');

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<AutomationRuleFormInput>({
    defaultValues: defaultForm as AutomationRuleFormInput,
  });

  // Field array for conditions
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'conditions',
  });

  // Watch form values for MVEL generation
  const watchedValues = watch();

  // Fetch metadata on component mount
  useEffect(() => {
    const loadMetadata = async () => {
      try {
        setLoading(true);
        const data =
          (await fetchAutomationMetadata()) as AutomationEventResponse;
        setMetadata(data);
      } catch (error) {
        console.error('Error loading metadata:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMetadata();
  }, []);

  // Generate MVEL expression when form values change
  useEffect(() => {
    if (!metadata) return;

    // Convert metadata to the format expected by convertToMVEL
    const entitiesMap: Record<
      string,
      { attributes: Record<string, FieldParam> }
    > = {};
    metadata?.entityParams?.forEach((entity) => {
      entitiesMap[entity.name] = {
        attributes: {},
      };
      entity?.fieldParams?.forEach((attr) => {
        entitiesMap[entity.name].attributes[attr.fieldName || ''] = attr;
      });
    });

    // Update conditions with variableName before converting to MVEL
    const conditionsWithVariableName = watchedValues.conditions.map(
      (condition) => {
        if (condition.entity && condition.attribute) {
          return {
            ...condition,
            variableName: getVariableName(
              condition.attribute,
              condition.entity,
              entitiesMap,
            ),
          };
        }
        return condition;
      },
    );

    const mvel = convertToMVEL(
      conditionsWithVariableName as Condition[],
      watchedValues.logicalOperator as LogicalOperator,
      entitiesMap,
    );
    setMvelExpression(mvel);
  }, [watchedValues, metadata]);
  // Get attributes for a specific entity
  const getAttributesForEntity = (entityName: string): FieldParam[] => {
    if (!metadata) return [];
    const entity = metadata?.entityParams?.find((e) => e.name === entityName);
    return entity ? entity.fieldParams : [];
  };

  // Get automationConditionOperators for a specific attribute type
  const getOperatorsForAttributeType = (attributeType: string): Operator[] => {
    if (!metadata) return [];
    return automationConditionOperators.filter((op) =>
      op.applicableTypes.includes(attributeType as any),
    );
  };

  // Handle form submission
  const onSubmit: SubmitHandler<AutomationRuleFormInput> = async (data) => {
    try {
      setSubmitting(true);
      const payload: AutomationEventPayload = {
        eventId: data?.event,
        action: data?.action,
        condition: mvelExpression,
        options: data?.actionConfig?.options,
      };

      // Call API to create rule
      const response = await createAutomationRule(payload);
      if (response) {
        toast({
          title: 'Success',
          description: `Successfully saved automation event.`,
        });
        reset(defaultForm as AutomationRuleFormInput);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error',
        description: 'Failed to save automation event. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl  p-4 min-w-[50rem]"
    >
      {loading ? (
        <div className="space-y-12">
          <Skeleton className="h-40 w-full rounded-xl" />
          <div className="flex justify-center">
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
          <Skeleton className="h-60 w-full rounded-xl" />
          <div className="flex justify-center">
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
      ) : (
        <div>
          {/* Event Section */}
          <Card className="border-2 rounded-xl">
            <CardContent className="pt-6 pb-6">
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-center">Event</h2>
                <p className="text-sm text-muted-foreground text-center">
                  Select the event that will trigger this automation rule
                </p>

                <Controller
                  name="event"
                  control={control}
                  rules={{ required: 'Event is required' }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an event" />
                      </SelectTrigger>
                      <SelectContent>
                        {metadata?.eventsList?.map((event, i) => (
                          <SelectItem
                            key={event.eventId + i}
                            value={event.eventId}
                          >
                            {event.eventName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.event && (
                  <p className="text-sm text-destructive text-center">
                    {errors.event.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Arrow */}
          <div className="flex justify-center py-2">
            <ArrowDown className="h-8 w-8 text-muted-foreground" />
          </div>

          {/* Conditions Section */}
          <Card className="border-2 rounded-xl">
            <CardContent className="pt-6 pb-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold">Condition</h2>
                    {mvelExpression && (
                      <>
                        <Tooltip>
                          <TooltipTrigger>
                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent
                            className="w-[400px]"
                            side="right"
                            align="center"
                          >
                            <code>{mvelExpression}</code>
                          </TooltipContent>
                        </Tooltip>
                      </>
                    )}
                  </div>
                  <Controller
                    name="logicalOperator"
                    control={control}
                    render={({ field }) => (
                      <Tabs
                        value={field.value}
                        onValueChange={
                          field.onChange as (value: string) => void
                        }
                        className="w-auto"
                      >
                        <TabsList className="grid w-[160px] grid-cols-2">
                          <TabsTrigger value="AND">AND</TabsTrigger>
                          <TabsTrigger value="OR">OR</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    )}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Define the conditions that must be met for the action to
                  trigger
                </p>

                {fields.map((field, index) => (
                  <div
                    key={field.id + index}
                    className="space-y-4 p-4 border rounded-lg bg-muted/20"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">
                        Condition {index + 1}
                      </h3>
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {/* Entity Selection */}
                      <div className="space-y-2">
                        <Label htmlFor={`entity-${field.id}`}>Entity</Label>
                        <Controller
                          name={`conditions.${index}.entity`}
                          control={control}
                          rules={{ required: 'Entity is required' }}
                          render={({ field: entityField }) => (
                            <Select
                              value={entityField.value}
                              onValueChange={(value) => {
                                entityField.onChange(value);
                                // Reset dependent fields
                                setValue(`conditions.${index}.attribute`, '');
                                setValue(`conditions.${index}.operator`, '');
                                setValue(`conditions.${index}.value`, '');
                              }}
                            >
                              <SelectTrigger id={`entity-${field.id}`}>
                                <SelectValue placeholder="Select entity" />
                              </SelectTrigger>
                              <SelectContent>
                                {metadata?.entityParams?.map((entity, i) => (
                                  <SelectItem
                                    key={entity?.name + i}
                                    value={entity.name}
                                  >
                                    {entity?.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.conditions?.[index]?.entity && (
                          <p className="text-sm text-destructive">
                            {errors.conditions[index]?.entity?.message}
                          </p>
                        )}
                      </div>

                      {/* Attribute Selection */}
                      <div className="space-y-2">
                        <Label htmlFor={`attribute-${field.id}`}>
                          Attribute
                        </Label>
                        <Controller
                          name={`conditions.${index}.attribute`}
                          control={control}
                          rules={{ required: 'Attribute is required' }}
                          render={({ field: attrField }) => (
                            <Select
                              value={attrField.value}
                              onValueChange={(value) => {
                                attrField.onChange(value);
                                // Reset dependent fields
                                setValue(`conditions.${index}.operator`, '');
                                setValue(`conditions.${index}.value`, '');
                              }}
                              disabled={
                                !watchedValues.conditions[index]?.entity
                              }
                            >
                              <SelectTrigger id={`attribute-${field.id}`}>
                                <SelectValue placeholder="Select attribute" />
                              </SelectTrigger>
                              <SelectContent>
                                {getAttributesForEntity(
                                  watchedValues.conditions[index]?.entity,
                                ).map((attr) => (
                                  <SelectItem
                                    key={attr.variableName}
                                    value={attr.fieldName || attr.variableName}
                                  >
                                    {attr.fieldDisplayName}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.conditions?.[index]?.attribute && (
                          <p className="text-sm text-destructive">
                            {errors.conditions[index]?.attribute?.message}
                          </p>
                        )}
                      </div>

                      {/* Operator Selection */}
                      <div className="space-y-2">
                        <Label htmlFor={`operator-${field.id}`}>Operator</Label>
                        <Controller
                          name={`conditions.${index}.operator`}
                          control={control}
                          rules={{ required: 'Operator is required' }}
                          render={({ field: opField }) => {
                            // Find the attribute to get its type
                            const entityName =
                              watchedValues.conditions[index]?.entity;
                            const attrName =
                              watchedValues.conditions[index]?.attribute;
                            const entity = metadata?.entityParams?.find(
                              (e) => e.name === entityName,
                            );
                            const attribute = entity?.fieldParams?.find(
                              (a) =>
                                a.fieldName === attrName ||
                                a.variableName === attrName,
                            );

                            return (
                              <Select
                                value={opField.value}
                                onValueChange={opField.onChange}
                                disabled={
                                  !watchedValues.conditions[index]?.attribute
                                }
                              >
                                <SelectTrigger id={`operator-${field.id}`}>
                                  <SelectValue placeholder="Select operator" />
                                </SelectTrigger>
                                <SelectContent>
                                  {attribute &&
                                    getOperatorsForAttributeType(
                                      attribute.fieldType,
                                    ).map((op, i) => (
                                      <SelectItem
                                        key={op.id + i}
                                        value={op.name}
                                      >
                                        {op.displayName}
                                      </SelectItem>
                                    ))}
                                </SelectContent>
                              </Select>
                            );
                          }}
                        />
                        {errors.conditions?.[index]?.operator && (
                          <p className="text-sm text-destructive">
                            {errors.conditions[index]?.operator?.message}
                          </p>
                        )}
                      </div>

                      {/* Value Input */}
                      <div className="space-y-2">
                        <Label htmlFor={`value-${field.id}`}>Value</Label>
                        <Controller
                          name={`conditions.${index}.value`}
                          control={control}
                          rules={{ required: 'Value is required' }}
                          render={({ field: valueField }) => (
                            <Input
                              id={`value-${field.id}`}
                              value={valueField.value as string}
                              onChange={valueField.onChange}
                              disabled={
                                !watchedValues.conditions[index]?.operator
                              }
                              placeholder="Enter value"
                            />
                          )}
                        />
                        {errors.conditions?.[index]?.value && (
                          <p className="text-sm text-destructive">
                            {errors.conditions[index]?.value?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    append({
                      id: Date.now().toString(),
                      entity: '',
                      attribute: '',
                      operator: '',
                      value: '',
                    })
                  }
                  className="w-full"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Another Condition
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Arrow */}
          <div className="flex justify-center py-2">
            <ArrowDown className="h-8 w-8 text-muted-foreground" />
          </div>

          {/* Action Section */}
          <Card className="border-2 rounded-xl">
            <CardContent className="pt-6 pb-6">
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-center">Action</h2>
                <p className="text-sm text-muted-foreground text-center">
                  Select the action to perform when the conditions are met
                </p>

                <Controller
                  name="action"
                  control={control}
                  rules={{ required: 'Action is required' }}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        // Reset action config when action changes
                        setValue('actionConfig', {});
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an action" />
                      </SelectTrigger>
                      <SelectContent>
                        {metadata?.actionsList?.map((action, i) => (
                          <SelectItem key={action.id + i} value={action.id}>
                            {action.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.action && (
                  <p className="text-sm text-destructive text-center">
                    {errors.action.message}
                  </p>
                )}

                {/* Action Configuration */}
                {watchedValues.action &&
                  metadata?.actionsList?.find(
                    (a) => a.id === watchedValues.action,
                  )?.properties && (
                    <div className="mt-4 p-4 border rounded-lg">
                      <h3 className="text-sm font-medium mb-3">
                        Action Configuration
                      </h3>

                      {/* Render dynamic config fields based on the selected action */}
                      {(() => {
                        const selectedAction = metadata?.actionsList?.find(
                          (a) => a.id === watchedValues.action,
                        );
                        if (!selectedAction?.properties) return null;

                        if (
                          selectedAction?.properties.options &&
                          selectedAction?.properties.type === 'multi-select'
                        ) {
                          return (
                            <div className="space-y-4 mb-3">
                              <div className="grid grid-cols-1 gap-2">
                                {selectedAction?.properties?.options.map(
                                  (option, i) => (
                                    <div
                                      key={option.id + i}
                                      className="flex items-center space-x-2"
                                    >
                                      <Controller
                                        name={`actionConfig.options`}
                                        control={control}
                                        render={({ field }) => {
                                          const values = Array.isArray(
                                            field.value,
                                          )
                                            ? field.value
                                            : [];
                                          return (
                                            <Checkbox
                                              id={`option-${option.id}`}
                                              checked={values.includes(
                                                option.id,
                                              )}
                                              onCheckedChange={(checked) => {
                                                if (checked) {
                                                  field.onChange([
                                                    ...values,
                                                    option.id,
                                                  ]);
                                                } else {
                                                  field.onChange(
                                                    values.filter(
                                                      (v) => v !== option.id,
                                                    ),
                                                  );
                                                }
                                              }}
                                            />
                                          );
                                        }}
                                      />
                                      <Label htmlFor={`option-${option.id}`}>
                                        {option.name}
                                      </Label>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          );
                        } else if (
                          selectedAction?.properties.options &&
                          selectedAction?.properties?.type === 'single'
                        ) {
                          return (
                            <div className="space-y-2 mb-3">
                              <Controller
                                name={`actionConfig.options`}
                                control={control}
                                render={({ field: configField }) => (
                                  <Select
                                    value={configField.value || ''}
                                    onValueChange={configField.onChange}
                                  >
                                    <SelectTrigger
                                      id={`config-${selectedAction.id}`}
                                    >
                                      <SelectValue placeholder="Select option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {selectedAction?.properties?.options?.map(
                                        (option) => (
                                          <SelectItem
                                            key={option.id}
                                            value={option.id}
                                          >
                                            {option.name}
                                          </SelectItem>
                                        ),
                                      )}
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                            </div>
                          );
                        }
                      })()}
                    </div>
                  )}
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="px-8"
            >
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Rule
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}

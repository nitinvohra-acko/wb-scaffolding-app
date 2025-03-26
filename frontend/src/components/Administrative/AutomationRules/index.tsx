'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

// Define types
type Entity = 'Task' | 'User';
type AttributeType = 'string' | 'number' | 'date' | 'boolean';
type Operator = string;
type Attribute = string;

type EntityAttributes = {
  [key in Entity]: Attribute[];
};

type AttributeOperators = {
  [key in AttributeType]: Operator[];
};

type AttributeTypes = {
  [key: string]: AttributeType;
};

type FormData = {
  event: string;
  condition: {
    entity: Entity | '';
    attribute: Attribute;
    operator: Operator;
    value: string;
  };
  action: string;
};

export default function AutomationRulesForm() {
  // Sample data for dropdowns
  const events: string[] = [
    'Task Created',
    'Task Completed',
    'Task Assigned',
    'User Created',
    'User Updated',
  ];
  const entities: Entity[] = ['Task', 'User'];

  const entityAttributes: EntityAttributes = {
    Task: [
      'title',
      'description',
      'status',
      'priority',
      'assignee',
      'due_date',
    ],
    User: ['name', 'email', 'role', 'department', 'created_at'],
  };

  const attributeOperators: AttributeOperators = {
    string: [
      'equals',
      'not equals',
      'contains',
      'not contains',
      'starts with',
      'ends with',
    ],
    number: [
      'equals',
      'not equals',
      'greater than',
      'less than',
      'greater than or equal',
      'less than or equal',
    ],
    date: ['equals', 'not equals', 'before', 'after', 'between'],
    boolean: ['is', 'is not'],
  };

  const attributeTypes: AttributeTypes = {
    title: 'string',
    description: 'string',
    status: 'string',
    priority: 'string',
    assignee: 'string',
    due_date: 'date',
    name: 'string',
    email: 'string',
    role: 'string',
    department: 'string',
    created_at: 'date',
  };

  const actions: string[] = [
    'Assign to user',
    'Change status',
    'Change priority',
    'Send notification',
    'Add tag',
    'Remove tag',
  ];

  // State for form values
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [selectedEntity, setSelectedEntity] = useState<Entity | ''>('');
  const [selectedAttribute, setSelectedAttribute] = useState<string>('');
  const [selectedOperator, setSelectedOperator] = useState<string>('');
  const [conditionValue, setConditionValue] = useState<string>('');
  const [selectedAction, setSelectedAction] = useState<string>('');

  // Get operators based on attribute type
  const getOperatorsForAttribute = (attribute: string): string[] => {
    if (!attribute) return [];
    const type = attributeTypes[attribute];
    return attributeOperators[type] || [];
  };

  // Handle entity change
  const handleEntityChange = (value: Entity) => {
    setSelectedEntity(value);
    setSelectedAttribute('');
    setSelectedOperator('');
  };

  // Handle attribute change
  const handleAttributeChange = (value: string) => {
    setSelectedAttribute(value);
    setSelectedOperator('');
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData: FormData = {
      event: selectedEvent,
      condition: {
        entity: selectedEntity,
        attribute: selectedAttribute,
        operator: selectedOperator,
        value: conditionValue,
      },
      action: selectedAction,
    };

    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Create Automation Rule</CardTitle>
          <CardDescription>
            Set up automated actions based on specific events and conditions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Event Section */}
          <div className="space-y-2">
            <Label htmlFor="event" className="text-base font-semibold">
              1. Event
            </Label>
            <p className="text-sm text-muted-foreground">
              Select the event that will trigger this automation rule.
            </p>
            <Select
              value={selectedEvent}
              onValueChange={setSelectedEvent}
              required
            >
              <SelectTrigger id="event" className="w-full">
                <SelectValue placeholder="Select an event" />
              </SelectTrigger>
              <SelectContent>
                {events.map((event) => (
                  <SelectItem key={event} value={event}>
                    {event}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Condition Section */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">2. Condition</Label>
            <p className="text-sm text-muted-foreground">
              Define the condition that must be met for the action to trigger.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Entity Selection */}
              <div className="space-y-2">
                <Label htmlFor="entity">Entity</Label>
                <Select
                  value={selectedEntity}
                  onValueChange={(value: Entity) => handleEntityChange(value)}
                  required
                >
                  <SelectTrigger id="entity">
                    <SelectValue placeholder="Select entity" />
                  </SelectTrigger>
                  <SelectContent>
                    {entities.map((entity) => (
                      <SelectItem key={entity} value={entity}>
                        {entity}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Attribute Selection */}
              <div className="space-y-2">
                <Label htmlFor="attribute">Attribute</Label>
                <Select
                  value={selectedAttribute}
                  onValueChange={handleAttributeChange}
                  disabled={!selectedEntity}
                  required
                >
                  <SelectTrigger id="attribute">
                    <SelectValue placeholder="Select attribute" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedEntity &&
                      entityAttributes[selectedEntity].map((attr) => (
                        <SelectItem key={attr} value={attr}>
                          {attr.replace('_', ' ')}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Operator Selection */}
              <div className="space-y-2">
                <Label htmlFor="operator">Operator</Label>
                <Select
                  value={selectedOperator}
                  onValueChange={setSelectedOperator}
                  disabled={!selectedAttribute}
                  required
                >
                  <SelectTrigger id="operator">
                    <SelectValue placeholder="Select operator" />
                  </SelectTrigger>
                  <SelectContent>
                    {getOperatorsForAttribute(selectedAttribute).map((op) => (
                      <SelectItem key={op} value={op}>
                        {op}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Value Input */}
              <div className="space-y-2">
                <Label htmlFor="value">Value</Label>
                <Input
                  id="value"
                  value={conditionValue}
                  onChange={(e) => setConditionValue(e.target.value)}
                  disabled={!selectedOperator}
                  placeholder="Enter value"
                  required
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Action Section */}
          <div className="space-y-2">
            <Label htmlFor="action" className="text-base font-semibold">
              3. Action
            </Label>
            <p className="text-sm text-muted-foreground">
              Select the action to perform when the condition is met.
            </p>
            <Select
              value={selectedAction}
              onValueChange={setSelectedAction}
              required
            >
              <SelectTrigger id="action" className="w-full">
                <SelectValue placeholder="Select an action" />
              </SelectTrigger>
              <SelectContent>
                {actions.map((action) => (
                  <SelectItem key={action} value={action}>
                    {action}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit">Create Rule</Button>
        </CardFooter>
      </Card>
    </form>
  );
}

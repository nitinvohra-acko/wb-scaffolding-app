'use client';

import { useState, useEffect } from 'react';
import { Save, Filter, Search, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
// import { toast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
// import { Alert, AlertDescription } from '@/components/ui/alert';

// Define the field configuration type
type FieldConfig = {
  fieldDisplayName: string;
  fieldName: string | null;
  variableName: string;
  fieldType: string;
  isSearchable: boolean;
  isFilterable: boolean;
  filterType?: 'term' | 'range';
};

// Sample data - in a real app, this would come from an API
// const availableFieldConfigs: FieldConfig[] = [
//   {
//     fieldDisplayName: 'Proposal Id',
//     fieldName: 'proposal_id',
//     variableName: 'taskProperty.proposal_id',
//     fieldType: 'String',
//     isSearchable: true,
//     isFilterable: false,
//     filterType: 'term',
//   },
//   {
//     fieldDisplayName: 'taskProperty -> proposal_status',
//     fieldName: null,
//     variableName: 'taskProperty.proposal_status',
//     fieldType: 'String',
//     isSearchable: false,
//     isFilterable: false,
//   },
//   {
//     fieldDisplayName: 'taskProperty -> member_ids',
//     fieldName: null,
//     variableName: 'taskProperty.member_ids',
//     fieldType: 'String',
//     isSearchable: false,
//     isFilterable: false,
//   },
//   {
//     fieldDisplayName: 'Status',
//     fieldName: 'status',
//     variableName: 'status',
//     fieldType: 'string',
//     isSearchable: true,
//     isFilterable: true,
//     filterType: 'term',
//   },
//   {
//     fieldDisplayName: 'Assignee',
//     fieldName: 'assignee',
//     variableName: 'assignee',
//     fieldType: 'string',
//     isSearchable: true,
//     isFilterable: true,
//     filterType: 'term',
//   },
//   {
//     fieldDisplayName: 'Created Date',
//     fieldName: 'created_date',
//     variableName: 'taskProperty.metadata.created_at',
//     fieldType: 'date',
//     isSearchable: false,
//     isFilterable: true,
//     filterType: 'range',
//   },
//   {
//     fieldDisplayName: 'Amount',
//     fieldName: 'amount',
//     variableName: 'taskProperty.financial.amount',
//     fieldType: 'number',
//     isSearchable: false,
//     isFilterable: true,
//     filterType: 'range',
//   },
// ];

export default function FieldConfigManagement() {
  const [fieldConfigs, setFieldConfigs] = useState<FieldConfig[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalConfigs, setOriginalConfigs] = useState<FieldConfig[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch field configurations from API
  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('/search/fields/proposal');
        const data = await response.json();
        setFieldConfigs(data);
        setOriginalConfigs(data);
      } catch (error) {
        console.error('Error fetching configurations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfigs();
  }, []);

  // Function to handle field name changes
  const handleFieldNameChange = (index: number, value: string) => {
    const newConfigs = [...fieldConfigs];
    newConfigs[index] = {
      ...newConfigs[index],
      fieldName: value,
    };
    setFieldConfigs(newConfigs);
    setHasChanges(true);
  };

  // Function to handle display name changes
  const handleDisplayNameChange = (index: number, value: string) => {
    const newConfigs = [...fieldConfigs];
    newConfigs[index] = {
      ...newConfigs[index],
      fieldDisplayName: value,
    };
    setFieldConfigs(newConfigs);
    setHasChanges(true);
  };

  // Function to handle toggling searchable status
  const toggleSearchable = (index: number) => {
    const newConfigs = [...fieldConfigs];
    newConfigs[index] = {
      ...newConfigs[index],
      isSearchable: !newConfigs[index].isSearchable,
      // If field name is null and we're making it searchable, generate a default field name
      fieldName:
        newConfigs[index].fieldName === null && !newConfigs[index].isSearchable
          ? generateFieldName(newConfigs[index].variableName)
          : newConfigs[index].fieldName,
    };
    setFieldConfigs(newConfigs);
    setHasChanges(true);
  };

  // Function to handle toggling filterable status
  const toggleFilterable = (index: number) => {
    const newConfigs = [...fieldConfigs];
    newConfigs[index] = {
      ...newConfigs[index],
      isFilterable: !newConfigs[index].isFilterable,
      // If making filterable, ensure it has a filter type
      filterType: !newConfigs[index].isFilterable
        ? newConfigs[index].filterType || 'term'
        : newConfigs[index].filterType,
      // If field name is null and we're making it filterable, generate a default field name
      fieldName:
        newConfigs[index].fieldName === null && !newConfigs[index].isFilterable
          ? generateFieldName(newConfigs[index].variableName)
          : newConfigs[index].fieldName,
    };
    setFieldConfigs(newConfigs);
    setHasChanges(true);
  };

  // Function to update filter type
  const updateFilterType = (index: number, filterType: 'term' | 'range') => {
    const newConfigs = [...fieldConfigs];
    newConfigs[index] = {
      ...newConfigs[index],
      filterType,
    };
    setFieldConfigs(newConfigs);
    setHasChanges(true);
  };

  // Helper function to generate a field name from variable name
  const generateFieldName = (variableName: string): string => {
    // Extract the last part of the path and convert to snake_case
    const parts = variableName.split('.');
    return parts[parts.length - 1];
  };

  // Function to save all configurations
  const saveConfigurations = () => {
    // In a real app, you would send this to your backend API
    console.log('Saving configurations:', fieldConfigs);
    // toast({
    //   title: 'Configurations saved',
    //   description: `Saved ${activeConfigs.length} field configurations.`,
    // });

    // Update the original state to match current state
    setOriginalConfigs([...fieldConfigs]);
    setHasChanges(false);
  };

  // Function to check if a field is configurable (has either searchable or filterable enabled)
  const isConfigured = (config: FieldConfig): boolean => {
    return config.isSearchable || config.isFilterable;
  };

  // Function to get appropriate data type label
  const getDataTypeLabel = (dataType: string) => {
    const type = dataType.toLowerCase();
    switch (type) {
      case 'string':
        return 'Text';
      case 'number':
        return 'Number';
      case 'boolean':
        return 'Yes/No';
      case 'date':
        return 'Date';
      default:
        return dataType;
    }
  };

  // Count how many fields are configured
  const configuredFieldsCount = fieldConfigs.filter(isConfigured).length;

  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Field Configuration Management</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Configure which fields are searchable and filterable
            </p>
          </div>
          <Badge variant="outline" className="ml-2">
            {configuredFieldsCount} fields configured
          </Badge>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading configurations...</div>
          ) : fieldConfigs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No field configurations available.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Display Name</TableHead>
                  <TableHead>Field Name</TableHead>
                  <TableHead>Data Type</TableHead>
                  <TableHead className="w-[140px]">
                    <div className="flex items-center">
                      <Search className="h-4 w-4 mr-2" />
                      Searchable
                    </div>
                  </TableHead>
                  <TableHead className="w-[140px]">
                    <div className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      Filterable
                    </div>
                  </TableHead>
                  <TableHead className="w-[180px]">Filter Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fieldConfigs.map((config, index) => (
                  <TableRow
                    key={index}
                    className={isConfigured(config) ? 'bg-muted/30' : ''}
                  >
                    <TableCell>
                      <Input
                        value={config.fieldDisplayName}
                        onChange={(e) =>
                          handleDisplayNameChange(index, e.target.value)
                        }
                        className="max-w-[200px]"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={config.fieldName || ''}
                        onChange={(e) =>
                          handleFieldNameChange(index, e.target.value)
                        }
                        placeholder="Enter field name"
                        className="max-w-[200px]"
                      />
                    </TableCell>
                    <TableCell>{getDataTypeLabel(config.fieldType)}</TableCell>
                    <TableCell>
                      <Switch
                        checked={config.isSearchable}
                        onCheckedChange={() => toggleSearchable(index)}
                      />
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={config.isFilterable}
                        onCheckedChange={() => toggleFilterable(index)}
                      />
                    </TableCell>
                    <TableCell>
                      {config.isFilterable && (
                        <Select
                          value={config.filterType || 'term'}
                          onValueChange={(value) =>
                            updateFilterType(index, value as 'term' | 'range')
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="term">Term</SelectItem>
                            <SelectItem value="range">Range</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          <div className="text-sm text-muted-foreground">
            {hasChanges ? (
              <span className="text-amber-500 font-medium">
                You have unsaved changes
              </span>
            ) : (
              <span>No changes to save</span>
            )}
          </div>
          <Button
            onClick={saveConfigurations}
            disabled={!hasChanges}
            className="min-w-[120px]"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

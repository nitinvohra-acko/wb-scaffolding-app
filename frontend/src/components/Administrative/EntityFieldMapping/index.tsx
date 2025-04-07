'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { apiClient } from '@/utils/interceptor';
import { Filter, Save, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

// Define the field configuration type
type FieldConfig = {
  fieldDisplayName: string;
  fieldName: string | null;
  variableName: string;
  fieldType: 'term' | 'range';
  isSearchable: boolean;
  isFilterable: boolean;
};

export default function FieldConfigManagement() {
  const [fieldConfigs, setFieldConfigs] = useState<FieldConfig[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalConfigs, setOriginalConfigs] = useState<FieldConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

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
      fieldType: !newConfigs[index].isFilterable
        ? newConfigs[index].fieldType || 'term'
        : newConfigs[index].fieldType,
      // If field name is null and we're making it filterable, generate a default field name
      fieldName:
        newConfigs[index].fieldName === null && !newConfigs[index].isFilterable
          ? generateFieldName(newConfigs[index].variableName)
          : newConfigs[index].fieldName,
    };
    console.log(newConfigs, 'newConfigs');
    setFieldConfigs(newConfigs);
    setHasChanges(true);
  };

  // Function to update filter type
  const updateFilterType = (index: number, fieldType: 'term' | 'range') => {
    const newConfigs = [...fieldConfigs];
    newConfigs[index] = {
      ...newConfigs[index],
      fieldType,
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
  const saveConfigurations = async () => {
    setIsSaving(true);
    const payload = {
      entity: 'proposal',
      params: fieldConfigs,
    };
    try {
      const response = await apiClient(
        '/search/params?entity=proposal',
        'POST',
        {
          body: payload,
        },
      );

      if (response) {
        toast({
          title: 'Success',
          description: `Successfully saved ${fieldConfigs.length} field configurations.`,
        });
        setOriginalConfigs([...fieldConfigs]);
        setHasChanges(false);
      }
    } catch (error) {
      console.error('Error saving configurations:', error);
      toast({
        title: 'Error',
        description: 'Failed to save field configurations. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Function to check if a field is configurable (has either searchable or filterable enabled)
  const isConfigured = (config: FieldConfig): boolean => {
    return config.isSearchable || config.isFilterable;
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
                          value={config.fieldType || 'term'}
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
            disabled={!hasChanges || isSaving}
            className="min-w-[120px]"
          >
            {isSaving ? (
              'Saving...'
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { X, Calendar } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { FilterField } from '@/types/common';

interface FilterPanelProps {
  filters: FilterField[];
  onFilterChange: (
    fieldName: string,
    optionValue: string,
    checked: boolean,
  ) => void;
  onRangeFilterChange: (
    fieldName: string,
    range: { from: Date | null; to: Date | null },
  ) => void;
  onSelectAll: (fieldName: string, checked: boolean) => void;
  onApply: () => void;
  onClear: () => void;
  onClose: () => void;
}

export function FilterPanel({
  filters,
  onFilterChange,
  onRangeFilterChange,
  onSelectAll,
  onApply,
  onClear,
  onClose,
}: FilterPanelProps) {
  const [searchValues, setSearchValues] = useState<Record<string, string>>({});

  const handleSearchChange = (fieldName: string, value: string) => {
    setSearchValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const getFilteredOptions = (filter: FilterField) => {
    if (!['string', 'range'].includes(filter.fieldType)) return [];

    const searchValue = searchValues[filter.fieldName] || '';
    if (!searchValue) return filter.options;

    return filter?.options?.filter((option) =>
      option.value.toLowerCase().includes(searchValue.toLowerCase()),
    );
  };

  const isAllSelected = (filter: FilterField) => {
    if (!['string', 'range'].includes(filter.fieldType)) return false;
    return filter?.options?.every((option) => option.isSelected);
  };

  const isSomeSelected = (filter: FilterField) => {
    if (!['string', 'range'].includes(filter.fieldType)) return false;
    return (
      filter?.options?.some((option) => option.isSelected) &&
      !isAllSelected(filter)
    );
  };

  const renderstringFilter = (filter: FilterField) => {
    return (
      <div className="space-y-3">
        <Input
          placeholder="Search"
          value={searchValues[filter.fieldName] || ''}
          onChange={(e) => handleSearchChange(filter.fieldName, e.target.value)}
          className="mb-2"
        />

        <div className="flex items-center space-x-2">
          <Checkbox
            id={`select-all-${filter.fieldName}`}
            checked={isAllSelected(filter)}
            // indestringinate={isSomeSelected(filter)}
            onCheckedChange={(checked) => {
              onSelectAll(filter.fieldName, checked === true);
            }}
          />
          <Label htmlFor={`select-all-${filter.fieldName}`}>Select All</Label>
        </div>

        <div className="space-y-2 mt-2">
          {getFilteredOptions(filter)?.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`${filter.fieldName}-${option.value}`}
                checked={option.isSelected}
                onCheckedChange={(checked) => {
                  onFilterChange(
                    filter.fieldName,
                    option.value,
                    checked === true,
                  );
                }}
              />
              <Label
                htmlFor={`${filter.fieldName}-${option.value}`}
                className="flex-1"
              >
                {option.value}
              </Label>
              <span className="text-xs text-gray-500">({option.count})</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderRangeFilter = (filter: FilterField) => {
    const range = filter.rangeValue || { from: null, to: null };

    return (
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label>From</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <Calendar className="mr-2 h-4 w-4" />
                {range.from ? (
                  format(range.from, 'PPP')
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={range.from || undefined}
                onSelect={(date) =>
                  onRangeFilterChange(filter.fieldName, {
                    ...range,
                    from: date!,
                  })
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid gap-2">
          <Label>To</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <Calendar className="mr-2 h-4 w-4" />
                {range.to ? format(range.to, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={range.to || undefined}
                onSelect={(date) =>
                  onRangeFilterChange(filter.fieldName, { ...range, to: date! })
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {(range.from || range.to) && (
          <Button
            variant="ghost"
            size="sm"
            className="mt-2"
            onClick={() =>
              onRangeFilterChange(filter.fieldName, { from: null, to: null })
            }
          >
            Clear Range
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="absolute right-0 top-0 w-[350px] bg-white border rounded-md shadow-lg z-10">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <span>Filters</span>
        </h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X size={18} />
        </Button>
      </div>

      <div className="max-h-[500px] overflow-y-auto">
        <Accordion
          type="multiple"
          defaultValue={filters.map((f) => f.fieldName)}
        >
          {filters.map((filter) => (
            <AccordionItem key={filter.fieldName} value={filter.fieldName}>
              <AccordionTrigger className="px-4">
                <div className="flex justify-between w-full">
                  <span>{filter.fieldDisplayName}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                {filter.fieldType === 'string' ? (
                  renderstringFilter(filter)
                ) : filter.fieldType === 'range' ? (
                  renderRangeFilter(filter)
                ) : (
                  <div>Unsupported filter type: {filter.fieldType}</div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="flex items-center justify-between p-4 border-t">
        <Button variant="outline" onClick={onClear}>
          Clear All
        </Button>
        <Button onClick={onApply}>Apply</Button>
      </div>
    </div>
  );
}

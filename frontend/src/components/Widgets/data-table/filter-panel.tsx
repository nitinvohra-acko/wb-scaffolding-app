'use client';

import { useState, useRef, useEffect } from 'react';
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
import { format, parse } from 'date-fns';
import { FilterFields } from '@/types/common';

interface FilterPanelProps {
  filters: FilterFields[];
  onApply: (filters: FilterFields[]) => void;
  onClear: (filters: FilterFields[]) => void;
  onClose: () => void;
}

export function FilterPanel({
  filters,
  onApply,
  onClear,
  onClose,
}: FilterPanelProps) {
  const [localFilters, setLocalFilters] = useState<FilterFields[]>(filters);
  const [searchValues, setSearchValues] = useState<Record<string, string>>({});
  const checkboxRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleSearchChange = (fieldId: string, value: string) => {
    setSearchValues((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const getFilteredOptions = (filter: FilterFields) => {
    if (filter.type !== 'term') return [];

    const searchValue = searchValues[filter.fieldId] || '';
    if (!searchValue) return filter.attributes.options;

    return filter.attributes.options.filter((option) =>
      option.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
  };

  const isOptionSelected = (
    filter: FilterFields,
    optionName: string,
  ): boolean => {
    if (filter.type !== 'term') return false;
    const values = filter.attributes.value as string[];
    return values.includes(optionName);
  };

  const isAllSelected = (filter: FilterFields): boolean => {
    if (filter.type !== 'term') return false;
    const values = filter.attributes.value as string[];
    return (
      filter.attributes.options.length > 0 &&
      values.length === filter.attributes.options.length
    );
  };

  const isSomeSelected = (filter: FilterFields): boolean => {
    if (filter.type !== 'term') return false;
    const values = filter.attributes.value as string[];
    return (
      values.length > 0 && values.length < filter.attributes.options.length
    );
  };

  const handleOptionChange = (
    filter: FilterFields,
    optionName: string,
    checked: boolean,
  ) => {
    setLocalFilters((prev) =>
      prev.map((f) => {
        if (f.fieldId === filter.fieldId && f.type === 'term') {
          const currentValues = f.attributes.value as string[];
          let newValues: string[];

          if (checked) {
            newValues = [...currentValues, optionName];
          } else {
            newValues = currentValues.filter((v) => v !== optionName);
          }

          return {
            ...f,
            attributes: {
              ...f.attributes,
              value: newValues,
            },
          };
        }
        return f;
      }),
    );
  };

  const handleSelectAll = (filter: FilterFields, checked: boolean) => {
    setLocalFilters((prev) =>
      prev.map((f) => {
        if (f.fieldId === filter.fieldId && f.type === 'term') {
          const newValues = checked
            ? f.attributes.options.map((option) => option.name)
            : [];

          return {
            ...f,
            attributes: {
              ...f.attributes,
              value: newValues,
            },
          };
        }
        return f;
      }),
    );
  };

  const handleRangeChange = (
    filter: FilterFields,
    key: 'from' | 'to',
    date: Date | null,
  ) => {
    setLocalFilters((prev) =>
      prev.map((f) => {
        if (f.fieldId === filter.fieldId && f.type === 'range') {
          const currentRange = f.attributes.value as {
            from: string;
            to: string;
          };
          const newRange = { ...currentRange };

          if (date) {
            newRange[key] = format(date, 'yyyy-MM-dd');
          } else {
            newRange[key] = '';
          }

          return {
            ...f,
            attributes: {
              ...f.attributes,
              value: newRange,
            },
          };
        }
        return f;
      }),
    );
  };

  const handleClearRange = (filter: FilterFields) => {
    setLocalFilters((prev) =>
      prev.map((f) => {
        if (f.fieldId === filter.fieldId && f.type === 'range') {
          return {
            ...f,
            attributes: {
              ...f.attributes,
              value: { from: '', to: '' },
            },
          };
        }
        return f;
      }),
    );
  };

  const handleApplyFilters = () => {
    onApply(localFilters);
    onClose();
  };

  const handleClearFilters = () => {
    const clearedFilters = localFilters.map((filter) => {
      if (filter.type === 'term') {
        return {
          ...filter,
          attributes: {
            ...filter.attributes,
            value: [],
          },
        };
      } else if (filter.type === 'range') {
        return {
          ...filter,
          attributes: {
            ...filter.attributes,
            value: { from: '', to: '' },
          },
        };
      }
      return filter;
    });
    onClear(clearedFilters);
    onClose();
  };

  // Update indeterminate state for checkboxes
  useEffect(() => {
    localFilters.forEach((filter) => {
      if (filter.type === 'term') {
        const selectAllId = `select-all-${filter.fieldId}`;
        const checkbox = checkboxRefs.current[selectAllId];

        if (checkbox) {
          checkbox.indeterminate = isSomeSelected(filter);
        }
      }
    });
  }, [localFilters]);

  const parseDate = (dateStr: string): Date | null => {
    if (!dateStr) return null;
    try {
      return parse(dateStr, 'yyyy-MM-dd', new Date());
    } catch (e) {
      return null;
    }
  };

  const renderTermFilter = (filter: FilterFields) => {
    return (
      <div className="space-y-3">
        <Input
          placeholder="Search"
          value={searchValues[filter.fieldId] || ''}
          onChange={(e) => handleSearchChange(filter.fieldId, e.target.value)}
          className="mb-2"
        />

        <div className="flex items-center space-x-2">
          <Checkbox
            id={`select-all-${filter.fieldId}`}
            checked={isAllSelected(filter)}
            // ref={(node) => {
            //   checkboxRefs.current[`select-all-${filter.fieldId}`] = node
            //   if (node) {
            //     node?.indeterminate = isSomeSelected(filter)
            //   }
            // }}
            onCheckedChange={(checked) => {
              handleSelectAll(filter, checked === true);
            }}
          />
          <Label htmlFor={`select-all-${filter.fieldId}`}>Select All</Label>
        </div>

        <div className="space-y-2 mt-2">
          {getFilteredOptions(filter).map((option) => (
            <div key={option.name} className="flex items-center space-x-2">
              <Checkbox
                id={`${filter.fieldId}-${option.name}`}
                checked={isOptionSelected(filter, option.name)}
                onCheckedChange={(checked) => {
                  handleOptionChange(filter, option.name, checked === true);
                }}
              />
              <Label
                htmlFor={`${filter.fieldId}-${option.name}`}
                className="flex-1"
              >
                {option.name}
              </Label>
              <span className="text-xs text-gray-500">({option.count})</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderRangeFilter = (filter: FilterFields) => {
    const range = filter.attributes.value as { from: string; to: string };
    const fromDate = parseDate(range.from);
    const toDate = parseDate(range.to);

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
                {fromDate ? format(fromDate, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={fromDate || undefined}
                onSelect={(date) => handleRangeChange(filter, 'from', date!)}
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
                {toDate ? format(toDate, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={toDate || undefined}
                onSelect={(date) => handleRangeChange(filter, 'to', date!)}
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
            onClick={() => handleClearRange(filter)}
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
          defaultValue={localFilters.map((f) => f.fieldId)}
        >
          {localFilters.map((filter) => (
            <AccordionItem key={filter.fieldId} value={filter.fieldId}>
              <AccordionTrigger className="px-4">
                <div className="flex justify-between w-full">
                  <span>{filter.fieldName}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                {filter.type === 'term' ? (
                  renderTermFilter(filter)
                ) : filter.type === 'range' ? (
                  renderRangeFilter(filter)
                ) : (
                  <div>Unsupported filter type: {filter.type}</div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="flex items-center justify-between p-4 border-t">
        <Button variant="outline" onClick={handleClearFilters}>
          Clear All
        </Button>
        <Button onClick={handleApplyFilters}>Apply</Button>
      </div>
    </div>
  );
}

'use client';

import React, { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils'; // optional if you use `classnames` or ShadCN’s utility
import { FilterOption } from '@/types/task';
import { ChevronDown, ChevronUp, Search, X } from 'lucide-react';

interface MultiSelectFilterProps {
  options: FilterOption[];
  value: Array<string>;
  onChange: (value: Array<string>) => void;
  label: string;
  showCount?: boolean;
}

const MultiSelectFilter: FC<MultiSelectFilterProps> = ({
  options,
  value = [],
  onChange,
  label,
  showCount = true,
}) => {
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [searchStr, setSearchStr] = useState('');
  const isAllSelected = useMemo(
    () => filteredOptions.length === value.length,
    [filteredOptions, value],
  );
  const [open, setOpen] = useState(value?.length > 0);

  const handleToggle = (val: string) => {
    if (val === 'all') {
      if (isAllSelected) {
        onChange([]);
      } else {
        onChange(filteredOptions.map((o) => o.value));
      }
      return;
    }
    const currentIndex = value.indexOf(val);
    const updated = [...value];
    if (currentIndex === -1) {
      updated.push(val);
    } else {
      updated.splice(currentIndex, 1);
    }
    onChange(updated);
  };

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchStr(val);
    if (val) {
      setFilteredOptions(
        options.filter((opt) =>
          opt.value.toLowerCase().includes(val.toLowerCase()),
        ),
      );
    } else {
      setFilteredOptions(options);
    }
  };

  const clearSearch = () => {
    setSearchStr('');
    setFilteredOptions(options);
  };

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  return (
    <div className="w-full border-b border-muted px-2 pb-2">
      <div
        className="flex items-center justify-between cursor-pointer py-1"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-semibold">{label}</span>
        {open ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </div>

      {open && (
        <>
          <div className="relative my-1 pb-2">
            <Input
              placeholder="Search"
              value={searchStr}
              onChange={onSearch}
              className="pr-8"
            />

            {searchStr && (
              <button
                onClick={clearSearch}
                className="absolute right-2 top-2.5 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {filteredOptions.length > 0 ? (
            <ul className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {filteredOptions.length > 1 && (
                <li
                  onClick={() => handleToggle('all')}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <Checkbox checked={isAllSelected} />
                  <span className="text-sm">Select All</span>
                </li>
              )}
              {filteredOptions.map((opt) => (
                <li
                  key={opt.value}
                  onClick={() => handleToggle(opt.value)}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <Checkbox checked={value.includes(opt.value)} />
                  <span className="text-sm">
                    {opt.value.replace(/_/g, ' ')}
                    {showCount && (
                      <b className="ml-1 text-xs text-muted-foreground">
                        ({opt.count})
                      </b>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground mt-2">No data found</p>
          )}
        </>
      )}
    </div>
  );
};

export default MultiSelectFilter;

'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FilterPanel } from './filter-panel';
import { FilterIcon, Search, X } from 'lucide-react';
import { FilterFields, SearchableFieldsTypetype } from '@/types/common';

interface DataTableProps<T> {
  data: T[];
  tableTitle: string;
  columns: ColumnDef[];
  totalCount: number;
  pageSize: number;
  pageNo: number;
  searchableFields: SearchableFieldsTypetype[];
  filters: FilterFields[];
  //   sortOptions: SortOption[]
  searchStr: string;
  onSearch: (searchStr: string) => void;
  onFilter: (filters: FilterFields[]) => void;
  //   onSort: (sortOption: SortOption | null) => void
  onPageChange: (pageNo: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  renderCell: (row: T, column: ColumnDef) => React.ReactNode;
  isLoading?: boolean;
}

export interface ColumnDef {
  key: string;
  header: string;
}

export function DataTable<T>({
  data,
  tableTitle,
  columns,
  totalCount,
  pageSize,
  pageNo,
  searchableFields,
  filters,
  //   sortOptions,
  searchStr,
  onSearch,
  onFilter,
  //   onSort,
  onPageChange,
  onPageSizeChange,
  renderCell,
  isLoading = false,
}: DataTableProps<T>) {
  const [localSearchStr, setLocalSearchStr] = useState(searchStr);
  const [showFilters, setShowFilters] = useState(false);
  //   const [localSortOptions, setLocalSortOptions] = useState<SortOption[]>(sortOptions)

  useEffect(() => {
    setLocalSearchStr(searchStr);
  }, [searchStr]);

  //   useEffect(() => {
  //     setLocalSortOptions(sortOptions)
  //   }, [sortOptions])

  const handleSearch = () => {
    onSearch(localSearchStr);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClearSearch = () => {
    setLocalSearchStr('');
    onSearch('');
  };

  const handleApplyFilters = (updatedFilters: FilterFields[]) => {
    onFilter(updatedFilters);
  };

  const handleClearFilters = (updatedFilters: FilterFields[]) => {
    // This is now handled inside the FilterPanel component
    onFilter(updatedFilters);
  };

  //   const handleSortChange = (sortOption: SortOption | null) => {
  //     // Update local sort options to reflect the selected sort
  //     if (sortOption) {
  //       const updatedSortOptions = localSortOptions.map((option) => ({
  //         ...option,
  //         is_selected: option.field_id === sortOption.field_id,
  //         order: option.field_id === sortOption.field_id ? sortOption.order : option.order,
  //       }))
  //       setLocalSortOptions(updatedSortOptions)
  //     } else {
  //       // Clear all selections
  //       const updatedSortOptions = localSortOptions.map((option) => ({
  //         ...option,
  //         is_selected: false,
  //       }))
  //       setLocalSortOptions(updatedSortOptions)
  //     }

  //     onSort(sortOption)
  //   }

  //   const getSelectedSortOption = (): SortOption | null => {
  //     const selected = localSortOptions.find((option) => option.is_selected)
  //     return selected || null
  //   }

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xl font-bold">{tableTitle}</div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Input
              placeholder="Search"
              value={localSearchStr}
              onChange={(e) => setLocalSearchStr(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-[300px] pr-8"
            />
            {localSearchStr && (
              <button
                className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={handleClearSearch}
              >
                <X size={16} />
              </button>
            )}
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={handleSearch}
            >
              <Search size={16} />
            </button>
          </div>
          {/* <SortDropdown
            sortOptions={localSortOptions}
            selectedSort={getSelectedSortOption()}
            onSortChange={handleSortChange}
          /> */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? 'bg-gray-100' : ''}
          >
            <FilterIcon size={18} />
          </Button>
        </div>
      </div>

      <div className="relative">
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.key}>{column.header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Loading...
                  </TableCell>
                </TableRow>
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results found.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    className={rowIndex % 2 === 0 ? 'bg-gray-50' : ''}
                  >
                    {columns.map((column) => (
                      <TableCell key={`${rowIndex}-${column.key}`}>
                        {renderCell(row, column)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {showFilters && (
          <FilterPanel
            filters={filters}
            onApply={handleApplyFilters}
            onClear={handleClearFilters}
            onClose={() => setShowFilters(false)}
          />
        )}
      </div>

      {totalCount > 0 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            Showing {(pageNo - 1) * pageSize + 1} to{' '}
            {Math.min(pageNo * pageSize, totalCount)} of {totalCount} results
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(pageNo - 1)}
              disabled={pageNo === 1}
            >
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNumber = i + 1;
                return (
                  <Button
                    key={i}
                    variant={pageNumber === pageNo ? 'default' : 'outline'}
                    size="sm"
                    className="w-8 h-8 p-0"
                    onClick={() => onPageChange(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                );
              })}
              {totalPages > 5 && (
                <>
                  <span>...</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-8 h-8 p-0"
                    onClick={() => onPageChange(totalPages)}
                  >
                    {totalPages}
                  </Button>
                </>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(pageNo + 1)}
              disabled={pageNo === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

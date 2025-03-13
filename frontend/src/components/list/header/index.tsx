'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { Filter, Plus, Search, SortAsc } from 'lucide-react';
import Searching from './Searching';
import FilterComponent from './Filter'; // renamed to avoid conflict with `Filter` icon

interface HeaderProps {
  title: string;
  onSearch: (query: string) => void;
  onFilter: () => void;
  onSort: () => void;
  handleNewTask: (data: any) => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  onSearch,
  onFilter,
  onSort,
  handleNewTask,
}) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="bg-white border-b shadow-sm px-4 py-3 flex items-center justify-between">
      {/* Left: Title */}
      <h1 className="text-lg font-semibold text-primary">{title}</h1>

      {/* Right: Controls */}
      <div className="flex items-center gap-2">
        {/* Searching Component (custom) */}
        <Searching />

        {/* Filter Component (custom) */}
        <FilterComponent />

        {/* Optional inline search input */}
        {/* <Input
          placeholder="Search..."
          className="w-[200px] md:w-[250px]"
          onChange={handleSearchChange}
        /> */}
      </div>
    </div>
  );
};

export default Header;

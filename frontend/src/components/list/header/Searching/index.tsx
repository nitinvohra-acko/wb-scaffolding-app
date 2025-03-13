'use client';

import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { X, Info } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useMemo } from 'react';
import useTasks from '@/store/tasklist';
import { useShallow } from 'zustand/shallow';
import useTaskLists from '@/hooks/useTaskLists';
import { TaskRequest, TaskResponse } from '@/types/task';
import { Button } from '@/components/ui/button';

const SearchBar = () => {
  const { taskResponse, hoist, initFilters } = useTasks(
    useShallow((store) => ({
      taskResponse: store.taskResponse,
      hoist: store.hoist,
      initFilters: store.initFilters,
    })),
  );

  const { fetchTaskLists } = useTaskLists();
  const [searchStr, setSearchStr] = useState(taskResponse?.search_str ?? '');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchStr(event.target.value);
  };

  const handleKeyUp = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      hoist({
        ...(taskResponse as TaskResponse),
        search_str: searchStr.trim(),
      });

      setTimeout(async () => {
        const req = {
          ...useTasks.getState().taskResponse,
        };
        req.filters = [];
        req.page_no = 1;
        delete req.result;
        await fetchTaskLists(req as TaskRequest);
      }, 100);
    }
  };

  const clearSearch = async () => {
    setSearchStr('');
    hoist({
      ...(taskResponse as TaskResponse),
      search_str: '',
    });

    setTimeout(async () => {
      const req = {
        ...useTasks.getState().taskResponse,
      };
      req.page_no = 1;
      delete req.result;
      await fetchTaskLists(req as TaskRequest);
    }, 100);
  };

  const searchableText = useMemo(() => {
    return taskResponse?.searchable_fields
      ?.map((field) => field?.field_display_name)
      ?.join(', ');
  }, [taskResponse]);

  return (
    <div className="flex items-center space-x-2 w-full max-w-md px-2">
      {taskResponse?.result?.length < 0 ? (
        <Skeleton className="w-[250px] h-10 rounded-md" />
      ) : (
        <>
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Search"
              value={searchStr}
              onChange={handleQueryChange}
              onKeyUp={handleKeyUp}
              className="pr-10 bg-white"
            />
            {searchStr && (
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-muted-foreground"
                onClick={clearSearch}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{searchableText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      )}
    </div>
  );
};

export default SearchBar;

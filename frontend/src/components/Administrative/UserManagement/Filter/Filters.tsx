'use client';

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import { useShallow } from 'zustand/shallow';
import useTasks from '@/store/tasklist';
import useTaskLists from '@/hooks/useTaskLists';
import Filter from './Filter';

import {
  SlidersHorizontal,
  Filter as FilterIcon,
  X,
  Check,
} from 'lucide-react';
import useUsersStore from '@/store/users';
import { UsersRequest, UsersResponse } from '@/types/users';
import useUsers from '@/hooks/useUsers';
import { FilterField } from '@/types/common';

const Filters = () => {
  const { usersResponse, hoist, initFilters } = useUsersStore(
    useShallow((store) => ({
      usersResponse: store.usersResponse,
      hoist: store.hoist,
      initFilters: store.initFilters,
    })),
  );
  const { fetchUsersLists } = useUsers();

  const [isOpen, setIsOpen] = useState(false);

  const handleApply = () => {
    if (usersResponse?.filters) {
      hoist({
        ...(usersResponse as UsersResponse),
        pageNo: 1,
      });

      setTimeout(async () => {
        const req = {
          ...useUsersStore.getState().usersResponse,
        };
        delete req.result;
        await fetchUsersLists(req as UsersRequest);
        setIsOpen(false);
      }, 100);
    }
  };

  const handleClear = () => {
    hoist({
      ...(usersResponse as UsersResponse),
      filters: initFilters as FilterField[],
      pageNo: 1,
    });

    setTimeout(async () => {
      const req = {
        ...useUsersStore.getState().usersResponse,
      };
      delete req.result;
      await fetchUsersLists(req as UsersRequest);
      setIsOpen(false);
    }, 100);
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Filter</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right" className="top-[60px] w-[350px] p-0">
          <Card className="h-full rounded-none shadow-none border-none flex flex-col">
            <SheetHeader className="p-4 border-b flex gap-2">
              <SheetTitle className="text-base font-semibold">
                <div className="flex items-center">
                  <FilterIcon className="w-4 h-4 mr-2" />
                  <div>Filters</div>
                </div>
              </SheetTitle>
            </SheetHeader>
            {usersResponse?.filters ? (
              <>
                <CardContent className="h-[75vh] overflow-auto p-4">
                  <Filter />
                </CardContent>
                <CardFooter className="justify-end gap-2 p-4 border-t">
                  <Button
                    variant="ghost"
                    className="text-blue-600 hover:bg-transparent hover:text-blue-600"
                    onClick={handleClear}
                  >
                    Clear All
                  </Button>
                  <Button
                    className="bg-blue-600 text-white hover:bg-blue-600/90"
                    onClick={handleApply}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Apply
                  </Button>
                </CardFooter>
              </>
            ) : (
              <CardContent className="p-4">
                {[1, 2, 3, 4, 5].map((_, idx) => (
                  <Skeleton key={idx} className="w-full h-6 mb-4 last:mb-0" />
                ))}
              </CardContent>
            )}
          </Card>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Filters;

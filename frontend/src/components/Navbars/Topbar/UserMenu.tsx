'use client';

import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LogOut, User } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import useAuthStore from '@/store/auth';
import { analyticsService } from '@/services/analytics';

type UserStatus = 'available' | 'away' | 'break' | 'busy' | 'offline';

interface UserMenuProps {
  onLogout: () => void;
}

export default function UserMenu({ onLogout }: UserMenuProps) {
  const [status, setStatus] = useState<UserStatus>('available');
  const { fetchAuthDetails } = useAuth();
  const { authUser } = useAuthStore();
  const statusColors: Record<UserStatus, string> = {
    available: 'bg-green-500',
    away: 'bg-yellow-500',
    break: 'bg-yellow-500',
    busy: 'bg-red-500',
    offline: 'bg-gray-500',
  };
  const onStatusChange = (value: UserStatus) => {
    localStorage.setItem('user-status', value);
    setStatus(value);
    analyticsService?.track({
      eventName: 'user_status_change',
      eventType: 'track',
      properties: {
        previousStatus: status,
        newStatus: value,
      },
      userId: authUser?.id,
      timestamp: Date.now(),
    });
  };
  useEffect(() => {
    fetchAuthDetails();
  }, []);
  useEffect(() => {
    if (authUser) {
      localStorage &&
        setStatus(
          (localStorage.getItem('user-status') as UserStatus) || 'available',
        );
    }
  }, []);
  if (!authUser) {
    return <></>;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full mx-4">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{authUser?.firstName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <span
            className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-white ${statusColors[status]}`}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {authUser.firstName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {authUser.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="p-2">
            <div className="flex w-full flex-col gap-2">
              <p className="text-xs font-medium leading-none">Status</p>
              <Select
                value={status}
                onValueChange={(value) => onStatusChange(value as UserStatus)}
              >
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="away">Away</SelectItem>
                  <SelectItem value="break">On a break</SelectItem>
                  <SelectItem value="busy">Do not disturb</SelectItem>
                  <SelectItem value="offline">Appear offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive cursor-pointer"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Check, ChevronsUpDown, UserPlus, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { apiClient } from '@/utils/interceptor';
import useTasksDetailStore from '@/store/taskDetails';

interface UserType {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role?: string;
  group: string;
  firstName: string;
}

interface Group {
  id: string;
  name: string;
}

interface TaskAssignmentProps {
  taskId: string;
  initialAssignee?: UserType | null;
  closeWidget: () => void;
}

export function TaskAssignment({
  taskId,
  initialAssignee = null,
  closeWidget,
}: TaskAssignmentProps) {
  const { taskDetail, hoist } = useTasksDetailStore.getState();
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [users, setUsers] = useState<UserType[]>([]);
  const [assignee, setAssignee] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  // Example groups - replace with your actual groups
  const groups: Group[] = [
    { id: 'ops', name: 'Operations' },
    { id: 'doctor', name: 'Medical Staff' },
    { id: 'comms', name: 'Communications' },
    { id: 'tech', name: 'Technical Support' },
    { id: 'admin', name: 'Administration' },
  ];
  useEffect(() => {
    if (taskDetail?.assignee) {
      setAssignee(taskDetail.assignee);
    }
  }, [taskDetail]);
  const fetchUsers = async (groupId: string) => {
    if (!groupId) return;

    setIsLoading(true);
    setError(null);

    try {
      // Replace with your actual API endpoint
      const data: any = await apiClient(`/api/user/search`, 'POST', {
        body: {
          searchableFields: [],
          filters: [
            {
              type: 'term',
              fieldId: 'GROUP',
              fieldName: 'Group',
              attributes: {
                value: [groupId],
              },
            },
          ],
          sort: [],
          searchStr: '',
          pageNo: 1,
          pageSize: 10,
        },
      });
      data.result && setUsers(data.result as UserType[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAssign = async () => {
    setIsAssigning(true);
    setError(null);

    try {
      const response: any = await apiClient(`/task`, 'PATCH', {
        body: {
          id: taskDetail?.id,
          type: taskDetail?.type,
          assignee: selectedUser?.email,
        },
      });
      hoist(response);
      // if (!response.ok) throw new Error('Failed to assign task');

      // Find the assigned user from our list
      setAssignee(selectedUser?.email ?? '');
      setOpen(false);
      closeWidget();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to assign task');
      console.error(err);
    } finally {
      setIsAssigning(false);
    }
  };

  useEffect(() => {
    if (selectedGroup) {
      setAssignee(null);
      fetchUsers(selectedGroup);
    }
  }, [selectedGroup]);

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium">Task Assignment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Assignee</label>
            {assignee ? (
              <div className="flex items-center gap-2 p-2 border rounded-md bg-purple-50">
                {/* <Avatar className="h-8 w-8">
                  <AvatarImage src={assignee.avatar} />
                  <AvatarFallback>{assignee.username[0]}</AvatarFallback>
                </Avatar> */}
                <div>
                  {/* <p className="text-sm font-medium">{assignee.firstName}</p> */}
                  <p className="text-xs text-muted-foreground">{assignee}</p>
                </div>
                {/* {assignee.role && (
                  <Badge variant="outline" className="ml-auto">
                    {assignee.role}
                  </Badge>
                )} */}
              </div>
            ) : (
              <div className="flex items-center gap-2 p-2 border rounded-md text-muted-foreground">
                <User className="h-5 w-5" />
                <span>Unassigned</span>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Assign to</label>
            <div className="flex gap-2">
              <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select group" />
                </SelectTrigger>
                <SelectContent>
                  {groups.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between min-w-[200px]"
                    disabled={!selectedGroup || isLoading}
                  >
                    {isLoading ? (
                      'Loading...'
                    ) : (
                      <>
                        <span>{selectedUser?.email ?? 'Select user'}</span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-[200px]">
                  <Command>
                    <CommandInput placeholder="Search user..." />
                    <CommandList>
                      <CommandEmpty>No user found.</CommandEmpty>
                      <CommandGroup>
                        {users.map((user) => (
                          <CommandItem
                            key={user.id}
                            value={user.id}
                            onSelect={() => setSelectedUser(user)}
                          >
                            <div className="flex items-center gap-2 flex-1">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback>
                                  {user.username[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div>{user.firstName ?? user.username}</div>
                                <div className=" text-xs">
                                  {user.email ?? user.username}
                                </div>
                              </div>
                            </div>
                            <Check
                              className={cn(
                                'ml-auto h-4 w-4',
                                selectedUser?.id === user.id
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          {error && (
            <div className="p-2 bg-destructive/10 text-destructive text-sm rounded">
              {error}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button disabled={!selectedGroup || isAssigning} onClick={handleAssign}>
          <UserPlus className="mr-2 h-4 w-4" />
          {assignee ? 'Reassign' : 'Assign'} Task
        </Button>
      </CardFooter>
    </Card>
  );
}

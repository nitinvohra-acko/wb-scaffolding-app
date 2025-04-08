'use client';

import { useParams, useRouter } from 'next/navigation';
import useUserDetails from '@/hooks/useUserDetails';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { User } from '@/types/users';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { apiClient } from '@/utils/interceptor';
import { UserInfo } from '@/types/auth';
import { toast } from '@/hooks/use-toast';

interface Attribute {
  key: string;
  value: string;
}

interface Group {
  id: string;
  name: string;
  path: string;
  parentId: string | null;
  subGroupCount: number;
  subGroups: Group[];
  attributes: {
    allowedRoles: string[];
  };
  realmRoles: string[];
  clientRoles: Record<string, string[]>;
  access: {
    view: boolean;
    viewMembers: boolean;
    manageMembers: boolean;
    manage: boolean;
    manageMembership: boolean;
  };
}

const UserDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const userId = params?.id;
  const [user, setUser] = useState<UserInfo | null>();
  const { fetchUser, loading, error } = useUserDetails();
  const [groups, setGroups] = useState<Group[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [attributes, setAttributes] = useState<Attribute[]>([]);

  // Fetch user details
  const fetchUserResponse = useCallback(async () => {
    if (userId) {
      const response = await fetchUser(userId as string);
      if (response) {
        setUser(response);
        setSelectedGroup(response.group || '');
        setSelectedRole(response.role || '');
        if (response.customAttributes) {
          const customAttributes = Object.entries(
            response.customAttributes,
          ).map(([key, value]) => ({ key, value }));
          setAttributes(customAttributes as Attribute[]);
        }
      }
    }
  }, [userId, fetchUser]);

  // Fetch groups from API
  const fetchGroups = useCallback(async () => {
    try {
      const response = await apiClient('/api/user/group', 'GET'); // Replace with your API endpoint
      if (response) {
        setGroups(response as Group[]);
      }
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  }, []);

  // Update roles based on the selected group
  useEffect(() => {
    if (selectedGroup) {
      const group = groups.find((g) => g.name === selectedGroup);
      if (group) {
        setRoles(group.attributes.allowedRoles || []);
      } else {
        setRoles([]);
      }
    } else {
      setRoles([]);
    }
  }, [selectedGroup, groups]);

  useEffect(() => {
    fetchUserResponse();
    fetchGroups(); // Fetch groups on component mount
  }, [fetchUserResponse, fetchGroups]);

  useEffect(() => {
    setSelectedRole('');
  }, [selectedGroup]);

  const addAttribute = () => {
    setAttributes([...attributes, { key: '', value: '' }]);
  };

  const removeAttribute = (index: number) => {
    setAttributes(attributes.filter((_, i) => i !== index));
  };

  const updateAttribute = (
    index: number,
    field: 'key' | 'value',
    value: string,
  ) => {
    const newAttributes = [...attributes];
    newAttributes[index][field] = value;
    setAttributes(newAttributes);
  };

  const handleSubmit = async () => {
    const payload = {
      ...user,
      group: selectedGroup,
      role: selectedRole,
      customAttributes: {
        ...user?.customAttributes,
        ...attributes?.reduce((acc: Record<string, string>, attr) => {
          if (attr.key && attr.value) {
            acc[attr.key] = attr.value;
          }
          return acc;
        }, {}),
      },
    };
    console.log('Submitting user data:', payload);
    try {
      const response = await apiClient('/api/user', 'POST', {
        body: payload,
      });
      console.log('User updated successfully:', response);
      if (response) {
        toast({
          title: 'Success',
          description: 'User updated successfully!',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again later.',
      });
      console.error('Error updating user:', error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="bg-destructive/10 text-destructive p-4 rounded-md">
          Error loading user details. User may not exist or there was a problem
          fetching the data.
        </div>
      </div>
    );
  }
  console.log(roles, groups, selectedGroup);
  return (
    <div className="container">
      <Button variant="outline" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Users
      </Button>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">User Details</CardTitle>
          <CardDescription>
            Detailed information about {user.firstName} {user.lastName}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Username
              </h3>
              <p className="text-lg">{user.username}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Email
              </h3>
              <p className="text-lg">{user.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                First Name
              </h3>
              <p className="text-lg">{user.firstName}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Last Name
              </h3>
              <p className="text-lg">{user.lastName}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Status
              </h3>
              <Badge variant={user.active ? 'success' : 'destructive'}>
                {user.active ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </div>

          {/* Group Dropdown */}
          <div>
            <Label htmlFor="group">Group</Label>
            <Select value={selectedGroup} onValueChange={setSelectedGroup}>
              <SelectTrigger id="group">
                <SelectValue placeholder="Select group" />
              </SelectTrigger>
              <SelectContent>
                {groups.map((group) => (
                  <SelectItem key={group.id} value={group.name}>
                    {group.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Role Dropdown */}
          {selectedGroup && (
            <div>
              <Label htmlFor="role">Role</Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Attributes Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Attributes</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addAttribute}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Attribute
              </Button>
            </div>

            {attributes.map((attr, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="flex-1">
                  <Input
                    placeholder="Key"
                    value={attr.key}
                    onChange={(e) =>
                      updateAttribute(index, 'key', e.target.value)
                    }
                  />
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="Value"
                    value={attr.value}
                    onChange={(e) =>
                      updateAttribute(index, 'value', e.target.value)
                    }
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeAttribute(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter>
          <Button onClick={handleSubmit}>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserDetailPage;

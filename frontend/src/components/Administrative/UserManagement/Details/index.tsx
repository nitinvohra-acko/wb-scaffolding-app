'use client';

import { useParams, useRouter } from 'next/navigation';
import useUserDetails from '@/hooks/use-user-details';
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
import { ArrowLeft } from 'lucide-react';
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

const GROUPS = [
  // { id: 'ops', name: 'Operations' },
  { id: 'under_writer', name: 'Underwriter' },
  { id: 'doctor', name: 'Doctor' },
  // { id: 'comms', name: 'Comms' },
];

const ROLE_MAP: Record<string, Record<string, string>> = {
  under_writer: {
    prod_hrap_uw: 'Under writer',
    prod_hrap_uw_admin: 'Under writer admin',
    prod_hrap_uw_superadmin: 'Under writer super admin',
    prod_hrap_uw_superlead: 'Under writer super lead',
  },
  doctor: {
    prod_hrap_doctor: 'Doctor',
    prod_hrap_doctor_teamlead: 'Doctor lead',
    prod_hrap_doctor_superlead: 'Doctor super lead',
  },
  ops: {
    prod_hrap_ops: 'Operations',
    prod_hrap_ops_teamlead: 'Operations lead',
    prod_hrap_ops_superlead: 'Operations super lead',
    prod_hrap_ops_superadmin: 'Operations super admin',
  },
  comms: {
    prod_hrap_comms: 'Comms',
    prod_hrap_comms_teamlead: 'Comms lead',
    prod_hrap_comms_superlead: 'Comms super lead',
  },
};

const UserDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const userId = params?.id;
  const [user, setUser] = useState<User | null>();
  const { fetchUser, loading, error } = useUserDetails();

  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('');

  const fetchUserResponse = useCallback(async () => {
    if (userId) {
      const response = await fetchUser(userId as string);
      if (response) {
        setUser(response);
        setSelectedGroup(response.group || '');
      }
    }
  }, [userId, fetchUser]);

  useEffect(() => {
    fetchUserResponse();
  }, [fetchUserResponse]);

  useEffect(() => {
    setSelectedRole('');
  }, [selectedGroup]);

  const handleSubmit = () => {
    console.log('Submitting:', {
      group: selectedGroup,
      role: selectedRole,
    });

    // TODO: Replace with API call or backend submit logic
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
                {GROUPS.map((group) => (
                  <SelectItem key={group.id} value={group.id}>
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
                  {Object.entries(ROLE_MAP[selectedGroup] || {}).map(
                    ([code, label]) => (
                      <SelectItem key={code} value={code}>
                        {label}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>

        <CardFooter>
          <Button onClick={handleSubmit}>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserDetailPage;

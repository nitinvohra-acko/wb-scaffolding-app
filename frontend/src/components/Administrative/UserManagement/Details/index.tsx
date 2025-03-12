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

const UserDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const userId = params?.id;
  const [user, setUser] = useState<User | null>();
  const { fetchUser, loading, error } = useUserDetails();
  const fetchUserResponse = useCallback(async () => {
    if (userId) {
      const response = await fetchUser(userId as string);
      if (response) {
        setUser(response);
      }
    }
  }, []);
  useEffect(() => {
    fetchUserResponse();
  }, []);
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
    <div className="container mx-auto py-8 px-4">
      <Button variant="outline" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Users
      </Button>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">User Details</CardTitle>
          <CardDescription>
            Detailed information about {user.first_name} {user.last_name}
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
              <p className="text-lg">{user.first_name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Last Name
              </h3>
              <p className="text-lg">{user.last_name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Group
              </h3>
              <p className="text-lg">{user.group}</p>
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
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="w-full"
          >
            Back to Users List
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserDetailPage;

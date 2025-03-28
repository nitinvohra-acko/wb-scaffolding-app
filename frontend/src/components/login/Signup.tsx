// Signup.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { apiClient } from '@/utils/interceptor';

const signupSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignupForm = z.infer<typeof signupSchema>;

export default function Signup() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const handleSignup = async (data: SignupForm) => {
    const userData = {
      ...data,
      username: data?.email,
      group: 'doctor',
      active: true,
    }; // handle the group later
    try {
      const response = await apiClient('/api/user', 'POST', {
        body: userData,
      });

      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm shadow-md bg-white dark:bg-gray-800">
        <CardContent>
          <h2 className="text-xl font-semibold text-center mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit(handleSignup)} className="space-y-3">
            <Input placeholder="Email" {...register('email')} />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
            <Input placeholder="First Name" {...register('firstName')} />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName.message}</p>
            )}
            <Input placeholder="Last Name" {...register('lastName')} />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName.message}</p>
            )}
            <Input
              placeholder="Password"
              type="password"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
          <p className="text-sm text-center mt-3 text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

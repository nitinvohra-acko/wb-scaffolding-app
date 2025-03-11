// Login.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Chrome, Loader2 } from 'lucide-react';
import Cookies from 'js-cookie';
import Link from 'next/link';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
const KEYCLOAK_BASE_URL = process.env.NEXT_PUBLIC_KEYCLOAK_BASE_URL;

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const handleIdPLogin = (provider: string) => {
    const loginUrl =
      `${KEYCLOAK_BASE_URL}/protocol/openid-connect/auth` +
      `?client_id=${CLIENT_ID}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI ?? '')}` +
      `&kc_idp_hint=${provider}` +
      `&scope=openid`;
    window.location.href = loginUrl;
  };

  const handleDirectLogin = async (data: LoginForm) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${KEYCLOAK_BASE_URL}/protocol/openid-connect/token`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            client_id: CLIENT_ID ?? '',
            grant_type: 'password',
            username: data.username,
            password: data.password,
            scope: 'openid',
          }),
        },
      );

      if (!response.ok) throw new Error('Invalid username or password');

      const tokens = await response.json();
      Cookies.set('access_token', tokens.access_token, {
        secure: true,
        sameSite: 'strict',
        path: '/',
      });
      Cookies.set('id_token', tokens.id_token, {
        secure: true,
        sameSite: 'strict',
        path: '/',
      });
      Cookies.set('refresh_token', tokens.refresh_token, {
        secure: true,
        sameSite: 'strict',
        path: '/',
      });

      window.location.href = '/list';
    } catch (error: any) {
      setError(error.message || 'An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm shadow-md bg-white dark:bg-gray-800">
        <CardContent>
          <h2 className="text-xl font-semibold text-center mb-4">Login</h2>
          <Button
            variant="destructive"
            className="w-full mb-4"
            onClick={() => handleIdPLogin('google')}
          >
            <span className="mr-2">
              <Chrome />
            </span>
            Login with Google
          </Button>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-2">
            Or login with your username and password
          </p>
          <form
            onSubmit={handleSubmit(handleDirectLogin)}
            className="space-y-3"
          >
            <Input placeholder="Username" {...register('username')} />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
            <Input
              placeholder="Password"
              type="password"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button
              type="submit"
              variant="default"
              className="w-full"
              disabled={loading}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Login'}
            </Button>
          </form>
          <p className="text-sm text-center mt-3 text-gray-600">
            Don't have an account?{' '}
            <Link
              href="/login/signup"
              className="text-blue-600 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

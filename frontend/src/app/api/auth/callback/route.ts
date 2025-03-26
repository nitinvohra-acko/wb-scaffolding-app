import { User } from '@/types/users';
import { apiClient } from '@/utils/interceptor';
import { NextRequest, NextResponse } from 'next/server';

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
const SECRET = process.env.NEXT_PUBLIC_SECRET;
const TOKEN_API = process.env.NEXT_PUBLIC_TOKEN_API;
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json(
      { error: 'Missing authorization code' },
      { status: 400 },
    );
  }
  try {
    // Exchange authorization code for tokens
    const response = await fetch(TOKEN_API ?? '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID ?? '',
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI ?? '',
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to exchange token: ${response.statusText}`);
    }

    const tokens = await response.json();
    createUserInDB(tokens);
    const responseHeaders = NextResponse.redirect(new URL('/tasks', req.url));
    // Set cookies for all tokens
    responseHeaders.cookies.set('access_token', tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: tokens.expires_in,
    });

    if (tokens.refresh_token) {
      responseHeaders.cookies.set('refresh_token', tokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
      });
    }

    if (tokens.id_token) {
      responseHeaders.cookies.set('id_token', tokens.id_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
      });
    }

    return responseHeaders;
  } catch (error) {
    console.error('Token exchange failed:', error);
    return NextResponse.json(
      { error: 'Failed to exchange token' },
      { status: 500 },
    );
  }
}

const createUserInDB = async (tokens: any) => {
  // Create user in DB
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/api/user/token/info`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokens.access_token}`,
      },
    },
  );
  if (!res.ok) {
    throw new Error(
      `Failed to get user info: ${res.statusText} ${await res.text()}`,
    );
  }
  const data = await res.json();
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
  } catch (error) {
    console.error(error);
  }
};

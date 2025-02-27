// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('access_token');
  const refreshToken = req.cookies.get('refresh_token');

  // If no access token, redirect to login
  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Check if token is expired
  const isExpired = await isTokenExpired(accessToken?.value as string);

  if (isExpired && refreshToken) {
    console.log('Access token expired. Attempting refresh...');

    // Call API to refresh token
    const refreshResponse = await fetch(new URL('/api/auth/refresh', req.url), {
      method: 'POST',
      headers: { Cookie: req.headers.get('cookie') || '' },
    });
    if (refreshResponse.ok) {
      const response = NextResponse.next();
      const newAccessToken = (await refreshResponse.json()).accessToken;

      response.cookies.set('access_token', newAccessToken, {
        httpOnly: true,
        secure: true,
        path: '/',
      });

      return response;
    } else {
      console.error('Refresh token invalid');
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

// Helper function to check if token is expired
async function isTokenExpired(token: string) {
  try {
    const payload = JSON.parse(
      Buffer.from(token?.split('.')[1], 'base64').toString(),
    );
    return payload.exp * 1000 < Date.now();
  } catch (error) {
    console.error('Error decoding token', error);
    return true; // Treat as expired
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login|health-check).*)',
  ],
};

import { NextRequest, NextResponse } from 'next/server';

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!;
const KEYCLOAK_BASE_URL = `${process.env.NEXT_PUBLIC_KEYCLOAK_BASE_URL}/protocol/openid-connect/token`;
const SECRET = process.env.NEXT_PUBLIC_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get('refresh_token')?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'No refresh token provided' },
        { status: 401 },
      );
    }

    // ✅ Ensure the correct request format
    const response = await fetch(KEYCLOAK_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        // client_secret: SECRET, // Remove if using a public client
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: 'Failed to refresh token', details: errorData },
        { status: 400 },
      );
    }

    const data = await response.json();

    // ✅ Set new access token in an HTTP-only cookie
    const responseWithCookie = NextResponse.json(
      { accessToken: data.access_token },
      { status: 200 },
    );
    responseWithCookie.cookies.set('access_token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: data.expires_in,
    });

    return responseWithCookie;
  } catch (error) {
    console.error('Refresh token error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

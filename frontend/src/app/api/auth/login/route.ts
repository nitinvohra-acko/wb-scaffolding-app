import { NextResponse } from 'next/server';

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
const KEYCLOAK_BASE_URL = process.env.NEXT_PUBLIC_KEYCLOAK_BASE_URL;
const SECRET = process.env.NEXT_PUBLIC_SECRET;
export async function POST(req: Request) {
  const { username, password } = await req.json();

  const tokenUrl = `${KEYCLOAK_BASE_URL}/protocol/openid-connect/token`;
  try {
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID ?? '',
        // client_secret: SECRET ?? "",
        grant_type: 'password',
        username,
        password,
        scope: 'openid',
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 },
      );
    }

    const tokens = await response.json();
    return NextResponse.json(tokens);
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login.' },
      { status: 500 },
    );
  }
}

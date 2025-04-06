// app/api/rbac/components/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'public/rbacComponents.json');

  if (!fs.existsSync(filePath)) {
    return NextResponse.json(
      { error: 'RBAC components not found. Run `npm run generate-rbac`.' },
      { status: 404 },
    );
  }

  // Disable Next.js API caching so the response is always fresh
  return new NextResponse(fs.readFileSync(filePath, 'utf-8'), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, must-revalidate', // Ensures API is always fresh
    },
  });
}

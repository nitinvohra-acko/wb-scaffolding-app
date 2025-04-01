import { NextRequest, NextResponse } from 'next/server';
import { fork } from 'child_process';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const { name, permission } = await req.json();

    const registerScript = path.join(
      process.cwd(),
      'src',
      'scripts',
      'generateRBACComponents.ts',
    );
    const child = fork(registerScript);

    child.send({ name, permission });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to register RBAC component' },
      { status: 500 },
    );
  }
}

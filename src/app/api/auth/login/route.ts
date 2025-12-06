import { NextRequest, NextResponse } from 'next/server';
import { signIn } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const session = await signIn(email, password);

    return NextResponse.json({ success: true, session });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Login failed' },
      { status: 401 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized', isValid: false },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);

    // TODO: Validate token with actual auth service (Supabase, Firebase, etc.)
    // This is a placeholder implementation
    
    // For now, accept any non-empty token
    if (token && token.length > 0) {
      return NextResponse.json({
        success: true,
        isValid: true,
        message: 'Token is valid',
      });
    }

    return NextResponse.json(
      { error: 'Invalid token', isValid: false },
      { status: 401 }
    );
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json(
      { error: 'Internal server error', isValid: false },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';

// Mock data - replace with actual database queries
const mockReminders = [
  { id: '1', time: '09:00', medicine: 'Paracetamol 500mg', dosage: '1 tablet', status: 'pending' },
  { id: '2', time: '14:00', medicine: 'Vitamin D', dosage: '1 capsule', status: 'pending' },
  { id: '3', time: '21:00', medicine: 'Paracetamol 500mg', dosage: '1 tablet', status: 'taken' },
];

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // TODO: Validate token and fetch user-specific reminders
    // const token = authHeader.substring(7);

    return NextResponse.json({
      success: true,
      reminders: mockReminders,
    });
  } catch (error) {
    console.error('Error fetching reminders:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

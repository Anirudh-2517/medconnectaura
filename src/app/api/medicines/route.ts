import { NextRequest, NextResponse } from 'next/server';

// Mock data - replace with actual database queries
const mockMedicines = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    dosage: '500mg',
    frequency: '3 times a day',
    nextDose: '14:00',
    duration: 5,
  },
  {
    id: '2',
    name: 'Vitamin D',
    dosage: '1000IU',
    frequency: 'Once daily',
    nextDose: '21:00',
    duration: 30,
  },
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

    // TODO: Validate token with actual database/auth service
    // const token = authHeader.substring(7);

    return NextResponse.json({
      success: true,
      medicines: mockMedicines,
    });
  } catch (error) {
    console.error('Error fetching medicines:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

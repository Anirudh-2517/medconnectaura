import { NextRequest, NextResponse } from 'next/server';

// Mock data - replace with actual database queries
const mockStores = [
  {
    id: '1',
    name: 'Apollo Pharmacy',
    address: '123 Main St, City',
    phone: '+1 (555) 123-4567',
    distance: 0.5,
    openingTime: '08:00',
    closingTime: '22:00',
    isOpen: true,
    medicinesAvailable: 45,
    averagePrice: 50,
    latitude: 40.7128,
    longitude: -74.006,
  },
  {
    id: '2',
    name: 'Medplus',
    address: '456 Oak Ave, City',
    phone: '+1 (555) 234-5678',
    distance: 1.2,
    openingTime: '09:00',
    closingTime: '21:00',
    isOpen: true,
    medicinesAvailable: 38,
    averagePrice: 45,
    latitude: 40.7089,
    longitude: -74.0012,
  },
  {
    id: '3',
    name: 'NetMeds',
    address: '789 Elm St, City',
    phone: '+1 (555) 345-6789',
    distance: 2.1,
    openingTime: '08:30',
    closingTime: '21:30',
    isOpen: false,
    medicinesAvailable: 52,
    averagePrice: 42,
    latitude: 40.7505,
    longitude: -73.9934,
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

    // TODO: Validate token and fetch nearby stores based on user location
    // const token = authHeader.substring(7);

    return NextResponse.json({
      success: true,
      stores: mockStores,
    });
  } catch (error) {
    console.error('Error fetching stores:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

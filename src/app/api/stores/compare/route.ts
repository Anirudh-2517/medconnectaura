import { NextRequest, NextResponse } from 'next/server';

interface MedicinePrice {
  name: string;
  apollo: number;
  pharmeasy: number;
  medplus: number;
  netmeds: number;
  local: number;
  inStock: boolean;
}

const medicinePriceDatabase: Record<string, MedicinePrice> = {
  'paracetamol-500mg': {
    name: 'Paracetamol 500mg',
    apollo: 45.99,
    pharmeasy: 42.50,
    medplus: 43.75,
    netmeds: 48.00,
    local: 50.00,
    inStock: true,
  },
  'vitamin-d3': {
    name: 'Vitamin D3 1000 IU',
    apollo: 299.99,
    pharmeasy: 280.00,
    medplus: 290.00,
    netmeds: 310.00,
    local: 320.00,
    inStock: true,
  },
  'aspirin-100mg': {
    name: 'Aspirin 100mg',
    apollo: 89.99,
    pharmeasy: 85.00,
    medplus: 87.50,
    netmeds: 95.00,
    local: 100.00,
    inStock: true,
  },
};

export async function POST(req: NextRequest) {
  try {
    const { medicines } = await req.json();

    if (!medicines || !Array.isArray(medicines)) {
      return NextResponse.json(
        { error: 'medicines array is required' },
        { status: 400 }
      );
    }

    const results = medicines.map((medicine: string) => {
      const key = medicine.toLowerCase().replace(/\s+/g, '-');
      const priceData = medicinePriceDatabase[key];

      if (!priceData) {
        return {
          medicine,
          found: false,
          prices: {},
        };
      }

      return {
        medicine: priceData.name,
        found: true,
        prices: {
          apollo: { store: 'Apollo Pharmacy', price: priceData.apollo },
          pharmeasy: { store: 'PharmEasy', price: priceData.pharmeasy },
          medplus: { store: 'MedPlus', price: priceData.medplus },
          netmeds: { store: 'NetMeds', price: priceData.netmeds },
          local: { store: 'Local Pharmacy', price: priceData.local },
        },
        minPrice: Math.min(
          priceData.apollo,
          priceData.pharmeasy,
          priceData.medplus,
          priceData.netmeds,
          priceData.local
        ),
        inStock: priceData.inStock,
      };
    });

    return NextResponse.json({ success: true, results });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Comparison failed' },
      { status: 500 }
    );
  }
}

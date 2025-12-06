import { calculateDistance, formatPrice } from '@/lib/helpers';

interface PharmacyStore {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
}

interface MedicinePrice {
  medicineName: string;
  prices: Record<string, number>;
  minPrice: number;
  maxPrice: number;
  cheapestStore: string;
}

/**
 * Price Comparison Agent - Finds and compares medicine prices across stores
 * Integrates with pharmacy APIs and local dataset for price matching
 */
export class PriceAgent {
  // Mock pharmacy database
  private static pharmacies: PharmacyStore[] = [
    {
      id: '1',
      name: 'Apollo Pharmacy',
      latitude: 17.430,
      longitude: 78.412,
      address: '123 Main Street, Hyderabad',
    },
    {
      id: '2',
      name: 'MedPlus',
      latitude: 17.432,
      longitude: 78.415,
      address: '456 Park Lane, Hyderabad',
    },
    {
      id: '3',
      name: 'NetMeds',
      latitude: 17.428,
      longitude: 78.410,
      address: '789 Oak Road, Hyderabad',
    },
  ];

  private static priceDatabase: Record<string, Record<string, number>> = {
    'Paracetamol 500mg': {
      'Apollo Pharmacy': 45.99,
      MedPlus: 43.75,
      NetMeds: 48.00,
    },
    'Vitamin D3': {
      'Apollo Pharmacy': 299.99,
      MedPlus: 290.00,
      NetMeds: 310.00,
    },
  };

  static comparePrices(
    medicines: string[],
    userLat?: number,
    userLng?: number
  ): MedicinePrice[] {
    return medicines.map((medicine) => {
      const prices = this.priceDatabase[medicine] || {};
      const priceValues = Object.values(prices);

      if (priceValues.length === 0) {
        return {
          medicineName: medicine,
          prices: {},
          minPrice: 0,
          maxPrice: 0,
          cheapestStore: 'N/A',
        };
      }

      const minPrice = Math.min(...priceValues);
      const maxPrice = Math.max(...priceValues);

      const cheapestStore = Object.entries(prices).find(([_, price]) => price === minPrice)?.[0] || '';

      return {
        medicineName: medicine,
        prices,
        minPrice,
        maxPrice,
        cheapestStore,
      };
    });
  }

  static findNearbyPharmacies(userLat: number, userLng: number, radiusKm: number = 5) {
    return this.pharmacies
      .map((pharmacy) => ({
        ...pharmacy,
        distance: calculateDistance(userLat, userLng, pharmacy.latitude, pharmacy.longitude),
      }))
      .filter((pharmacy) => pharmacy.distance <= radiusKm)
      .sort((a, b) => a.distance - b.distance);
  }

  static getStockInfo(medicineName: string, storeName: string): boolean {
    // Mock stock data
    return Math.random() > 0.2; // 80% in stock
  }

  static calculateSavings(medicines: MedicinePrice[]): number {
    return medicines.reduce((total, med) => {
      return total + (med.maxPrice - med.minPrice);
    }, 0);
  }
}

export default PriceAgent;

'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loader } from '@/components/ui/Loader';
import { Alert } from '@/components/ui/Alert';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MapPin, Phone, Clock, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';

interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  distance: number;
  openingTime: string;
  closingTime: string;
  isOpen: boolean;
  medicinesAvailable: number;
  averagePrice: number;
  latitude: number;
  longitude: number;
}

interface PriceData {
  storeName: string;
  price: number;
  inStock: boolean;
}

export default function StoresPage() {
  const [selectedMedicine, setSelectedMedicine] = useState<string>('');
  const [medicines, setMedicines] = useState<string[]>([]);
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [sortBy, setSortBy] = useState<'distance' | 'price' | 'inStock'>('distance');

  // Fetch stores
  const {
    data: stores,
    isLoading: storesLoading,
    error: storesError,
  } = useQuery({
    queryKey: ['stores'],
    queryFn: async () => {
      const response = await axios.get('/api/stores', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data.stores || [];
    },
  });

  // Fetch medicines
  const {
    data: medicinesData,
    isLoading: medicinesLoading,
    error: medicinesError,
  } = useQuery({
    queryKey: ['medicines'],
    queryFn: async () => {
      const response = await axios.get('/api/medicines', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data.medicines?.map((m: any) => m.name) || [];
    },
  });

  // Fetch price comparison
  const {
    data: priceData,
    isLoading: pricesLoading,
    error: pricesError,
  } = useQuery({
    queryKey: ['prices', selectedMedicine],
    queryFn: async () => {
      if (!selectedMedicine) return null;
      const response = await axios.post('/api/stores/compare', { medicine: selectedMedicine });
      return response.data.prices || [];
    },
    enabled: !!selectedMedicine,
  });

  useEffect(() => {
    if (medicinesData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMedicines(medicinesData);
    }
  }, [medicinesData]);

  useEffect(() => {
    if (stores && priceData) {
      let filtered = stores.map((store: Store) => {
        const priceInfo = priceData.find((p: PriceData) => p.storeName === store.name);
        return {
          ...store,
          price: priceInfo?.price || 0,
          inStock: priceInfo?.inStock || false,
        };
      });

      // Sort based on selected criteria
      if (sortBy === 'price') {
        filtered = filtered.sort((a: any, b: any) => (a.price || 9999) - (b.price || 9999));
      } else if (sortBy === 'inStock') {
        filtered = filtered.sort((a: any, b: any) => (b.inStock ? 1 : 0) - (a.inStock ? 1 : 0));
      } else {
        filtered = filtered.sort((a: any, b: any) => a.distance - b.distance);
      }

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFilteredStores(filtered);
    }
  }, [stores, priceData, sortBy]);

  const handleNavigate = (lat: number, lng: number) => {
    const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(mapsUrl, '_blank');
  };

  if (storesLoading || medicinesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (storesError || medicinesError) {
    return (
      <div className="p-8">
        <Alert variant="error">
          <AlertCircle className="h-4 w-4" />
          <div>
            <h3 className="font-semibold">Failed to load stores</h3>
            <p className="text-sm">Please try again later</p>
          </div>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-950 dark:to-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Nearby Stores
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Find the best prices for your medications at nearby pharmacies
          </p>
        </div>

        {/* Medicine Selector */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8">
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Select Medicine for Price Comparison
          </label>
          <div className="flex gap-4">
            <select
              value={selectedMedicine}
              onChange={(e) => setSelectedMedicine(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Choose a medicine...</option>
              {medicines.map((med) => (
                <option key={med} value={med}>
                  {med}
                </option>
              ))}
            </select>
            <Button
              disabled={!selectedMedicine || pricesLoading}
              className="px-6"
              isLoading={pricesLoading}
            >
              Compare Prices
            </Button>
          </div>
        </div>

        {/* Sort Options */}
        {selectedMedicine && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm mb-8">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Sort By
            </label>
            <div className="flex gap-4">
              <Button
                variant={sortBy === 'distance' ? 'primary' : 'secondary'}
                onClick={() => setSortBy('distance')}
                size="sm"
              >
                Distance
              </Button>
              <Button
                variant={sortBy === 'price' ? 'primary' : 'secondary'}
                onClick={() => setSortBy('price')}
                size="sm"
              >
                Price (Low to High)
              </Button>
              <Button
                variant={sortBy === 'inStock' ? 'primary' : 'secondary'}
                onClick={() => setSortBy('inStock')}
                size="sm"
              >
                In Stock First
              </Button>
            </div>
          </div>
        )}

        {/* Stores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredStores.length === 0 ? (
            <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg p-12 text-center shadow-sm">
              <MapPin className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {selectedMedicine ? 'No stores found' : 'Select a medicine'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedMedicine
                  ? 'Try searching for a different medicine'
                  : 'Choose a medicine from the dropdown to see nearby stores'}
              </p>
            </div>
          ) : (
            filteredStores.map((store) => (
              <div
                key={store.id}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Store Header */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{store.name}</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4" />
                    {store.distance.toFixed(1)} km away
                  </div>
                </div>

                {/* Store Details */}
                <div className="p-4 space-y-4">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {store.address}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <a
                      href={`tel:${store.phone}`}
                      className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {store.phone}
                    </a>
                  </div>

                  {/* Timing */}
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    <div className="text-sm">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {store.isOpen ? (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Open Now
                          </Badge>
                        ) : (
                          <Badge variant="danger">Closed</Badge>
                        )}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">
                        {store.openingTime} - {store.closingTime}
                      </p>
                    </div>
                  </div>

                  {/* Price & Stock */}
                  {selectedMedicine && (
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Price</p>
                          <p className="font-bold text-gray-900 dark:text-white">
                            ${(store as any).price || 'N/A'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {(store as any).inStock ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <div>
                              <p className="text-xs text-gray-600 dark:text-gray-400">Stock</p>
                              <p className="font-bold text-green-600">In Stock</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-4 h-4 text-red-600" />
                            <div>
                              <p className="text-xs text-gray-600 dark:text-gray-400">Stock</p>
                              <p className="font-bold text-red-600">Out of Stock</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Navigate Button */}
                  <Button
                    onClick={() => handleNavigate(store.latitude, store.longitude)}
                    className="w-full mt-4"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Navigate
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

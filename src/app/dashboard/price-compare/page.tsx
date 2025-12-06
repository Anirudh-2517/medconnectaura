'use client';

import React, { useState, useEffect } from 'react';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PriceComparisonTable } from '../components/PriceComparisonTable';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { Alert } from '@/components/ui/Alert';
import { AlertCircle, Search } from 'lucide-react';

export default function PriceComparePage() {
  const [searchMedicine, setSearchMedicine] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState('');
  const [medicines, setMedicines] = useState<string[]>([]);

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
    data: prices = [],
    isLoading: pricesLoading,
    error: pricesError,
  } = useQuery({
    queryKey: ['prices', selectedMedicine],
    queryFn: async () => {
      if (!selectedMedicine) return [];
      const response = await axios.post('/api/stores/compare', { medicine: selectedMedicine }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data.prices || [];
    },
    enabled: !!selectedMedicine,
  });

  // Fetch stores
  const {
    data: stores = [],
    isLoading: storesLoading,
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

  useEffect(() => {
    if (medicinesData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMedicines(medicinesData);
      if (!selectedMedicine && medicinesData.length > 0) {
        setSelectedMedicine(medicinesData[0]);
      }
    }
  }, [medicinesData, selectedMedicine]);

  if (medicinesLoading || storesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-6">
      {/* Error Alerts */}
      {medicinesError && (
        <Alert variant="error">
          <AlertCircle className="h-4 w-4" />
          <div>
            <h3 className="font-semibold">Failed to load medicines</h3>
          </div>
        </Alert>
      )}
      {pricesError && (
        <Alert variant="error">
          <AlertCircle className="h-4 w-4" />
          <div>
            <h3 className="font-semibold">Failed to load prices</h3>
          </div>
        </Alert>
      )}

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Compare Medicine Prices</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Find the best prices across pharmacy stores near you
        </p>
      </div>

      {/* Search Section */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900 dark:text-white">Search Medicine</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for a medicine..."
                value={searchMedicine}
                onChange={(e) => setSearchMedicine(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            {/* Suggestions */}
            {searchMedicine && (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {medicines
                  .filter((med) => med.toLowerCase().includes(searchMedicine.toLowerCase()))
                  .map((medicine) => (
                    <button
                      key={medicine}
                      onClick={() => {
                        setSelectedMedicine(medicine);
                        setSearchMedicine('');
                      }}
                      className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {medicine}
                    </button>
                  ))}
              </div>
            )}

            {/* Recent Medicines */}
            {!searchMedicine && medicines.length > 0 && (
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Your Medicines</p>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {medicines.map((medicine) => (
                    <button
                      key={medicine}
                      onClick={() => setSelectedMedicine(medicine)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedMedicine === medicine
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      {medicine}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {medicines.length === 0 && !searchMedicine && (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No medicines found. Upload a prescription first.
              </p>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Price Comparison */}
      {selectedMedicine && (
        <>
          {pricesLoading ? (
            <Card>
              <CardBody className="flex items-center justify-center py-8">
                <Loader />
              </CardBody>
            </Card>
          ) : (
            <PriceComparisonTable medicine={selectedMedicine} prices={prices} />
          )}
        </>
      )}

      {/* Nearby Stores */}
      {stores.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-gray-900 dark:text-white">Nearby Stores</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {stores.slice(0, 5).map((store: any) => (
                <div
                  key={store.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{store.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {store.distance.toFixed(1)} km away
                    </p>
                  </div>
                  <Button size="sm" variant="secondary">
                    Navigate
                  </Button>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

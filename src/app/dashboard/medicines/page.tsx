'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { MedicineList } from '../components/MedicineList';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Loader } from '@/components/ui/Loader';
import { Alert } from '@/components/ui/Alert';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function MedicinesPage() {
  // Fetch medicines using React Query
  const {
    data: medicines = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['medicines'],
    queryFn: async () => {
      const response = await axios.get('/api/medicines', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data.medicines || [];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const endingSoon = medicines.filter((m: any) => m.daysLeft <= 5);
  const todaysDoses = medicines.reduce((acc: number, m: any) => acc + (m.timings?.length || 0), 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-6">
      {/* Error Alert */}
      {error && (
        <Alert variant="error">
          <AlertCircle className="h-4 w-4" />
          <div>
            <h3 className="font-semibold">Failed to load medicines</h3>
            <p className="text-sm">Please try again later</p>
          </div>
        </Alert>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Medicines</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your active medications</p>
        </div>
        <Link href="/dashboard/upload">
          <Button>Add Prescription</Button>
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardBody>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Medicines</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{medicines.length}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-sm text-gray-600 dark:text-gray-400">Ending Soon</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{endingSoon.length}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-sm text-gray-600 dark:text-gray-400">Today&apos;s Doses</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{todaysDoses}</p>
          </CardBody>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        <Badge variant="primary">All ({medicines.length})</Badge>
        <Badge variant="secondary">Ending Soon ({endingSoon.length})</Badge>
        <Badge variant="secondary">Active ({medicines.length})</Badge>
      </div>

      {/* Medicine List */}
      {medicines.length === 0 ? (
        <Card className="text-center py-8">
          <CardBody>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No medicines found. Upload a prescription to get started.
            </p>
            <Link href="/dashboard/upload">
              <Button>Upload Prescription</Button>
            </Link>
          </CardBody>
        </Card>
      ) : (
        <MedicineList medicines={medicines} />
      )}
    </div>
  );
}

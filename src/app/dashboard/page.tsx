'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Pill, Clock, AlertCircle, MapPin } from 'lucide-react';
import { SummaryCard, MedicineCard, AlertCard, StoreCard } from './components/DashboardCards';
import { ReminderTimeline, PrescriptionCard } from './components/PrescriptionCard';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { Alert } from '@/components/ui/Alert';
import Link from 'next/link';

export default function DashboardPage() {
  // Fetch medicines with React Query
  const {
    data: medicines = [],
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
      return response.data.medicines || [];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  // Fetch alerts with React Query
  const {
    data: alerts = [],
    isLoading: alertsLoading,
    error: alertsError,
  } = useQuery({
    queryKey: ['alerts'],
    queryFn: async () => {
      const response = await axios.get('/api/medicines/alerts', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data.alerts || [];
    },
    staleTime: 30 * 1000,
    refetchInterval: 30000,
  });

  // Fetch reminders with React Query
  const {
    data: reminders = [],
    isLoading: remindersLoading,
    error: remindersError,
  } = useQuery({
    queryKey: ['reminders'],
    queryFn: async () => {
      const response = await axios.get('/api/medicines/reminders', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data.reminders || [];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const isLoading = medicinesLoading || alertsLoading || remindersLoading;
  const hasError = medicinesError || alertsError || remindersError;

  // Calculate statistics
  const statistics = {
    totalPrescriptions: medicines.length,
    activeMedications: medicines.length,
    alertsToday: alerts.filter((a: any) => !a.isRead).length,
    nearbyStores: 5, // This would come from stores data in a real app
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-6">
      {/* Error Messages */}
      {hasError && (
        <Alert variant="error">
          <AlertCircle className="h-4 w-4" />
          <div>
            <h3 className="font-semibold">Failed to load data</h3>
            <p className="text-sm">Some dashboard information could not be loaded. Please refresh the page.</p>
          </div>
        </Alert>
      )}

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back!</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Here&apos;s your health dashboard for today</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard icon={Pill} title="Total Prescriptions" value={statistics.totalPrescriptions} color="blue" />
        <SummaryCard icon={Clock} title="Active Medications" value={statistics.activeMedications} color="green" />
        <SummaryCard icon={AlertCircle} title="Alerts Today" value={statistics.alertsToday} color="yellow" />
        <SummaryCard icon={MapPin} title="Nearby Stores" value={statistics.nearbyStores} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Reminders */}
          <ReminderTimeline reminders={reminders} isLoading={remindersLoading} />

          {/* Recent Medicines */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 dark:text-white">Active Medications</h3>
              <Link href="/dashboard/medications">
                <Button size="sm" variant="ghost">
                  View All →
                </Button>
              </Link>
            </CardHeader>
            <CardBody className="space-y-3">
              {medicines.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400 text-center py-4">
                  No active medications. Upload a prescription to get started.
                </p>
              ) : (
                medicines.map((med: any) => (
                  <MedicineCard key={med.id} medicine={med} />
                ))
              )}
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-gray-900 dark:text-white">Quick Actions</h3>
            </CardHeader>
            <CardBody className="space-y-2">
              <Link href="/dashboard/upload">
                <Button variant="primary" className="w-full justify-center">
                  Upload Prescription
                </Button>
              </Link>
              <Link href="/dashboard/price-compare">
                <Button variant="secondary" className="w-full justify-center">
                  Compare Prices
                </Button>
              </Link>
              <Link href="/dashboard/alerts">
                <Button variant="secondary" className="w-full justify-center">
                  View All Alerts
                </Button>
              </Link>
            </CardBody>
          </Card>

          {/* Alerts */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-gray-900 dark:text-white">Health Alerts</h3>
            </CardHeader>
            <CardBody className="space-y-3">
              {alerts.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400 text-center py-4">
                  No alerts at this time.
                </p>
              ) : (
                alerts.slice(0, 3).map((alert: any, idx: number) => (
                  <AlertCard key={idx} alert={alert} />
                ))
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

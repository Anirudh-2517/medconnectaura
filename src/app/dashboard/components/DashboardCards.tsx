'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Pill, Clock, AlertTriangle, MapPin } from 'lucide-react';

export function SummaryCard({ icon: Icon, title, value, color = 'blue' }: any) {
  const colorStyles: Record<string, string> = {
    blue: 'bg-blue-50 dark:bg-blue-900',
    green: 'bg-green-50 dark:bg-green-900',
    red: 'bg-red-50 dark:bg-red-900',
    yellow: 'bg-yellow-50 dark:bg-yellow-900',
  };

  return (
    <Card className={colorStyles[color]}>
      <CardBody className="flex items-center gap-4">
        <div className={`p-3 rounded-lg bg-${color}-100 dark:bg-${color}-800`}>
          <Icon className={`text-${color}-600 dark:text-${color}-400`} size={24} />
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
      </CardBody>
    </Card>
  );
}

export function MedicineCard({ medicine }: any) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{medicine.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{medicine.dosage}</p>
          </div>
          <Badge variant="primary">{medicine.frequency}</Badge>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
          <div>
            <p className="font-medium">Duration</p>
            <p>{medicine.duration} days</p>
          </div>
          <div>
            <p className="font-medium">Next Dose</p>
            <p>{medicine.nextDose || '09:00 AM'}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export function AlertCard({ alert }: any) {
  return (
    <Card className="border-l-4 border-yellow-500">
      <CardBody>
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-yellow-600 mt-1 flex-shrink-0" size={20} />
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{alert.title}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{alert.message}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export function StoreCard({ store }: any) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{store.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
              <MapPin size={14} /> {store.distance} km away
            </p>
          </div>
          <Badge variant="success">{store.available} items</Badge>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">{store.address}</p>
        </div>
      </CardBody>
    </Card>
  );
}

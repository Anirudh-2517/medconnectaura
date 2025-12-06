'use client';

import React from 'react';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  timings: string[];
  daysLeft: number;
  endDate: string;
}

interface MedicineListProps {
  medicines: Medicine[];
  onSelectMedicine?: (medicine: Medicine) => void;
}

export function MedicineList({ medicines, onSelectMedicine }: MedicineListProps) {
  return (
    <div className="space-y-3">
      {medicines && medicines.length > 0 ? (
        medicines.map((medicine) => (
          <Card
            key={medicine.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onSelectMedicine?.(medicine)}
          >
            <CardBody className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">{medicine.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{medicine.dosage}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {medicine.timings.map((time, idx) => (
                    <Badge key={idx} variant="secondary" size="sm">
                      {time}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <Badge variant={medicine.daysLeft <= 3 ? 'danger' : 'success'}>
                  {medicine.daysLeft} days
                </Badge>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Until {medicine.endDate}</p>
              </div>
            </CardBody>
          </Card>
        ))
      ) : (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No medicines found. Upload a prescription to get started.
        </div>
      )}
    </div>
  );
}

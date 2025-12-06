'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export function ReminderTimeline({ reminders }: any) {
  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold text-gray-900 dark:text-white">Today&apos;s Reminders</h3>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {reminders && reminders.length > 0 ? (
            reminders.map((reminder: any, index: number) => (
              <div key={index} className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:pb-0 last:border-0">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">{reminder.time}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{reminder.medicine}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{reminder.dosage}</p>
                </div>
                <Badge variant={reminder.status === 'taken' ? 'success' : reminder.status === 'skipped' ? 'secondary' : 'warning'}>
                  {reminder.status}
                </Badge>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-6">No reminders for today</p>
          )}
        </div>
      </CardBody>
    </Card>
  );
}

export function PrescriptionCard({ prescription }: any) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Uploaded on</p>
            <p className="font-semibold text-gray-900 dark:text-white">{prescription.date}</p>
          </div>
          <Badge variant="primary">{prescription.medicineCount} medicines</Badge>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <a
            href={prescription.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            View Prescription →
          </a>
        </div>
      </CardBody>
    </Card>
  );
}

export function MedicineListItem({ medicine }: any) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900 dark:text-white">{medicine.name}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">{medicine.dosage} • {medicine.frequency}</p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Ends on {medicine.endDate}</p>
      </div>
      <Badge variant="primary">{medicine.daysLeft} days left</Badge>
    </div>
  );
}

'use client';

import React from 'react';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Alert } from '@/components/ui/Alert';
import { AlertTriangle } from 'lucide-react';

interface AlertsPanelProps {
  alerts: Array<{
    id: string;
    title: string;
    message: string;
    severity: 'high' | 'medium' | 'low';
    type: 'interaction' | 'allergy' | 'reminder' | 'expiry';
  }>;
}

export function AlertsPanel({ alerts }: AlertsPanelProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'info';
    }
  };

  return (
    <div className="space-y-3">
      {alerts && alerts.length > 0 ? (
        alerts.map((alert) => (
          <Alert key={alert.id} variant={getSeverityColor(alert.severity)}>
            <div className="flex items-start gap-3">
              <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{alert.title}</p>
                <p className="text-sm mt-1">{alert.message}</p>
              </div>
            </div>
          </Alert>
        ))
      ) : (
        <Alert variant="success">
          <p>No alerts. Keep taking your medicines on time!</p>
        </Alert>
      )}
    </div>
  );
}

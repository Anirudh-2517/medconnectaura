'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Loader } from '@/components/ui/Loader';
import { Alert } from '@/components/ui/Alert';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface Alert {
  id: string;
  type: 'reminder' | 'interaction' | 'expiry' | 'tip';
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  createdAt: string;
  isRead: boolean;
  actionRequired?: boolean;
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  // Fetch alerts using React Query
  const { data: fetchedAlerts, isLoading, error, refetch } = useQuery({
    queryKey: ['alerts'],
    queryFn: async () => {
      const response = await axios.get('/api/medicines/alerts', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data.alerts || [];
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  useEffect(() => {
    if (fetchedAlerts) {
      setAlerts(fetchedAlerts);
    }
  }, [fetchedAlerts]);

  const handleDismiss = (alertId: string) => {
    const newDismissed = new Set(dismissed);
    newDismissed.add(alertId);
    setDismissed(newDismissed);
  };

  const handleMarkAsRead = async (alertId: string) => {
    try {
      await axios.put(
        `/api/medicines/alerts/${alertId}`,
        { isRead: true },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      refetch();
    } catch (err) {
      console.error('Failed to mark alert as read:', err);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertCircle className="w-5 h-5" />;
      case 'medium':
        return <Clock className="w-5 h-5" />;
      default:
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getTypeLabel = (type: string) => {
    const types: { [key: string]: string } = {
      reminder: '💊 Medication Reminder',
      interaction: '⚠️ Drug Interaction',
      expiry: '📅 Expiry Alert',
      tip: '💡 Health Tip',
    };
    return types[type] || type;
  };

  const activeAlerts = alerts.filter((alert) => !dismissed.has(alert.id));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <Alert variant="error">
          <AlertCircle className="h-4 w-4" />
          <div>
            <h3 className="font-semibold">Failed to load alerts</h3>
            <p className="text-sm">Please try again later</p>
          </div>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-950 dark:to-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Alerts & Reminders
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Stay informed with medication reminders and health alerts
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Alerts</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {activeAlerts.length}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-600 dark:text-gray-400">High Priority</div>
            <div className="text-3xl font-bold text-red-600">
              {activeAlerts.filter((a) => a.severity === 'high').length}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-600 dark:text-gray-400">Unread</div>
            <div className="text-3xl font-bold text-blue-600">
              {activeAlerts.filter((a) => !a.isRead).length}
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {activeAlerts.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-12 text-center shadow-sm">
              <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                All caught up!
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                You have no active alerts. Keep taking your medications on schedule.
              </p>
            </div>
          ) : (
            activeAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border-l-4 ${
                  alert.severity === 'high'
                    ? 'border-red-500'
                    : alert.severity === 'medium'
                      ? 'border-yellow-500'
                      : 'border-blue-500'
                } transition-all hover:shadow-md`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`p-2 rounded-full ${getSeverityColor(alert.severity)}`}>
                      {getSeverityIcon(alert.severity)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {alert.title}
                        </h3>
                        <Badge variant={alert.severity === 'high' ? 'danger' : 'secondary'}>
                          {getTypeLabel(alert.type)}
                        </Badge>
                        {!alert.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">{alert.message}</p>
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        {new Date(alert.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {!alert.isRead && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleMarkAsRead(alert.id)}
                      >
                        Mark Read
                      </Button>
                    )}
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleDismiss(alert.id)}
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UploadCloud, Pill, MapPin, AlertCircle, Home } from 'lucide-react';
import { cn } from '@/lib/helpers';

export function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/dashboard/upload', label: 'Upload Prescription', icon: UploadCloud },
    { href: '/dashboard/medicines', label: 'My Medicines', icon: Pill },
    { href: '/dashboard/alerts', label: 'Alerts', icon: AlertCircle },
    { href: '/dashboard/price-compare', label: 'Compare Prices', icon: MapPin },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen border-r border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900 sticky top-16 pt-6">
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              )}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-4">
        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900">
          <h4 className="font-semibold text-sm text-blue-900 dark:text-blue-100 mb-2">Health Tip</h4>
          <p className="text-xs text-blue-800 dark:text-blue-200">
            Take your medicines on time for better health outcomes.
          </p>
        </div>
      </div>
    </aside>
  );
}

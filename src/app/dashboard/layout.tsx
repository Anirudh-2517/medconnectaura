'use client';

import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}

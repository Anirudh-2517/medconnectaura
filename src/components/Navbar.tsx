'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, LogOut, User } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    // TODO: Implement logout
    router.push('/auth/login');
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="font-bold text-white">MC</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">MedConnect</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              Dashboard
            </Link>
            <Link href="/dashboard/upload" className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              Upload
            </Link>
            <Link href="/dashboard/medicines" className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              Medicines
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg dark:text-gray-300 dark:hover:bg-gray-800">
              <User size={20} />
            </button>
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800"
            >
              <LogOut size={16} />
              Logout
            </button>
            <button
              className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg dark:text-gray-300 dark:hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            <Link href="/dashboard" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
              Dashboard
            </Link>
            <Link href="/dashboard/upload" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
              Upload Prescription
            </Link>
            <Link href="/dashboard/medicines" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
              My Medicines
            </Link>
            <button
              onClick={handleLogout}
              className="w-full mt-4 px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800 text-sm font-medium flex items-center justify-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from '@/components/ui/Loader';

export default function Home() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Redirect based on auth token
        if (token) {
          // Verify token is still valid
          try {
            const res = await fetch('/api/auth/verify', {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
              router.push('/dashboard');
            } else {
              localStorage.removeItem('token');
              router.push('/login');
            }
          } catch (error) {
            router.push('/auth/login');
          }
        } else {
          router.push('/auth/login');
        }
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-950 dark:to-gray-900">
      {isChecking && <Loader />}
    </div>
  );
}

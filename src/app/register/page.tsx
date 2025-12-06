'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { signUp } from '@/lib/auth';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const session = await signUp(data.email, data.password, data.name);
      
      // Store token in localStorage for persistence
      if (session.user) {
        // Get session to retrieve access token
        const authRes = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: data.email, password: data.password }),
        });
        
        if (authRes.ok) {
          const authData = await authRes.json();
          if (authData.session?.session?.access_token) {
            localStorage.setItem('token', authData.session.session.access_token);
          }
        }
      }
      
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="h-12 w-12 rounded-lg bg-blue-600 flex items-center justify-center mx-auto mb-4">
            <span className="font-bold text-white text-xl">MC</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">MedConnect AI</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Create your account</p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="error" className="mb-6">
            {error}
          </Alert>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            {...register('name')}
            error={errors.name?.message}
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            {...register('email')}
            error={errors.email?.message}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            {...register('password')}
            error={errors.password?.message}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Create Account
          </Button>
        </form>

        {/* Sign In Link */}
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
